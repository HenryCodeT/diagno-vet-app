import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Not authenticated -> redirect to login
  if (!session?.user) {
    redirect("/login");
  }

  // Check onboarding status directly from database (more reliable than JWT token)
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { onboarding: true },
  });

  // Already completed onboarding -> redirect to dashboard
  if (user?.onboarding) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
