import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, BookOpen, Dumbbell, PlusCircle, BarChart, Clock } from 'lucide-react';
import { useAuth } from '@/app/hooks/useAuth';

const HomeTab = ({ 
  userExams, 
  selectedExam, 
  handleExamSelect, 
  setShowAddExam, 
  handleTabChange,
  loading 
}) => {
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name || 
                  user?.user_metadata?.name || 
                  user?.email?.split('@')[0] || 
                  'Student';

  // Time of day greeting with emoji
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning 🌅';
    if (hour < 18) return 'Good afternoon ☀️';
    return 'Good evening 🌙';
  };

  // Get current date in a nice format
  const getCurrentDate = () => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  // Calculate progress stats (mock data - replace with real stats)
  const stats = {
    cardsReviewed: 124,
    questionsAnswered: 78,
    studyTimeMinutes: 342,
    studyStreak: 7
  };

  // Generate exam selection options
  const renderExamSelector = () => {
    if (loading) {
      return (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      );
    }

    if (userExams.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You don't have any exams yet</p>
          <Button 
            onClick={() => setShowAddExam(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Your First Exam
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {userExams.map(exam => (
          <Card 
            key={exam.id} 
            className={`cursor-pointer hover:border-indigo-300 transition-all ${
              selectedExam?.id === exam.id ? 'border-indigo-600 bg-indigo-50' : ''
            }`}
            onClick={() => handleExamSelect(exam.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{exam.name}</CardTitle>
              <CardDescription>
                {exam.subjectCount || 0} subjects • {exam.topicCount || 0} topics
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-indigo-600 rounded-full"
                  style={{ width: `${exam.progress || 0}%` }}
                ></div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-between">
              <span className="text-sm text-gray-500">{exam.progress || 0}% complete</span>
              {selectedExam?.id === exam.id && (
                <Check className="h-4 w-4 text-indigo-600" />
              )}
            </CardFooter>
          </Card>
        ))}

        <Card 
          className="cursor-pointer hover:border-indigo-300 border-dashed border-2 flex flex-col items-center justify-center p-4"
          onClick={() => setShowAddExam(true)}
        >
          <PlusCircle className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-gray-500">Add New Exam</p>
        </Card>
      </div>
    );
  };

  // Quick action buttons
  const renderQuickActions = () => {
    if (!selectedExam) return null;

    return (
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="flex items-center justify-center p-6 border-2 h-auto"
            onClick={() => handleTabChange('learn')}
          >
            <div className="flex flex-col items-center">
              <BookOpen className="h-6 w-6 text-indigo-600 mb-2" />
              <span>Continue Learning</span>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center p-6 border-2 h-auto"
            onClick={() => handleTabChange('practice')}
          >
            <div className="flex flex-col items-center">
              <Dumbbell className="h-6 w-6 text-indigo-600 mb-2" />
              <span>Daily Practice</span>
            </div>
          </Button>
        </div>
      </div>
    );
  };

  // Stats section
  const renderStats = () => {
    if (!selectedExam) return null;

    return (
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Your Progress</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 flex items-center">
              <BarChart className="h-8 w-8 text-indigo-600 mr-3" />
              <div>
                <p className="text-2xl font-semibold">{stats.cardsReviewed}</p>
                <p className="text-xs text-gray-500">Cards Reviewed</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <Clock className="h-8 w-8 text-indigo-600 mr-3" />
              <div>
                <p className="text-2xl font-semibold">{stats.studyTimeMinutes}</p>
                <p className="text-xs text-gray-500">Study Minutes</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-8">
      {/* Greeting section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">{getGreeting()}, {userName.split(' ')[0]}!</h1>
        <p className="text-gray-500">{getCurrentDate()}</p>
      </div>

      {/* Exam selector section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Your Exams</h2>
        {renderExamSelector()}
      </div>

      {/* Quick actions section */}
      {renderQuickActions()}

      {/* Stats section */}
      {renderStats()}
    </div>
  );
};

export default HomeTab;