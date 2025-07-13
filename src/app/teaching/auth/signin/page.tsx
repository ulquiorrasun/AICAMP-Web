import { redirect } from "next/navigation";

export default async function TeachingSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}) {
  const { callbackUrl } = await searchParams;
  
  // Redirect to main sign-in page with teaching callback
  const signInUrl = new URL("/auth/signin", process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000");
  if (callbackUrl) {
    signInUrl.searchParams.set("callbackUrl", callbackUrl);
  } else {
    signInUrl.searchParams.set("callbackUrl", "/teaching/dashboard");
  }
  
  redirect(signInUrl.toString());
} 