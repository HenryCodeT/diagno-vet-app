import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/layout";

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

  // Check onboarding status and get user data
  const user = await prisma.user.findUnique({
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
