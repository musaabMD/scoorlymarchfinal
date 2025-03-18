'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import QuizPlayerDemo from '@/components/QuizPlayerDemo';
import { createClient } from '@/libs/supabase/client';

export default function QuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  
  // Get parameters from URL
  const examId = searchParams.get('examId');
  const subjectId = searchParams.get('subjectId');
  const mode = searchParams.get('mode') || 'practice'; // 'practice' or 'mock'
  
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  
  // Load questions based on parameters
  useEffect(() => {
    const loadQuestions = async () => {
      if (!examId) {
        router.push('/');
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        let query;
        
        if (mode === 'mock') {
          // For mock: fetch up to 100 questions for the exam
          query = supabase
            .from('questions')
            .select('*')
            .eq('exam_id', examId)
            .eq('is_active', true)
            .limit(100); // Mock exam size
        } else {
          // For practice: fetch questions for specific subject
          query = supabase
            .from('questions')
            .select('*')
            .eq('exam_id', examId)
            .eq('is_active', true);
            
          if (subjectId) {
            query = query.eq('subject', subjectId);
          }
          
          query = query.limit(50); // Practice session size
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        if (!data || data.length === 0) {
          setError('No questions found for this exam/subject');
          setLoading(false);
          return;
        }
        
        // Transform data for quiz player
        const formattedQuestions = data.map(q => ({
          id: q.id,
          question_text: q.text || q.question_text,
          option_a: q.option_a,
          option_b: q.option_b,
          option_c: q.option_c,
          option_d: q.option_d,
          option_e: q.option_e,
          correct_choice: q.correct_answer,
          rationale: q.explanation
        }));
        
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error('Error loading questions:', error);
        setError('Failed to load questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadQuestions();
  }, [examId, subjectId, mode, router]);
  
  // Handle session completion
  const handleComplete = async (results) => {
    try {
      // Save results to database if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('user_sessions')
          .insert({
            user_id: user.id,
            exam_id: examId,
            subject: subjectId || null,
            session_type: mode,
            start_time: results.startTime,
            end_time: new Date().toISOString(),
            duration_seconds: results.durationSeconds,
            total_questions: results.totalQuestions,
            correct_answers: results.correctAnswers,
            score_percentage: results.scorePercentage,
            is_completed: true,
            answers_data: results.answersData
          })
          .select()
          .single();
          
        if (error) throw error;
        
        // Redirect to score page with session ID
        router.push(`/quiz/score?sessionId=${data.id}`);
      } else {
        // For guests, use URL parameters
        router.push(`/quiz/score?examId=${examId}&mode=${mode}${subjectId ? `&subjectId=${encodeURIComponent(subjectId)}` : ''}&score=${results.scorePercentage}&total=${results.totalQuestions}&correct=${results.correctAnswers}&duration=${results.durationSeconds}`);
      }
    } catch (error) {
      console.error('Error saving session:', error);
      router.push('/');
    }
  };
  
  // Handle exiting without completing
  const handleExit = async () => {
    router.push('/');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-b-blue-300 border-l-blue-300 border-r-blue-300 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
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
  
  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-amber-600 mb-4">No Questions Found</h2>
          <p className="text-gray-700 mb-6">There are no questions available for this exam or subject.</p>
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
    <QuizPlayerDemo 
      questions={questions}
      mode={mode}
      examId={examId}
      subjectId={subjectId}
      onComplete={handleComplete}
      onExit={handleExit}
    />
  );
}
