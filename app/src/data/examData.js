// // File: src/data/examData.js

// // Add demo exam to initial state
// export const initialExams = [
//     {
//       id: 'demo1',
//       name: 'Demo Exam',
//       isPremium: false,
//       questions: 100,
//       subjects: [
//         { id: 1, name: 'Sample Sub 1', questions: 25, progress: 40, score: 75 },
//         { id: 2, name: 'Sample Sub 2', questions: 25, progress: 0, score: 0 },
//         { id: 3, name: 'Sample Sub 3', questions: 25, progress: 0, score: 0 },
//       ]
//     }
//   ];
  
//   // Add available exams data
//   export const availableExams = {
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
  
//   // Update the demoContent structure with complete data
//   export const demoContent = {
//     subjects: [
//       {
//         id: 1,
//         name: 'Medical Assessment',
//         questions: 25,
//         concepts: [
//           { id: 1, title: 'Primary Survey', content: 'The primary survey follows the ABCDE approach...' },
//           { id: 2, title: 'Secondary Survey', content: 'The secondary survey involves a head-to-toe examination...' },
//           { id: 3, title: 'Patient History', content: 'Gathering a complete SAMPLE history...' }, { id: 1, title: 'Primary Survey', content: 'The primary survey follows the ABCDE approach...' },
//           { id: 2, title: 'Secondary Survey', content: 'The secondary survey involves a head-to-toe examination...' },
//           { id: 3, title: 'Patient History', content: 'Gathering a complete SAMPLE history...' }, { id: 1, title: 'Primary Survey', content: 'The primary survey follows the ABCDE approach...' },
//           { id: 2, title: 'Secondary Survey', content: 'The secondary survey involves a head-to-toe examination...' },
//           { id: 3, title: 'Patient History', content: 'Gathering a complete SAMPLE history...' }, { id: 1, title: 'Primary Survey', content: 'The primary survey follows the ABCDE approach...' },
//           { id: 2, title: 'Secondary Survey', content: 'The secondary survey involves a head-to-toe examination...' },
//           { id: 3, title: 'Patient History', content: 'Gathering a complete SAMPLE history...' }
//         ]
//       }
//     ],
//     reviewQuestions: {
//       correct: [
//         { id: 1, question: 'What is the normal respiratory rate for adults?', answer: '12-20 breaths per minute', status: 'correct' },
//         { id: 2, question: 'What is the normal heart rate for adults?', answer: '60-100 beats per minute', status: 'correct' }
//       ],
//       incorrect: [
//         { id: 3, question: 'Which position is best for unconscious breathing patients?', answer: 'Recovery position', status: 'incorrect' },
//         { id: 4, question: 'What is the first step in CPR?', answer: 'Check scene safety', status: 'incorrect' }
//       ],
//       flagged: [
//         { id: 5, question: 'List the signs of shock', answer: 'Pale, cold, clammy skin; rapid breathing; anxiety', status: 'flagged' },
//         { id: 6, question: 'What are the components of SAMPLE history?', answer: 'Signs/Symptoms, Allergies, Medications, Past medical history, Last oral intake, Events leading to injury/illness', status: 'flagged' }
//       ]
//     }
//   };