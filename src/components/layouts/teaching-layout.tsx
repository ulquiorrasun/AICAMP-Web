"use client";

import TeachingNavigation from "@/components/blocks/header/teaching-nav";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface TeachingLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function TeachingLayout({ children, className }: TeachingLayoutProps) {
  const { data: session, status } = useSession();

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">正在验证身份...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    redirect("/auth/signin?callbackUrl=/teaching/dashboard");
  }

  return (
    <div className="min-h-screen bg-background">
      <TeachingNavigation />
      <main className={cn("container py-6", className)}>
        {children}
      </main>
    </div>
  );
} 