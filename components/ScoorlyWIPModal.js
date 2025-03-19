// // // // File: src/components/ScoorlyWIPModal.jsx
// // // import React from 'react';
// // // import { Check, Clock, BarChart2, BookOpen, Bookmark, AlertTriangle, Smartphone, Medal } from 'lucide-react';
// // // import { createClient } from '@/libs/supabase/client';

// // // const ScoorlyWIPModal = ({ onClose }) => {
// // //   const supabase = createClient();

// // //   // Direct Google login handling
// // //   const handleGoogleLogin = async () => {
// // //     try {
// // //       await supabase.auth.signInWithOAuth({
// // //         provider: 'google',
// // //         options: {
// // //           redirectTo: `${window.location.origin}/dashboard`
// // //         }
// // //       });
// // //     } catch (error) {
// // //       console.error('Error signing in with Google:', error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// // //       <div className="bg-white rounded-lg w-full max-w-4xl relative overflow-auto max-h-[90vh]">
// // //         {/* Close button */}
// // //         <button 
// // //           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
// // //           onClick={onClose}
// // //         >
// // //           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// // //             <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
// // //           </svg>
// // //         </button>
        
// // //         {/* Logo */}
// // //         <div className="flex justify-center pt-8 pb-4">
// // //           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-md">
// // //             <span className="font-bold text-2xl">S</span>
// // //           </div>
// // //         </div>
        
// // //         {/* Header */}
// // //         <div className="text-center px-6 pb-6">
// // //           <h1 className="text-4xl font-bold mb-2 md:text-3xl sm:text-2xl">Join the Scoorly community</h1>
// // //           <p className="text-xl mb-6 md:text-lg sm:text-base">
// // //             Surround yourself with other successful test-takers sharing the same study goals
// // //           </p>
          
// // //           {/* Google Login button - this initiates direct login without redirect */}
// // //           <button 
// // //             onClick={handleGoogleLogin}
// // //             className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-8 py-3 font-medium transition-colors text-lg flex items-center justify-center mx-auto gap-2"
// // //           >
// // //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
// // //               <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
// // //               <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
// // //               <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
// // //               <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
// // //             </svg>
// // //             Get Started with Google
// // //           </button>
          
// // //           {/* User count */}
// // //           <p className="mt-6 text-gray-700">Join 3,457 students</p>
          
// // //           {/* Avatar row */}
// // //           <div className="flex justify-center mt-2 mb-6 flex-wrap">
// // //             {[...Array(9)].map((_, i) => (
// // //               <div key={i} className="w-8 h-8 rounded-full bg-gray-300 -ml-1 border border-white"></div>
// // //             ))}
// // //           </div>
// // //         </div>
        
// // //         {/* Features grid */}
// // //         <div className="px-6 pb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
// // //           {/* Feature 1 */}
// // //           <div className="border rounded-lg p-4">
// // //             <div className="flex items-start">
// // //               <div className="bg-green-100 p-1 rounded-md">
// // //                 <Check className="text-green-600 w-5 h-5" />
// // //               </div>
// // //               <div className="ml-3">
// // //                 <h3 className="font-bold">One time, no subscription</h3>
// // //                 <p className="text-gray-600 text-sm">
// // //                   Pay once and get lifetime access with updates
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           {/* Feature 2 */}
// // //           <div className="border rounded-lg p-4">
// // //             <div className="flex items-start">
// // //               <div className="bg-blue-100 p-1 rounded-md">
// // //                 <Medal className="text-blue-600 w-5 h-5" />
// // //               </div>
// // //               <div className="ml-3">
// // //                 <h3 className="font-bold">Mock exams unlimited trials</h3>
// // //                 <p className="text-gray-600 text-sm">
// // //                   Prepare with 1000s of practice questions
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           {/* Feature 3 */}
// // //           <div className="border rounded-lg p-4">
// // //             <div className="flex items-start">
// // //               <div className="bg-purple-100 p-1 rounded-md">
// // //                 <BookOpen className="text-purple-600 w-5 h-5" />
// // //               </div>
// // //               <div className="ml-3">
// // //                 <h3 className="font-bold">Don't memorize, understand</h3>
// // //                 <p className="text-gray-600 text-sm">
// // //                   Study mode focused on deep comprehension
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           {/* Feature 4 */}
// // //           <div className="border rounded-lg p-4">
// // //             <div className="flex items-start">
// // //               <div className="bg-yellow-100 p-1 rounded-md">
// // //                 <Bookmark className="text-yellow-600 w-5 h-5" />
// // //               </div>
// // //               <div className="ml-3">
// // //                 <h3 className="font-bold">Review mode</h3>
// // //                 <p className="text-gray-600 text-sm">
// // //                   Focus on bookmarked and wrong questions
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           {/* Feature 5 */}
// // //           <div className="border rounded-lg p-4">
// // //             <div className="flex items-start">
// // //               <div className="bg-indigo-100 p-1 rounded-md">
// // //                 <BarChart2 className="text-indigo-600 w-5 h-5" />
// // //               </div>
// // //               <div className="ml-3">
// // //                 <h3 className="font-bold">Performance by Subject</h3>
// // //                 <p className="text-gray-600 text-sm">
// // //                   Track your progress across different topics
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           {/* Feature 6 */}
// // //           <div className="border rounded-lg p-4">
// // //             <div className="flex items-start">
// // //               <div className="bg-teal-100 p-1 rounded-md">
// // //                 <Smartphone className="text-teal-600 w-5 h-5" />
// // //               </div>
// // //               <div className="ml-3">
// // //                 <h3 className="font-bold">Mobile & Web Access</h3>
// // //                 <p className="text-gray-600 text-sm">
// // //                   Study anywhere on any device
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           {/* Feature 7 */}
// // //           <div className="border rounded-lg p-4">
// // //             <div className="flex items-start">
// // //               <div className="bg-orange-100 p-1 rounded-md">
// // //                 <Clock className="text-orange-600 w-5 h-5" />
// // //               </div>
// // //               <div className="ml-3">
// // //                 <h3 className="font-bold">Timed exams</h3>
// // //                 <p className="text-gray-600 text-sm">
// // //                   Practice with exam-like UI and timing
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
          
// // //           {/* Feature 8 */}
// // //           <div className="border rounded-lg p-4">
// // //             <div className="flex items-start">
// // //               <div className="bg-red-100 p-1 rounded-md">
// // //                 <AlertTriangle className="text-red-600 w-5 h-5" />
// // //               </div>
// // //               <div className="ml-3">
// // //                 <h3 className="font-bold">Find Weakest Subject</h3>
// // //                 <p className="text-gray-600 text-sm">
// // //                   Identify areas that need more attention
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ScoorlyWIPModal;
// // // File: src/components/ScoorlyWIPModal.jsx
// // import React from 'react';
// // import { Check, Clock, BarChart2, BookOpen, Bookmark, AlertTriangle, Smartphone, Medal } from 'lucide-react';
// // import { createClient } from '@/libs/supabase/client';

// // const ScoorlyWIPModal = ({ onClose }) => {
// //   const supabase = createClient();

// //   // Fixed Google login handling
// //   const handleGoogleLogin = async () => {
// //     try {
// //       await supabase.auth.signInWithOAuth({
// //         provider: 'google',
// //         options: {
// //           redirectTo: `${window.location.origin}/auth/callback`
// //         }
// //       });
// //     } catch (error) {
// //       console.error('Error signing in with Google:', error);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //       <div className="bg-white rounded-lg w-full max-w-4xl relative overflow-auto max-h-[90vh]">
// //         {/* Close button */}
// //         <button 
// //           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
// //           onClick={onClose}
// //         >
// //           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// //             <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
// //           </svg>
// //         </button>
        
// //         {/* Logo */}
// //         <div className="flex justify-center pt-8 pb-4">
// //           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-md">
// //             <span className="font-bold text-2xl">S</span>
// //           </div>
// //         </div>
        
// //         {/* Header */}
// //         <div className="text-center px-6 pb-6">
// //           <h1 className="text-4xl font-bold mb-2 md:text-3xl sm:text-2xl">Join the Scoorly community</h1>
// //           <p className="text-xl mb-6 md:text-lg sm:text-base">
// //             Surround yourself with other successful test-takers sharing the same study goals
// //           </p>
          
// //           {/* Google Login button - this initiates direct login without redirect */}
// //           <button 
// //             onClick={handleGoogleLogin}
// //             className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-8 py-3 font-medium transition-colors text-lg flex items-center justify-center mx-auto gap-2"
// //           >
// //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
// //               <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
// //               <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
// //               <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
// //               <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
// //             </svg>
// //             Get Started with Google
// //           </button>
          
// //           {/* User count */}
// //           <p className="mt-6 text-gray-700">Join 3,457 students</p>
          
// //           {/* Avatar row */}
// //           <div className="flex justify-center mt-2 mb-6 flex-wrap">
// //             {[...Array(9)].map((_, i) => (
// //               <div key={i} className="w-8 h-8 rounded-full bg-gray-300 -ml-1 border border-white"></div>
// //             ))}
// //           </div>
// //         </div>
        
// //         {/* Features grid */}
// //         <div className="px-6 pb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
// //           {/* Feature 1 */}
// //           <div className="border rounded-lg p-4">
// //             <div className="flex items-start">
// //               <div className="bg-green-100 p-1 rounded-md">
// //                 <Check className="text-green-600 w-5 h-5" />
// //               </div>
// //               <div className="ml-3">
// //                 <h3 className="font-bold">One time, no subscription</h3>
// //                 <p className="text-gray-600 text-sm">
// //                   Pay once and get lifetime access with updates
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* Feature 2 */}
// //           <div className="border rounded-lg p-4">
// //             <div className="flex items-start">
// //               <div className="bg-blue-100 p-1 rounded-md">
// //                 <Medal className="text-blue-600 w-5 h-5" />
// //               </div>
// //               <div className="ml-3">
// //                 <h3 className="font-bold">Mock exams unlimited trials</h3>
// //                 <p className="text-gray-600 text-sm">
// //                   Prepare with 1000s of practice questions
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* Feature 3 */}
// //           <div className="border rounded-lg p-4">
// //             <div className="flex items-start">
// //               <div className="bg-purple-100 p-1 rounded-md">
// //                 <BookOpen className="text-purple-600 w-5 h-5" />
// //               </div>
// //               <div className="ml-3">
// //                 <h3 className="font-bold">Don't memorize, understand</h3>
// //                 <p className="text-gray-600 text-sm">
// //                   Study mode focused on deep comprehension
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* Feature 4 */}
// //           <div className="border rounded-lg p-4">
// //             <div className="flex items-start">
// //               <div className="bg-yellow-100 p-1 rounded-md">
// //                 <Bookmark className="text-yellow-600 w-5 h-5" />
// //               </div>
// //               <div className="ml-3">
// //                 <h3 className="font-bold">Review mode</h3>
// //                 <p className="text-gray-600 text-sm">
// //                   Focus on bookmarked and wrong questions
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* Feature 5 */}
// //           <div className="border rounded-lg p-4">
// //             <div className="flex items-start">
// //               <div className="bg-indigo-100 p-1 rounded-md">
// //                 <BarChart2 className="text-indigo-600 w-5 h-5" />
// //               </div>
// //               <div className="ml-3">
// //                 <h3 className="font-bold">Performance by Subject</h3>
// //                 <p className="text-gray-600 text-sm">
// //                   Track your progress across different topics
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* Feature 6 */}
// //           <div className="border rounded-lg p-4">
// //             <div className="flex items-start">
// //               <div className="bg-teal-100 p-1 rounded-md">
// //                 <Smartphone className="text-teal-600 w-5 h-5" />
// //               </div>
// //               <div className="ml-3">
// //                 <h3 className="font-bold">Mobile & Web Access</h3>
// //                 <p className="text-gray-600 text-sm">
// //                   Study anywhere on any device
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* Feature 7 */}
// //           <div className="border rounded-lg p-4">
// //             <div className="flex items-start">
// //               <div className="bg-orange-100 p-1 rounded-md">
// //                 <Clock className="text-orange-600 w-5 h-5" />
// //               </div>
// //               <div className="ml-3">
// //                 <h3 className="font-bold">Timed exams</h3>
// //                 <p className="text-gray-600 text-sm">
// //                   Practice with exam-like UI and timing
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* Feature 8 */}
// //           <div className="border rounded-lg p-4">
// //             <div className="flex items-start">
// //               <div className="bg-red-100 p-1 rounded-md">
// //                 <AlertTriangle className="text-red-600 w-5 h-5" />
// //               </div>
// //               <div className="ml-3">
// //                 <h3 className="font-bold">Find Weakest Subject</h3>
// //                 <p className="text-gray-600 text-sm">
// //                   Identify areas that need more attention
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ScoorlyWIPModal;
// // File: src/components/ScoorlyWIPModal.jsx
// import React from 'react';
// import { Check, Clock, BarChart2, BookOpen, Bookmark, AlertTriangle, Smartphone, Medal } from 'lucide-react';
// import { signInWithGoogle } from '@/libs/auth-helpers';

// const ScoorlyWIPModal = ({ onClose }) => {
//   // Fixed Google login handling using auth helper
//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithGoogle();
//       // No need to close the modal here as the redirect will happen automatically
//     } catch (error) {
//       console.error('Error in Google login flow:', error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg w-full max-w-4xl relative overflow-auto max-h-[90vh]">
//         {/* Close button */}
//         <button 
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </button>
        
//         {/* Logo */}
//         <div className="flex justify-center pt-8 pb-4">
//           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-md">
//             <span className="font-bold text-2xl">S</span>
//           </div>
//         </div>
        
//         {/* Header */}
//         <div className="text-center px-6 pb-6">
//           <h1 className="text-4xl font-bold mb-2 md:text-3xl sm:text-2xl">Join the Scoorly community</h1>
//           <p className="text-xl mb-6 md:text-lg sm:text-base">
//             Surround yourself with other successful test-takers sharing the same study goals
//           </p>
          
//           {/* Google Login button - this initiates direct login without redirect */}
//           <button 
//             onClick={handleGoogleLogin}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-8 py-3 font-medium transition-colors text-lg flex items-center justify-center mx-auto gap-2"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
//               <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
//               <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
//               <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
//               <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
//             </svg>
//             Get Started with Google
//           </button>
          
//           {/* User count */}
//           <p className="mt-6 text-gray-700">Join 3,457 students</p>
          
//           {/* Avatar row */}
//           <div className="flex justify-center mt-2 mb-6 flex-wrap">
//             {[...Array(9)].map((_, i) => (
//               <div key={i} className="w-8 h-8 rounded-full bg-gray-300 -ml-1 border border-white"></div>
//             ))}
//           </div>
//         </div>
        
//         {/* Features grid */}
//         <div className="px-6 pb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Feature 1 */}
//           <div className="border rounded-lg p-4">
//             <div className="flex items-start">
//               <div className="bg-green-100 p-1 rounded-md">
//                 <Check className="text-green-600 w-5 h-5" />
//               </div>
//               <div className="ml-3">
//                 <h3 className="font-bold">One time, no subscription</h3>
//                 <p className="text-gray-600 text-sm">
//                   Pay once and get lifetime access with updates
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           {/* Feature 2 */}
//           <div className="border rounded-lg p-4">
//             <div className="flex items-start">
//               <div className="bg-blue-100 p-1 rounded-md">
//                 <Medal className="text-blue-600 w-5 h-5" />
//               </div>
//               <div className="ml-3">
//                 <h3 className="font-bold">Mock exams unlimited trials</h3>
//                 <p className="text-gray-600 text-sm">
//                   Prepare with 1000s of practice questions
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           {/* Additional features truncated for brevity */}
//           {/* ... */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScoorlyWIPModal;
// File: src/components/ScoorlyWIPModal.jsx
import React from 'react';
import { Check, Clock, BarChart2, BookOpen, Bookmark, AlertTriangle, Smartphone, Medal } from 'lucide-react';
import { createClient } from '@/libs/supabase/client';

const ScoorlyWIPModal = ({ onClose }) => {
  const supabase = createClient();

  // Fixed Google login handling with forced current domain
  const handleGoogleLogin = async () => {
    try {
      // Force the current domain by directly setting the window location
      // This prevents any pre-configured redirects in Supabase
      const currentOrigin = window.location.origin;
      const callbackUrl = `${currentOrigin}/auth/callback`;
      
      console.log("Starting Google login with redirect:", callbackUrl);
      
      // Overriding any default redirects
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl,
          // Force reauthorization
          queryParams: {
            prompt: 'select_account',
            access_type: 'offline'
          }
        }
      });
      
      if (error) {
        console.error('Error signing in with Google:', error);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl relative overflow-auto max-h-[90vh]">
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        
        {/* Logo */}
        <div className="flex justify-center pt-8 pb-4">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-md">
            <span className="font-bold text-2xl">S</span>
          </div>
        </div>
        
        {/* Header */}
        <div className="text-center px-6 pb-6">
          <h1 className="text-4xl font-bold mb-2 md:text-3xl sm:text-2xl">Join the Scoorly community</h1>
          <p className="text-xl mb-6 md:text-lg sm:text-base">
            Surround yourself with other successful test-takers sharing the same study goals
          </p>
          
          {/* Google Login button - this initiates direct login without redirect */}
          <button 
            onClick={handleGoogleLogin}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-8 py-3 font-medium transition-colors text-lg flex items-center justify-center mx-auto gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            Get Started with Google
          </button>
          
          {/* User count */}
          <p className="mt-6 text-gray-700">Join 3,457 students</p>
          
          {/* Avatar row */}
          <div className="flex justify-center mt-2 mb-6 flex-wrap">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-300 -ml-1 border border-white"></div>
            ))}
          </div>
        </div>
        
        {/* Features grid */}
        <div className="px-6 pb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Feature 1 */}
          <div className="border rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-green-100 p-1 rounded-md">
                <Check className="text-green-600 w-5 h-5" />
              </div>
              <div className="ml-3">
                <h3 className="font-bold">One time, no subscription</h3>
                <p className="text-gray-600 text-sm">
                  Pay once and get lifetime access with updates
                </p>
              </div>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="border rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-md">
                <Medal className="text-blue-600 w-5 h-5" />
              </div>
              <div className="ml-3">
                <h3 className="font-bold">Mock exams unlimited trials</h3>
                <p className="text-gray-600 text-sm">
                  Prepare with 1000s of practice questions
                </p>
              </div>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="border rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-purple-100 p-1 rounded-md">
                <BookOpen className="text-purple-600 w-5 h-5" />
              </div>
              <div className="ml-3">
                <h3 className="font-bold">Don't memorize, understand</h3>
                <p className="text-gray-600 text-sm">
                  Study mode focused on deep comprehension
                </p>
              </div>
            </div>
          </div>
          
          {/* Feature 4 */}
          <div className="border rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-yellow-100 p-1 rounded-md">
                <Bookmark className="text-yellow-600 w-5 h-5" />
              </div>
              <div className="ml-3">
                <h3 className="font-bold">Review mode</h3>
                <p className="text-gray-600 text-sm">
                  Focus on bookmarked and wrong questions
                </p>
              </div>
            </div>
          </div>
          
          {/* Feature 5 */}
          <div className="border rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-indigo-100 p-1 rounded-md">
                <BarChart2 className="text-indigo-600 w-5 h-5" />
              </div>
              <div className="ml-3">
                <h3 className="font-bold">Performance by Subject</h3>
                <p className="text-gray-600 text-sm">
                  Track your progress across different topics
                </p>
              </div>
            </div>
          </div>
          
          {/* Feature 6 */}
          <div className="border rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-teal-100 p-1 rounded-md">
                <Smartphone className="text-teal-600 w-5 h-5" />
              </div>
              <div className="ml-3">
                <h3 className="font-bold">Mobile & Web Access</h3>
                <p className="text-gray-600 text-sm">
                  Study anywhere on any device
                </p>
              </div>
            </div>
          </div>
          
          {/* Feature 7 */}
          <div className="border rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-orange-100 p-1 rounded-md">
                <Clock className="text-orange-600 w-5 h-5" />
              </div>
              <div className="ml-3">
                <h3 className="font-bold">Timed exams</h3>
                <p className="text-gray-600 text-sm">
                  Practice with exam-like UI and timing
                </p>
              </div>
            </div>
          </div>
          
          {/* Feature 8 */}
          <div className="border rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-red-100 p-1 rounded-md">
                <AlertTriangle className="text-red-600 w-5 h-5" />
              </div>
              <div className="ml-3">
                <h3 className="font-bold">Find Weakest Subject</h3>
                <p className="text-gray-600 text-sm">
                  Identify areas that need more attention
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoorlyWIPModal;