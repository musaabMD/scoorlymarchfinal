// File: src/components/tabs/MockTab.jsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuizPlayerDemo from '../QuizPlayerDemo';
import { useRouter } from 'next/navigation';

const MockTab = ({ selectedExam }) => {
  const [showQuizPlayer, setShowQuizPlayer] = useState(false);
  const router = useRouter();

  if (showQuizPlayer) {
    return <QuizPlayerDemo onExit={() => setShowQuizPlayer(false)} />;
  }

  // Get score color based on score value
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 70) return "text-amber-500";
    return "text-red-500";
  };

  const lastAttempts = [
    { date: '2024-03-10', score: 72, total: 200, time: '1h 45m' },
    { date: '2024-03-08', score: 68, total: 200, time: '1h 52m' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Mock Exam</h2>
      
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Exam Format</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Questions:</span>
                <span className="font-medium">{Math.floor(selectedExam?.questions * 0.2 || 100)}</span>
              </div>
              <div className="flex justify-between">
                <span>Time Limit:</span>
                <span className="font-medium">2 hours</span>
              </div>
              <div className="flex justify-between">
                <span>Passing Score:</span>
                <span className="font-medium">75%</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Recent Attempts</h3>
            <div className="space-y-4">
              {lastAttempts.map((attempt, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">{attempt.date}</p>
                    <p className="font-medium">{attempt.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${getScoreColor(attempt.score)}`}>
                      {attempt.score}%
                    </p>
                    <p className="text-sm text-gray-500">{attempt.total} questions</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button 
            className="w-full mt-6"
            onClick={() => router.push('/quiz')}
          >
            Begin Mock Exam
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MockTab;