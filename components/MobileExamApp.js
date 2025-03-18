// // // File: src/components/MobileExamApp.jsx
// // 'use client'
// // import React, { useState, useEffect } from 'react';
// // import Header from './Header';
// // import Navigation from './Navigation';
// // import LearnTab from './tabs/LearnTab';
// // import PracticeTab from './tabs/PracticeTab';
// // import ReviewTab from './tabs/ReviewTab';
// // import MockTab from './tabs/MockTab';
// // import SettingsTab from './tabs/SettingsTab';
// // import SubHeader from './SubHeader';
// // import ExamSelectorSheet from './ExamSelectorSheet';
// // import { initialExams, availableExams, demoContent } from '@/app/src/data/examData';

// // const MobileExamApp = () => {
// //   // State declarations
// //   const [userExams, setUserExams] = useState(initialExams);
// //   const [selectedExam, setSelectedExam] = useState(null);
// //   const [activeTab, setActiveTab] = useState('learn');
// //   const [selectedSubject, setSelectedSubject] = useState(null);
// //   const [selectedConcept, setSelectedConcept] = useState(null);
// //   const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
// //   const [navigationHistory, setNavigationHistory] = useState([]);
// //   const [showAddExam, setShowAddExam] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   // Helper function to create a new exam structure
// //   const createExamStructure = (examData) => ({
// //     id: examData.id,
// //     name: examData.name,
// //     isPremium: true,
// //     questions: examData.questions,
// //     subjects: [
// //       { id: 1, name: 'Topic 1', questions: Math.floor(examData.questions * 0.25), progress: 0, score: 0 },
// //       { id: 2, name: 'Topic 2', questions: Math.floor(examData.questions * 0.25), progress: 0, score: 0 },
// //       { id: 3, name: 'Topic 3', questions: Math.floor(examData.questions * 0.25), progress: 0, score: 0 },
// //       { id: 4, name: 'Topic 4', questions: Math.floor(examData.questions * 0.25), progress: 0, score: 0 }
// //     ]
// //   });

// //   // Handle exam selection
// //   const handleExamSelect = (value) => {
// //     const exam = userExams.find(e => e.id === value);
// //     setSelectedExam(exam);
// //     setSelectedSubject(null);
// //     setSelectedConcept(null);
// //   };

// //   // Handle tab navigation
// //   const handleTabChange = (tab) => {
// //     setActiveTab(tab);
// //     setSelectedSubject(null);
// //     setSelectedConcept(null);
// //   };

// //   // Add navigation handler
// //   const handleNavigation = (path) => {
// //     if (path === 'back') {
// //       const prevPath = navigationHistory[navigationHistory.length - 2];
// //       setNavigationHistory(prev => prev.slice(0, -1));
// //       // Handle back navigation based on current state
// //       if (selectedSubject) {
// //         setSelectedSubject(null);
// //       } else {
// //         handleTabChange(prevPath || 'learn');
// //       }
// //     } else {
// //       setNavigationHistory(prev => [...prev, path]);
// //       handleTabChange(path);
// //     }
// //   };

// //   // Timer effect 
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // Filter function for search
// //   const filterBySearch = (items, query) => {
// //     if (!query || !items) return items;
// //     const searchTerm = query.toLowerCase();
// //     return items.filter(item => {
// //       const searchableText = [
// //         item.name,
// //         item.title,
// //         item.content,
// //         item.question,
// //         item.answer,
// //         item.explanation
// //       ].filter(Boolean).join(' ').toLowerCase();
      
// //       return searchableText.includes(searchTerm);
// //     });
// //   };

// //   // Render the content based on active tab
// //   const renderContent = () => {
// //     const commonProps = {
// //       selectedExam,
// //       selectedSubject,
// //       setSelectedSubject,
// //       searchQuery,
// //       setSearchQuery,
// //       filterBySearch,
// //       demoContent,
// //       handleTabChange
// //     };

// //     switch(activeTab) {
// //       case 'learn':
// //         return <LearnTab {...commonProps} selectedConcept={selectedConcept} setSelectedConcept={setSelectedConcept} />;
// //       case 'practice':
// //         return <PracticeTab {...commonProps} timeLeft={timeLeft} />;
// //       case 'review':
// //         return <ReviewTab {...commonProps} />;
// //       case 'mock':
// //         return <MockTab {...commonProps} />;
// //       case 'settings':
// //         return (
// //           <SettingsTab 
// //             {...commonProps}
// //             userExams={userExams} 
// //             setUserExams={setUserExams} 
// //             availableExams={availableExams}
// //             createExamStructure={createExamStructure}
// //             setShowAddExam={setShowAddExam}
// //           />
// //         );
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Main Header */}
// //       <Header 
// //         activeTab={activeTab} 
// //         userExams={userExams} 
// //         handleExamSelect={handleExamSelect} 
// //         handleTabChange={handleTabChange} 
// //       />

// //       {/* Sub Header for Navigation */}
// //       {(navigationHistory.length > 1 || selectedSubject) && (
// //         <SubHeader
// //           title={selectedSubject ? selectedSubject.name : activeTab}
// //           showBack={true}
// //           onBack={() => selectedSubject ? setSelectedSubject(null) : handleNavigation('back')}
// //         />
// //       )}

// //       {/* Main content */}
// //       <div className={`pt-${(navigationHistory.length > 1 || selectedSubject) ? '28' : '16'} pb-16 container mx-auto px-4`}>
// //         <div className="max-w-6xl mx-auto">
// //           {renderContent()}
// //         </div>
// //       </div>

// //       {/* Fixed Bottom Navigation */}
// //       <Navigation activeTab={activeTab} handleTabChange={handleTabChange} />

// //       {/* Exam Selector Sheet */}
// //       <ExamSelectorSheet 
// //         showAddExam={showAddExam} 
// //         setShowAddExam={setShowAddExam} 
// //         availableExams={availableExams}
// //         handleTabChange={handleTabChange}
// //         setUserExams={setUserExams}
// //       />
// //     </div>
// //   );
// // };

// // export default MobileExamApp;
// // File: src/components/MobileExamApp.jsx
// 'use client'
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '@/app/hooks/useAuth';
// import Header from './Header';
// import Navigation from './Navigation';
// import LearnTab from './tabs/LearnTab';
// import PracticeTab from './tabs/PracticeTab';
// import ReviewTab from './tabs/ReviewTab';
// import MockTab from './tabs/MockTab';
// import SettingsTab from './tabs/SettingsTab';
// import SubHeader from './SubHeader';
// import ExamSelectorSheet from './ExamSelectorSheet';
// import { demoContent } from '@/app/src/data/examData';
// import { fetchUserExams, fetchAvailableExamsByCategory } from '@/app/src/services/examService';

// const MobileExamApp = () => {
//   // State declarations
//   const [userExams, setUserExams] = useState([]);
//   const [availableExams, setAvailableExams] = useState({});
//   const [selectedExam, setSelectedExam] = useState(null);
//   const [activeTab, setActiveTab] = useState('learn');
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [selectedConcept, setSelectedConcept] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
//   const [navigationHistory, setNavigationHistory] = useState([]);
//   const [showAddExam, setShowAddExam] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);
  
//   // Get current user from auth hook
//   const { user } = useAuth();

//   // Fetch user exams and available exams when component mounts
//   useEffect(() => {
//     const loadExams = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch user's exams if logged in, otherwise fetch demo exams
//         const userExamsData = await fetchUserExams(user?.id);
//         setUserExams(userExamsData);
        
//         // Set first exam as selected by default if one exists
//         if (userExamsData.length > 0 && !selectedExam) {
//           setSelectedExam(userExamsData[0]);
//         }
        
//         // Fetch available exams for the ExamSelectorSheet
//         const availableExamsData = await fetchAvailableExamsByCategory();
//         setAvailableExams(availableExamsData);
//       } catch (error) {
//         console.error('Error loading exams:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     loadExams();
//   }, [user]);

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

//   // Timer effect 
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Filter function for search
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

//   // Render the content based on active tab
//   const renderContent = () => {
//     if (loading) {
//       return <div className="flex justify-center items-center py-10">Loading...</div>;
//     }

//     const commonProps = {
//       selectedExam,
//       selectedSubject,
//       setSelectedSubject,
//       searchQuery,
//       setSearchQuery,
//       filterBySearch,
//       demoContent,
//       handleTabChange
//     };

//     switch(activeTab) {
//       case 'learn':
//         return <LearnTab {...commonProps} selectedConcept={selectedConcept} setSelectedConcept={setSelectedConcept} />;
//       case 'practice':
//         return <PracticeTab {...commonProps} timeLeft={timeLeft} />;
//       case 'review':
//         return <ReviewTab {...commonProps} />;
//       case 'mock':
//         return <MockTab {...commonProps} />;
//       case 'settings':
//         return (
//           <SettingsTab 
//             {...commonProps}
//             userExams={userExams} 
//             setUserExams={setUserExams} 
//             availableExams={availableExams}
//             setShowAddExam={setShowAddExam}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Main Header */}
//       <Header 
//         activeTab={activeTab} 
//         userExams={userExams} 
//         handleExamSelect={handleExamSelect} 
//         handleTabChange={handleTabChange} 
//       />

//       {/* Sub Header for Navigation */}
//       {(navigationHistory.length > 1 || selectedSubject) && (
//         <SubHeader
//           title={selectedSubject ? selectedSubject.name : activeTab}
//           showBack={true}
//           onBack={() => selectedSubject ? setSelectedSubject(null) : handleNavigation('back')}
//         />
//       )}

//       {/* Main content */}
//       <div className={`pt-${(navigationHistory.length > 1 || selectedSubject) ? '28' : '16'} pb-16 container mx-auto px-4`}>
//         <div className="max-w-6xl mx-auto">
//           {renderContent()}
//         </div>
//       </div>

//       {/* Fixed Bottom Navigation */}
//       <Navigation activeTab={activeTab} handleTabChange={handleTabChange} />

//       {/* Exam Selector Sheet */}
//       <ExamSelectorSheet 
//         showAddExam={showAddExam} 
//         setShowAddExam={setShowAddExam} 
//         availableExams={availableExams}
//         handleTabChange={handleTabChange}
//         setUserExams={setUserExams}
//       />
//     </div>
//   );
// };

// export default MobileExamApp;
// File: src/components/MobileExamApp.jsx
'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import Header from './Header';
import Navigation from './Navigation';
import LearnTab from './tabs/LearnTab';
import PracticeTab from './tabs/PracticeTab';
import ReviewTab from './tabs/ReviewTab';
import MockTab from './tabs/MockTab';
import SettingsTab from './tabs/SettingsTab';
import SubHeader from './SubHeader';
import ExamSelectorSheet from './ExamSelectorSheet';
import Debug from './Debug'; // Import the Debug component
import { demoContent } from '@/app/src/data/examData';
import { fetchUserExams, fetchAvailableExamsByCategory } from '@/app/src/services/examService';

const MobileExamApp = () => {
  // State declarations
  const [userExams, setUserExams] = useState([]);
  const [availableExams, setAvailableExams] = useState({});
  const [selectedExam, setSelectedExam] = useState(null);
  const [activeTab, setActiveTab] = useState('learn');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [showAddExam, setShowAddExam] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingUserExams, setLoadingUserExams] = useState(false); // Separate loading states
  const [loadingAvailableExams, setLoadingAvailableExams] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  
  // Get current user from auth hook
  const { user } = useAuth();

  // Check for debug mode in query params or localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check URL params
      const params = new URLSearchParams(window.location.search);
      const debugParam = params.get('debug');
      
      // Check localStorage
      const storedDebugMode = localStorage.getItem('scoorlyDebugMode');
      
      if (debugParam === 'true' || storedDebugMode === 'true') {
        setDebugMode(true);
        // Store preference
        localStorage.setItem('scoorlyDebugMode', 'true');
      }
    }
  }, []);

  // Fetch user exams when component mounts or user changes
  useEffect(() => {
    const loadUserExams = async () => {
      if (!user) return; // Don't load if no user
      
      try {
        setLoadingUserExams(true);
        // Fetch user's exams if logged in
        const userExamsData = await fetchUserExams(user?.id);
        setUserExams(userExamsData);
        
        // Set first exam as selected by default if one exists
        if (userExamsData.length > 0 && !selectedExam) {
          setSelectedExam(userExamsData[0]);
        }
      } catch (error) {
        console.error('Error loading user exams:', error);
      } finally {
        setLoadingUserExams(false);
      }
    };
    
    loadUserExams();
  }, [user]);

  // Separate effect for loading available exams (only when needed)
  useEffect(() => {
    const loadAvailableExams = async () => {
      if (Object.keys(availableExams).length > 0) return; // Skip if already loaded
      
      try {
        setLoadingAvailableExams(true);
        // Fetch available exams for the ExamSelectorSheet
        const availableExamsData = await fetchAvailableExamsByCategory();
        setAvailableExams(availableExamsData);
      } catch (error) {
        console.error('Error loading available exams:', error);
      } finally {
        setLoadingAvailableExams(false);
      }
    };
    
    // Only load available exams when the sheet is opened
    if (showAddExam && Object.keys(availableExams).length === 0) {
      loadAvailableExams();
    }
  }, [showAddExam]);

  // Handle exam selection
  const handleExamSelect = (value) => {
    const exam = userExams.find(e => e.id === value);
    setSelectedExam(exam);
    setSelectedSubject(null);
    setSelectedConcept(null);
  };

  // Handle tab navigation
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedSubject(null);
    setSelectedConcept(null);
  };

  // Add navigation handler
  const handleNavigation = (path) => {
    if (path === 'back') {
      const prevPath = navigationHistory[navigationHistory.length - 2];
      setNavigationHistory(prev => prev.slice(0, -1));
      // Handle back navigation based on current state
      if (selectedSubject) {
        setSelectedSubject(null);
      } else {
        handleTabChange(prevPath || 'learn');
      }
    } else {
      setNavigationHistory(prev => [...prev, path]);
      handleTabChange(path);
    }
  };

  // Toggle debug mode
  const toggleDebugMode = () => {
    const newMode = !debugMode;
    setDebugMode(newMode);
    localStorage.setItem('scoorlyDebugMode', newMode ? 'true' : 'false');
  };

  // Timer effect 
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter function for search
  const filterBySearch = (items, query) => {
    if (!query || !items) return items;
    const searchTerm = query.toLowerCase();
    return items.filter(item => {
      const searchableText = [
        item.name,
        item.title,
        item.content,
        item.question,
        item.answer,
        item.explanation
      ].filter(Boolean).join(' ').toLowerCase();
      
      return searchableText.includes(searchTerm);
    });
  };

  // Add a hidden debug mode shortcut
  const handleKeyDown = (event) => {
    // Ctrl+Alt+D to toggle debug mode
    if (event.ctrlKey && event.altKey && event.key === 'd') {
      toggleDebugMode();
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  // Render the content based on active tab
  const renderContent = () => {
    const commonProps = {
      selectedExam,
      selectedSubject,
      setSelectedSubject,
      selectedConcept,
      setSelectedConcept,
      searchQuery,
      setSearchQuery,
      filterBySearch,
      demoContent,
      handleTabChange,
      loading: activeTab === 'settings' ? false : loadingUserExams && userExams.length === 0
    };

    switch(activeTab) {
      case 'learn':
        return <LearnTab {...commonProps} />;
      case 'practice':
        return <PracticeTab {...commonProps} timeLeft={timeLeft} />;
      case 'review':
        return <ReviewTab {...commonProps} />;
      case 'mock':
        return <MockTab {...commonProps} />;
      case 'settings':
        return (
          <SettingsTab 
            {...commonProps}
            userExams={userExams} 
            setUserExams={setUserExams} 
            availableExams={availableExams}
            setShowAddExam={setShowAddExam}
            toggleDebugMode={toggleDebugMode}
            debugMode={debugMode}
            loading={loadingUserExams}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Header */}
      <Header 
        activeTab={activeTab} 
        userExams={userExams} 
        handleExamSelect={handleExamSelect} 
        handleTabChange={handleTabChange} 
        loading={loadingUserExams}
        setShowAddExam={setShowAddExam}
      />

      {/* Sub Header for Navigation */}
      {(navigationHistory.length > 1 || selectedSubject) && (
        <SubHeader
          title={selectedSubject ? selectedSubject.name : activeTab}
          showBack={true}
          onBack={() => selectedSubject ? setSelectedSubject(null) : handleNavigation('back')}
        />
      )}

      {/* Main content */}
      <div className={`pt-${(navigationHistory.length > 1 || selectedSubject) ? '28' : '16'} pb-16 container mx-auto px-4`}>
        <div className="max-w-6xl mx-auto">
          {renderContent()}
          
          {/* Debug component - only shown in debug mode */}
          {debugMode && <Debug selectedExam={selectedExam} />}
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <Navigation activeTab={activeTab} handleTabChange={handleTabChange} />

      {/* Exam Selector Sheet */}
      <ExamSelectorSheet 
        showAddExam={showAddExam} 
        setShowAddExam={setShowAddExam} 
        availableExams={availableExams}
        handleTabChange={handleTabChange}
        setUserExams={setUserExams}
        loading={loadingAvailableExams}
      />
      
      {/* Debug mode indicator */}
      {debugMode && (
        <div className="fixed bottom-20 right-4 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full shadow-md">
          Debug Mode
        </div>
      )}
    </div>
  );
};

export default MobileExamApp;