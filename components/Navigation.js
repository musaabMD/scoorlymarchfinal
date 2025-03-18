// File: src/components/Navigation.jsx
import React from 'react';
import { BookOpen, Brain, CheckCircle, BookmarkCheck, Settings } from 'lucide-react';

const Navigation = ({ activeTab, handleTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50">
      <button 
        className={`flex flex-col items-center py-2 px-1 ${activeTab === 'learn' ? 'text-indigo-600' : 'text-gray-500'}`}
        onClick={() => handleTabChange('learn')}
      >
        <BookOpen className="h-5 w-5" />
        <span className="text-xs mt-1">Learn</span>
      </button>
      
      <button 
        className={`flex flex-col items-center py-2 px-1 ${activeTab === 'practice' ? 'text-indigo-600' : 'text-gray-500'}`}
        onClick={() => handleTabChange('practice')}
      >
        <Brain className="h-5 w-5" />
        <span className="text-xs mt-1">Practice</span>
      </button>
      
      <button 
        className={`flex flex-col items-center py-2 px-1 ${activeTab === 'review' ? 'text-indigo-600' : 'text-gray-500'}`}
        onClick={() => handleTabChange('review')}
      >
        <CheckCircle className="h-5 w-5" />
        <span className="text-xs mt-1">Review</span>
      </button>
      
      <button 
        className={`flex flex-col items-center py-2 px-1 ${activeTab === 'mock' ? 'text-indigo-600' : 'text-gray-500'}`}
        onClick={() => handleTabChange('mock')}
      >
        <BookmarkCheck className="h-5 w-5" />
        <span className="text-xs mt-1">Mock</span>
      </button>
      
      <button 
        className={`flex flex-col items-center py-2 px-1 ${activeTab === 'settings' ? 'text-indigo-600' : 'text-gray-500'}`}
        onClick={() => handleTabChange('settings')}
      >
        <Settings className="h-5 w-5" />
        <span className="text-xs mt-1">Settings</span>
      </button>
    </div>
  );
};

export default Navigation;