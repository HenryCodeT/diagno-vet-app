import { SessionUser } from "@/features/auth/dto";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: SessionUser & DefaultSession["user"];
  }

  interface User extends SessionUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends SessionUser {}
}
