// File: src/components/Header.jsx
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CreditCard, Plus, Sparkles } from 'lucide-react';

const Header = ({ activeTab, userExams, handleExamSelect, handleTabChange, loading, setShowAddExam }) => {
  return (
    <div className="w-full bg-white border-b border-gray-200 fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex-1 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-md px-2 py-1">
                S
              </span>
              <h1 className="text-xl font-bold hidden sm:block">Scoorly</h1>
            </div>
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <h2 className="text-base font-medium">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {userExams.length === 0 ? (
              <Button 
                onClick={() => setShowAddExam(true)}
                className="animate-pulse bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 flex items-center gap-2"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                <span>Add Exam</span>
                <Sparkles className="h-3 w-3 ml-1" />
              </Button>
            ) : (
              <Select 
                onValueChange={handleExamSelect}
                disabled={loading}
              >
                <SelectTrigger className="w-[120px] sm:w-[180px]">
                  <SelectValue 
                    placeholder={
                      loading ? "Loading..." : "Select Exam"
                    } 
                  />
                </SelectTrigger>
                <SelectContent className="max-h-80 overflow-y-auto">
                  <div className="sticky top-0 bg-white border-b border-gray-100 py-2 px-2 mb-1">
                    <Button 
                      onClick={() => {
                        // We need to close the dropdown first
                        document.body.click();
                        // Then open the add exam sheet
                        setTimeout(() => setShowAddExam(true), 100);
                      }}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center gap-2 py-1"
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add More Exams</span>
                    </Button>
                  </div>
                  
                  {userExams.map(exam => (
                    <SelectItem key={exam.id} value={exam.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{exam.name}</span>
                        {exam.isPremium && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                            Premium
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Button 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              onClick={() => handleTabChange('settings')}
            >
              <span className="hidden sm:inline">Upgrade</span>
              <CreditCard className="h-4 w-4 sm:inline-block sm:hidden" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;