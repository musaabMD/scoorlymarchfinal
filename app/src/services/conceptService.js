// // // File: src/services/conceptService.js
// // import { createClient } from '@/libs/supabase/client';

// // /**
// //  * Fetches concepts (study materials) for a specific subject in an exam
// //  * @param {string} examId - UUID of the exam
// //  * @param {string} subjectName - Name of the subject
// //  * @returns {Promise<Array>} Array of concept objects
// //  */
// // export const fetchConceptsBySubject = async (examId, subjectName) => {
// //   const supabase = createClient();
  
// //   // Fetch questions that match the exam and subject
// //   const { data: questions, error } = await supabase
// //     .from('questions')
// //     .select(`
// //       id,
// //       subject,
// //       topic,
// //       text,
// //       explanation,
// //       shortquestion,
// //       shortanswer,
// //       flashcard_front,
// //       flashcard_back,
// //       note_content,
// //       difficulty_level
// //     `)
// //     .eq('exam_id', examId)
// //     .eq('subject', subjectName)
// //     .eq('is_active', true)
// //     .order('difficulty_level', { ascending: true });
  
// //   if (error) {
// //     console.error(`Error fetching concepts for subject ${subjectName}:`, error);
// //     throw error;
// //   }
  
// //   // Transform into a more consistent concept format
// //   return questions.map((question, index) => ({
// //     id: index + 1,
// //     questionId: question.id,
// //     title: question.shortquestion || question.topic || question.flashcard_front || '',
// //     content: question.note_content || question.shortanswer || question.explanation || question.flashcard_back || question.text || '',
// //     // Include all original fields for flexibility
// //     originalQuestion: question.text,
// //     explanation: question.explanation,
// //     topic: question.topic,
// //     flashcardFront: question.flashcard_front,
// //     flashcardBack: question.flashcard_back,
// //     difficulty: question.difficulty_level
// //   }));
// // };

// // /**
// //  * Fetches a count of concepts by subject for an exam
// //  * @param {string} examId - UUID of the exam
// //  * @returns {Promise<Object>} Map of subject names to concept counts
// //  */
// // export const fetchConceptCountsBySubject = async (examId) => {
// //   const supabase = createClient();
  
// //   const { data, error } = await supabase
// //     .from('questions')
// //     .select('subject, count(*)')
// //     .eq('exam_id', examId)
// //     .eq('is_active', true)
// //     .group('subject');
  
// //   if (error) {
// //     console.error(`Error fetching concept counts for exam ${examId}:`, error);
// //     throw error;
// //   }
  
// //   // Create a map of subject names to counts
// //   return data.reduce((acc, item) => {
// //     acc[item.subject] = parseInt(item.count);
// //     return acc;
// //   }, {});
// // };

// // /**
// //  * Searches across all concepts/questions in an exam
// //  * @param {string} examId - UUID of the exam
// //  * @param {string} searchQuery - Text to search for
// //  * @returns {Promise<Array>} Array of matching concept objects
// //  */
// // export const searchConcepts = async (examId, searchQuery) => {
// //   if (!searchQuery || searchQuery.trim().length < 2) {
// //     return [];
// //   }
  
// //   const supabase = createClient();
// //   const searchTerm = searchQuery.trim().toLowerCase();
  
// //   // Search across multiple text fields in questions
// //   const { data: questions, error } = await supabase
// //     .from('questions')
// //     .select(`
// //       id,
// //       subject,
// //       topic,
// //       text,
// //       explanation,
// //       shortquestion,
// //       shortanswer,
// //       flashcard_front,
// //       flashcard_back,
// //       note_content
// //     `)
// //     .eq('exam_id', examId)
// //     .eq('is_active', true)
// //     .or(`text.ilike.%${searchTerm}%,explanation.ilike.%${searchTerm}%,topic.ilike.%${searchTerm}%,shortquestion.ilike.%${searchTerm}%,shortanswer.ilike.%${searchTerm}%`);
  
// //   if (error) {
// //     console.error(`Error searching concepts:`, error);
// //     throw error;
// //   }
  
// //   return questions.map((question, index) => ({
// //     id: index + 1,
// //     questionId: question.id,
// //     subject: question.subject,
// //     title: question.shortquestion || question.topic || question.flashcard_front || '',
// //     content: question.note_content || question.shortanswer || question.explanation || question.flashcard_back || question.text || '',
// //     originalQuestion: question.text,
// //     explanation: question.explanation
// //   }));
// // };

// // export default {
// //   fetchConceptsBySubject,
// //   fetchConceptCountsBySubject,
// //   searchConcepts
// // };
// /**
//  * Fetches a count of concepts by subject for an exam
//  * @param {string} examId - UUID of the exam
//  * @returns {Promise<Object>} Map of subject names to concept counts
//  */
// export const fetchConceptCountsBySubject = async (examId) => {
//     const supabase = createClient();
    
//     // Get all questions for this exam
//     const { data, error } = await supabase
//       .from('questions')
//       .select('subject')
//       .eq('exam_id', examId)
//       .eq('is_active', true);
    
//     if (error) {
//       console.error(`Error fetching concept counts for exam ${examId}:`, error);
//       throw error;
//     }
    
//     // Count questions by subject manually
//     const subjectCounts = {};
//     data.forEach(question => {
//       const subject = question.subject;
//       if (!subjectCounts[subject]) {
//         subjectCounts[subject] = 0;
//       }
//       subjectCounts[subject]++;
//     });
    
//     return subjectCounts;
//   };
// File: src/services/conceptService.js
import { createClient } from '@/libs/supabase/client';

/**
 * Fetches concepts (study materials) for a specific subject in an exam
 * @param {string} examId - UUID of the exam
 * @param {string} subjectName - Name of the subject
 * @returns {Promise<Array>} Array of concept objects
 */
export const fetchConceptsBySubject = async (examId, subjectName) => {
  const supabase = createClient();
  
  // Fetch questions that match the exam and subject
  const { data: questions, error } = await supabase
    .from('questions')
    .select(`
      id,
      subject,
      topic,
      text,
      explanation,
      shortquestion,
      shortanswer,
      flashcard_front,
      flashcard_back,
      note_content,
      difficulty_level
    `)
    .eq('exam_id', examId)
    .eq('subject', subjectName)
    .eq('is_active', true)
    .order('difficulty_level', { ascending: true });
  
  if (error) {
    console.error(`Error fetching concepts for subject ${subjectName}:`, error);
    throw error;
  }
  
  // Transform into a more consistent concept format
  return questions.map((question, index) => ({
    id: index + 1,
    questionId: question.id,
    title: question.shortquestion || question.topic || question.flashcard_front || '',
    content: question.note_content || question.shortanswer || question.explanation || question.flashcard_back || question.text || '',
    // Include all original fields for flexibility
    originalQuestion: question.text,
    explanation: question.explanation,
    topic: question.topic,
    flashcardFront: question.flashcard_front,
    flashcardBack: question.flashcard_back,
    difficulty: question.difficulty_level
  }));
};

/**
 * Fetches a count of concepts by subject for an exam
 * @param {string} examId - UUID of the exam
 * @returns {Promise<Object>} Map of subject names to concept counts
 */
export const fetchConceptCountsBySubject = async (examId) => {
  const supabase = createClient();
  
  // Get all questions for this exam
  const { data, error } = await supabase
    .from('questions')
    .select('subject')
    .eq('exam_id', examId)
    .eq('is_active', true);
  
  if (error) {
    console.error(`Error fetching concept counts for exam ${examId}:`, error);
    throw error;
  }
  
  // Count questions by subject manually
  const subjectCounts = {};
  data.forEach(question => {
    const subject = question.subject;
    if (!subjectCounts[subject]) {
      subjectCounts[subject] = 0;
    }
    subjectCounts[subject]++;
  });
  
  return subjectCounts;
};

/**
 * Searches across all concepts/questions in an exam
 * @param {string} examId - UUID of the exam
 * @param {string} searchQuery - Text to search for
 * @returns {Promise<Array>} Array of matching concept objects
 */
export const searchConcepts = async (examId, searchQuery) => {
  if (!searchQuery || searchQuery.trim().length < 2) {
    return [];
  }
  
  const supabase = createClient();
  const searchTerm = searchQuery.trim().toLowerCase();
  
  // Search across multiple text fields in questions
  const { data: questions, error } = await supabase
    .from('questions')
    .select(`
      id,
      subject,
      topic,
      text,
      explanation,
      shortquestion,
      shortanswer,
      flashcard_front,
      flashcard_back,
      note_content
    `)
    .eq('exam_id', examId)
    .eq('is_active', true)
    .or(`text.ilike.%${searchTerm}%,explanation.ilike.%${searchTerm}%,topic.ilike.%${searchTerm}%,shortquestion.ilike.%${searchTerm}%,shortanswer.ilike.%${searchTerm}%`);
  
  if (error) {
    console.error(`Error searching concepts:`, error);
    throw error;
  }
  
  return questions.map((question, index) => ({
    id: index + 1,
    questionId: question.id,
    subject: question.subject,
    title: question.shortquestion || question.topic || question.flashcard_front || '',
    content: question.note_content || question.shortanswer || question.explanation || question.flashcard_back || question.text || '',
    originalQuestion: question.text,
    explanation: question.explanation
  }));
};

export default {
  fetchConceptsBySubject,
  fetchConceptCountsBySubject,
  searchConcepts
};