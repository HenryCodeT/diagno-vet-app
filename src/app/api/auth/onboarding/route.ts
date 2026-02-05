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

      // 3. Create or update user in Prisma
      const user = await tx.user.upsert({
        where: { id: session.user.id },
        create: {
          id: session.user.id,
          email: session.user.email,
          firstName,
          lastName,
          phone: data.professional.phone,
          professionalTitle: data.professional.title,
          professionalLicense: data.professional.license || null,
          onboarding: true,
          veterinary: { connect: { id: veterinary.id } },
        },
        update: {
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
    });

    // 4. Update user metadata in Supabase to mark onboarding as complete
    const { error: supabaseError } = await supabase.auth.admin.updateUserById(
      session.user.id,
      {
        user_metadata: {
          onboarding: true,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
        },
      }
    );

    if (supabaseError) {
      console.error("Supabase update error:", supabaseError);
      return NextResponse.json(
        { error: supabaseError.message },
        { status: 400 }
      );
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
