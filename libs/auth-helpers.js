// File: libs/auth-helpers.js
import { createClient } from '@/libs/supabase/client';

/**
 * Enhanced Google login that ensures the correct redirect URL is used
 */
export const signInWithGoogle = async () => {
  const supabase = createClient();
  
  // Use the environment variable for the site URL to ensure consistency
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                 (typeof window !== 'undefined' ? window.location.origin : '');
  const redirectPath = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL || '/auth/callback';
  const redirectTo = `${siteUrl}${redirectPath}`;
  
  console.log("Attempting Google login with redirectTo:", redirectTo);
  
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectTo,
        queryParams: {
          prompt: 'select_account'
        }
      }
    });
    
    if (error) {
      console.error("OAuth error:", error);
      throw error;
    }
    
    return { data, error: null };
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return { data: null, error };
  }
};

/**
 * Signs the user out and redirects to the home page
 */
export const signOut = async () => {
  const supabase = createClient();
  
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Error signing out:", error);
      return { success: false, error };
    }
    
    // Redirect to home page after sign out
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    
    return { success: true, error: null };
  } catch (error) {
    console.error("Exception during sign out:", error);
    return { success: false, error };
  }
};