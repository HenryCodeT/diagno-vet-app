import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface OnboardingData {
  veterinary: {
    legalName: string;
    address: string;
    phone: string;
  };
  professional: {
    phone: string;
    title: string;
    fullName: string;
    license: string;
  };
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data: OnboardingData = await request.json();

    // Validate required fields
    if (
      !data.veterinary?.legalName ||
      !data.veterinary?.address ||
      !data.veterinary?.phone ||
      !data.professional?.phone ||
      !data.professional?.title ||
      !data.professional?.fullName
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create veterinary clinic and user in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create veterinary clinic
      const veterinary = await tx.veterinary.create({
        data: {
          legalName: data.veterinary.legalName,
          address: data.veterinary.address,
          phone: data.veterinary.phone,
        },
      });

      // 2. Parse fullName into firstName and lastName
      const nameParts = data.professional.fullName.trim().split(" ");
      const firstName = nameParts[0] || null;
      const lastName = nameParts.slice(1).join(" ") || null;

      // 3. Check if user exists by ID first
      let existingUser = await tx.user.findUnique({
        where: { id: session.user.id },
      });

      let user;

      // If user doesn't exist by ID, check by email
      if (!existingUser) {
        existingUser = await tx.user.findUnique({
          where: { email: session.user.email! },
        });

        // If user exists by email but with different ID, there's a sync issue
        // In this case, we should update the existing user (can't change ID)
        if (existingUser && existingUser.id !== session.user.id) {
          // Update the existing user with the email-based ID
          // Note: This means the Supabase ID and Prisma ID are out of sync
          // This shouldn't happen in normal flow, but we handle it gracefully
          user = await tx.user.update({
            where: { email: session.user.email! },
            data: {
              firstName,
              lastName,
              phone: data.professional.phone,
              professionalTitle: data.professional.title,
              professionalLicense: data.professional.license || null,
              onboarding: true,
              veterinary: { connect: { id: veterinary.id } },
            },
          });
          return { veterinary, user };
        }
      }

      // 4. Create or update user
      if (existingUser) {
        // User exists with matching ID, update it
        user = await tx.user.update({
          where: { id: session.user.id },
          data: {
            firstName,
            lastName,
            phone: data.professional.phone,
            professionalTitle: data.professional.title,
            professionalLicense: data.professional.license || null,
            onboarding: true,
            veterinary: { connect: { id: veterinary.id } },
          },
        });
      } else {
        // User doesn't exist, create it
        user = await tx.user.create({
          data: {
            id: session.user.id,
            email: session.user.email!,
            firstName,
            lastName,
            phone: data.professional.phone,
            professionalTitle: data.professional.title,
            professionalLicense: data.professional.license || null,
            onboarding: true,
            veterinary: { connect: { id: veterinary.id } },
          },
        });
      }

      return { veterinary, user };
    });

    // 4. Update user metadata in Supabase to mark onboarding as complete
    // First verify the user exists in Supabase
    const { data: existingUser, error: getUserError } =
      await supabase.auth.admin.getUserById(session.user.id);

    if (getUserError || !existingUser?.user) {
      console.error("Supabase user not found:", getUserError);
      // If user doesn't exist in Supabase, create them
      const { data: newUser, error: createError } =
        await supabase.auth.admin.createUser({
          id: session.user.id,
          email: session.user.email!,
          email_confirm: true,
          user_metadata: {
            onboarding: true,
            firstName: result.user.firstName,
            lastName: result.user.lastName,
            language: "es",
          },
        });

      if (createError) {
        console.error("Supabase create/update error:", createError);
        // Don't fail the onboarding if Supabase update fails - Prisma update succeeded
        console.warn(
          "Warning: User created in Prisma but Supabase sync failed. User ID:",
          session.user.id
        );
      }
    } else {
      // User exists, update them
      const { error: supabaseError } = await supabase.auth.admin.updateUserById(
        session.user.id,
        {
          user_metadata: {
            ...existingUser.user.user_metadata,
            onboarding: true,
            firstName: result.user.firstName,
            lastName: result.user.lastName,
          },
        }
      );

      if (supabaseError) {
        console.error("Supabase update error:", supabaseError);
        // Don't fail the onboarding if Supabase update fails - Prisma update succeeded
        console.warn(
          "Warning: User updated in Prisma but Supabase sync failed. User ID:",
          session.user.id
        );
      }
    }

    return NextResponse.json({
      success: true,
      veterinaryId: result.veterinary.id,
      userId: result.user.id,
    });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
