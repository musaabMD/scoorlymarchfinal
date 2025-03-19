// // File: app/auth/callback/route.js
// import { NextResponse } from "next/server";
// import { createClient } from "@/libs/supabase/server";

// export const dynamic = "force-dynamic";

// export async function GET(req) {
//   const requestUrl = new URL(req.url);
//   const code = requestUrl.searchParams.get("code");
  
//   console.log("Auth callback received, URL:", requestUrl.toString());
//   console.log("Code parameter:", code ? "Present" : "Missing");
  
//   if (code) {
//     try {
//       const supabase = createClient();
//       const result = await supabase.auth.exchangeCodeForSession(code);
      
//       console.log("Exchange code result:", result.error ? "Error" : "Success");
      
//       if (result.error) {
//         console.error("Error details:", result.error);
//         return NextResponse.redirect(requestUrl.origin);
//       }
      
//       // After exchanging the code for a session, redirect to the dashboard
//       console.log("Redirecting to dashboard");
//       return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
//     } catch (error) {
//       console.error("Error exchanging code for session:", error);
//       // If there's an error, redirect to home page
//       return NextResponse.redirect(requestUrl.origin);
//     }
//   }
  
//   // If no code is provided, redirect to home page
//   console.log("No code provided, redirecting to home");
//   return NextResponse.redirect(requestUrl.origin);
// }
// File: app/auth/callback/route.js
import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");
  
  console.log("Auth callback received, URL:", requestUrl.toString());
  console.log("Code parameter:", code ? "Present" : "Missing");
  
  if (code) {
    try {
      const supabase = createClient();
      const result = await supabase.auth.exchangeCodeForSession(code);
      
      console.log("Exchange code result:", result.error ? "Error" : "Success");
      
      if (result.error) {
        console.error("Error details:", result.error);
        return NextResponse.redirect(requestUrl.origin);
      }
      
      // After exchanging the code for a session, redirect to the dashboard
      console.log("Redirecting to dashboard");
      return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
    } catch (error) {
      console.error("Error exchanging code for session:", error);
      // If there's an error, redirect to home page
      return NextResponse.redirect(requestUrl.origin);
    }
  }
  
  // If no code is provided, redirect to home page
  console.log("No code provided, redirecting to home");
  return NextResponse.redirect(requestUrl.origin);
}