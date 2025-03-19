'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MobileExamApp from '@/components/MobileExamApp';
import ScoorlyWIPModal from '@/components/ScoorlyWIPModal';
import { createClient } from '@/libs/supabase/client';
import { UserCircle } from 'lucide-react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  // Check login status when component mounts
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        setLoading(true);
        
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setIsLoggedIn(true);
          setUser(session.user);
          setShowModal(false); // Don't show modal if logged in
        } else {
          setIsLoggedIn(false);
          setUser(null);
          setShowModal(true); // Show modal if not logged in
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Initial check
    checkLoginStatus();
    
    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsLoggedIn(true);
        setUser(session.user);
        setShowModal(false);
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setUser(null);
        setShowModal(true);
      }
    });
    
    return () => {
      // Clean up subscription
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleProfileClick = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {isLoggedIn && (
          <button 
            onClick={handleProfileClick}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white rounded-full py-1 px-3 shadow-md hover:shadow-lg transition-shadow"
          >
            {user?.user_metadata?.avatar_url ? (
              <img 
                src={user.user_metadata.avatar_url} 
                alt="Profile" 
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <UserCircle className="w-8 h-8 text-indigo-600" />
            )}
            <span className="hidden sm:inline text-sm font-medium">
              {user?.user_metadata?.full_name || user?.email || 'Account'}
            </span>
          </button>
        )}
        <MobileExamApp />
      </div>
      {showModal && !isLoggedIn && <ScoorlyWIPModal onClose={handleCloseModal} />}
    </>
  );
}