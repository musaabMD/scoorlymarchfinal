import { Button } from "@/components/ui/button";
import { UserCircle, PlusCircle, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/libs/supabase/client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Header({ setShowAddExam }) {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    async function getUserSession() {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
      } catch (error) {
        console.error('Error getting auth session:', error);
      } finally {
        setLoading(false);
      }
    }

    getUserSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    // Click outside listener to close menu
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up subscriptions when component unmounts
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [supabase]);

  const handleGoogleLogin = async () => {
    try {
      const currentOrigin = window.location.origin;
      const callbackUrl = `${currentOrigin}/auth/callback`;
      
      console.log("Starting Google login with redirect:", callbackUrl);
      
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('error')) {
        router.replace('/signin');
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl,
          queryParams: {
            prompt: 'select_account',
            access_type: 'offline'
          }
        }
      });
      
      if (error) {
        console.error('Error signing in with Google:', error);
        alert('There was an error signing in. Please try again.');
      }
    } catch (error) {
      console.error('Failed to start authentication:', error);
      alert('Authentication service unavailable. Please try again later.');
    }
  };
  
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
      setShowUserMenu(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfileClick = () => {
    router.push('/dashboard');
    setShowUserMenu(false);
  };
  
  const userName = user?.user_metadata?.full_name || 
                  user?.user_metadata?.name || 
                  user?.email?.split('@')[0] || 
                  'Profile';
  
  const userAvatar = user?.user_metadata?.avatar_url || 
                    user?.user_metadata?.picture;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo and App Name - iOS style with centered logo on mobile */}
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-md mr-2">
                <span className="text-md font-bold">S</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">Scoorly</span>
            </Link>
          </div>

          {/* Center logo container (only visible on mobile) */}
          <div className="hidden sm:hidden md:hidden absolute inset-x-0 top-0 h-14 flex items-center justify-center pointer-events-none">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-md mr-2">
                <span className="text-md font-bold">S</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">Scoorly</span>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex-1 flex items-center justify-end space-x-3">
            {/* Add Exam button - Only visible when user is logged in */}
            {user && setShowAddExam && (
              <Button 
                onClick={() => setShowAddExam(true)}
                size="sm"
                className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Add Exam</span>
              </Button>
            )}

            {/* Upgrade button */}
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-white"
              size="sm"
              onClick={() => router.push('/pricing')}
            >
              Upgrade
            </Button>

            {/* User profile button with dropdown */}
            {loading ? (
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="relative" ref={menuRef}>
                <Button 
                  className="rounded-full overflow-hidden p-0 bg-white hover:bg-gray-100 flex items-center"
                  variant="ghost"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  {userAvatar ? (
                    <img 
                      src={userAvatar} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <UserCircle className="h-8 w-8 text-indigo-600" />
                  )}
                  <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
                </Button>

                {/* Dropdown menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      {userName}
                    </div>
                    <button 
                      onClick={handleProfileClick} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Profile
                    </button>
                    <button 
                      onClick={handleSignOut} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                onClick={handleGoogleLogin}
                size="sm"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}