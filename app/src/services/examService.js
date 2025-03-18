// // // // File: src/services/examService.js
// // // import { createClient } from '@/libs/supabase/client';

// // // /**
// // //  * Fetches all available exams from Supabase
// // //  * @returns {Promise<Array>} Array of exam objects
// // //  */
// // // export const fetchAllExams = async () => {
// // //   const supabase = createClient();
  
// // //   const { data, error } = await supabase
// // //     .from('exams')
// // //     .select(`
// // //       id,
// // //       name,
// // //       description,
// // //       slug,
// // //       icon,
// // //       color,
// // //       category_id,
// // //       is_active,
// // //       exam_categories(name)
// // //     `)
// // //     .eq('is_active', true)
// // //     .order('display_order', { ascending: true });
  
// // //   if (error) {
// // //     console.error('Error fetching exams:', error);
// // //     throw error;
// // //   }
  
// // //   return data.map(exam => ({
// // //     id: exam.id,
// // //     name: exam.name,
// // //     description: exam.description,
// // //     slug: exam.slug,
// // //     icon: exam.icon,
// // //     color: exam.color,
// // //     category: exam.exam_categories?.name || 'Uncategorized',
// // //     isActive: exam.is_active
// // //   }));
// // // };

// // // /**
// // //  * Fetches exam details by ID
// // //  * @param {string} examId - UUID of the exam
// // //  * @returns {Promise<Object>} Exam details
// // //  */
// // // export const fetchExamById = async (examId) => {
// // //   const supabase = createClient();
  
// // //   const { data, error } = await supabase
// // //     .from('exams')
// // //     .select(`
// // //       id,
// // //       name,
// // //       description,
// // //       slug,
// // //       icon,
// // //       color,
// // //       category_id,
// // //       is_active,
// // //       exam_categories(name)
// // //     `)
// // //     .eq('id', examId)
// // //     .single();
  
// // //   if (error) {
// // //     console.error(`Error fetching exam with ID ${examId}:`, error);
// // //     throw error;
// // //   }
  
// // //   return {
// // //     id: data.id,
// // //     name: data.name,
// // //     description: data.description,
// // //     slug: data.slug,
// // //     icon: data.icon,
// // //     color: data.color,
// // //     category: data.exam_categories?.name || 'Uncategorized',
// // //     isActive: data.is_active
// // //   };
// // // };

// // // /**
// // //  * Fetches all exams for a specific user, including their access level
// // //  * @param {string} userId - UUID of the user
// // //  * @returns {Promise<Array>} Array of user exam objects with access info
// // //  */
// // // export const fetchUserExams = async (userId) => {
// // //   const supabase = createClient();
  
// // //   // First get all exams
// // //   const { data: exams, error: examsError } = await supabase
// // //     .from('exams')
// // //     .select(`
// // //       id,
// // //       name,
// // //       description,
// // //       slug,
// // //       icon,
// // //       color,
// // //       is_active
// // //     `)
// // //     .eq('is_active', true)
// // //     .order('display_order', { ascending: true });
  
// // //   if (examsError) {
// // //     console.error('Error fetching exams:', examsError);
// // //     throw examsError;
// // //   }
  
// // //   if (!userId) {
// // //     // Return all exams as free if no user is authenticated
// // //     return exams.map(exam => ({
// // //       id: exam.id,
// // //       name: exam.name,
// // //       description: exam.description,
// // //       questions: 0, // No questions info without user
// // //       isPremium: false,
// // //       progress: 0,
// // //       completedQuestions: 0,
// // //       subjects: []
// // //     }));
// // //   }
  
// // //   // Get user's exam access
// // //   const { data: userAccess, error: accessError } = await supabase
// // //     .from('user_exam_access')
// // //     .select(`
// // //       exam_id,
// // //       plan_type,
// // //       is_active,
// // //       end_date
// // //     `)
// // //     .eq('user_id', userId)
// // //     .eq('is_active', true);
  
// // //   if (accessError) {
// // //     console.error('Error fetching user access:', accessError);
// // //     throw accessError;
// // //   }
  
// // //   // Get user's exam progress
// // //   const { data: userProgress, error: progressError } = await supabase
// // //     .from('user_exam_progress')
// // //     .select(`
// // //       exam_id,
// // //       answered_questions,
// // //       total_questions,
// // //       completion_percentage,
// // //       score_percentage
// // //     `)
// // //     .eq('user_id', userId);
  
// // //   if (progressError) {
// // //     console.error('Error fetching user progress:', progressError);
// // //     throw progressError;
// // //   }
  
// // //   // Get subject data for each exam
// // //   const { data: subjects, error: subjectsError } = await supabase
// // //     .from('subject_summary_with_slugs')
// // //     .select(`
// // //       exam_id,
// // //       subject,
// // //       subject_count,
// // //       slug
// // //     `)
// // //     .in('exam_id', exams.map(exam => exam.id));
  
// // //   if (subjectsError) {
// // //     console.error('Error fetching subjects:', subjectsError);
// // //     throw subjectsError;
// // //   }
  
// // //   // Group subjects by exam
// // //   const subjectsByExam = subjects.reduce((acc, subject) => {
// // //     if (!acc[subject.exam_id]) {
// // //       acc[subject.exam_id] = [];
// // //     }
// // //     acc[subject.exam_id].push(subject);
// // //     return acc;
// // //   }, {});
  
// // //   // Create access map
// // //   const accessMap = userAccess.reduce((acc, access) => {
// // //     acc[access.exam_id] = {
// // //       isPremium: true,
// // //       planType: access.plan_type,
// // //       endDate: access.end_date
// // //     };
// // //     return acc;
// // //   }, {});
  
// // //   // Create progress map
// // //   const progressMap = userProgress.reduce((acc, progress) => {
// // //     acc[progress.exam_id] = {
// // //       answeredQuestions: progress.answered_questions || 0,
// // //       totalQuestions: progress.total_questions || 0,
// // //       completionPercentage: progress.completion_percentage || 0,
// // //       scorePercentage: progress.score_percentage || 0
// // //     };
// // //     return acc;
// // //   }, {});
  
// // //   // Combine all data
// // //   return exams.map(exam => {
// // //     const access = accessMap[exam.id] || { isPremium: false };
// // //     const progress = progressMap[exam.id] || {
// // //       answeredQuestions: 0,
// // //       totalQuestions: 0,
// // //       completionPercentage: 0,
// // //       scorePercentage: 0
// // //     };
    
// // //     const examSubjects = subjectsByExam[exam.id] || [];
// // //     const totalQuestions = examSubjects.reduce((sum, subject) => sum + subject.subject_count, 0);
    
// // //     return {
// // //       id: exam.id,
// // //       name: exam.name,
// // //       questions: totalQuestions,
// // //       isPremium: access.isPremium,
// // //       progress: progress.completionPercentage,
// // //       completedQuestions: progress.answeredQuestions,
// // //       planType: access.planType,
// // //       endDate: access.endDate,
// // //       subjects: examSubjects.map((subject, index) => ({
// // //         id: index + 1,
// // //         name: subject.subject,
// // //         questions: subject.subject_count,
// // //         progress: 0,
// // //         score: 0,
// // //         slug: subject.slug
// // //       }))
// // //     };
// // //   });
// // // };

// // // /**
// // //  * Fetches available exams grouped by category
// // //  * @returns {Promise<Object>} Exam data grouped by categories
// // //  */
// // // export const fetchAvailableExamsByCategory = async () => {
// // //   const supabase = createClient();
  
// // //   // First get categories
// // //   const { data: categories, error: categoriesError } = await supabase
// // //     .from('exam_categories')
// // //     .select('*')
// // //     .eq('is_active', true)
// // //     .order('display_order', { ascending: true });
  
// // //   if (categoriesError) {
// // //     console.error('Error fetching categories:', categoriesError);
// // //     throw categoriesError;
// // //   }
  
// // //   // Then get all exams
// // //   const { data: exams, error: examsError } = await supabase
// // //     .from('exams')
// // //     .select(`
// // //       id,
// // //       name,
// // //       description,
// // //       slug,
// // //       icon,
// // //       color,
// // //       category_id,
// // //       is_active,
// // //       stripe_monthly_id,
// // //       stripe_quarterly_id,
// // //       stripe_annual_id
// // //     `)
// // //     .eq('is_active', true)
// // //     .order('display_order', { ascending: true });
  
// // //   if (examsError) {
// // //     console.error('Error fetching exams:', examsError);
// // //     throw examsError;
// // //   }
  
// // //   // Get question counts per exam
// // //   const { data: questionCounts, error: countError } = await supabase
// // //     .from('questions')
// // //     .select('exam_id, count(*)')
// // //     .eq('is_active', true)
// // //     .group('exam_id');
  
// // //   if (countError) {
// // //     console.error('Error fetching question counts:', countError);
// // //     throw countError;
// // //   }
  
// // //   // Create a map of question counts
// // //   const countMap = questionCounts.reduce((acc, item) => {
// // //     acc[item.exam_id] = parseInt(item.count);
// // //     return acc;
// // //   }, {});
  
// // //   // Group exams by category
// // //   const examsByCategory = {};
  
// // //   // Add "Uncategorized" category
// // //   examsByCategory["uncategorized"] = [];
  
// // //   // Add all categories
// // //   categories.forEach(category => {
// // //     examsByCategory[category.slug] = [];
// // //   });
  
// // //   // Group exams into their categories
// // //   exams.forEach(exam => {
// // //     const categoryObj = categories.find(c => c.id === exam.category_id);
// // //     const categorySlug = categoryObj ? categoryObj.slug : 'uncategorized';
    
// // //     examsByCategory[categorySlug].push({
// // //       id: exam.id,
// // //       name: exam.name,
// // //       description: exam.description,
// // //       questions: countMap[exam.id] || 0,
// // //       price: 9.99, // Default price, could be based on stripe product
// // //       monthlyId: exam.stripe_monthly_id,
// // //       quarterlyId: exam.stripe_quarterly_id,
// // //       annualId: exam.stripe_annual_id
// // //     });
// // //   });
  
// // //   // Remove empty categories
// // //   Object.keys(examsByCategory).forEach(category => {
// // //     if (examsByCategory[category].length === 0) {
// // //       delete examsByCategory[category];
// // //     }
// // //   });
  
// // //   return examsByCategory;
// // // };
// // /**
// //  * Fetches available exams grouped by category
// //  * @returns {Promise<Object>} Exam data grouped by categories
// //  */
// // export const fetchAvailableExamsByCategory = async () => {
// //     const supabase = createClient();
    
// //     // First get categories
// //     const { data: categories, error: categoriesError } = await supabase
// //       .from('exam_categories')
// //       .select('*')
// //       .eq('is_active', true)
// //       .order('display_order', { ascending: true });
    
// //     if (categoriesError) {
// //       console.error('Error fetching categories:', categoriesError);
// //       throw categoriesError;
// //     }
    
// //     // Then get all exams
// //     const { data: exams, error: examsError } = await supabase
// //       .from('exams')
// //       .select(`
// //         id,
// //         name,
// //         description,
// //         slug,
// //         icon,
// //         color,
// //         category_id,
// //         is_active,
// //         stripe_monthly_id,
// //         stripe_quarterly_id,
// //         stripe_annual_id
// //       `)
// //       .eq('is_active', true)
// //       .order('display_order', { ascending: true });
    
// //     if (examsError) {
// //       console.error('Error fetching exams:', examsError);
// //       throw examsError;
// //     }
    
// //     // Get question counts per exam without using group
// //     const { data: questions, error: questionsError } = await supabase
// //       .from('questions')
// //       .select('exam_id')
// //       .eq('is_active', true);
      
// //     if (questionsError) {
// //       console.error('Error fetching question counts:', questionsError);
// //       throw questionsError;
// //     }
    
// //     // Count manually
// //     const countMap = {};
// //     questions.forEach(question => {
// //       const examId = question.exam_id;
// //       if (!countMap[examId]) {
// //         countMap[examId] = 0;
// //       }
// //       countMap[examId]++;
// //     });
    
// //     // Group exams by category
// //     const examsByCategory = {};
    
// //     // Add "Uncategorized" category
// //     examsByCategory["uncategorized"] = [];
    
// //     // Add all categories
// //     categories.forEach(category => {
// //       examsByCategory[category.slug] = [];
// //     });
    
// //     // Group exams into their categories
// //     exams.forEach(exam => {
// //       const categoryObj = categories.find(c => c.id === exam.category_id);
// //       const categorySlug = categoryObj ? categoryObj.slug : 'uncategorized';
      
// //       examsByCategory[categorySlug].push({
// //         id: exam.id,
// //         name: exam.name,
// //         description: exam.description,
// //         questions: countMap[exam.id] || 0,
// //         price: 9.99, // Default price, could be based on stripe product
// //         monthlyId: exam.stripe_monthly_id,
// //         quarterlyId: exam.stripe_quarterly_id,
// //         annualId: exam.stripe_annual_id
// //       });
// //     });
    
// //     // Remove empty categories
// //     Object.keys(examsByCategory).forEach(category => {
// //       if (examsByCategory[category].length === 0) {
// //         delete examsByCategory[category];
// //       }
// //     });
    
// //     return examsByCategory;
// //   };
// // File: src/services/examService.js
// import { createClient } from '@/libs/supabase/client';

// /**
//  * Fetches all available exams from Supabase
//  * @returns {Promise<Array>} Array of exam objects
//  */
// export const fetchAllExams = async () => {
//   const supabase = createClient();
  
//   const { data, error } = await supabase
//     .from('exams')
//     .select(`
//       id,
//       name,
//       description,
//       slug,
//       icon,
//       color,
//       category_id,
//       is_active,
//       exam_categories(name)
//     `)
//     .eq('is_active', true)
//     .order('display_order', { ascending: true });
  
//   if (error) {
//     console.error('Error fetching exams:', error);
//     throw error;
//   }
  
//   return data.map(exam => ({
//     id: exam.id,
//     name: exam.name,
//     description: exam.description,
//     slug: exam.slug,
//     icon: exam.icon,
//     color: exam.color,
//     category: exam.exam_categories?.name || 'Uncategorized',
//     isActive: exam.is_active
//   }));
// };

// /**
//  * Fetches exam details by ID
//  * @param {string} examId - UUID of the exam
//  * @returns {Promise<Object>} Exam details
//  */
// export const fetchExamById = async (examId) => {
//   const supabase = createClient();
  
//   const { data, error } = await supabase
//     .from('exams')
//     .select(`
//       id,
//       name,
//       description,
//       slug,
//       icon,
//       color,
//       category_id,
//       is_active,
//       exam_categories(name)
//     `)
//     .eq('id', examId)
//     .single();
  
//   if (error) {
//     console.error(`Error fetching exam with ID ${examId}:`, error);
//     throw error;
//   }
  
//   return {
//     id: data.id,
//     name: data.name,
//     description: data.description,
//     slug: data.slug,
//     icon: data.icon,
//     color: data.color,
//     category: data.exam_categories?.name || 'Uncategorized',
//     isActive: data.is_active
//   };
// };

// /**
//  * Fetches all exams for a specific user, including their access level
//  * @param {string} userId - UUID of the user
//  * @returns {Promise<Array>} Array of user exam objects with access info
//  */
// export const fetchUserExams = async (userId) => {
//   const supabase = createClient();
  
//   // First get all exams
//   const { data: exams, error: examsError } = await supabase
//     .from('exams')
//     .select(`
//       id,
//       name,
//       description,
//       slug,
//       icon,
//       color,
//       is_active
//     `)
//     .eq('is_active', true)
//     .order('display_order', { ascending: true });
  
//   if (examsError) {
//     console.error('Error fetching exams:', examsError);
//     throw examsError;
//   }
  
//   if (!userId) {
//     // Return all exams as free if no user is authenticated
//     return exams.map(exam => ({
//       id: exam.id,
//       name: exam.name,
//       description: exam.description,
//       questions: 0, // No questions info without user
//       isPremium: false,
//       progress: 0,
//       completedQuestions: 0,
//       subjects: [
//         { id: 1, name: 'Topic 1', questions: 10, progress: 0, score: 0 },
//         { id: 2, name: 'Topic 2', questions: 10, progress: 0, score: 0 },
//         { id: 3, name: 'Topic 3', questions: 10, progress: 0, score: 0 },
//         { id: 4, name: 'Topic 4', questions: 10, progress: 0, score: 0 }
//       ]
//     }));
//   }
  
//   // Get user's exam access
//   const { data: userAccess, error: accessError } = await supabase
//     .from('user_exam_access')
//     .select(`
//       exam_id,
//       plan_type,
//       is_active,
//       end_date
//     `)
//     .eq('user_id', userId)
//     .eq('is_active', true);
  
//   if (accessError) {
//     console.error('Error fetching user access:', accessError);
//     throw accessError;
//   }
  
//   // Get user's exam progress
//   const { data: userProgress, error: progressError } = await supabase
//     .from('user_exam_progress')
//     .select(`
//       exam_id,
//       answered_questions,
//       total_questions,
//       completion_percentage,
//       score_percentage
//     `)
//     .eq('user_id', userId);
  
//   if (progressError) {
//     console.error('Error fetching user progress:', progressError);
//     throw progressError;
//   }
  
//   // Get all subjects for all exams
//   const { data: allSubjects, error: subjectsError } = await supabase
//     .from('questions')
//     .select('exam_id, subject')
//     .in('exam_id', exams.map(exam => exam.id))
//     .eq('is_active', true);
  
//   if (subjectsError) {
//     console.error('Error fetching subjects:', subjectsError);
//     throw subjectsError;
//   }
  
//   // Process subject data manually
//   const subjectsByExam = {};
//   const subjectCountByExam = {};
  
//   allSubjects.forEach(item => {
//     const examId = item.exam_id;
//     const subject = item.subject;
    
//     // Track unique subjects for each exam
//     if (!subjectsByExam[examId]) {
//       subjectsByExam[examId] = new Set();
//     }
//     subjectsByExam[examId].add(subject);
    
//     // Count questions per subject
//     if (!subjectCountByExam[examId]) {
//       subjectCountByExam[examId] = {};
//     }
//     if (!subjectCountByExam[examId][subject]) {
//       subjectCountByExam[examId][subject] = 0;
//     }
//     subjectCountByExam[examId][subject]++;
//   });
  
//   // Transform subject data into the format we need
//   const formattedSubjectsByExam = {};
//   Object.keys(subjectsByExam).forEach(examId => {
//     const subjectSet = subjectsByExam[examId];
//     formattedSubjectsByExam[examId] = Array.from(subjectSet).map((subject, index) => ({
//       id: index + 1,
//       name: subject,
//       questions: subjectCountByExam[examId][subject] || 0,
//       slug: subject.toLowerCase().replace(/\s+/g, '-'),
//       progress: 0,
//       score: 0
//     }));
//   });
  
//   // Create access map
//   const accessMap = userAccess.reduce((acc, access) => {
//     acc[access.exam_id] = {
//       isPremium: true,
//       planType: access.plan_type,
//       endDate: access.end_date
//     };
//     return acc;
//   }, {});
  
//   // Create progress map
//   const progressMap = userProgress.reduce((acc, progress) => {
//     acc[progress.exam_id] = {
//       answeredQuestions: progress.answered_questions || 0,
//       totalQuestions: progress.total_questions || 0,
//       completionPercentage: progress.completion_percentage || 0,
//       scorePercentage: progress.score_percentage || 0
//     };
//     return acc;
//   }, {});
  
//   // Combine all data
//   return exams.map(exam => {
//     const access = accessMap[exam.id] || { isPremium: false };
//     const progress = progressMap[exam.id] || {
//       answeredQuestions: 0,
//       totalQuestions: 0,
//       completionPercentage: 0,
//       scorePercentage: 0
//     };
    
//     const examSubjects = formattedSubjectsByExam[exam.id] || [
//       { id: 1, name: 'Topic 1', questions: 10, progress: 0, score: 0, slug: 'topic-1' },
//       { id: 2, name: 'Topic 2', questions: 10, progress: 0, score: 0, slug: 'topic-2' },
//       { id: 3, name: 'Topic 3', questions: 10, progress: 0, score: 0, slug: 'topic-3' },
//       { id: 4, name: 'Topic 4', questions: 10, progress: 0, score: 0, slug: 'topic-4' }
//     ];
    
//     const totalQuestions = examSubjects.reduce((sum, subject) => sum + subject.questions, 0);
    
//     return {
//       id: exam.id,
//       name: exam.name,
//       questions: totalQuestions,
//       isPremium: access.isPremium,
//       progress: progress.completionPercentage,
//       completedQuestions: progress.answeredQuestions,
//       planType: access.planType,
//       endDate: access.endDate,
//       subjects: examSubjects
//     };
//   });
// };

// /**
//  * Fetches available exams grouped by category
//  * @returns {Promise<Object>} Exam data grouped by categories
//  */
// export const fetchAvailableExamsByCategory = async () => {
//   const supabase = createClient();
  
//   // First get categories
//   const { data: categories, error: categoriesError } = await supabase
//     .from('exam_categories')
//     .select('*')
//     .eq('is_active', true)
//     .order('display_order', { ascending: true });
  
//   if (categoriesError) {
//     console.error('Error fetching categories:', categoriesError);
//     throw categoriesError;
//   }
  
//   // Then get all exams
//   const { data: exams, error: examsError } = await supabase
//     .from('exams')
//     .select(`
//       id,
//       name,
//       description,
//       slug,
//       icon,
//       color,
//       category_id,
//       is_active,
//       stripe_monthly_id,
//       stripe_quarterly_id,
//       stripe_annual_id
//     `)
//     .eq('is_active', true)
//     .order('display_order', { ascending: true });
  
//   if (examsError) {
//     console.error('Error fetching exams:', examsError);
//     throw examsError;
//   }
  
//   // Get question counts per exam without using group
//   const { data: questions, error: questionsError } = await supabase
//     .from('questions')
//     .select('exam_id')
//     .eq('is_active', true);
  
//   if (questionsError) {
//     console.error('Error fetching question counts:', questionsError);
//     throw questionsError;
//   }
  
//   // Count manually
//   const countMap = {};
//   questions.forEach(question => {
//     const examId = question.exam_id;
//     if (!countMap[examId]) {
//       countMap[examId] = 0;
//     }
//     countMap[examId]++;
//   });
  
//   // Group exams by category
//   const examsByCategory = {};
  
//   // Add "Uncategorized" category
//   examsByCategory["uncategorized"] = [];
  
//   // Add all categories
//   categories.forEach(category => {
//     examsByCategory[category.slug] = [];
//   });
  
//   // Group exams into their categories
//   exams.forEach(exam => {
//     const categoryObj = categories.find(c => c.id === exam.category_id);
//     const categorySlug = categoryObj ? categoryObj.slug : 'uncategorized';
    
//     examsByCategory[categorySlug].push({
//       id: exam.id,
//       name: exam.name,
//       description: exam.description,
//       questions: countMap[exam.id] || 0,
//       price: 9.99, // Default price, could be based on stripe product
//       monthlyId: exam.stripe_monthly_id,
//       quarterlyId: exam.stripe_quarterly_id,
//       annualId: exam.stripe_annual_id
//     });
//   });
  
//   // Remove empty categories
//   Object.keys(examsByCategory).forEach(category => {
//     if (examsByCategory[category].length === 0) {
//       delete examsByCategory[category];
//     }
//   });
  
//   return examsByCategory;
// };

// export default {
//   fetchAllExams,
//   fetchExamById,
//   fetchUserExams,
//   fetchAvailableExamsByCategory
// };
// File: src/services/examService.js
import { createClient } from '@/libs/supabase/client';

/**
 * Fetches all available exams from Supabase
 * @returns {Promise<Array>} Array of exam objects
 */
export const fetchAllExams = async () => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('exams')
    .select(`
      id,
      name,
      description,
      slug,
      icon,
      color,
      category_id,
      is_active,
      exam_categories(name)
    `)
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching exams:', error);
    throw error;
  }
  
  return data.map(exam => ({
    id: exam.id,
    name: exam.name,
    description: exam.description,
    slug: exam.slug,
    icon: exam.icon,
    color: exam.color,
    category: exam.exam_categories?.name || 'Uncategorized',
    isActive: exam.is_active
  }));
};

/**
 * Fetches exam details by ID
 * @param {string} examId - UUID of the exam
 * @returns {Promise<Object>} Exam details
 */
export const fetchExamById = async (examId) => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('exams')
    .select(`
      id,
      name,
      description,
      slug,
      icon,
      color,
      category_id,
      is_active,
      exam_categories(name)
    `)
    .eq('id', examId)
    .single();
  
  if (error) {
    console.error(`Error fetching exam with ID ${examId}:`, error);
    throw error;
  }
  
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    slug: data.slug,
    icon: data.icon,
    color: data.color,
    category: data.exam_categories?.name || 'Uncategorized',
    isActive: data.is_active
  };
};

/**
 * Fetches all exams for a specific user, including their access level
 * @param {string} userId - UUID of the user
 * @returns {Promise<Array>} Array of user exam objects with access info
 */
export const fetchUserExams = async (userId) => {
  const supabase = createClient();
  
  // First get all exams
  const { data: exams, error: examsError } = await supabase
    .from('exams')
    .select(`
      id,
      name,
      description,
      slug,
      icon,
      color,
      is_active
    `)
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  
  if (examsError) {
    console.error('Error fetching exams:', examsError);
    throw examsError;
  }
  
  // Process each exam to get its subjects and other details
  const processedExams = [];
  
  for (const exam of exams) {
    try {
      // Get unique subjects for this exam from questions table
      const { data: subjectData, error: subjectError } = await supabase
        .from('questions')
        .select('subject')
        .eq('exam_id', exam.id)
        .eq('is_active', true);
      
      if (subjectError) {
        console.error(`Error fetching subjects for exam ${exam.id}:`, subjectError);
        continue;
      }
      
      // Extract unique subjects and count questions per subject
      const subjectCounts = {};
      subjectData.forEach(q => {
        if (!subjectCounts[q.subject]) {
          subjectCounts[q.subject] = 0;
        }
        subjectCounts[q.subject]++;
      });
      
      // Format subjects
      const subjects = Object.keys(subjectCounts).map((subject, index) => ({
        id: index + 1,
        name: subject,
        questions: subjectCounts[subject],
        progress: 0,
        score: 0,
        slug: subject.toLowerCase().replace(/\s+/g, '-')
      }));
      
      // If no subjects found, add default ones for testing
      if (subjects.length === 0) {
        subjects.push(
          { id: 1, name: 'Default Subject', questions: 0, progress: 0, score: 0, slug: 'default-subject' }
        );
      }
      
      // Get user's access info if userId is provided
      let isPremium = false;
      let planType = null;
      let endDate = null;
      
      if (userId) {
        const { data: accessData, error: accessError } = await supabase
          .from('user_exam_access')
          .select('plan_type, end_date')
          .eq('user_id', userId)
          .eq('exam_id', exam.id)
          .eq('is_active', true)
          .single();
        
        if (!accessError && accessData) {
          isPremium = true;
          planType = accessData.plan_type;
          endDate = accessData.end_date;
        }
      }
      
      // Build the exam object
      const examObj = {
        id: exam.id,
        name: exam.name,
        description: exam.description,
        questions: subjects.reduce((sum, s) => sum + s.questions, 0),
        isPremium,
        progress: 0,
        completedQuestions: 0,
        planType,
        endDate,
        subjects: subjects
      };
      
      processedExams.push(examObj);
    } catch (error) {
      console.error(`Error processing exam ${exam.id}:`, error);
    }
  }
  
  return processedExams;
};

/**
 * Fetches available exams grouped by category
 * @returns {Promise<Object>} Exam data grouped by categories
 */
export const fetchAvailableExamsByCategory = async () => {
  const supabase = createClient();
  
  // First get categories
  const { data: categories, error: categoriesError } = await supabase
    .from('exam_categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  
  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError);
    throw categoriesError;
  }
  
  // Then get all exams
  const { data: exams, error: examsError } = await supabase
    .from('exams')
    .select(`
      id,
      name,
      description,
      slug,
      icon,
      color,
      category_id,
      is_active,
      stripe_monthly_id,
      stripe_quarterly_id,
      stripe_annual_id
    `)
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  
  if (examsError) {
    console.error('Error fetching exams:', examsError);
    throw examsError;
  }
  
  // Get question counts per exam without using group
  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select('exam_id')
    .eq('is_active', true);
  
  if (questionsError) {
    console.error('Error fetching question counts:', questionsError);
    throw questionsError;
  }
  
  // Count manually
  const countMap = {};
  questions.forEach(question => {
    const examId = question.exam_id;
    if (!countMap[examId]) {
      countMap[examId] = 0;
    }
    countMap[examId]++;
  });
  
  // Group exams by category
  const examsByCategory = {};
  
  // Add "Uncategorized" category
  examsByCategory["uncategorized"] = [];
  
  // Add all categories
  categories.forEach(category => {
    examsByCategory[category.slug] = [];
  });
  
  // Group exams into their categories
  exams.forEach(exam => {
    const categoryObj = categories.find(c => c.id === exam.category_id);
    const categorySlug = categoryObj ? categoryObj.slug : 'uncategorized';
    
    examsByCategory[categorySlug].push({
      id: exam.id,
      name: exam.name,
      description: exam.description,
      questions: countMap[exam.id] || 0,
      price: 9.99, // Default price, could be based on stripe product
      monthlyId: exam.stripe_monthly_id,
      quarterlyId: exam.stripe_quarterly_id,
      annualId: exam.stripe_annual_id
    });
  });
  
  // Remove empty categories
  Object.keys(examsByCategory).forEach(category => {
    if (examsByCategory[category].length === 0) {
      delete examsByCategory[category];
    }
  });
  
  return examsByCategory;
};

/**
 * Fetches all subjects for a specific exam from the questions table
 * @param {string} examId - UUID of the exam
 * @returns {Promise<Array>} Array of subject objects with name and question count
 */
export const getSubjectsForExam = async (examId) => {
  const supabase = createClient();
  
  try {
    // Get distinct subjects and count of questions for each subject
    const { data, error } = await supabase
      .from('questions')
      .select('subject, count(*)')
      .eq('exam_id', examId)
      .eq('is_active', true)
      .group('subject')
      .order('count', { ascending: false });
    
    if (error) {
      console.error('Error fetching subjects:', error);
      throw error;
    }
    
    // Transform into the expected format
    return data.map((item, index) => ({
      id: index + 1, // Generate sequential IDs
      name: item.subject,
      questions: parseInt(item.count)
    }));
  } catch (err) {
    console.error('Error in getSubjectsForExam:', err);
    // Return empty array in case of error
    return [];
  }
};

export default {
  fetchAllExams,
  fetchExamById,
  fetchUserExams,
  fetchAvailableExamsByCategory,
  getSubjectsForExam
};