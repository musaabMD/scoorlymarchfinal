// // // File: src/components/Navigation.jsx
// // import React from 'react';
// // import { BookOpen, Brain, CheckCircle, BookmarkCheck, Settings } from 'lucide-react';

// // const Navigation = ({ activeTab, handleTabChange }) => {
// //   return (
// //     <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50">
// //       <button 
// //         className={`flex flex-col items-center py-2 px-1 ${activeTab === 'learn' ? 'text-indigo-600' : 'text-gray-500'}`}
// //         onClick={() => handleTabChange('learn')}
// //       >
// //         <BookOpen className="h-5 w-5" />
// //         <span className="text-xs mt-1">Learn</span>
// //       </button>
      
// //       <button 
// //         className={`flex flex-col items-center py-2 px-1 ${activeTab === 'practice' ? 'text-indigo-600' : 'text-gray-500'}`}
// //         onClick={() => handleTabChange('practice')}
// //       >
// //         <Brain className="h-5 w-5" />
// //         <span className="text-xs mt-1">Practice</span>
// //       </button>
      
// //       <button 
// //         className={`flex flex-col items-center py-2 px-1 ${activeTab === 'review' ? 'text-indigo-600' : 'text-gray-500'}`}
// //         onClick={() => handleTabChange('review')}
// //       >
// //         <CheckCircle className="h-5 w-5" />
// //         <span className="text-xs mt-1">Review</span>
// //       </button>
      
// //       <button 
// //         className={`flex flex-col items-center py-2 px-1 ${activeTab === 'mock' ? 'text-indigo-600' : 'text-gray-500'}`}
// //         onClick={() => handleTabChange('mock')}
// //       >
// //         <BookmarkCheck className="h-5 w-5" />
// //         <span className="text-xs mt-1">Mock</span>
// //       </button>
      
// //       <button 
// //         className={`flex flex-col items-center py-2 px-1 ${activeTab === 'settings' ? 'text-indigo-600' : 'text-gray-500'}`}
// //         onClick={() => handleTabChange('settings')}
// //       >
// //         <Settings className="h-5 w-5" />
// //         <span className="text-xs mt-1">Settings</span>
// //       </button>
// //     </div>
// //   );
// // };

// // export default Navigation;
// // File: src/components/Navigation.jsx
// import React from 'react';
// import { BookOpen, Brain, CheckCircle, BookmarkCheck, Settings } from 'lucide-react';

// const Navigation = ({ activeTab, handleTabChange }) => {
//   const tabs = [
//     {
//       id: 'learn',
//       label: 'Learn',
//       icon: BookOpen
//     },
//     {
//       id: 'practice',
//       label: 'Practice',
//       icon: Brain
//     },
//     {
//       id: 'review',
//       label: 'Review',
//       icon: CheckCircle
//     },
//     {
//       id: 'mock',
//       label: 'Mock',
//       icon: BookmarkCheck
//     },
//     {
//       id: 'settings',
//       label: 'Settings',
//       icon: Settings
//     }
//   ];

//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
//       <div className="container mx-auto">
//         <div className="flex justify-around items-center h-16">
//           {tabs.map(tab => {
//             const Icon = tab.icon;
//             return (
//               <button
//                 key={tab.id}
//                 className={`flex flex-col items-center py-2 px-1 transition-colors ${
//                   activeTab === tab.id ? 'text-indigo-600' : 'text-gray-500'
//                 }`}
//                 onClick={() => handleTabChange(tab.id)}
//                 aria-label={tab.label}
//                 aria-current={activeTab === tab.id ? 'page' : undefined}
//               >
//                 <Icon className={`h-5 w-5 ${
//                   activeTab === tab.id ? 'animate-pulse' : ''
//                 }`} />
//                 <span className="text-xs mt-1">{tab.label}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navigation;
import React from 'react';
import { Home, BookOpen, Brain, CheckCircle, BookmarkCheck, Settings } from 'lucide-react';

const Navigation = ({ activeTab, handleTabChange }) => {
  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: Home
    },
    {
      id: 'learn',
      label: 'Learn',
      icon: BookOpen
    },
    {
      id: 'practice',
      label: 'Practice',
      icon: Brain
    },
    {
      id: 'review',
      label: 'Review',
      icon: CheckCircle
    },
    {
      id: 'mock',
      label: 'Mock',
      icon: BookmarkCheck
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="container mx-auto">
        <div className="flex justify-around items-center h-16">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`flex flex-col items-center py-2 px-1 transition-colors ${
                  activeTab === tab.id ? 'text-indigo-600' : 'text-gray-500'
                }`}
                onClick={() => handleTabChange(tab.id)}
                aria-label={tab.label}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                <Icon className={`h-5 w-5 ${
                  activeTab === tab.id ? 'animate-pulse' : ''
                }`} />
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navigation;