// // File: src/components/tabs/PracticeTab.jsx
// import React, { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Input } from "@/components/ui/input";
// import { Pin, Lock, ArrowRight } from 'lucide-react';
// import QuizPlayerDemo from '../QuizPlayerDemo';
// import { useRouter } from 'next/navigation';

// // Dummy question data
// const dummyQuestion = {
//   id: 1,
//   question: "What is the primary function of a thermal imaging camera?",
//   options: [
//     "To measure room temperature",
//     "To detect heat signatures through smoke and darkness",
//     "To record fire incidents",
//     "To communicate with other firefighters"
//   ],
//   correctAnswer: 1,
//   explanation: "Thermal imaging cameras are primarily used to detect heat signatures through smoke and darkness, helping firefighters locate victims and identify fire sources."
// };

// const PracticeTab = ({ 
//   selectedExam, 
//   selectedSubject, 
//   setSelectedSubject, 
//   timeLeft,
//   handleTabChange
// }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [showAnswers, setShowAnswers] = useState(false);
//   const [pinnedQuestions, setPinnedQuestions] = useState([]);
//   const [useTimer, setUseTimer] = useState(false);
//   const [showQuizPlayer, setShowQuizPlayer] = useState(false);
//   const router = useRouter();

//   // Format time for display
//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//   };

//   // Get score color based on score value
//   const getScoreColor = (score) => {
//     if (score >= 80) return "text-green-600";
//     if (score >= 70) return "text-amber-500";
//     return "text-red-500";
//   };

//   // Get progress color based on progress value
//   const getProgressColor = (progress) => {
//     if (progress >= 80) return "bg-green-500";
//     if (progress >= 60) return "bg-amber-500";
//     return "bg-red-500";
//   };

//   if (showQuizPlayer) {
//     return <QuizPlayerDemo onExit={() => setShowQuizPlayer(false)} />;
//   }

//   if (selectedSubject && currentQuestion > 0) {
//     return (
//       <div className="flex flex-col h-[calc(100vh-180px)]">
//         {useTimer && (
//           <div className="text-xl font-medium mb-6">{formatTime(timeLeft)}</div>
//         )}
//         <Card className="flex-1 bg-white">
//           <CardContent className="p-8">
//             <div className="flex justify-between items-start mb-6">
//               <div className="flex items-center gap-4">
//                 <span className="text-2xl font-bold text-gray-400">
//                   {currentQuestion}/{10}
//                 </span>
//                 <p className="text-xl">{dummyQuestion.question}</p>
//               </div>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setPinnedQuestions(prev => 
//                   prev.includes(dummyQuestion.id) 
//                     ? prev.filter(id => id !== dummyQuestion.id)
//                     : [...prev, dummyQuestion.id]
//                 )}
//               >
//                 <Pin className={`h-6 w-6 ${
//                   pinnedQuestions.includes(dummyQuestion.id) 
//                     ? 'text-indigo-600 fill-indigo-600' 
//                     : ''
//                 }`} />
//               </Button>
//             </div>

//             <div className="space-y-4">
//               {dummyQuestion.options.map((option, idx) => (
//                 <Button
//                   key={idx}
//                   variant={selectedAnswer === idx ? 'default' : 'outline'}
//                   className={`w-full justify-start text-left p-4 text-lg ${
//                     showAnswers && selectedAnswer !== null
//                       ? idx === dummyQuestion.correctAnswer
//                         ? 'bg-green-50 border-green-500 text-green-700'
//                         : selectedAnswer === idx
//                         ? 'bg-red-100 border-red-300 text-red-900'
//                         : ''
//                       : ''
//                   }`}
//                   onClick={() => setSelectedAnswer(idx)}
//                 >
//                   {option}
//                 </Button>
//               ))}
//             </div>

//             {showAnswers && selectedAnswer !== null && (
//               <div className="mt-8 p-6 bg-gray-50 rounded-lg">
//                 <h3 className="text-lg font-medium mb-2">Explanation</h3>
//                 <p className="text-gray-700">{dummyQuestion.explanation}</p>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         <div className="flex justify-between items-center mt-6">
//           <Button 
//             variant="outline"
//             disabled={currentQuestion === 1}
//             onClick={() => setCurrentQuestion(prev => prev - 1)}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             onClick={() => setShowAnswers(!showAnswers)}
//           >
//             {showAnswers ? 'Hide Answer' : 'Show Answer'}
//           </Button>
//           <Button 
//             disabled={currentQuestion === 10}
//             onClick={() => setCurrentQuestion(prev => prev + 1)}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     );
//   }
  
//   if (selectedSubject) {
//     return (
//       <div className="space-y-6 mt-16">
//         <Card className="bg-white border border-gray-200">
//           <CardContent className="p-8">
//             <div className="flex justify-between mb-8">
//               <div>
//                 <div className="text-sm text-gray-500">Your Score</div>
//                 <div className={`text-2xl font-bold ${getScoreColor(selectedSubject.score)}`}>
//                   {selectedSubject.score}%
//                 </div>
//               </div>
//               <div>
//                 <div className="text-sm text-gray-500">Progress</div>
//                 <Progress value={selectedSubject.progress} className="w-32 mt-2" />
//               </div>
//             </div>
            
//             <Button 
//               className="w-full"
//               onClick={() => router.push('/quiz')}
//             >
//               {selectedSubject.lastQuestion ? 'Resume Practice' : 'Start Practice'}
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }
  
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-lg font-medium">Practice Questions</h2>
//         <Input 
//           type="search" 
//           placeholder="Search subjects..." 
//           className="w-64"
//         />
//       </div>

//       {!selectedExam ? (
//         <Alert>
//           <AlertDescription>
//             Please select an exam to practice.
//           </AlertDescription>
//         </Alert>
//       ) : (
//         <div className="space-y-4">
//           {selectedExam.subjects.map((subject, index) => (
//             <div 
//               key={subject.id}
//               onClick={() => index === 0 ? setSelectedSubject(subject) : null}
//               className="cursor-pointer"
//             >
//               {index === 0 ? (
//                 <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-indigo-500 transition-colors">
//                   <div className="flex justify-between items-center">
//                     <div className="flex-1">
//                       <h3 className="text-xl font-medium mb-3">{subject.name}</h3>
//                       <div className="flex items-center gap-6">
//                         <div>
//                           <span className="text-sm text-gray-500">Questions</span>
//                           <p className="font-medium">{subject.questions}</p>
//                         </div>
//                         <div>
//                           <span className="text-sm text-gray-500">Score</span>
//                           <p className={`font-medium ${
//                             subject.score < 60 ? 'text-red-600' :
//                             subject.score < 85 ? 'text-amber-600' :
//                             'text-green-600'
//                           }`}>
//                             {subject.score}%
//                           </p>
//                         </div>
//                       </div>
//                       <Progress 
//                         value={subject.progress} 
//                         className={`w-full mt-3 ${
//                           subject.progress < 60 ? 'bg-red-200' :
//                           subject.progress < 85 ? 'bg-amber-200' :
//                           'bg-green-200'
//                         }`}
//                       />
//                     </div>
//                     <ArrowRight className="h-6 w-6 text-gray-400" />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center p-4">
//                   <Lock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
//                   <p className="text-lg font-medium mb-2">Premium Content</p>
//                   <Button 
//                     onClick={() => handleTabChange('settings')}
//                     className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                   >
//                     Upgrade to Access
//                   </Button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PracticeTab;
// File: src/components/tabs/PracticeTab.jsx

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from "@/components/ui/input";
import { Pin, Lock, ArrowRight } from 'lucide-react';
import QuizPlayerDemo from '../QuizPlayerDemo';
import { useRouter } from 'next/navigation';

// Dummy question data
const dummyQuestion = {
  id: 1,
  question: "What is the primary function of a thermal imaging camera?",
  options: [
    "To measure room temperature",
    "To detect heat signatures through smoke and darkness",
    "To record fire incidents",
    "To communicate with other firefighters"
  ],
  correctAnswer: 1,
  explanation: "Thermal imaging cameras are primarily used to detect heat signatures through smoke and darkness, helping firefighters locate victims and identify fire sources."
};

const PracticeTab = ({
  selectedExam,
  selectedSubject,
  setSelectedSubject,
  timeLeft,
  handleTabChange
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [pinnedQuestions, setPinnedQuestions] = useState([]);
  const [useTimer, setUseTimer] = useState(false);
  const [showQuizPlayer, setShowQuizPlayer] = useState(false);
  const router = useRouter();

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Get score color based on score value
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 70) return "text-amber-500";
    return "text-red-500";
  };

  // Get progress color based on progress value
  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  if (showQuizPlayer) {
    return <QuizPlayerDemo onExit={() => setShowQuizPlayer(false)} />;
  }

  if (selectedSubject && currentQuestion > 0) {
    return (
      <div className="flex flex-col h-[calc(100vh-180px)]">
        {useTimer && (
          <div className="text-xl font-medium mb-6">{formatTime(timeLeft)}</div>
        )}
   
        <Card className="flex-1 bg-white">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-400">
                  {currentQuestion}/{10}
                </span>
                <p className="text-xl">{dummyQuestion.question}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPinnedQuestions(prev =>
                  prev.includes(dummyQuestion.id)
                    ? prev.filter(id => id !== dummyQuestion.id)
                    : [...prev, dummyQuestion.id]
                )}
              >
                <Pin className={`h-6 w-6 ${
                  pinnedQuestions.includes(dummyQuestion.id)
                    ? 'text-indigo-600 fill-indigo-600'
                    : ''
                }`} />
              </Button>
            </div>
            <div className="space-y-4">
              {dummyQuestion.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant={selectedAnswer === idx ? 'default' : 'outline'}
                  className={`w-full justify-start text-left p-4 text-lg ${
                    showAnswers && selectedAnswer !== null
                      ? idx === dummyQuestion.correctAnswer
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : selectedAnswer === idx
                          ? 'bg-red-100 border-red-300 text-red-900'
                          : ''
                      : ''
                  }`}
                  onClick={() => setSelectedAnswer(idx)}
                >
                  {option}
                </Button>
              ))}
            </div>
            {showAnswers && selectedAnswer !== null && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Explanation</h3>
                <p className="text-gray-700">{dummyQuestion.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            disabled={currentQuestion === 1}
            onClick={() => setCurrentQuestion(prev => prev - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowAnswers(!showAnswers)}
          >
            {showAnswers ? 'Hide Answer' : 'Show Answer'}
          </Button>
          <Button
            disabled={currentQuestion === 10}
            onClick={() => setCurrentQuestion(prev => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }

  if (selectedSubject) {
    return (
      <div className="space-y-6 mt-16">
           <br />
     
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-8">
            <div className="flex justify-between mb-8">
              <div>
                <div className="text-sm text-gray-500">Your Score</div>
                <div className={`text-2xl font-bold ${getScoreColor(selectedSubject.score)}`}>
                  {selectedSubject.score}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Progress</div>
                <Progress value={selectedSubject.progress} className="w-32 mt-2" />
              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => router.push('/quiz')}
            >
              {selectedSubject.lastQuestion ? 'Resume Practice' : 'Start Practice'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Practice Questions</h2>
        <Input
          type="search"
          placeholder="Search subjects..."
          className="w-64"
        />
      </div>
      {!selectedExam ? (
        <Alert>
          <AlertDescription>
            Please select an exam to practice.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-4">
          {selectedExam.subjects.map((subject, index) => (
            <Card key={subject.id} className="mb-4 border border-gray-200 hover:border-indigo-500 transition-colors">
              <CardContent className="p-6">
                {index === 0 ? (
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setSelectedSubject(subject)}>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium mb-3">{subject.name}</h3>
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-500">{subject.correct} of {subject.total} Correct</span>
                          <span className={`text-3xl font-bold ${
                            subject.score < 60 ? 'text-red-600' :
                            subject.score < 85 ? 'text-amber-600' :
                            'text-green-600'
                          }`}>
                            {subject.score}%
                          </span>
                        </div>
                        <Progress
                          value={subject.progress}
                          className="w-full h-2"
                        />
                      </div>
                    </div>
                    <ArrowRight className="h-6 w-6 text-gray-400 ml-4" />
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="text-xl font-medium mb-3">{subject.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Lock className="h-5 w-5 text-gray-400" />
                        <span className="text-lg font-medium">Premium Content</span>
                      </div>
                      <div className="mt-2">
                        <Button
                          onClick={() => handleTabChange('settings')}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                        >
                          Upgrade to Access
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PracticeTab;