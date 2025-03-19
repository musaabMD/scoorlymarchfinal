// File: src/components/AppLayout.jsx
'use client'
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { createClient } from '@/libs/supabase/client';
import ScoorlyWIPModal from './ScoorlyWIPModal';

const AppLayout = ({ children, activeTab, handleTabChange }) => {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const supabase = createClient();
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Check login status when component mounts
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          // Show the WIP modal for non-logged in users after a short delay
          const timer = setTimeout(() => {
            setShowModal(true);
          }, 1000);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };
    
    // Initial check
    checkLoginStatus();
  }, []);

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    // Store in localStorage that the user has dismissed the modal
    localStorage.setItem('wipModalDismissed', 'true');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header - with shadow when scrolled */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'shadow-md' : ''
      }`}>
        <Header 
          activeTab={activeTab} 
          handleTabChange={handleTabChange} 
          user={user}
        />
      </div>
      
      {/* Main Content with padding to prevent hiding under header and navigation */}
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
      
      {/* Fixed Bottom Navigation */}
      <Navigation activeTab={activeTab} handleTabChange={handleTabChange} />
      
      {/* Show WIP modal if not logged in */}
      {showModal && !user && (
        <ScoorlyWIPModal onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AppLayout;