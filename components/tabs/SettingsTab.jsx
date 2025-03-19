// // // // // // File: src/components/tabs/SettingsTab.jsx
// // // // // import React from 'react';
// // // // // import { Card, CardContent } from '@/components/ui/card';
// // // // // import { Button } from '@/components/ui/button';
// // // // // import { CheckCircle } from 'lucide-react';
// // // // // import Image from 'next/image';

// // // // // const SettingsTab = ({ 
// // // // //   userExams, 
// // // // //   setUserExams, 
// // // // //   availableExams,
// // // // //   createExamStructure,
// // // // //   setShowAddExam
// // // // // }) => {
// // // // //   // Handle adding a new exam to the user's exams
// // // // //   const handleGetAccess = (exam) => {
// // // // //     const newExam = createExamStructure(exam);
// // // // //     setUserExams(prev => [...prev, newExam]);
// // // // //     // Just add to dropdown, don't navigate
// // // // //     setShowAddExam(false);
// // // // //   };

// // // // //   return (
// // // // //     <div className="space-y-6">
// // // // //       {/* Enhanced Premium Features Section */}
// // // // //       <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
// // // // //         <h3 className="text-xl font-bold mb-6 text-center">Premium Features</h3>
// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // //           {[
// // // // //             {
// // // // //               icon: "🎯",
// // // // //               title: "Full Exam Access",
// // // // //               description: "Access all premium questions and detailed explanations"
// // // // //             },
// // // // //             {
// // // // //               icon: "📚",
// // // // //               title: "Practice Mode",
// // // // //               description: "Personalized practice sessions with instant feedback"
// // // // //             },
// // // // //             {
// // // // //               icon: "📊",
// // // // //               title: "Performance Tracking",
// // // // //               description: "Detailed analytics and progress monitoring"
// // // // //             },
// // // // //             {
// // // // //               icon: "🎓",
// // // // //               title: "Mock Exams",
// // // // //               description: "Realistic exam simulations with timer"
// // // // //             }
// // // // //           ].map((feature, index) => (
// // // // //             <div key={index} className="p-6 border border-gray-200 rounded-lg bg-white">
// // // // //               <div className="w-full h-40 bg-gray-50 rounded-lg relative overflow-hidden mb-4">
// // // // //                 <div className="absolute inset-0 flex items-center justify-center">
// // // // //                   <span className="text-4xl">{feature.icon}</span>
// // // // //                 </div>
// // // // //               </div>
// // // // //               <h4 className="font-medium text-lg mb-2">{feature.title}</h4>
// // // // //               <p className="text-gray-600">{feature.description}</p>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Your Exams Section */}
// // // // //       <div className="bg-white rounded-lg p-6 border border-gray-200">
// // // // //         <div className="flex justify-between items-center mb-4">
// // // // //           <h3 className="text-lg font-medium">Your Exams</h3>
// // // // //           <Button 
// // // // //             onClick={() => setShowAddExam(true)}
// // // // //             className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
// // // // //           >
// // // // //             Add New Exam
// // // // //           </Button>
// // // // //         </div>
// // // // //         <div className="space-y-3">
// // // // //           {userExams.map(exam => (
// // // // //             <Card key={exam.id} className="border border-gray-200">
// // // // //               <CardContent className="p-4">
// // // // //                 <div className="flex justify-between items-center">
// // // // //                   <div>
// // // // //                     <h4 className="font-medium">{exam.name}</h4>
// // // // //                     <p className="text-sm text-gray-500">{exam.questions} questions</p>
                   
// // // // //                   </div>
// // // // //                   <span className={`px-3 py-1 rounded-full text-sm ${
// // // // //                     exam.isPremium 
// // // // //                       ? 'bg-indigo-100 text-indigo-700'
// // // // //                       : 'bg-green-100 text-green-700'
// // // // //                   }`}>
// // // // //                     {exam.isPremium ? 'Premium' : 'Free'}
// // // // //                   </span>
// // // // //                   <h1></h1>
// // // // //                 </div>
// // // // //               </CardContent>
// // // // //             </Card>
// // // // //           ))}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // File: src/components/tabs/SettingsTab.jsx
// // // // import React from 'react';
// // // // import { Card, CardContent } from '@/components/ui/card';
// // // // import { Button } from '@/components/ui/button';
// // // // import { CheckCircle } from 'lucide-react';
// // // // import Image from 'next/image';

// // // // const SettingsTab = ({
// // // //   userExams,
// // // //   setUserExams,
// // // //   availableExams,
// // // //   createExamStructure,
// // // //   setShowAddExam
// // // // }) => {
// // // //   // Handle adding a new exam to the user's exams
// // // //   const handleGetAccess = (exam) => {
// // // //     const newExam = createExamStructure(exam);
// // // //     setUserExams(prev => [...prev, newExam]);
// // // //     // Just add to dropdown, don't navigate
// // // //     setShowAddExam(false);
// // // //   };

// // // //   return (
// // // //     <div className="space-y-6">
// // // //       {/* Enhanced Premium Features Section */}
// // // //       <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
// // // //         <h3 className="text-xl font-bold mb-6 text-center">Premium Features</h3>
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //           {[
// // // //             {
// // // //               icon: "🎯",
// // // //               title: "Full Exam Access",
// // // //               description: "Access all premium questions and detailed explanations"
// // // //             },
// // // //             {
// // // //               icon: "📚",
// // // //               title: "Practice Mode",
// // // //               description: "Personalized practice sessions with instant feedback"
// // // //             },
// // // //             {
// // // //               icon: "📊",
// // // //               title: "Performance Tracking",
// // // //               description: "Detailed analytics and progress monitoring"
// // // //             },
// // // //             {
// // // //               icon: "🎓",
// // // //               title: "Mock Exams",
// // // //               description: "Realistic exam simulations with timer"
// // // //             }
// // // //           ].map((feature, index) => (
// // // //             <div key={index} className="p-6 border border-gray-200 rounded-lg bg-white">
// // // //               <div className="w-full h-40 bg-gray-50 rounded-lg relative overflow-hidden mb-4">
// // // //                 <div className="absolute inset-0 flex items-center justify-center">
// // // //                   <span className="text-4xl">{feature.icon}</span>
// // // //                 </div>
// // // //               </div>
// // // //               <h4 className="font-medium text-lg mb-2">{feature.title}</h4>
// // // //               <p className="text-gray-600">{feature.description}</p>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       {/* Your Exams Section */}
// // // //       <div className="bg-white rounded-lg p-6 border border-gray-200">
// // // //         <div className="flex justify-between items-center mb-4">
// // // //           <h3 className="text-lg font-medium">Your Exams</h3>
// // // //           <Button
// // // //             onClick={() => setShowAddExam(true)}
// // // //             className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
// // // //           >
// // // //             Add New Exam
// // // //           </Button>
// // // //         </div>
// // // //         <div className="space-y-3">
// // // //           {userExams.map(exam => (
// // // //             <Card key={exam.id} className="border border-gray-200">
// // // //               <CardContent className="p-4">
// // // //                 <div className="flex justify-between items-center">
// // // //                   <div>
// // // //                     <h4 className="font-medium">{exam.name}</h4>
// // // //                     <div className="flex items-center">
// // // //                       <p className="text-sm text-gray-500">{exam.questions} questions</p>
// // // //                       {!exam.isPremium && (
// // // //                         <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
// // // //                           Free
// // // //                         </span>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
// // // //                   {exam.isPremium && (
// // // //                     <span className="px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700">
// // // //                       Premium
// // // //                     </span>
// // // //                   )}
// // // //                 </div>
// // // //               </CardContent>
// // // //             </Card>
// // // //           ))}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SettingsTab;
// // // // File: src/components/tabs/SettingsTab.jsx
// // // import React from 'react';
// // // import { Card, CardContent } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { CheckCircle } from 'lucide-react';
// // // import Image from 'next/image';

// // // const SettingsTab = ({
// // //   userExams,
// // //   setUserExams,
// // //   availableExams,
// // //   setShowAddExam
// // // }) => {
// // //   return (
// // //     <div className="space-y-6">
// // //       {/* Enhanced Premium Features Section */}
// // //       <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
// // //         <h3 className="text-xl font-bold mb-6 text-center">Premium Features</h3>
// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //           {[
// // //             {
// // //               icon: "🎯",
// // //               title: "Full Exam Access",
// // //               description: "Access all premium questions and detailed explanations"
// // //             },
// // //             {
// // //               icon: "📚",
// // //               title: "Practice Mode",
// // //               description: "Personalized practice sessions with instant feedback"
// // //             },
// // //             {
// // //               icon: "📊",
// // //               title: "Performance Tracking",
// // //               description: "Detailed analytics and progress monitoring"
// // //             },
// // //             {
// // //               icon: "🎓",
// // //               title: "Mock Exams",
// // //               description: "Realistic exam simulations with timer"
// // //             }
// // //           ].map((feature, index) => (
// // //             <div key={index} className="p-6 border border-gray-200 rounded-lg bg-white">
// // //               <div className="w-full h-40 bg-gray-50 rounded-lg relative overflow-hidden mb-4">
// // //                 <div className="absolute inset-0 flex items-center justify-center">
// // //                   <span className="text-4xl">{feature.icon}</span>
// // //                 </div>
// // //               </div>
// // //               <h4 className="font-medium text-lg mb-2">{feature.title}</h4>
// // //               <p className="text-gray-600">{feature.description}</p>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* Your Exams Section */}
// // //       <div className="bg-white rounded-lg p-6 border border-gray-200">
// // //         <div className="flex justify-between items-center mb-4">
// // //           <h3 className="text-lg font-medium">Your Exams</h3>
// // //           <Button
// // //             onClick={() => setShowAddExam(true)}
// // //             className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
// // //           >
// // //             Add New Exam
// // //           </Button>
// // //         </div>
// // //         <div className="space-y-3">
// // //           {userExams.map(exam => (
// // //             <Card key={exam.id} className="border border-gray-200">
// // //               <CardContent className="p-4">
// // //                 <div className="flex justify-between items-center">
// // //                   <div>
// // //                     <h4 className="font-medium">{exam.name}</h4>
// // //                     <div className="flex items-center">
// // //                       <p className="text-sm text-gray-500">{exam.questions} questions</p>
// // //                       {!exam.isPremium && (
// // //                         <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
// // //                           Free
// // //                         </span>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                   {exam.isPremium && (
// // //                     <span className="px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700">
// // //                       Premium
// // //                     </span>
// // //                   )}
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // export default SettingsTab;
// // // File: src/components/tabs/SettingsTab.jsx
// // import React, { useState, useEffect } from 'react';
// // import { Card, CardContent } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { CheckCircle, AlertCircle, CreditCard, LogOut } from 'lucide-react';
// // import { useAuth } from '@/app/hooks/useAuth';
// // import { createClient } from '@/libs/supabase/client';
// // import Image from 'next/image';

// // const SettingsTab = ({
// //   userExams,
// //   setUserExams,
// //   availableExams,
// //   setShowAddExam
// // }) => {
// //   const { user, signOut } = useAuth();
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [status, setStatus] = useState(null);
// //   const [userData, setUserData] = useState(null);
  
// //   // Fetch user data from Supabase
// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       if (!user) return;
      
// //       try {
// //         const supabase = createClient();
// //         const { data, error } = await supabase
// //           .from('users')
// //           .select('*')
// //           .eq('id', user.id)
// //           .single();
          
// //         if (error) throw error;
// //         setUserData(data);
// //       } catch (error) {
// //         console.error('Error fetching user data:', error);
// //       }
// //     };
    
// //     fetchUserData();
// //   }, [user]);

// //   // Handle signout
// //   const handleSignOut = async () => {
// //     setIsLoading(true);
    
// //     try {
// //       const { success, error } = await signOut();
      
// //       if (error) {
// //         setStatus({ type: 'error', message: error });
// //       }
// //     } catch (error) {
// //       setStatus({ type: 'error', message: 'Error signing out' });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Helper to determine if an exam is currently accessible
// //   const isExamAccessible = (exam) => {
// //     if (!exam.isPremium) return true;
    
// //     // Check end date for premium exams
// //     if (exam.endDate) {
// //       const now = new Date();
// //       const endDate = new Date(exam.endDate);
// //       return now < endDate;
// //     }
    
// //     return false;
// //   };
  
// //   // Format date for display
// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'N/A';
    
// //     const date = new Date(dateString);
// //     return new Intl.DateTimeFormat('en-US', {
// //       month: 'short',
// //       day: 'numeric',
// //       year: 'numeric'
// //     }).format(date);
// //   };

// //   return (
// //     <div className="space-y-6">
// //       {/* User Profile Section (if logged in) */}
// //       {user && (
// //         <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
// //           <div className="flex items-center justify-between mb-4">
// //             <div className="flex items-center gap-4">
// //               <div className="h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
// //                 {user.email?.charAt(0)?.toUpperCase() || 'U'}
// //               </div>
// //               <div>
// //                 <h3 className="text-lg font-medium">{userData?.email || user.email}</h3>
// //                 <p className="text-sm text-gray-500">
// //                   {userData?.stripe_customer_id ? 'Premium User' : 'Free Account'}
// //                 </p>
// //               </div>
// //             </div>
// //             <Button 
// //               onClick={handleSignOut} 
// //               variant="outline" 
// //               className="border-red-300 text-red-600 hover:bg-red-50"
// //               disabled={isLoading}
// //             >
// //               <LogOut size={16} className="mr-2" />
// //               Sign Out
// //             </Button>
// //           </div>
          
// //           {status && (
// //             <div className={`p-3 rounded-md mb-4 ${
// //               status.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
// //             }`}>
// //               <div className="flex items-center">
// //                 {status.type === 'error' ? 
// //                   <AlertCircle size={18} className="mr-2" /> : 
// //                   <CheckCircle size={18} className="mr-2" />
// //                 }
// //                 <p className="text-sm">{status.message}</p>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {/* Premium Features Section */}
// //       <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
// //         <h3 className="text-xl font-bold mb-6 text-center">Premium Features</h3>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {[
// //             {
// //               icon: "🎯",
// //               title: "Full Exam Access",
// //               description: "Access all premium questions and detailed explanations"
// //             },
// //             {
// //               icon: "📚",
// //               title: "Practice Mode",
// //               description: "Personalized practice sessions with instant feedback"
// //             },
// //             {
// //               icon: "📊",
// //               title: "Performance Tracking",
// //               description: "Detailed analytics and progress monitoring"
// //             },
// //             {
// //               icon: "🎓",
// //               title: "Mock Exams",
// //               description: "Realistic exam simulations with timer"
// //             }
// //           ].map((feature, index) => (
// //             <div key={index} className="p-6 border border-gray-200 rounded-lg bg-white">
// //               <div className="w-full h-40 bg-gray-50 rounded-lg relative overflow-hidden mb-4">
// //                 <div className="absolute inset-0 flex items-center justify-center">
// //                   <span className="text-4xl">{feature.icon}</span>
// //                 </div>
// //               </div>
// //               <h4 className="font-medium text-lg mb-2">{feature.title}</h4>
// //               <p className="text-gray-600">{feature.description}</p>
// //             </div>
// //           ))}
// //         </div>
        
// //         {/* Pricing CTA */}
// //         {!userData?.stripe_customer_id && (
// //           <div className="mt-8 text-center">
// //             <Button 
// //               onClick={() => window.open('https://scoorly.com/pricing', '_blank')}
// //               className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-2 text-lg"
// //             >
// //               <CreditCard className="mr-2 h-5 w-5" />
// //               Upgrade to Premium
// //             </Button>
// //           </div>
// //         )}
// //       </div>

// //       {/* Your Exams Section */}
// //       <div className="bg-white rounded-lg p-6 border border-gray-200">
// //         <div className="flex justify-between items-center mb-4">
// //           <h3 className="text-lg font-medium">Your Exams</h3>
// //           <Button 
// //             onClick={() => setShowAddExam(true)}
// //             className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
// //           >
// //             Add New Exam
// //           </Button>
// //         </div>
// //         <div className="space-y-3">
// //           {userExams.length === 0 ? (
// //             <div className="text-center py-8 text-gray-500">
// //               <p>You haven't added any exams yet.</p>
// //               <Button 
// //                 onClick={() => setShowAddExam(true)}
// //                 variant="link" 
// //                 className="text-indigo-600"
// //               >
// //                 Add your first exam
// //               </Button>
// //             </div>
// //           ) : (
// //             userExams.map(exam => (
// //               <Card key={exam.id} className="border border-gray-200">
// //                 <CardContent className="p-4">
// //                   <div className="flex justify-between items-center">
// //                     <div>
// //                       <h4 className="font-medium">{exam.name}</h4>
// //                       <div className="flex items-center">
// //                         <p className="text-sm text-gray-500">{exam.questions} questions</p>
// //                         {!exam.isPremium && (
// //                           <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
// //                             Free
// //                           </span>
// //                         )}
// //                       </div>
// //                       {exam.isPremium && (
// //                         <p className="text-xs text-gray-500">
// //                           {isExamAccessible(exam) 
// //                             ? `Access until ${formatDate(exam.endDate)}`
// //                             : 'Access expired'
// //                           }
// //                         </p>
// //                       )}
// //                     </div>
// //                     {exam.isPremium && (
// //                       <span className={`px-3 py-1 rounded-full text-sm ${
// //                         isExamAccessible(exam)
// //                           ? 'bg-indigo-100 text-indigo-700'
// //                           : 'bg-gray-100 text-gray-700'
// //                       }`}>
// //                         {isExamAccessible(exam) ? 'Premium' : 'Expired'}
// //                       </span>
// //                     )}
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             ))
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SettingsTab;
// // File: src/components/tabs/SettingsTab.jsx
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { CheckCircle, AlertCircle, CreditCard, LogOut, Bug, Plus } from 'lucide-react';
// import { useAuth } from '@/app/hooks/useAuth';
// import { createClient } from '@/libs/supabase/client';
// import { Switch } from '@/components/ui/switch';
// import Image from 'next/image';

// const SettingsTab = ({
//   userExams,
//   setUserExams,
//   availableExams,
//   setShowAddExam,
//   debugMode,
//   toggleDebugMode,
//   loading
// }) => {
//   const { user, signOut } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const [status, setStatus] = useState(null);
//   const [userData, setUserData] = useState(null);
  
//   // Check if we're in development environment
//   const isDevelopment = process.env.NODE_ENV === 'development';
  
//   // Fetch user data from Supabase
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!user) return;
      
//       try {
//         const supabase = createClient();
//         const { data, error } = await supabase
//           .from('users')
//           .select('*')
//           .eq('id', user.id)
//           .single();
          
//         if (error) throw error;
//         setUserData(data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };
    
//     fetchUserData();
//   }, [user]);

//   // Handle signout
//   const handleSignOut = async () => {
//     setIsLoading(true);
    
//     try {
//       const { success, error } = await signOut();
      
//       if (error) {
//         setStatus({ type: 'error', message: error });
//       }
//     } catch (error) {
//       setStatus({ type: 'error', message: 'Error signing out' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Helper to determine if an exam is currently accessible
//   const isExamAccessible = (exam) => {
//     if (!exam.isPremium) return true;
    
//     // Check end date for premium exams
//     if (exam.endDate) {
//       const now = new Date();
//       const endDate = new Date(exam.endDate);
//       return now < endDate;
//     }
    
//     return false;
//   };
  
//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
    
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     }).format(date);
//   };

//   // Render the exams section
//   const renderExamsSection = () => {
//     if (loading) {
//       return (
//         <div className="text-center py-8 text-gray-500">
//           <div className="animate-pulse mb-2">
//             <div className="h-4 bg-gray-200 rounded w-28 mb-2 mx-auto"></div>
//             <div className="h-4 bg-gray-200 rounded w-36 mx-auto"></div>
//           </div>
//           <p>Loading your exams...</p>
//         </div>
//       );
//     }

//     if (userExams.length === 0) {
//       return (
//         <div className="text-center py-8 text-gray-500">
//           <div className="flex justify-center mb-4">
//             <div className="bg-gray-100 p-4 rounded-full">
//               <Plus className="h-6 w-6 text-gray-400" />
//             </div>
//           </div>
//           <p className="mb-2">You haven't added any exams yet</p>
//           <Button 
//             onClick={() => setShowAddExam(true)}
//             variant="link" 
//             className="text-indigo-600"
//           >
//             Add your first exam
//           </Button>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-3">
//         {userExams.map(exam => (
//           <Card key={exam.id} className="border border-gray-200">
//             <CardContent className="p-4">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h4 className="font-medium">{exam.name}</h4>
//                   <div className="flex items-center">
//                     <p className="text-sm text-gray-500">{exam.questions} questions</p>
//                     {!exam.isPremium && (
//                       <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
//                         Free
//                       </span>
//                     )}
//                   </div>
//                   {exam.isPremium && (
//                     <p className="text-xs text-gray-500">
//                       {isExamAccessible(exam) 
//                         ? `Access until ${formatDate(exam.endDate)}`
//                         : 'Access expired'
//                       }
//                     </p>
//                   )}
//                 </div>
//                 {exam.isPremium && (
//                   <span className={`px-3 py-1 rounded-full text-sm ${
//                     isExamAccessible(exam)
//                       ? 'bg-indigo-100 text-indigo-700'
//                       : 'bg-gray-100 text-gray-700'
//                   }`}>
//                     {isExamAccessible(exam) ? 'Premium' : 'Expired'}
//                   </span>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* User Profile Section (if logged in) */}
//       {user && (
//         <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-4">
//               <div className="h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
//                 {user.email?.charAt(0)?.toUpperCase() || 'U'}
//               </div>
//               <div>
//                 <h3 className="text-lg font-medium">{userData?.email || user.email}</h3>
//                 <p className="text-sm text-gray-500">
//                   {userData?.stripe_customer_id ? 'Premium User' : 'Free Account'}
//                 </p>
//               </div>
//             </div>
//             <Button 
//               onClick={handleSignOut} 
//               variant="outline" 
//               className="border-red-300 text-red-600 hover:bg-red-50"
//               disabled={isLoading}
//             >
//               <LogOut size={16} className="mr-2" />
//               Sign Out
//             </Button>
//           </div>
          
//           {status && (
//             <div className={`p-3 rounded-md mb-4 ${
//               status.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
//             }`}>
//               <div className="flex items-center">
//                 {status.type === 'error' ? 
//                   <AlertCircle size={18} className="mr-2" /> : 
//                   <CheckCircle size={18} className="mr-2" />
//                 }
//                 <p className="text-sm">{status.message}</p>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Premium Features Section */}
//       <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
//         <h3 className="text-xl font-bold mb-6 text-center">Premium Features</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {[
//             {
//               icon: "🎯",
//               title: "Full Exam Access",
//               description: "Access all premium questions and detailed explanations"
//             },
//             {
//               icon: "📚",
//               title: "Practice Mode",
//               description: "Personalized practice sessions with instant feedback"
//             },
//             {
//               icon: "📊",
//               title: "Performance Tracking",
//               description: "Detailed analytics and progress monitoring"
//             },
//             {
//               icon: "🎓",
//               title: "Mock Exams",
//               description: "Realistic exam simulations with timer"
//             }
//           ].map((feature, index) => (
//             <div key={index} className="p-6 border border-gray-200 rounded-lg bg-white">
//               <div className="w-full h-40 bg-gray-50 rounded-lg relative overflow-hidden mb-4">
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <span className="text-4xl">{feature.icon}</span>
//                 </div>
//               </div>
//               <h4 className="font-medium text-lg mb-2">{feature.title}</h4>
//               <p className="text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>
        
//         {/* Pricing CTA */}
//         {!userData?.stripe_customer_id && (
//           <div className="mt-8 text-center">
//             <Button 
//               onClick={() => window.open('https://scoorly.com/pricing', '_blank')}
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-2 text-lg"
//             >
//               <CreditCard className="mr-2 h-5 w-5" />
//               Upgrade to Premium
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Your Exams Section */}
//       <div className="bg-white rounded-lg p-6 border border-gray-200">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-medium">Your Exams</h3>
//           <Button 
//             onClick={() => setShowAddExam(true)}
//             className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//           >
//             Add New Exam
//           </Button>
//         </div>
//         {renderExamsSection()}
//       </div>
      
//       {/* Developer Options - only shown in development environment */}
//       {isDevelopment && toggleDebugMode && (
//         <div className="bg-gray-100 rounded-lg p-6 border border-gray-200 border-dashed">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-medium flex items-center">
//               <Bug className="mr-2 h-4 w-4" />
//               Developer Options
//             </h3>
//             <div className="flex items-center space-x-2">
//               <Switch 
//                 id="debug-mode" 
//                 checked={debugMode} 
//                 onCheckedChange={toggleDebugMode}
//               />
//               <label 
//                 htmlFor="debug-mode" 
//                 className="text-sm font-medium cursor-pointer"
//               >
//                 Debug Mode
//               </label>
//             </div>
//           </div>
//           <p className="text-sm text-gray-500">
//             Debug mode enables additional development tools. Press Ctrl+Alt+D to toggle debug mode at any time.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SettingsTab;
// File: src/components/tabs/SettingsTab.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, CreditCard, LogOut, Bug, Plus } from 'lucide-react';
import { useAuth } from '@/app/hooks/useAuth';
import { createClient } from '@/libs/supabase/client';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';

const SettingsTab = ({
  userExams,
  setUserExams,
  availableExams,
  setShowAddExam,
  debugMode,
  toggleDebugMode,
  loading
}) => {
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [userData, setUserData] = useState(null);
  
  // Check if we're in development environment
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Fetch user data from Supabase
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, [user]);

  // Handle signout
  const handleSignOut = async () => {
    setIsLoading(true);
    
    try {
      const { success, error } = await signOut();
      
      if (error) {
        setStatus({ type: 'error', message: error });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error signing out' });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to determine if an exam is currently accessible
  const isExamAccessible = (exam) => {
    if (!exam.isPremium) return true;
    
    // Check end date for premium exams
    if (exam.endDate) {
      const now = new Date();
      const endDate = new Date(exam.endDate);
      return now < endDate;
    }
    
    return false;
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Render the exams section
  const renderExamsSection = () => {
    if (loading) {
      return (
        <div className="text-center py-8 text-gray-500">
          <div className="animate-pulse mb-2">
            <div className="h-4 bg-gray-200 rounded w-28 mb-2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-36 mx-auto"></div>
          </div>
          <p>Loading your exams...</p>
        </div>
      );
    }

    if (userExams.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 p-4 rounded-full">
              <Plus className="h-6 w-6 text-gray-400" />
            </div>
          </div>
          <p className="mb-2">You haven&apos;t added any exams yet</p>
          <Button 
            onClick={() => setShowAddExam(true)}
            variant="link" 
            className="text-indigo-600"
          >
            Add your first exam
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {userExams.map(exam => (
          <Card key={exam.id} className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{exam.name}</h4>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-500">{exam.questions} questions</p>
                    {!exam.isPremium && (
                      <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                        Free
                      </span>
                    )}
                  </div>
                  {exam.isPremium && (
                    <p className="text-xs text-gray-500">
                      {isExamAccessible(exam) 
                        ? `Access until ${formatDate(exam.endDate)}`
                        : 'Access expired'
                      }
                    </p>
                  )}
                </div>
                {exam.isPremium && (
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    isExamAccessible(exam)
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {isExamAccessible(exam) ? 'Premium' : 'Expired'}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* User Profile Section (if logged in) */}
      {user && (
        <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.email?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <h3 className="text-lg font-medium">{userData?.email || user.email}</h3>
                <p className="text-sm text-gray-500">
                  {userData?.stripe_customer_id ? 'Premium User' : 'Free Account'}
                </p>
              </div>
            </div>
            <Button 
              onClick={handleSignOut} 
              variant="outline" 
              className="border-red-300 text-red-600 hover:bg-red-50"
              disabled={isLoading}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
          
          {status && (
            <div className={`p-3 rounded-md mb-4 ${
              status.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
            }`}>
              <div className="flex items-center">
                {status.type === 'error' ? 
                  <AlertCircle size={18} className="mr-2" /> : 
                  <CheckCircle size={18} className="mr-2" />
                }
                <p className="text-sm">{status.message}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Premium Features Section */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
        <h3 className="text-xl font-bold mb-6 text-center">Premium Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: "🎯",
              title: "Full Exam Access",
              description: "Access all premium questions and detailed explanations"
            },
            {
              icon: "📚",
              title: "Practice Mode",
              description: "Personalized practice sessions with instant feedback"
            },
            {
              icon: "📊",
              title: "Performance Tracking",
              description: "Detailed analytics and progress monitoring"
            },
            {
              icon: "🎓",
              title: "Mock Exams",
              description: "Realistic exam simulations with timer"
            }
          ].map((feature, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg bg-white">
              <div className="w-full h-40 bg-gray-50 rounded-lg relative overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">{feature.icon}</span>
                </div>
              </div>
              <h4 className="font-medium text-lg mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Pricing CTA */}
        {!userData?.stripe_customer_id && (
          <div className="mt-8 text-center">
            <Button 
              onClick={() => window.open('https://scoorly.com/pricing', '_blank')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-2 text-lg"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Upgrade to Premium
            </Button>
          </div>
        )}
      </div>

      {/* Your Exams Section */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Your Exams</h3>
          <Button 
            onClick={() => setShowAddExam(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
          >
            Add New Exam
          </Button>
        </div>
        {renderExamsSection()}
      </div>
      
      {/* Developer Options - only shown in development environment */}
      {isDevelopment && toggleDebugMode && (
        <div className="bg-gray-100 rounded-lg p-6 border border-gray-200 border-dashed">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <Bug className="mr-2 h-4 w-4" />
              Developer Options
            </h3>
            <div className="flex items-center space-x-2">
              <Switch 
                id="debug-mode" 
                checked={debugMode} 
                onCheckedChange={toggleDebugMode}
              />
              <label 
                htmlFor="debug-mode" 
                className="text-sm font-medium cursor-pointer"
              >
                Debug Mode
              </label>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Debug mode enables additional development tools. Press Ctrl+Alt+D to toggle debug mode at any time.
          </p>
        </div>
      )}
    </div>
  );
};

export default SettingsTab;