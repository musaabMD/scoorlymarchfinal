// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from "@/components/ui/input";
// import { Button } from '@/components/ui/button';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Lock, BookOpen, ChevronRight, Loader2, RefreshCw } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { fetchConceptsBySubject } from '@/app/src/services/conceptService';
// import { fetchFlashcardsBySubject } from '@/app/src/services/flashcardService';
// import { getSubjectsForExam } from '@/app/src/services/examService';

// const LearnTab = ({ 
//   selectedExam, 
//   selectedSubject, 
//   setSelectedSubject, 
//   selectedConcept,
//   setSelectedConcept,
//   searchQuery, 
//   setSearchQuery, 
//   filterBySearch, 
//   demoContent,
//   handleTabChange
// }) => {
//   // State for handling data and UI
//   const [loading, setLoading] = useState(false);
//   const [loadingSubjects, setLoadingSubjects] = useState(false);
//   const [concepts, setConcepts] = useState([]);
//   const [flashcards, setFlashcards] = useState([]);
//   const [error, setError] = useState(null);
//   const [subjectsList, setSubjectsList] = useState([]);
//   const [flippedCards, setFlippedCards] = useState({});
//   const [viewMode, setViewMode] = useState('all'); // 'all', 'flashcards', 'concepts'
  
//   // Load subjects for selected exam when it changes
//   useEffect(() => {
//     if (!selectedExam) return;
    
//     const loadSubjects = async () => {
//       setLoadingSubjects(true);
//       try {
//         // Load subjects directly from the questions table
//         const subjects = await getSubjectsForExam(selectedExam.id);
//         setSubjectsList(subjects);
//       } catch (err) {
//         console.error('Error loading subjects:', err);
//       } finally {
//         setLoadingSubjects(false);
//       }
//     };
    
//     loadSubjects();
//   }, [selectedExam]);

//   // Fetch concepts for a selected subject
//   useEffect(() => {
//     if (!selectedSubject || !selectedExam) return;
    
//     const fetchConcepts = async () => {
//       setLoading(true);
//       setError(null);
      
//       try {
//         // Always fetch data regardless of subject index for testing
//         // Fetch concepts for this subject
//         const conceptsData = await fetchConceptsBySubject(
//           selectedExam.id, 
//           selectedSubject.name
//         );
        
//         console.log('Fetched concepts:', conceptsData);
        
//         // Also fetch flashcards
//         const flashcardsData = await fetchFlashcardsBySubject(
//           selectedExam.id, 
//           selectedSubject.name
//         );
        
//         console.log('Fetched flashcards:', flashcardsData);
        
//         // Process concepts data 
//         const conceptsWithFlashcards = conceptsData.map(concept => {
//           const hasFlashcardContent = concept.flashcardFront && concept.flashcardBack;
//           return {
//             ...concept,
//             isFlashcard: hasFlashcardContent
//           };
//         });
        
//         setConcepts(conceptsWithFlashcards);
//         setFlashcards(flashcardsData || []);
        
//         // Reset flipped state for cards
//         setFlippedCards({});
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to load study materials. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchConcepts();
//   }, [selectedSubject, selectedExam, subjectsList]);
  
//   // Toggle flip state for a flashcard
//   const toggleFlip = (cardId) => {
//     setFlippedCards(prev => ({
//       ...prev,
//       [cardId]: !prev[cardId]
//     }));
//   };
  
//   // Get display items by combining concepts and flashcards
//   const getDisplayItems = () => {
//     if (concepts.length === 0 && flashcards.length === 0) return [];
    
//     // Filter based on view mode
//     if (viewMode === 'flashcards') {
//       return flashcards.map(flashcard => ({
//         id: `f-${flashcard.id}`,
//         title: flashcard.front || flashcard.title,
//         content: flashcard.back || flashcard.content,
//         type: 'flashcard',
//         originalData: flashcard
//       }));
//     }
    
//     if (viewMode === 'concepts') {
//       return concepts.map(concept => ({
//         id: `c-${concept.id}`,
//         title: concept.title,
//         content: concept.content,
//         type: 'concept',
//         originalData: concept
//       }));
//     }
    
//     // Default view (all)
//     const conceptItems = concepts.map(concept => ({
//       id: `c-${concept.id}`,
//       title: concept.title,
//       content: concept.content,
//       type: 'concept',
//       originalData: concept
//     }));
    
//     // Only include flashcards that aren't already represented in concepts
//     const conceptQuestionIds = new Set(concepts.map(c => c.questionId));
//     const uniqueFlashcards = flashcards.filter(f => !conceptQuestionIds.has(f.questionId));
    
//     const flashcardItems = uniqueFlashcards.map(flashcard => ({
//       id: `f-${flashcard.id}`,
//       title: flashcard.front || flashcard.title,
//       content: flashcard.back || flashcard.content,
//       type: 'flashcard',
//       originalData: flashcard
//     }));
    
//     return [...conceptItems, ...flashcardItems];
//   };
  
//   // Filter display items based on search
//   const getFilteredItems = () => {
//     const allItems = getDisplayItems();
//     if (!searchQuery) return allItems;
    
//     return allItems.filter(item => {
//       const titleMatch = item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase());
//       const contentMatch = item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase());
//       return titleMatch || contentMatch;
//     });
//   };

//   // Get filtered subjects
//   const subjects = selectedExam?.subjects || [];
//   const filteredSubjects = filterBySearch(subjects, searchQuery);

//   // Render subject detail view
//   if (selectedSubject) {
//     // For testing, always treat as free
//     const isFreeSubject = true;
//     const filteredItems = getFilteredItems();
//     const hasFlashcards = flashcards.length > 0;

//     console.log('Rendering view with', flashcards.length, 'flashcards and', concepts.length, 'concepts');

//     return (
//       <div className="flex flex-col h-[calc(100vh-120px)]">
//         <br />
//         <br /> 
//         <br />
//         <br />
       
//         <div className="flex-shrink-0 mb-4 bg-white">
     
          
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex gap-2">
//               <Button 
//                 variant={viewMode === 'all' ? 'default' : 'outline'} 
//                 size="sm" 
//                 onClick={() => setViewMode('all')}
//               >
//                 All Materials
//               </Button>
//               <Button 
//                 variant={viewMode === 'flashcards' ? 'default' : 'outline'} 
//                 size="sm" 
//                 onClick={() => setViewMode('flashcards')}
//                 disabled={!hasFlashcards}
//               >
//                 <RefreshCw className="h-4 w-4 mr-1" />
//                 Flashcards {hasFlashcards && `(${flashcards.length})`}
//               </Button>
//               <Button 
//                 variant={viewMode === 'concepts' ? 'default' : 'outline'} 
//                 size="sm" 
//                 onClick={() => setViewMode('concepts')}
//               >
//                 <BookOpen className="h-4 w-4 mr-1" />
//                 Concepts
//               </Button>
//             </div>
//             <Input 
//               type="search" 
//               placeholder="Search..." 
//               className="w-64"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>
        
//         <div className="flex-1 overflow-y-auto pr-2">
//           {loading ? (
//             <div className="flex justify-center items-center h-full">
//               <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
//             </div>
//           ) : error ? (
//             <Alert className="bg-red-50 border-red-200 text-red-800">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           ) : (
//             filteredItems.length > 0 ? (
//               <div className="space-y-4">
//                 {filteredItems.map((item) => (
//                   item.type === 'flashcard' ? (
//                     <Card 
//                       key={item.id} 
//                       className={`bg-white w-full border overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer 
//                         ${flippedCards[item.id] ? 'border-green-300 bg-green-50' : 'border-indigo-200 hover:border-indigo-300'}`}
//                       onClick={() => toggleFlip(item.id)}
//                     >
//                       <div className="relative">
//                         {/* Flashcard badge */}
//                         <div className="absolute top-2 right-2">
//                           <Badge className="bg-green-500">Flashcard</Badge>
//                         </div>
                        
//                         <CardContent className="p-6">
//                           <div className="flex items-start">
//                             <div className={`flex items-center justify-center min-w-8 h-8 rounded-full mr-3 
//                               ${flippedCards[item.id] ? 'bg-green-200 text-green-700' : 'bg-indigo-100 text-indigo-600'} 
//                               font-bold text-sm`}>
//                               {flippedCards[item.id] ? 'B' : 'F'}
//                             </div>
//                             <div className="flex-1">
//                               <h3 className="text-lg font-medium mb-2">
//                                 {flippedCards[item.id] ? 'Back' : 'Front'}
//                               </h3>
//                               <p className="text-gray-700 whitespace-pre-wrap">
//                                 {flippedCards[item.id] ? item.content : item.title}
//                               </p>
//                               <div className="text-sm text-gray-500 mt-3">
//                                 Click to flip card
//                               </div>
//                             </div>
//                           </div>
//                         </CardContent>
//                       </div>
//                     </Card>
//                   ) : (
//                     <Card 
//                       key={item.id} 
//                       className="bg-white w-full border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all overflow-hidden"
//                     >
//                       <CardHeader className="pb-3 flex flex-row items-center justify-between">
//                         <div className="flex items-center">
//                           <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm mr-3">
//                             #
//                           </span>
//                           <CardTitle className="text-lg font-medium line-clamp-1">
//                             {item.title}
//                           </CardTitle>
//                         </div>
//                       </CardHeader>
//                       <CardContent className="pb-4 pt-1">
//                         <div className="pl-11 pr-4">
//                           <p className="text-gray-700 whitespace-pre-wrap">{item.content}</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-10">
//                 <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
//                 <h3 className="text-lg font-medium mb-2 text-gray-600">No study materials found</h3>
//                 <p className="text-gray-500 max-w-md mx-auto mb-4">
//                   {searchQuery ? 
//                     'No matching content found for your search. Try different keywords.' : 
//                     'This subject currently has no study materials available.'
//                   }
//                 </p>
                
//                 {/* Debug information */}
//                 <div className="text-xs text-gray-400 bg-gray-50 p-4 max-w-md mx-auto rounded-md">
//                   <h4 className="font-semibold mb-1">Debug Info:</h4>
//                   <p>Exam ID: {selectedExam?.id}</p>
//                   <p>Subject: {selectedSubject?.name}</p>
//                   <p>Concepts: {concepts.length}</p>
//                   <p>Flashcards: {flashcards.length}</p>
//                   <p className="mt-2">To test this component, use the Debug tools to create test flashcards.</p>
//                 </div>
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     );
//   } else {
//     // Subjects overview
//     return (
//       <div className="space-y-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold">Learning Subjects</h2>
//           <Input 
//             type="search" 
//             placeholder="Search subjects..." 
//             className="w-64 bg-white"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         {!selectedExam ? (
//           <Alert>
//             <AlertDescription>
//               Please select an exam to view available subjects.
//             </AlertDescription>
//           </Alert>
//         ) : loadingSubjects ? (
//           <div className="flex justify-center items-center py-12">
//             <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
//           </div>
//         ) : filteredSubjects.length === 0 ? (
//           <Alert>
//             <AlertDescription>
//               No subjects found for this exam. Please try another exam or check the database.
//             </AlertDescription>
//           </Alert>
//         ) : (
//           <div className="space-y-4">
//             {filteredSubjects.map((subject, index) => (
//               <Card 
//                 key={subject.id} 
//                 className={`bg-white cursor-pointer border hover:shadow-md transition-all ${
//                   index === 0 ? 'border-indigo-200 hover:border-indigo-500' : 'border-gray-200'
//                 }`}
//                 onClick={() => setSelectedSubject(subject)} // Allow all subjects to be clicked
//               >
//                 <CardContent className="p-0">
//                   {index === 0 ? (
//                     // Free content
//                     <div className="p-6">
//                       <div className="flex items-center">
//                         <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg p-3 h-16 w-16 flex items-center justify-center mr-4">
//                           <BookOpen className="h-8 w-8" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex items-center">
//                             <h3 className="text-xl font-medium">{subject.name}</h3>
//                             <Badge className="ml-2 bg-green-500">Free</Badge>
//                           </div>
//                           <p className="text-gray-500 mt-1">{subject.questions} study cards</p>
//                         </div>
//                         <Button 
//                           className="ml-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
//                           variant="ghost"
//                         >
//                           Study Now
//                           <ChevronRight className="h-4 w-4 ml-1" />
//                         </Button>
//                       </div>
//                     </div>
//                   ) : (
//                     // All subjects now clickable for testing
//                     <div className="p-6">
//                       <div className="flex items-center">
//                         <div className="bg-gray-100 text-gray-600 rounded-lg p-3 h-16 w-16 flex items-center justify-center mr-4">
//                           <BookOpen className="h-8 w-8" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex items-center">
//                             <h3 className="text-xl font-medium">{subject.name}</h3>
//                             <Badge className="ml-2 bg-blue-500">Test Mode</Badge>
//                           </div>
//                           <p className="text-gray-500 mt-1">{subject.questions} study cards</p>
//                         </div>
//                         <Button 
//                           className="ml-4 bg-blue-50 text-blue-600 hover:bg-blue-100"
//                           variant="ghost"
//                         >
//                           View Content
//                           <ChevronRight className="h-4 w-4 ml-1" />
//                         </Button>
//                       </div>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }
// };

// export default LearnTab;
// File: src/components/tabs/LearnTab.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, BookOpen, ChevronRight, Loader2, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { fetchConceptsBySubject } from '@/app/src/services/conceptService';
import { fetchFlashcardsBySubject } from '@/app/src/services/flashcardService';
import { getSubjectsForExam } from '@/app/src/services/examService';

const LearnTab = ({ 
  selectedExam, 
  selectedSubject, 
  setSelectedSubject, 
  selectedConcept,
  setSelectedConcept,
  searchQuery, 
  setSearchQuery, 
  filterBySearch, 
  demoContent,
  handleTabChange
}) => {
  // State for handling data and UI
  const [loading, setLoading] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [concepts, setConcepts] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState(null);
  const [subjectsList, setSubjectsList] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const [viewMode, setViewMode] = useState('all'); // 'all', 'flashcards', 'concepts'
  
  // Load subjects for selected exam when it changes
  useEffect(() => {
    if (!selectedExam) return;
    
    const loadSubjects = async () => {
      setLoadingSubjects(true);
      try {
        // Load subjects directly from the questions table
        const subjects = await getSubjectsForExam(selectedExam.id);
        setSubjectsList(subjects);
      } catch (err) {
        console.error('Error loading subjects:', err);
      } finally {
        setLoadingSubjects(false);
      }
    };
    
    loadSubjects();
  }, [selectedExam]);

  // Fetch concepts for a selected subject
  useEffect(() => {
    if (!selectedSubject || !selectedExam) return;
    
    const fetchConcepts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Always fetch data regardless of subject index for testing
        // Fetch concepts for this subject
        const conceptsData = await fetchConceptsBySubject(
          selectedExam.id, 
          selectedSubject.name
        );
        
        console.log('Fetched concepts:', conceptsData);
        
        // Also fetch flashcards
        const flashcardsData = await fetchFlashcardsBySubject(
          selectedExam.id, 
          selectedSubject.name
        );
        
        console.log('Fetched flashcards:', flashcardsData);
        
        // Process concepts data 
        const conceptsWithFlashcards = conceptsData.map(concept => {
          const hasFlashcardContent = concept.flashcardFront && concept.flashcardBack;
          return {
            ...concept,
            isFlashcard: hasFlashcardContent
          };
        });
        
        setConcepts(conceptsWithFlashcards);
        setFlashcards(flashcardsData || []);
        
        // Reset flipped state for cards
        setFlippedCards({});
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load study materials. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchConcepts();
  }, [selectedSubject, selectedExam, subjectsList]);
  
  // Toggle flip state for a flashcard
  const toggleFlip = (cardId) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };
  
  // Get display items by combining concepts and flashcards
  const getDisplayItems = () => {
    if (concepts.length === 0 && flashcards.length === 0) return [];
    
    // Filter based on view mode
    if (viewMode === 'flashcards') {
      return flashcards.map(flashcard => ({
        id: `f-${flashcard.id}`,
        title: flashcard.front || flashcard.title,
        content: flashcard.back || flashcard.content,
        type: 'flashcard',
        originalData: flashcard
      }));
    }
    
    if (viewMode === 'concepts') {
      return concepts.map(concept => ({
        id: `c-${concept.id}`,
        title: concept.title,
        content: concept.content,
        type: 'concept',
        originalData: concept
      }));
    }
    
    // Default view (all)
    const conceptItems = concepts.map(concept => ({
      id: `c-${concept.id}`,
      title: concept.title,
      content: concept.content,
      type: 'concept',
      originalData: concept
    }));
    
    // Only include flashcards that aren't already represented in concepts
    const conceptQuestionIds = new Set(concepts.map(c => c.questionId));
    const uniqueFlashcards = flashcards.filter(f => !conceptQuestionIds.has(f.questionId));
    
    const flashcardItems = uniqueFlashcards.map(flashcard => ({
      id: `f-${flashcard.id}`,
      title: flashcard.front || flashcard.title,
      content: flashcard.back || flashcard.content,
      type: 'flashcard',
      originalData: flashcard
    }));
    
    return [...conceptItems, ...flashcardItems];
  };
  
  // Filter display items based on search
  const getFilteredItems = () => {
    const allItems = getDisplayItems();
    if (!searchQuery) return allItems;
    
    return allItems.filter(item => {
      const titleMatch = item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const contentMatch = item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase());
      return titleMatch || contentMatch;
    });
  };

  // Get filtered subjects
  const subjects = selectedExam?.subjects || [];
  const filteredSubjects = filterBySearch(subjects, searchQuery);

  // Render subject detail view
  if (selectedSubject) {
    // For testing, always treat as free
    const isFreeSubject = true;
    const filteredItems = getFilteredItems();
    const hasFlashcards = flashcards.length > 0;

    console.log('Rendering view with', flashcards.length, 'flashcards and', concepts.length, 'concepts');

    return (
      <div>
        {/* Toolbar with view mode selector and search */}
        <div className="bg-white p-4 mb-4 border border-gray-200 rounded-lg sticky top-16 z-20">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={viewMode === 'all' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setViewMode('all')}
              >
                All Materials
              </Button>
              <Button 
                variant={viewMode === 'flashcards' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setViewMode('flashcards')}
                disabled={!hasFlashcards}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Flashcards {hasFlashcards && `(${flashcards.length})`}
              </Button>
              <Button 
                variant={viewMode === 'concepts' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setViewMode('concepts')}
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Concepts
              </Button>
            </div>
            <Input 
              type="search" 
              placeholder="Search..." 
              className="w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
          ) : error ? (
            <Alert className="bg-red-50 border-red-200 text-red-800">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            filteredItems.length > 0 ? (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  item.type === 'flashcard' ? (
                    <Card 
                      key={item.id} 
                      className={`bg-white w-full border overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer 
                        ${flippedCards[item.id] ? 'border-green-300 bg-green-50' : 'border-indigo-200 hover:border-indigo-300'}`}
                      onClick={() => toggleFlip(item.id)}
                    >
                      <div className="relative">
                        {/* Flashcard badge */}
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500">Flashcard</Badge>
                        </div>
                        
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <div className={`flex items-center justify-center min-w-8 h-8 rounded-full mr-3 
                              ${flippedCards[item.id] ? 'bg-green-200 text-green-700' : 'bg-indigo-100 text-indigo-600'} 
                              font-bold text-sm`}>
                              {flippedCards[item.id] ? 'B' : 'F'}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-medium mb-2">
                                {flippedCards[item.id] ? 'Back' : 'Front'}
                              </h3>
                              <p className="text-gray-700 whitespace-pre-wrap">
                                {flippedCards[item.id] ? item.content : item.title}
                              </p>
                              <div className="text-sm text-gray-500 mt-3">
                                Click to flip card
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ) : (
                    <Card 
                      key={item.id} 
                      className="bg-white w-full border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all overflow-hidden"
                    >
                      <CardHeader className="pb-3 flex flex-row items-center justify-between">
                        <div className="flex items-center">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm mr-3">
                            #
                          </span>
                          <CardTitle className="text-lg font-medium line-clamp-1">
                            {item.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4 pt-1">
                        <div className="pl-11 pr-4">
                          <p className="text-gray-700 whitespace-pre-wrap">{item.content}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2 text-gray-600">No study materials found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-4">
                  {searchQuery ? 
                    'No matching content found for your search. Try different keywords.' : 
                    'This subject currently has no study materials available.'
                  }
                </p>
                
                {/* Debug information */}
                <div className="text-xs text-gray-400 bg-gray-50 p-4 max-w-md mx-auto rounded-md">
                  <h4 className="font-semibold mb-1">Debug Info:</h4>
                  <p>Exam ID: {selectedExam?.id}</p>
                  <p>Subject: {selectedSubject?.name}</p>
                  <p>Concepts: {concepts.length}</p>
                  <p>Flashcards: {flashcards.length}</p>
                  <p className="mt-2">To test this component, use the Debug tools to create test flashcards.</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  } else {
    // Subjects overview
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Learning Subjects</h2>
          <Input 
            type="search" 
            placeholder="Search subjects..." 
            className="w-64 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {!selectedExam ? (
          <Alert>
            <AlertDescription>
              Please select an exam to view available subjects.
            </AlertDescription>
          </Alert>
        ) : loadingSubjects ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        ) : filteredSubjects.length === 0 ? (
          <Alert>
            <AlertDescription>
              No subjects found for this exam. Please try another exam or check the database.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            {filteredSubjects.map((subject, index) => (
              <Card 
                key={subject.id} 
                className={`bg-white cursor-pointer border hover:shadow-md transition-all ${
                  index === 0 ? 'border-indigo-200 hover:border-indigo-500' : 'border-gray-200'
                }`}
                onClick={() => setSelectedSubject(subject)} // Allow all subjects to be clicked
              >
                <CardContent className="p-0">
                  {index === 0 ? (
                    // Free content
                    <div className="p-6">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg p-3 h-16 w-16 flex items-center justify-center mr-4">
                          <BookOpen className="h-8 w-8" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-xl font-medium">{subject.name}</h3>
                            <Badge className="ml-2 bg-green-500">Free</Badge>
                          </div>
                          <p className="text-gray-500 mt-1">{subject.questions} study cards</p>
                        </div>
                        <Button 
                          className="ml-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                          variant="ghost"
                        >
                          Study Now
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // All subjects now clickable for testing
                    <div className="p-6">
                      <div className="flex items-center">
                        <div className="bg-gray-100 text-gray-600 rounded-lg p-3 h-16 w-16 flex items-center justify-center mr-4">
                          <BookOpen className="h-8 w-8" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-xl font-medium">{subject.name}</h3>
                            <Badge className="ml-2 bg-blue-500">Test Mode</Badge>
                          </div>
                          <p className="text-gray-500 mt-1">{subject.questions} study cards</p>
                        </div>
                        <Button 
                          className="ml-4 bg-blue-50 text-blue-600 hover:bg-blue-100"
                          variant="ghost"
                        >
                          View Content
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
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
  }
};

export default LearnTab;