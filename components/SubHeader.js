// File: src/components/SubHeader.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SubHeader = ({ title, onBack, showBack }) => (
  <div className="sticky top-16 bg-white border-b border-gray-200 z-40">
    <div className="container mx-auto px-4">
      <div className="flex items-center h-12">
        <div className="flex items-center gap-3">
          {showBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-8 w-8 p-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h2 className="text-base font-medium">{title}</h2>
        </div>
      </div>
    </div>
  </div>
);

export default SubHeader;