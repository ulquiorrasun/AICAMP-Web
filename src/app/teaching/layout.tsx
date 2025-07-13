import { AppContextProvider } from "@/contexts/app";
import { NextAuthSessionProvider } from "@/auth/session";
import TeachingLayout from "@/components/layouts/teaching-layout";

export default function TeachingRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthSessionProvider>
      <AppContextProvider>
        <TeachingLayout>
          {children}
        </TeachingLayout>
      </AppContextProvider>
    </NextAuthSessionProvider>
  );
} 