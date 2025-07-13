"use client";

import { useSession } from "next-auth/react";
import { useAppContext } from "@/contexts/app";
import { User } from "@/types/user";

export function useTeachingUser() {
  const { data: session } = useSession();
  const { user: contextUser } = useAppContext();

  // Combine session user with context user for complete user info
  const user: User | null = session?.user ? {
    uuid: session.user.uuid,
    email: session.user.email || "",
    nickname: session.user.name || "",
    avatar_url: session.user.image || "",
    created_at: new Date(),
    // Add context user info if available
    ...(contextUser && {
      credits: contextUser.credits,
      invite_code: contextUser.invite_code,
      invited_by: contextUser.invited_by,
      is_affiliate: contextUser.is_affiliate,
    }),
  } : null;

  const { status } = useSession();

  return {
    user,
    isAuthenticated: !!session?.user,
    isLoading: status === "loading",
    isError: status === "unauthenticated",
  };
} 