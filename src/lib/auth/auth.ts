import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";
import type { SessionUser } from "@/features/auth/dto";

// Supabase Admin client for auth operations
const getSupabaseAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const supabase = getSupabaseAdmin();

          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (error || !data.user) {
            return null;
          }

          const supabaseUser = data.user;

          return {
            id: supabaseUser.id,
            email: supabaseUser.email!,
            firstName: supabaseUser.user_metadata?.firstName ?? null,
            lastName: supabaseUser.user_metadata?.lastName ?? null,
            avatarUrl: supabaseUser.user_metadata?.avatarUrl ?? null,
            language: supabaseUser.user_metadata?.language ?? "es",
            onboarding: supabaseUser.user_metadata?.onboarding ?? false,
          } satisfies SessionUser;
        } catch {
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }) as any,
  ],

  callbacks: {
    async jwt({ token, user, account, trigger }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.avatarUrl = user.avatarUrl;
        token.language = user.language;
        token.onboarding = user.onboarding;
      }

      if (account?.provider === "google" && user) {
        token.firstName = user.name?.split(" ")[0] ?? null;
        token.lastName = user.name?.split(" ").slice(1).join(" ") ?? null;
        token.avatarUrl = user.image ?? null;
        token.onboarding = false; // New Google users need onboarding
      }

      // When session is updated (e.g., after onboarding), refresh user data from Supabase
      if (trigger === "update" && token.id) {
        try {
          const supabase = getSupabaseAdmin();
          const { data } = await supabase.auth.admin.getUserById(token.id as string);
          if (data?.user) {
            token.firstName = data.user.user_metadata?.firstName ?? token.firstName;
            token.lastName = data.user.user_metadata?.lastName ?? token.lastName;
            token.onboarding = data.user.user_metadata?.onboarding ?? false;
          }
        } catch (error) {
          console.error("Error refreshing user data:", error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.firstName = token.firstName as string | null;
      session.user.lastName = token.lastName as string | null;
      session.user.avatarUrl = token.avatarUrl as string | null;
      session.user.language = (token.language as string) ?? "es";
      session.user.onboarding = (token.onboarding as boolean) ?? false;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
  },
});
