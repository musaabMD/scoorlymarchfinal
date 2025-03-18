// 'use client'
// import React, { useState, useEffect } from 'react';
// import { 
//   Card, 
//   CardContent 
// } from '@/components/ui/card';
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from '@/components/ui/select';
// import { 
//   Alert,
//   AlertDescription
// } from '@/components/ui/alert';
// import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
// import { 
//   Clock, 
//   BookOpen, 
//   BookmarkCheck, 
//   XCircle, 
//   CheckCircle, 
//   Brain,
//   ArrowUpRight,
//   CreditCard,
//   Settings,
//   ArrowLeft,
//   Pin,
//   Lock,
//   Plus
// } from 'lucide-react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Input } from "@/components/ui/input";
// import { Pagination } from "@/components/ui/pagination";

// // Add this dummy question data
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

// // Add demo exam to initial state
// const initialExams = [
//   {
//     id: 'demo1',
//     name: 'Demo Exam',
//     isPremium: false,
//     questions: 100,
//     subjects: [
//       { id: 1, name: 'Sample Topic 1', questions: 25, progress: 40, score: 75 },
//       { id: 2, name: 'Sample Topic 2', questions: 25, progress: 0, score: 0 },
//       { id: 3, name: 'Sample Topic 3', questions: 25, progress: 0, score: 0 },
//       { id: 4, name: 'Sample Topic 4', questions: 25, progress: 0, score: 0 }
//     ]
//   }
// ];

// // Update the demoContent structure with complete data
// const demoContent = {
//   subjects: [
//     {
//       id: 1,
//       name: 'Medical Assessment',
//       questions: 25,
//       concepts: [
//         { id: 1, title: 'Primary Survey', content: 'The primary survey follows the ABCDE approach...' },
//         { id: 2, title: 'Secondary Survey', content: 'The secondary survey involves a head-to-toe examination...' },
//         { id: 3, title: 'Patient History', content: 'Gathering a complete SAMPLE history...' }
//       ]
//     }
//   ],
//   reviewQuestions: {
//     correct: [
//       { id: 1, question: 'What is the normal respiratory rate for adults?', answer: '12-20 breaths per minute', status: 'correct' },
//       { id: 2, question: 'What is the normal heart rate for adults?', answer: '60-100 beats per minute', status: 'correct' }
//     ],
//     incorrect: [
//       { id: 3, question: 'Which position is best for unconscious breathing patients?', answer: 'Recovery position', status: 'incorrect' },
//       { id: 4, question: 'What is the first step in CPR?', answer: 'Check scene safety', status: 'incorrect' }
//     ],
//     flagged: [
//       { id: 5, question: 'List the signs of shock', answer: 'Pale, cold, clammy skin; rapid breathing; anxiety', status: 'flagged' },
//       { id: 6, question: 'What are the components of SAMPLE history?', answer: 'Signs/Symptoms, Allergies, Medications, Past medical history, Last oral intake, Events leading to injury/illness', status: 'flagged' }
//     ]
//   }
// };

// const MobileExamApp = () => {
//   // Move state declarations to the top level
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [demoData, setDemoData] = useState(demoContent);

//   // Sample data - in a real app, this would come from an API or database
//   const exams = [
//     {
//       id: 1,
//       name: 'Firefighter I & II',
//       questions: 1000,
//       subjects: [
//         { id: 1, name: 'Fire Behavior', questions: 250, progress: 75, score: 82 },
//         { id: 2, name: 'Rescue Operations', questions: 300, progress: 60, score: 78 },
//         { id: 3, name: 'Hazardous Materials', questions: 200, progress: 40, score: 65 },
//         { id: 4, name: 'Fire Prevention', questions: 250, progress: 90, score: 88 }
//       ]
//     },
//     {
//       id: 2,
//       name: 'IBSC CCP-C®',
//       questions: 400,
//       subjects: [
//         { id: 1, name: 'Medical Assessment', questions: 100, progress: 85, score: 79 },
//         { id: 2, name: 'Airway Management', questions: 120, progress: 70, score: 81 },
//         { id: 3, name: 'Trauma Care', questions: 100, progress: 55, score: 72 },
//         { id: 4, name: 'Critical Care', questions: 80, progress: 30, score: 68 }
//       ]
//     },
//     // Other exams...
//   ];

//   // Initialize user exams with demo
//   const [userExams, setUserExams] = useState(initialExams);

//   // State management
//   const [selectedExam, setSelectedExam] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
//   const [activeTab, setActiveTab] = useState('learn'); // 'learn', 'practice', 'review', 'mock', 'settings'
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [selectedConcept, setSelectedConcept] = useState(null);
//   const [reviewTab, setReviewTab] = useState('incorrect'); // 'correct', 'incorrect', 'bookmarked'
//   const [showAnswers, setShowAnswers] = useState(false);
//   const [useTimer, setUseTimer] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [showExplanation, setShowExplanation] = useState(false);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [pinnedQuestions, setPinnedQuestions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const questionsPerPage = 10;
//   const [selectedFilter, setSelectedFilter] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [navigationHistory, setNavigationHistory] = useState([]);
//   const [showAddExam, setShowAddExam] = useState(false);

//   // Add available exams data
//   const availableExams = {
//     medical: [
//       { id: 'med1', name: 'IBSC CCP-C®', questions: 400, price: 49 },
//       { id: 'med2', name: 'FP-C®', questions: 350, price: 49 },
//       { id: 'med3', name: 'CFRN®', questions: 300, price: 49 }
//     ],
//     fire: [
//       { id: 'fire1', name: 'Firefighter I & II', questions: 1000, price: 49 },
//       { id: 'fire2', name: 'Fire Officer', questions: 800, price: 49 },
//       { id: 'fire3', name: 'Hazmat', questions: 500, price: 49 }
//     ]
//   };

//   // Add this helper function to create a new exam structure
//   const createExamStructure = (examData) => ({
//     id: examData.id,
//     name: examData.name,
//     isPremium: true,
//     questions: examData.questions,
//     subjects: [
//       { id: 1, name: 'Topic 1', questions: Math.floor(examData.questions * 0.25), progress: 0, score: 0 },
//       { id: 2, name: 'Topic 2', questions: Math.floor(examData.questions * 0.25), progress: 0, score: 0 },
//       { id: 3, name: 'Topic 3', questions: Math.floor(examData.questions * 0.25), progress: 0, score: 0 },
//       { id: 4, name: 'Topic 4', questions: Math.floor(examData.questions * 0.25), progress: 0, score: 0 }
//     ]
//   });

//   // Handle exam selection
//   const handleExamSelect = (value) => {
//     const exam = userExams.find(e => e.id === value);
//     setSelectedExam(exam);
//     setSelectedSubject(null);
//     setSelectedConcept(null);
//   };

//   // Handle tab navigation
//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setSelectedSubject(null);
//     setSelectedConcept(null);
//   };

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

//   // Timer effect 
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Update the filterBySearch function
//   const filterBySearch = (items, query) => {
//     if (!query || !items) return items;
//     const searchTerm = query.toLowerCase();
//     return items.filter(item => {
//       const searchableText = [
//         item.name,
//         item.title,
//         item.content,
//         item.question,
//         item.answer,
//         item.explanation
//       ].filter(Boolean).join(' ').toLowerCase();
      
//       return searchableText.includes(searchTerm);
//     });
//   };

//   // Add navigation handler
//   const handleNavigation = (path) => {
//     if (path === 'back') {
//       const prevPath = navigationHistory[navigationHistory.length - 2];
//       setNavigationHistory(prev => prev.slice(0, -1));
//       // Handle back navigation based on current state
//       if (selectedSubject) {
//         setSelectedSubject(null);
//       } else {
//         handleTabChange(prevPath || 'learn');
//       }
//     } else {
//       setNavigationHistory(prev => [...prev, path]);
//       handleTabChange(path);
//     }
//   };

//   // Add exam selector sheet component
//   const ExamSelectorSheet = () => (
//     <Sheet open={showAddExam} onOpenChange={setShowAddExam}>
//       <SheetContent className="w-full sm:max-w-md">
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-medium">Add New Exam</h3>
//             <Button variant="ghost" onClick={() => setShowAddExam(false)}>
//               <XCircle className="h-5 w-5" />
//             </Button>
//           </div>

//           {Object.entries(availableExams).map(([category, exams]) => (
//             <div key={category} className="space-y-3">
//               <h4 className="font-medium capitalize">{category}</h4>
//               {exams.map(exam => (
//                 <Card key={exam.id} className="bg-white">
//                   <CardContent className="p-4">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="font-medium">{exam.name}</p>
//                         <p className="text-sm text-gray-500">{exam.questions} questions</p>
//                       </div>
//                       <Button
//                         onClick={() => handleTabChange('settings')}
//                         className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                       >
//                         ${exam.price}
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           ))}
//         </div>
//       </SheetContent>
//     </Sheet>
//   );

//   // LEARN TAB
//   const renderLearnTab = () => {
//     if (selectedSubject) {
//       const subject = selectedExam?.subjects.find(s => s.id === selectedSubject.id) || selectedSubject;
//       const concepts = demoContent.subjects[0].concepts;
//       const filteredCards = filterBySearch(concepts, searchQuery);
//       const isFirstTopic = selectedSubject.id === selectedExam?.subjects[0].id;

//       return (
//         <div className="space-y-6">
//           <Input 
//             type="search" 
//             placeholder="Search cards..." 
//             className="w-full text-lg mb-6"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
          
//           <div className="space-y-4">
//             {isFirstTopic ? (
//               // Show all cards for first topic
//               filteredCards.map((card) => (
//                 <Card key={card.id} className="bg-white w-full border border-gray-200">
//                   <CardContent className="p-6">
//                     <div className="flex items-center gap-4">
//                       <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold">
//                         {card.id}
//                       </span>
//                       <div>
//                         <p className="text-xl">{card.title}</p>
//                         <p className="mt-4 text-gray-700">{card.content}</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))
//             ) : (
//               // Show lock for other topics
//               <div className="text-center p-4">
//                 <Lock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
//                 <p className="text-lg font-medium mb-2">Premium Content</p>
//                 <Button 
//                   onClick={() => handleTabChange('settings')}
//                   className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                 >
//                   Upgrade to Access
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       );
//     }
    
//     // Topics view - show selected exam subjects
//     const subjects = selectedExam?.subjects || [];
//     const filteredSubjects = filterBySearch(subjects, searchQuery);

//     return (
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-medium">Topics</h2>
//           <Input 
//             type="search" 
//             placeholder="Search topics..." 
//             className="w-64"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         {!selectedExam ? (
//           <Alert>
//             <AlertDescription>
//               Please select an exam to view topics.
//             </AlertDescription>
//           </Alert>
//         ) : (
//           <div className="space-y-4">
//             {filteredSubjects.map((subject, index) => (
//               <Card 
//                 key={subject.id} 
//                 className="bg-white cursor-pointer border border-gray-200 hover:border-indigo-500 transition-colors"
//                 onClick={() => index === 0 ? setSelectedSubject(subject) : null}
//               >
//                 <CardContent className="p-6">
//                   {index === 0 ? (
//                     // Free content
//                     <div className="flex items-center gap-4">
//                       <span className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xl">
//                         {index + 1}
//                       </span>
//                       <div>
//                         <h3 className="text-xl font-medium mb-2">{subject.name}</h3>
//                         <p className="text-gray-500">{subject.questions} cards</p>
//                       </div>
//                     </div>
//                   ) : (
//                     // Locked content
//                     <div className="text-center p-4">
//                       <Lock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
//                       <p className="text-lg font-medium mb-2">Premium Content</p>
//                       <Button 
//                         onClick={() => handleTabChange('settings')}
//                         className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                       >
//                         Upgrade to Access
//                       </Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // PRACTICE TAB
//   const renderPracticeTab = () => {
//     if (selectedSubject && currentQuestion > 0) {
//       return (
//         <div className="flex flex-col h-[calc(100vh-180px)]">
//           {useTimer && (
//             <div className="text-xl font-medium mb-6">{formatTime(timeLeft)}</div>
//           )}
//           <Card className="flex-1 bg-white">
//             <CardContent className="p-8">
//               <div className="flex justify-between items-start mb-6">
//                 <div className="flex items-center gap-4">
//                   <span className="text-2xl font-bold text-gray-400">
//                     {currentQuestion}/{10}
//                   </span>
//                   <p className="text-xl">{dummyQuestion.question}</p>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => setPinnedQuestions(prev => 
//                     prev.includes(dummyQuestion.id) 
//                       ? prev.filter(id => id !== dummyQuestion.id)
//                       : [...prev, dummyQuestion.id]
//                   )}
//                 >
//                   <Pin className={`h-6 w-6 ${
//                     pinnedQuestions.includes(dummyQuestion.id) 
//                       ? 'text-indigo-600 fill-indigo-600' 
//                       : ''
//                   }`} />
//                 </Button>
//               </div>

//               <div className="space-y-4">
//                 {dummyQuestion.options.map((option, idx) => (
//                   <Button
//                     key={idx}
//                     variant={selectedAnswer === idx ? 'default' : 'outline'}
//                     className={`w-full justify-start text-left p-4 text-lg ${
//                       showAnswers && selectedAnswer !== null
//                         ? idx === dummyQuestion.correctAnswer
//                           ? 'bg-green-50 border-green-500 text-green-700'
//                           : selectedAnswer === idx
//                           ? 'bg-red-100 border-red-300 text-red-900'
//                           : ''
//                         : ''
//                     }`}
//                     onClick={() => setSelectedAnswer(idx)}
//                   >
//                     {option}
//                   </Button>
//                 ))}
//               </div>

//               {showAnswers && selectedAnswer !== null && (
//                 <div className="mt-8 p-6 bg-gray-50 rounded-lg">
//                   <h3 className="text-lg font-medium mb-2">Explanation</h3>
//                   <p className="text-gray-700">{dummyQuestion.explanation}</p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           <div className="flex justify-between items-center mt-6">
//             <Button 
//               variant="outline"
//               disabled={currentQuestion === 1}
//               onClick={() => setCurrentQuestion(prev => prev - 1)}
//             >
//               Previous
//             </Button>
//             <Button 
//               disabled={currentQuestion === 10}
//               onClick={() => setCurrentQuestion(prev => prev + 1)}
//             >
//               Next
//             </Button>
//           </div>
//         </div>
//       );
//     }
    
//     if (selectedSubject) {
//       return (
//         <div className="space-y-6">
//           <Card className="bg-white border border-gray-200">
//             <CardContent className="p-8">
//               <div className="flex justify-between mb-8">
//                 <div>
//                   <div className="text-sm text-gray-500">Your Score</div>
//                   <div className={`text-2xl font-bold ${getScoreColor(selectedSubject.score)}`}>
//                     {selectedSubject.score}%
//                   </div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-500">Progress</div>
//                   <Progress value={selectedSubject.progress} className="w-32 mt-2" />
//                 </div>
//               </div>
              
//               <Button 
//                 className="w-full"
//                 onClick={() => setCurrentQuestion(selectedSubject.lastQuestion || 1)}
//               >
//                 {selectedSubject.lastQuestion ? 'Resume Practice' : 'Start Practice'}
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       );
//     }
    
//     return (
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-medium">Practice by Subject</h2>
//           <Input 
//             type="search" 
//             placeholder="Search subjects..." 
//             className="w-64"
//           />
//         </div>

//         {!selectedExam ? (
//           <Alert>
//             <AlertDescription>
//               Please select an exam to practice.
//             </AlertDescription>
//           </Alert>
//         ) : (
//           <div className="space-y-4">
//             {selectedExam.subjects.map((subject, index) => (
//               <Card 
//                 key={subject.id} 
//                 className="bg-white cursor-pointer hover:shadow-lg transition-shadow"
//                 onClick={() => index === 0 ? setSelectedSubject(subject) : null}
//               >
//                 <CardContent className="p-6">
//                   {index === 0 ? (
//                     // Free content
//                     <div className="flex items-center gap-4 mb-4">
//                       <span className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xl">
//                         {index + 1}
//                       </span>
//                       <div>
//                         <h3 className="text-xl font-medium mb-2">{subject.name}</h3>
//                         <p className="text-gray-500">{subject.questions} cards</p>
//                       </div>
//                     </div>
//                   ) : (
//                     // Locked content
//                     <div className="text-center p-4">
//                       <Lock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
//                       <p className="text-lg font-medium mb-2">Premium Content</p>
//                       <Button 
//                         onClick={() => handleTabChange('settings')}
//                         className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                       >
//                         Upgrade to Access
//                       </Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // REVIEW TAB
//   const renderReviewTab = () => {
//     const getQuestionsByStatus = (status) => {
//       switch(status) {
//         case 'correct':
//           return demoContent.reviewQuestions.correct;
//         case 'incorrect':
//           return demoContent.reviewQuestions.incorrect;
//         case 'flagged':
//           return demoContent.reviewQuestions.flagged;
//         default:
//           return [];
//       }
//     };

//     const getStatusIcon = (status) => {
//       switch(status) {
//         case 'correct':
//           return <CheckCircle className="h-5 w-5 text-green-600" />;
//         case 'incorrect':
//           return <XCircle className="h-5 w-5 text-red-600" />;
//         case 'flagged':
//           return <BookmarkCheck className="h-5 w-5 text-amber-600" />;
//         default:
//           return null;
//       }
//     };

//     // Move this useEffect to the component level (near other useEffects)
//     useEffect(() => {
//       if (!selectedFilter) {
//         setSelectedFilter('correct');
//       }
//     }, []);

//     const renderQuestionList = () => {
//       const questions = selectedFilter ? getQuestionsByStatus(selectedFilter) : [];
//       const filteredQuestions = filterBySearch(questions, searchQuery);
      
//       return filteredQuestions.map((question, index) => (
//         <Card key={question.id} className="bg-white mb-3 border border-gray-200 hover:border-indigo-500 transition-colors">
//           <CardContent className="p-4">
//             {(index === 0 || selectedFilter === 'correct') && (
//               <div className="flex items-start justify-between gap-4">
//                 <div>
//                   <p className="text-lg mb-2">{question.question}</p>
//                   <p className="text-gray-600">{question.answer}</p>
//                 </div>
//                 {getStatusIcon(question.status)}
//               </div>
//             )}
//             {!(index === 0 || selectedFilter === 'correct') && (
//               <div className="text-center p-4">
//                 <Lock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
//                 <p className="text-lg font-medium mb-2">Premium Content</p>
//                 <Button 
//                   onClick={() => handleTabChange('settings')}
//                   className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                 >
//                   Upgrade to Access
//                 </Button>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       ));
//     };

//     if (!selectedExam) {
//       return (
//         <div className="space-y-4">
//           <h2 className="text-lg font-medium mb-3">Review Your Progress</h2>
//           <Alert>
//             <AlertDescription>
//               Please select an exam to review your progress.
//             </AlertDescription>
//           </Alert>
//         </div>
//       );
//     }
    
//     return (
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-medium">Review Your Progress</h2>
//           <Input 
//             type="search" 
//             placeholder="Search questions..." 
//             className="w-64"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <div className="grid grid-cols-3 gap-4 mb-6">
//           {[
//             { label: 'Correct', count: 126, color: 'green' },
//             { label: 'Incorrect', count: 48, color: 'red' },
//             { label: 'Flagged', count: 23, color: 'amber' }
//           ].map(item => (
//             <Card 
//               key={item.label}
//               className={`bg-${item.color}-50 cursor-pointer ${
//                 selectedFilter === item.label.toLowerCase() ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
//               }`}
//               onClick={() => setSelectedFilter(item.label.toLowerCase())}
//             >
//               <CardContent className="p-4">
//                 <h3 className={`font-medium text-${item.color}-700`}>{item.label}</h3>
//                 <p className={`text-2xl font-bold text-${item.color}-700`}>{item.count}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
        
//         <div className="space-y-4">
//           {renderQuestionList()}
//         </div>
//       </div>
//     );
//   };

//   // MOCK TAB
//   const renderMockTab = () => {
//     const lastAttempts = [
//       { date: '2024-03-10', score: 72, total: 200, time: '1h 45m' },
//       { date: '2024-03-08', score: 68, total: 200, time: '1h 52m' },
//     ];

//     return (
//       <div className="space-y-6">
//         <h2 className="text-lg font-medium">Mock Exam</h2>
        
//         <Card className="bg-white">
//           <CardContent className="p-6">
//             <div className="mb-6">
//               <h3 className="text-lg font-medium mb-4">Exam Format</h3>
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span>Questions:</span>
//                   <span className="font-medium">{Math.floor(selectedExam?.questions * 0.2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Time Limit:</span>
//                   <span className="font-medium">2 hours</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Passing Score:</span>
//                   <span className="font-medium">75%</span>
//                 </div>
//               </div>
//             </div>

//             <div className="border-t pt-6">
//               <h3 className="text-lg font-medium mb-4">Recent Attempts</h3>
//               <div className="space-y-4">
//                 {lastAttempts.map((attempt, index) => (
//                   <div key={index} className="flex justify-between items-center">
//                     <div>
//                       <p className="text-sm text-gray-500">{attempt.date}</p>
//                       <p className="font-medium">{attempt.time}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className={`text-lg font-bold ${getScoreColor(attempt.score)}`}>
//                         {attempt.score}%
//                       </p>
//                       <p className="text-sm text-gray-500">{attempt.total} questions</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <Button className="w-full mt-6">Begin Mock Exam</Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   };

//   // SETTINGS TAB
//   const renderSettingsTab = () => {
//     // Update handleGetAccess function
//     const handleGetAccess = (exam) => {
//       const newExam = createExamStructure(exam);
//       setUserExams(prev => [...prev, newExam]);
//       // Just add to dropdown, don't navigate
//       setShowAddExam(false);
//     };

//     const renderExamList = () => (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-medium">Available Exams</h2>
//           <div className="text-sm text-gray-500">
//             {userExams.length} exam{userExams.length !== 1 ? 's' : ''} purchased
//           </div>
//         </div>

//         {/* Your Exams Section */}
//         <div className="bg-white rounded-lg p-6 border border-gray-200">
//           <h3 className="text-lg font-medium mb-4">Your Exams</h3>
//           <div className="space-y-3">
//             {userExams.map(exam => (
//               <Card key={exam.id} className="border border-gray-200">
//                 <CardContent className="p-4">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <h4 className="font-medium">{exam.name}</h4>
//                       <p className="text-sm text-gray-500">{exam.questions} questions</p>
//                     </div>
//                     <span className={`px-3 py-1 rounded-full text-sm ${
//                       exam.isPremium 
//                         ? 'bg-indigo-100 text-indigo-700'
//                         : 'bg-green-100 text-green-700'
//                     }`}>
//                       {exam.isPremium ? 'Premium' : 'Free'}
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* Available Exams Section */}
//         <div className="space-y-6">
//           {Object.entries(availableExams).map(([category, exams]) => (
//             <div key={category} className="space-y-4">
//               <h3 className="text-lg font-medium capitalize">{category}</h3>
//               <div className="grid gap-4 md:grid-cols-2">
//                 {exams.map(exam => (
//                   <Card key={exam.id} className="bg-white border border-gray-200">
//                     <CardContent className="p-6">
//                       <div className="flex flex-col h-full">
//                         <div>
//                           <h4 className="text-xl font-bold mb-2">{exam.name}</h4>
//                           <p className="text-gray-600 mb-4">{exam.questions} questions</p>
//                           <div className="space-y-2 mb-6">
//                             <div className="flex items-center gap-2">
//                               <CheckCircle className="h-5 w-5 text-green-600" />
//                               <span>Full exam access</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <CheckCircle className="h-5 w-5 text-green-600" />
//                               <span>Practice mode</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <CheckCircle className="h-5 w-5 text-green-600" />
//                               <span>Performance tracking</span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="mt-auto">
//                           <div className="text-3xl font-bold mb-4">${exam.price}</div>
//                           <Button 
//                             className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                             onClick={() => handleGetAccess(exam)}
//                           >
//                             Get Access (Test)
//                           </Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );

//     return renderExamList();
//   };

//   // Add lock functionality for premium content
//   const isPremiumContent = (index) => index > 0;

//   // Render the content based on active tab
//   const renderContent = () => {
//     switch(activeTab) {
//       case 'learn':
//         return renderLearnTab();
//       case 'practice':
//         return renderPracticeTab();
//       case 'review':
//         return renderReviewTab();
//       case 'mock':
//         return renderMockTab();
//       case 'settings':
//         return renderSettingsTab();
//       default:
//         return null;
//     }
//   };

//   // Add this new component for the sub-header
//   const SubHeader = ({ title, onBack, showBack }) => (
//     <div className="sticky top-16 bg-white border-b border-gray-200 z-40">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center h-12">
//           <div className="flex items-center gap-3">
//             {showBack && (
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={onBack}
//                 className="h-8 w-8 p-0"
//               >
//                 <ArrowLeft className="h-5 w-5" />
//               </Button>
//             )}
//             <h2 className="text-base font-medium">{title}</h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Main Header */}
//       <div className="w-full bg-white border-b border-gray-200 fixed top-0 left-0 z-50">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center h-16">
//             <div className="flex-1 flex items-center gap-3">
//               <div className="flex items-center gap-2">
//                 <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-md px-2 py-1">
//                   S
//                 </span>
//                 <h1 className="text-xl font-bold hidden sm:block">Scoorly</h1>
//               </div>
//               <div className="h-6 w-px bg-gray-200 mx-2" />
//               <h2 className="text-base font-medium">
//                 {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//               </h2>
//             </div>

//             <div className="flex items-center gap-2">
//               <Select onValueChange={handleExamSelect}>
//                 <SelectTrigger className="w-[120px] sm:w-[180px]">
//                   <SelectValue placeholder="Select Exam" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {userExams.map(exam => (
//                     <SelectItem key={exam.id} value={exam.id}>
//                       <div className="flex items-center justify-between">
//                         <span>{exam.name}</span>
//                         <span className={`text-xs px-2 py-1 rounded ${
//                           exam.isPremium 
//                             ? 'bg-indigo-100 text-indigo-700'
//                             : 'bg-green-100 text-green-700'
//                         }`}>
//                           {exam.isPremium ? 'Premium' : 'Free'}
//                         </span>
//                       </div>
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <Button 
//                 className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                 onClick={() => handleTabChange('settings')}
//               >
//                 <span className="hidden sm:inline">Upgrade</span>
//                 <CreditCard className="h-4 w-4 sm:inline-block sm:hidden" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sub Header for Navigation */}
//       {(navigationHistory.length > 1 || selectedSubject) && (
//         <SubHeader
//           title={selectedSubject ? selectedSubject.name : activeTab}
//           showBack={true}
//           onBack={() => selectedSubject ? setSelectedSubject(null) : handleNavigation('back')}
//         />
//       )}

//       {/* Main content with updated padding */}
//       <div className={`pt-${(navigationHistory.length > 1 || selectedSubject) ? '28' : '16'} pb-16 container mx-auto px-4`}>
//         <div className="max-w-6xl mx-auto">
//           {renderContent()}
//         </div>
//       </div>

//       {/* Fixed Bottom Navigation */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50">
//         <button 
//           className={`flex flex-col items-center py-2 px-1 ${activeTab === 'learn' ? 'text-indigo-600' : 'text-gray-500'}`}
//           onClick={() => handleTabChange('learn')}
//         >
//           <BookOpen className="h-5 w-5" />
//           <span className="text-xs mt-1">Learn</span>
//         </button>
        
//         <button 
//           className={`flex flex-col items-center py-2 px-1 ${activeTab === 'practice' ? 'text-indigo-600' : 'text-gray-500'}`}
//           onClick={() => handleTabChange('practice')}
//         >
//           <Brain className="h-5 w-5" />
//           <span className="text-xs mt-1">Practice</span>
//         </button>
        
//         <button 
//           className={`flex flex-col items-center py-2 px-1 ${activeTab === 'review' ? 'text-indigo-600' : 'text-gray-500'}`}
//           onClick={() => handleTabChange('review')}
//         >
//           <CheckCircle className="h-5 w-5" />
//           <span className="text-xs mt-1">Review</span>
//         </button>
        
//         <button 
//           className={`flex flex-col items-center py-2 px-1 ${activeTab === 'mock' ? 'text-indigo-600' : 'text-gray-500'}`}
//           onClick={() => handleTabChange('mock')}
//         >
//           <BookmarkCheck className="h-5 w-5" />
//           <span className="text-xs mt-1">Mock</span>
//         </button>
        
//         <button 
//           className={`flex flex-col items-center py-2 px-1 ${activeTab === 'settings' ? 'text-indigo-600' : 'text-gray-500'}`}
//           onClick={() => handleTabChange('settings')}
//         >
//           <Settings className="h-5 w-5" />
//           <span className="text-xs mt-1">Settings</span>
//         </button>
//       </div>

//       {/* Exam Selector Sheet */}
//       <ExamSelectorSheet />
//     </div>
//   );
// };

// export default MobileExamApp;
// File: src/app/page.js
'use client'
import MobileExamApp from '@/components/MobileExamApp';

export default function Home() {
  return <MobileExamApp />;
}