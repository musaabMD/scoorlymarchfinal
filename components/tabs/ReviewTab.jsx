// File: src/components/tabs/ReviewTab.jsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, BookmarkCheck, Lock } from 'lucide-react';

const ReviewTab = ({ 
  selectedExam, 
  searchQuery, 
  setSearchQuery, 
  filterBySearch, 
  demoContent,
  handleTabChange 
}) => {
  const [selectedFilter, setSelectedFilter] = useState('incorrect');

  // Set default filter if none selected
  useEffect(() => {
    if (!selectedFilter) {
      setSelectedFilter('correct');
    }
  }, [selectedFilter]);

  const getQuestionsByStatus = (status) => {
    switch(status) {
      case 'correct':
        return demoContent.reviewQuestions.correct;
      case 'incorrect':
        return demoContent.reviewQuestions.incorrect;
      case 'flagged':
        return demoContent.reviewQuestions.flagged;
      default:
        return [];
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'correct':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'incorrect':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'flagged':
        return <BookmarkCheck className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const renderQuestionList = () => {
    const questions = selectedFilter ? getQuestionsByStatus(selectedFilter) : [];
    const filteredQuestions = filterBySearch(questions, searchQuery);
    
    return filteredQuestions.map((question, index) => (
      <Card key={question.id} className="bg-white mb-3 border border-gray-200 hover:border-indigo-500 transition-colors">
        <CardContent className="p-4">
          {(index === 0 || (selectedFilter === 'correct' && index === 0)) && (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg mb-4">{question.question}</p>
                  <div className="space-y-3">
                    {['A', 'B', 'C', 'D'].map((option, idx) => (
                      <button
                        key={idx}
                        className={`w-full p-6 text-left rounded-lg border text-lg ${
                          idx === question.correctAnswer 
                            ? 'bg-green-50 border-green-500 text-green-700'
                            : idx === question.userAnswer
                            ? 'bg-red-50 border-red-500 text-red-700'
                            : 'border-gray-200'
                        } hover:border-gray-300 transition-colors`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-medium text-xl min-w-[30px]">{option}.</span>
                          <span className="flex-1">{question.answer}</span>
                          {idx === question.correctAnswer && (
                            <span className="text-green-600 font-medium">✓ Correct Answer</span>
                          )}
                          {idx === question.userAnswer && idx !== question.correctAnswer && (
                            <span className="text-red-600 font-medium">✗ Your Answer</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-medium text-blue-800">Your answer: {String.fromCharCode(65 + question.userAnswer)}</p>
                    <p className="font-medium text-green-800">Correct answer: {String.fromCharCode(65 + question.correctAnswer)}</p>
                  </div>
                </div>
                {getStatusIcon(question.status)}
              </div>
            </div>
          )}
          {!(index === 0 || (selectedFilter === 'correct' && index === 0)) && (
            <div className="text-center p-4">
              <Lock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-lg font-medium mb-2">Premium Content</p>
              <Button 
                onClick={() => handleTabChange('settings')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              >
                Upgrade to Access
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    ));
  };

  if (!selectedExam) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-medium mb-3">Review Your Progress</h2>
        <Alert>
          <AlertDescription>
            Please select an exam to review your progress.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Review Your Progress</h2>
        <Input 
          type="search" 
          placeholder="Search questions..." 
          className="w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Correct', count: 126, color: 'green' },
          { label: 'Incorrect', count: 48, color: 'red' },
          { label: 'Flagged', count: 23, color: 'amber' }
        ].map(item => (
          <Card 
            key={item.label}
            className={`bg-${item.color}-50 cursor-pointer ${
              selectedFilter === item.label.toLowerCase() ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
            }`}
            onClick={() => setSelectedFilter(item.label.toLowerCase())}
          >
            <CardContent className="p-4">
              <h3 className={`font-medium text-${item.color}-700`}>{item.label}</h3>
              <p className={`text-2xl font-bold text-${item.color}-700`}>{item.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="space-y-4">
        {renderQuestionList()}
      </div>
    </div>
  );
};

export default ReviewTab;