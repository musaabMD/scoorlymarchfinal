// File: src/components/ContentContainer.jsx
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContentContainer = ({ 
  children, 
  title,
  showBackButton = false,
  onBack,
  actions = null,
  isLoading = false
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Header with title and actions */}
      {(title || actions || showBackButton) && (
        <div className="border-b border-gray-200 p-4 flex items-center justify-between sticky top-16 bg-white z-30">
          <div className="flex items-center gap-2">
            {showBackButton && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 mr-1" 
                onClick={onBack}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            {title && <h2 className="text-lg font-medium">{title}</h2>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      
      {/* Content area */}
      <div className="p-4 sm:p-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-indigo-600 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default ContentContainer;