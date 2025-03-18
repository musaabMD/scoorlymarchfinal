// // File: src/components/ExamSelectorSheet.jsx
// import React, { useState } from 'react';
// import { Sheet, SheetContent } from "@/components/ui/sheet";
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { XCircle, Loader2, Search, Info } from 'lucide-react';
// import { useAuth } from '@/app/hooks/useAuth';
// import { createClient } from '@/libs/supabase/client';
// import { Input } from "@/components/ui/input";

// const ExamSelectorSheet = ({ showAddExam, setShowAddExam, availableExams, handleTabChange, setUserExams, loading = false }) => {
//   const { user } = useAuth();
//   const supabase = createClient();
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Function to handle adding the exam directly in this component
//   const handleAddExam = async (exam) => {
//     try {
//       // Create a new exam structure with a unique ID and proper properties
//       const newExam = {
//         id: exam.id,
//         name: exam.name,
//         questions: exam.questions,
//         isPremium: false,
//         progress: 0,
//         completedQuestions: 0,
//         subjects: [
//           { id: 1, name: 'Topic 1', questions: Math.floor(exam.questions * 0.25), progress: 0, score: 0 },
//           { id: 2, name: 'Topic 2', questions: Math.floor(exam.questions * 0.25), progress: 0, score: 0 },
//           { id: 3, name: 'Topic 3', questions: Math.floor(exam.questions * 0.25), progress: 0, score: 0 },
//           { id: 4, name: 'Topic 4', questions: Math.floor(exam.questions * 0.25), progress: 0, score: 0 }
//         ]
//       };
      
//       // If user is logged in, save to database
//       if (user) {
//         // Check if the user already has access to this exam
//         const { data: existingAccess } = await supabase
//           .from('user_exam_access')
//           .select('*')
//           .eq('user_id', user.id)
//           .eq('exam_id', exam.id)
//           .single();
        
//         if (!existingAccess) {
//           // Add demo access to the database
//           const now = new Date();
//           const endDate = new Date();
//           endDate.setDate(now.getDate() + 30); // 30 day trial
          
//           await supabase.from('user_exam_access').insert({
//             user_id: user.id,
//             exam_id: exam.id,
//             plan_type: 'demo',
//             start_date: now.toISOString(),
//             end_date: endDate.toISOString(),
//             is_active: true
//           });
//         }
//       }
      
//       // Add it to user's exams in state
//       setUserExams(prev => {
//         // Check if the exam is already in the list
//         const exists = prev.some(e => e.id === newExam.id);
//         if (exists) {
//           return prev;
//         }
//         return [...prev, newExam];
//       });
      
//       // Clear search query
//       setSearchQuery('');
      
//       // Close the sheet
//       setShowAddExam(false);
//     } catch (error) {
//       console.error('Error adding exam:', error);
//     }
//   };

//   // Filter exams based on search query
//   const filterExams = (exams) => {
//     if (!searchQuery) return exams;
    
//     const query = searchQuery.toLowerCase();
//     const filteredExams = {};
    
//     Object.entries(exams).forEach(([category, categoryExams]) => {
//       const filtered = categoryExams.filter(exam => 
//         exam.name.toLowerCase().includes(query) || 
//         category.toLowerCase().includes(query)
//       );
      
//       if (filtered.length > 0) {
//         filteredExams[category] = filtered;
//       }
//     });
    
//     return filteredExams;
//   };

//   // Render loading state
//   const renderLoadingContent = () => (
//     <div className="py-10 flex flex-col items-center justify-center text-gray-500">
//       <Loader2 className="h-8 w-8 animate-spin mb-4" />
//       <p>Loading available exams...</p>
//     </div>
//   );
  
//   // Render exams content
//   const renderExamsContent = () => {
//     const filteredExams = filterExams(availableExams);
    
//     if (Object.keys(availableExams).length === 0) {
//       return (
//         <div className="py-10 text-center text-gray-500">
//           <p>No exams available at this time.</p>
//           <p className="text-sm mt-2">Please check back later.</p>
//         </div>
//       );
//     }
    
//     if (Object.keys(filteredExams).length === 0) {
//       return (
//         <div className="py-10 text-center text-gray-500">
//           <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
//           <p>No exams found matching "{searchQuery}"</p>
//           <p className="text-sm mt-2">Try a different search term</p>
//         </div>
//       );
//     }
    
//     return Object.entries(filteredExams).map(([category, exams]) => (
//       <div key={category} className="space-y-3 mb-6">
//         <h4 className="font-medium capitalize">{category.replace('-', ' ')}</h4>
//         {exams.map(exam => (
//           <Card key={exam.id} className="bg-white">
//             <CardContent className="p-4">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="font-medium">{exam.name}</p>
//                   <p className="text-sm text-gray-500">{exam.questions} questions</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <Button
//                     onClick={() => handleAddExam(exam)}
//                     className="bg-white hover:bg-gray-100 text-black border border-black"
//                   >
//                     Add Exam (Demo)
//                   </Button>
//                   <Button
//                     onClick={() => handleTabChange('settings')}
//                     className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
//                   >
//                     ${exam.price}
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     ));
//   };
  
//   return (
//     <Sheet open={showAddExam} onOpenChange={setShowAddExam}>
//       <SheetContent className="w-full sm:max-w-md p-0 overflow-hidden flex flex-col">
//         <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
//           <h3 className="text-lg font-medium">Add New Exam</h3>
//           <Button variant="ghost" size="sm" onClick={() => setShowAddExam(false)} className="h-8 w-8 p-0">
//             <XCircle className="h-5 w-5" />
//           </Button>
//         </div>
        
//         <div className="px-4 py-2 border-b border-gray-200 sticky top-14 bg-white z-10">
//           <div className="relative">
//             <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
//             <Input
//               type="text"
//               placeholder="Search exams..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-8 h-9"
//             />
//             {searchQuery && (
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 className="absolute right-1 top-1 h-7 w-7 p-0"
//                 onClick={() => setSearchQuery('')}
//               >
//                 <XCircle className="h-4 w-4" />
//               </Button>
//             )}
//           </div>
//         </div>
        
//         <div className="flex-1 overflow-y-auto p-4">
//           {loading ? renderLoadingContent() : renderExamsContent()}
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// };

// export default ExamSelectorSheet;
// File: src/components/ExamSelectorSheet.jsx
import React, { useState } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, Loader2, Search, Info } from 'lucide-react';
import { useAuth } from '@/app/hooks/useAuth';
import { createClient } from '@/libs/supabase/client';
import { Input } from "@/components/ui/input";

const ExamSelectorSheet = ({ showAddExam, setShowAddExam, availableExams, handleTabChange, setUserExams, loading = false }) => {
  const { user } = useAuth();
  const supabase = createClient();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Function to handle adding the exam directly in this component
  const handleAddExam = async (exam) => {
    try {
      // Create a new exam structure with a unique ID and proper properties
      const newExam = {
        id: exam.id,
        name: exam.name,
        questions: exam.questions,
        isPremium: false,
        progress: 0,
        completedQuestions: 0,
        subjects: [
          { id: 1, name: 'Topic 1', questions: Math.floor(exam.questions * 0.25), progress: 0, score: 0 },
          { id: 2, name: 'Topic 2', questions: Math.floor(exam.questions * 0.25), progress: 0, score: 0 },
          { id: 3, name: 'Topic 3', questions: Math.floor(exam.questions * 0.25), progress: 0, score: 0 },
          { id: 4, name: 'Topic 4', questions: Math.floor(exam.questions * 0.25), progress: 0, score: 0 }
        ]
      };
      
      // If user is logged in, save to database
      if (user) {
        // Check if the user already has access to this exam
        const { data: existingAccess } = await supabase
          .from('user_exam_access')
          .select('*')
          .eq('user_id', user.id)
          .eq('exam_id', exam.id)
          .single();
        
        if (!existingAccess) {
          // Add demo access to the database
          const now = new Date();
          const endDate = new Date();
          endDate.setDate(now.getDate() + 30); // 30 day trial
          
          await supabase.from('user_exam_access').insert({
            user_id: user.id,
            exam_id: exam.id,
            plan_type: 'demo',
            start_date: now.toISOString(),
            end_date: endDate.toISOString(),
            is_active: true
          });
        }
      }
      
      // Add it to user's exams in state
      setUserExams(prev => {
        // Check if the exam is already in the list
        const exists = prev.some(e => e.id === newExam.id);
        if (exists) {
          return prev;
        }
        return [...prev, newExam];
      });
      
      // Clear search query
      setSearchQuery('');
      
      // Close the sheet
      setShowAddExam(false);
    } catch (error) {
      console.error('Error adding exam:', error);
    }
  };

  // Filter exams based on search query
  const filterExams = (exams) => {
    if (!searchQuery) return exams;
    
    const query = searchQuery.toLowerCase();
    const filteredExams = {};
    
    Object.entries(exams).forEach(([category, categoryExams]) => {
      const filtered = categoryExams.filter(exam => 
        exam.name.toLowerCase().includes(query) || 
        category.toLowerCase().includes(query)
      );
      
      if (filtered.length > 0) {
        filteredExams[category] = filtered;
      }
    });
    
    return filteredExams;
  };

  // Render loading state
  const renderLoadingContent = () => (
    <div className="py-10 flex flex-col items-center justify-center text-gray-500">
      <Loader2 className="h-8 w-8 animate-spin mb-4" />
      <p>Loading available exams...</p>
    </div>
  );
  
  // Render exams content
  const renderExamsContent = () => {
    const filteredExams = filterExams(availableExams);
    
    if (Object.keys(availableExams).length === 0) {
      return (
        <div className="py-10 text-center text-gray-500">
          <p>No exams available at this time.</p>
          <p className="text-sm mt-2">Please check back later.</p>
        </div>
      );
    }
    
    if (Object.keys(filteredExams).length === 0) {
      return (
        <div className="py-10 text-center text-gray-500">
          <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No exams found matching &quot;{searchQuery}&quot;</p>
          <p className="text-sm mt-2">Try a different search term</p>
        </div>
      );
    }
    
    return Object.entries(filteredExams).map(([category, exams]) => (
      <div key={category} className="space-y-3 mb-6">
        <h4 className="font-medium capitalize">{category.replace('-', ' ')}</h4>
        {exams.map(exam => (
          <Card key={exam.id} className="bg-white">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{exam.name}</p>
                  <p className="text-sm text-gray-500">{exam.questions} questions</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAddExam(exam)}
                    className="bg-white hover:bg-gray-100 text-black border border-black"
                  >
                    Add Exam (Demo)
                  </Button>
                  <Button
                    onClick={() => handleTabChange('settings')}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  >
                    ${exam.price}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    ));
  };
  
  return (
    <Sheet open={showAddExam} onOpenChange={setShowAddExam}>
      <SheetContent className="w-full sm:max-w-md p-0 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-lg font-medium">Add New Exam</h3>
          <Button variant="ghost" size="sm" onClick={() => setShowAddExam(false)} className="h-8 w-8 p-0">
            <XCircle className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="px-4 py-2 border-b border-gray-200 sticky top-14 bg-white z-10">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search exams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9"
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-1 top-1 h-7 w-7 p-0"
                onClick={() => setSearchQuery('')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? renderLoadingContent() : renderExamsContent()}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ExamSelectorSheet;