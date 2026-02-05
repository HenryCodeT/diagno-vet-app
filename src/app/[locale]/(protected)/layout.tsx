import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/layout";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Not authenticated -> redirect to login
  if (!session?.user) {
    redirect("/login");
  }

  // Check onboarding status and get user data from Prisma
  let user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      onboarding: true,
      firstName: true,
      lastName: true,
      avatarUrl: true,
      veterinary: {
        select: {
          legalName: true,
        },
      },
    },
  });

  // Sync with Supabase if user doesn't exist in Prisma or if onboarding status might be out of sync
  if (!user || !user.onboarding) {
    try {
      const { data: supabaseUser } = await supabase.auth.admin.getUserById(
        session.user.id
      );

      if (supabaseUser?.user) {
        const supabaseOnboarding =
          supabaseUser.user.user_metadata?.onboarding ?? false;

        if (!user) {
          // User doesn't exist in Prisma, create it with Supabase data
          user = await prisma.user.create({
            data: {
              id: session.user.id,
              email: session.user.email!,
              firstName: supabaseUser.user.user_metadata?.firstName ?? null,
              lastName: supabaseUser.user.user_metadata?.lastName ?? null,
              avatarUrl: supabaseUser.user.user_metadata?.avatarUrl ?? null,
              language: supabaseUser.user.user_metadata?.language ?? "es",
              onboarding: supabaseOnboarding,
            },
            select: {
              onboarding: true,
              firstName: true,
              lastName: true,
              avatarUrl: true,
              veterinary: {
                select: {
                  legalName: true,
                },
              },
            },
          });
        } else if (!user.onboarding && supabaseOnboarding) {
          // User exists in Prisma but onboarding is out of sync - update it
          user = await prisma.user.update({
            where: { id: session.user.id },
            data: { onboarding: true },
            select: {
              onboarding: true,
              firstName: true,
              lastName: true,
              avatarUrl: true,
              veterinary: {
                select: {
                  legalName: true,
                },
              },
            },
          });
        }
      }
    } catch (error) {
      console.error("Error syncing user from Supabase:", error);
      // If sync fails and user doesn't exist, redirect to onboarding
      if (!user) {
        redirect("/onboarding");
      }
    }
  }

  // Authenticated but onboarding not completed -> redirect to onboarding
  if (!user?.onboarding) {
    redirect("/onboarding");
  }

  return (
    <DashboardShell
      user={{
        firstName: user.firstName,
        lastName: user.lastName,
        email: session.user.email,
        avatarUrl: user.avatarUrl,
      }}
      veterinaryName={user.veterinary?.legalName}
    >
      {children}
    </DashboardShell>
  );
}
