"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({ 
  children, 
  fallback,
  redirectTo = "/auth/signin?callbackUrl=/teaching/dashboard"
}: AuthGuardProps) {
  const { data: session, status } = useSession();

  // Show loading state
  if (status === "loading") {
    return fallback || (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">正在验证身份...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    redirect(redirectTo);
  }

  // Show children if authenticated
  return <>{children}</>;
} 