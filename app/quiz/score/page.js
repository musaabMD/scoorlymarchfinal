'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/libs/supabase/client';
import { CheckCircle, XCircle, Home, RotateCcw } from 'lucide-react';

export default function ScorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const examId = searchParams.get('examId');
  const subjectId = searchParams.get('subjectId');
  const mode = searchParams.get('mode') || 'practice';
  const score = searchParams.get('score');
  const total = searchParams.get('total');
  const correct = searchParams.get('correct');
  const duration = searchParams.get('duration');
  
  const [session, setSession] = useState(null);
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = createClient();
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // If we have a sessionId, load from database
        if (sessionId) {
          const { data, error } = await supabase
            .from('user_sessions')
            .select('*, exams(name)')
            .eq('id', sessionId)
            .single();
            
          if (error) throw error;
          
          setSession(data);
          
          // Get exam data
          const { data: examData, error: examError } = await supabase
            .from('exams')
            .select('*')
            .eq('id', data.exam_id)
            .single();
            
          if (examError) throw examError;
          
          setExamData(examData);
        } 
        // Otherwise use URL parameters
        else if (examId) {
          // Get exam data
          const { data: examData, error: examError } = await supabase
            .from('exams')
            .select('*')
            .eq('id', examId)
            .single();
            
          if (examError) throw examError;
          
          setExamData(examData);
          
          // Create dummy session for display
          setSession({
            exam_id: examId,
            subject: subjectId,
            session_type: mode,
            score_percentage: parseFloat(score || 0),
            total_questions: parseInt(total || 0),
            correct_answers: parseInt(correct || 0),
            duration_seconds: parseInt(duration || 0)
          });
        } else {
          throw new Error('No session data available');
        }
      } catch (error) {
        console.error('Error loading session data:', error);
        setError('Failed to load results. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [sessionId, examId, subjectId, mode, score, total, correct, duration]);
  
  // Format duration
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };
  
  // Get score color
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 70) return "text-amber-500";
    return "text-red-500";
  };
  
  // Go back to practice or try again
  const handleTryAgain = () => {
    if (session.session_type === 'mock') {
      router.push(`/quiz?examId=${session.exam_id}&mode=mock`);
    } else {
      router.push(`/quiz?examId=${session.exam_id}&subjectId=${encodeURIComponent(session.subject)}&mode=practice`);
    }
  };
  
  // Go to home page
  const handleGoHome = () => {
    router.push('/');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-b-blue-300 border-l-blue-300 border-r-blue-300 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }
  
  if (error || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error || 'No session data available'}</p>
          <button 
            onClick={() => router.push('/')}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Quiz Results</h1>
            <p className="text-gray-600">
              {examData?.name || 'Exam'} - {session.session_type === 'mock' ? 'Mock Exam' : 'Practice Session'}
              {session.subject && ` - ${session.subject}`}
            </p>
          </div>
          
          <div className="flex justify-center items-center mb-8">
            <div className="w-48 h-48 rounded-full flex items-center justify-center bg-gray-100 relative">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(session.score_percentage)}`}>
                  {Math.round(session.score_percentage)}%
                </div>
                <div className="text-gray-600 mt-2">
                  {session.correct_answers} / {session.total_questions}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Duration:</span>
              <span>{formatDuration(session.duration_seconds)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Questions:</span>
              <span>{session.total_questions}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Correct Answers:</span>
              <span className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                {session.correct_answers}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Incorrect Answers:</span>
              <span className="flex items-center">
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                {session.total_questions - session.correct_answers}
              </span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={handleGoHome}
              className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-md flex items-center justify-center gap-2 hover:bg-gray-300"
            >
              <Home className="h-5 w-5" />
              Home
            </button>
            
            <button 
              onClick={handleTryAgain}
              className="flex-1 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              <RotateCcw className="h-5 w-5" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 