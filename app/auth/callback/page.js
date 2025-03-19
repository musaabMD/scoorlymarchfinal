"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/libs/supabase/client";
import config from "@/config";

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // This effect will handle the OAuth callback
    const handleAuthCallback = async () => {
      // Get the auth code from the URL
      const { searchParams } = new URL(window.location.href);
      const code = searchParams.get("code");
      
      if (code) {
        try {
          // Exchange the code for a session
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            console.error("Error exchanging code for session:", error);
            // Redirect to sign-in page with error
            router.push(`${config.auth.loginUrl}?error=Authentication failed`);
            return;
          }
          
          // If successful, redirect to the callback URL specified in your config
          router.push(config.auth.callbackUrl);
        } catch (err) {
          console.error("Unexpected error during auth callback:", err);
          router.push(`${config.auth.loginUrl}?error=Unexpected authentication error`);
        }
      } else {
        // No code found, redirect to sign-in
        router.push(config.auth.loginUrl);
      }
    };

    handleAuthCallback();
  }, [router, supabase]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="loading loading-spinner loading-lg"></div>
        <p className="text-lg">Completing sign in...</p>
      </div>
    </div>
  );
} 