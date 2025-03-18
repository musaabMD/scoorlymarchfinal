// // File: src/services/flashcardService.js
// import { createClient } from '@/libs/supabase/client';

// /**
//  * Fetches flashcards for a specific subject in an exam
//  * @param {string} examId - UUID of the exam
//  * @param {string} subjectName - Name of the subject
//  * @returns {Promise<Array>} Array of flashcard objects
//  */
// export const fetchFlashcardsBySubject = async (examId, subjectName) => {
//   const supabase = createClient();
//   let flashcards = [];

//   try {
//     // First try to fetch dedicated flashcards
//     const { data: dedicatedFlashcards, error: flashcardsError } = await supabase
//       .from('flashcards')
//       .select('*')
//       .eq('exam_id', examId);
    
//     if (flashcardsError) {
//       console.error(`Error fetching dedicated flashcards:`, flashcardsError);
//       // Continue to get flashcards from questions even if this fails
//     } else if (dedicatedFlashcards && dedicatedFlashcards.length > 0) {
//       // If we have dedicated flashcards, filter by subject if needed
//       let relevantFlashcards = dedicatedFlashcards;
      
//       if (subjectName && dedicatedFlashcards.length > 0) {
//         // If they have question_id, we can join with questions to filter by subject
//         const flashcardsWithQuestionIds = dedicatedFlashcards.filter(f => f.question_id);
        
//         if (flashcardsWithQuestionIds.length > 0) {
//           const questionIds = flashcardsWithQuestionIds.map(f => f.question_id);
          
//           const { data: questions } = await supabase
//             .from('questions')
//             .select('id, subject')
//             .in('id', questionIds)
//             .eq('subject', subjectName);
          
//           const subjectQuestionIds = new Set(questions.map(q => q.id));
          
//           relevantFlashcards = dedicatedFlashcards.filter(f => 
//             !f.question_id || subjectQuestionIds.has(f.question_id)
//           );
//         }
//       }
      
//       flashcards = relevantFlashcards.map((card, index) => ({
//         id: index + 1,
//         flashcardId: card.id,
//         front: card.front,
//         back: card.back,
//         questionId: card.question_id,
//         examId: card.exam_id
//       }));
//     }
    
//     // Then get flashcards from questions table (as backup or additional source)
//     const { data: questions, error: questionsError } = await supabase
//       .from('questions')
//       .select(`
//         id,
//         subject,
//         topic,
//         flashcard_front,
//         flashcard_back
//       `)
//       .eq('exam_id', examId)
//       .eq('subject', subjectName)
//       .eq('is_active', true)
//       .not('flashcard_front', 'is', null)
//       .not('flashcard_back', 'is', null);
    
//     if (questionsError) {
//       console.error(`Error fetching question flashcards:`, questionsError);
//       // If we have flashcards from the first attempt, return those
//       if (flashcards.length > 0) {
//         return flashcards;
//       }
//       throw questionsError;
//     }
    
//     // Filter out any questions that don't have both front and back content
//     const validQuestionFlashcards = questions.filter(q => 
//       q.flashcard_front && q.flashcard_front.trim() !== '' && 
//       q.flashcard_back && q.flashcard_back.trim() !== ''
//     );
    
//     // Create flashcards from questions data
//     const questionFlashcards = validQuestionFlashcards.map((question, index) => ({
//       id: `q${index + 1}`,
//       questionId: question.id,
//       front: question.flashcard_front,
//       back: question.flashcard_back,
//       subject: question.subject,
//       topic: question.topic
//     }));
    
//     // Avoid duplicates by filtering out any question flashcards that match existing ones
//     const existingQuestionIds = new Set(flashcards.map(f => f.questionId).filter(Boolean));
//     const uniqueQuestionFlashcards = questionFlashcards.filter(f => 
//       !f.questionId || !existingQuestionIds.has(f.questionId)
//     );
    
//     // Combine both types of flashcards
//     return [...flashcards, ...uniqueQuestionFlashcards];
    
//   } catch (error) {
//     console.error(`Error in fetchFlashcardsBySubject:`, error);
//     throw error;
//   }
// };

// /**
//  * Creates a new flashcard
//  * @param {Object} flashcardData - The flashcard data to save
//  * @returns {Promise<Object>} The newly created flashcard
//  */
// export const createFlashcard = async (flashcardData) => {
//   const supabase = createClient();
  
//   // Make sure we have at least the required fields
//   if (!flashcardData.front || !flashcardData.back || !flashcardData.exam_id) {
//     throw new Error('Missing required flashcard data (front, back, exam_id)');
//   }
  
//   const { data, error } = await supabase
//     .from('flashcards')
//     .insert({
//       ...flashcardData,
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString()
//     })
//     .select()
//     .single();
  
//   if (error) {
//     console.error(`Error creating flashcard:`, error);
//     throw error;
//   }
  
//   return data;
// };

// export default {
//   fetchFlashcardsBySubject,
//   createFlashcard
// };
// File: src/services/flashcardService.js
import { createClient } from '@/libs/supabase/client';

/**
 * Fetches flashcards for a specific subject in an exam
 * @param {string} examId - UUID of the exam
 * @param {string} subjectName - Name of the subject
 * @returns {Promise<Array>} Array of flashcard objects
 */
export const fetchFlashcardsBySubject = async (examId, subjectName) => {
  const supabase = createClient();
  let flashcards = [];

  try {
    // Approach 1: Get flashcards from the dedicated flashcards table first
    const { data: dedicatedFlashcards, error: flashcardsError } = await supabase
      .from('flashcards')
      .select(`
        id,
        front,
        back,
        question_id,
        exam_id
      `)
      .eq('exam_id', examId);
    
    if (flashcardsError) {
      console.error(`Error fetching dedicated flashcards:`, flashcardsError);
    } else if (dedicatedFlashcards && dedicatedFlashcards.length > 0) {
      // If we have question IDs, we can filter by subject
      if (subjectName) {
        // Get the question IDs for the specified subject
        const { data: subjectQuestions } = await supabase
          .from('questions')
          .select('id')
          .eq('exam_id', examId)
          .eq('subject', subjectName)
          .eq('is_active', true);
        
        const subjectQuestionIds = new Set(subjectQuestions?.map(q => q.id) || []);
        
        // Filter flashcards to only include those related to this subject
        const relevantFlashcards = dedicatedFlashcards.filter(card => 
          !card.question_id || subjectQuestionIds.has(card.question_id)
        );
        
        // Format flashcards
        flashcards = relevantFlashcards.map((card, index) => ({
          id: index + 1,
          flashcardId: card.id,
          front: card.front,
          back: card.back,
          questionId: card.question_id,
          examId: card.exam_id
        }));
      } else {
        // If no subject filter, use all flashcards
        flashcards = dedicatedFlashcards.map((card, index) => ({
          id: index + 1,
          flashcardId: card.id,
          front: card.front,
          back: card.back,
          questionId: card.question_id,
          examId: card.exam_id
        }));
      }
    }
    
    // Approach 2: Get flashcards from the questions table
    let query = supabase
      .from('questions')
      .select(`
        id,
        subject,
        topic,
        flashcard_front,
        flashcard_back
      `)
      .eq('exam_id', examId)
      .eq('is_active', true)
      .not('flashcard_front', 'is', null)
      .not('flashcard_back', 'is', null);
    
    // Add subject filter if provided
    if (subjectName) {
      query = query.eq('subject', subjectName);
    }
    
    const { data: questions, error: questionsError } = await query;
    
    if (questionsError) {
      console.error(`Error fetching question flashcards:`, questionsError);
      // If we have flashcards from the first attempt, return those
      if (flashcards.length > 0) {
        return flashcards;
      }
      throw questionsError;
    }
    
    // Filter out any questions that don't have valid flashcard content
    const validQuestionFlashcards = questions.filter(q => 
      q.flashcard_front && q.flashcard_front.trim() !== '' && 
      q.flashcard_back && q.flashcard_back.trim() !== ''
    );
    
    // Create flashcards from questions data
    const questionFlashcards = validQuestionFlashcards.map((question, index) => ({
      id: `q${index + 1}`,
      questionId: question.id,
      front: question.flashcard_front,
      back: question.flashcard_back,
      subject: question.subject,
      topic: question.topic
    }));
    
    // Avoid duplicates by filtering out any question flashcards that match existing ones
    const existingQuestionIds = new Set(flashcards.map(f => f.questionId).filter(Boolean));
    const uniqueQuestionFlashcards = questionFlashcards.filter(f => 
      !f.questionId || !existingQuestionIds.has(f.questionId)
    );
    
    // Combine both types of flashcards
    return [...flashcards, ...uniqueQuestionFlashcards];
    
  } catch (error) {
    console.error(`Error in fetchFlashcardsBySubject:`, error);
    throw error;
  }
};

/**
 * Creates a new flashcard
 * @param {Object} flashcardData - The flashcard data to save
 * @returns {Promise<Object>} The newly created flashcard
 */
export const createFlashcard = async (flashcardData) => {
  const supabase = createClient();
  
  // Make sure we have at least the required fields
  if (!flashcardData.front || !flashcardData.back || !flashcardData.exam_id) {
    throw new Error('Missing required flashcard data (front, back, exam_id)');
  }
  
  const { data, error } = await supabase
    .from('flashcards')
    .insert({
      ...flashcardData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) {
    console.error(`Error creating flashcard:`, error);
    throw error;
  }
  
  return data;
};

/**
 * Updates an existing flashcard
 * @param {string} flashcardId - UUID of the flashcard to update
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} The updated flashcard
 */
export const updateFlashcard = async (flashcardId, updates) => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('flashcards')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', flashcardId)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating flashcard:`, error);
    throw error;
  }
  
  return data;
};

/**
 * Deletes a flashcard
 * @param {string} flashcardId - UUID of the flashcard to delete
 * @returns {Promise<void>}
 */
export const deleteFlashcard = async (flashcardId) => {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('flashcards')
    .delete()
    .eq('id', flashcardId);
  
  if (error) {
    console.error(`Error deleting flashcard:`, error);
    throw error;
  }
};

/**
 * Gets flashcards for a specific question
 * @param {string} questionId - UUID of the question 
 * @returns {Promise<Array>} Array of flashcards for this question
 */
export const getFlashcardsForQuestion = async (questionId) => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('question_id', questionId);
  
  if (error) {
    console.error(`Error fetching flashcards for question:`, error);
    throw error;
  }
  
  return data.map((card, index) => ({
    id: index + 1,
    flashcardId: card.id,
    front: card.front,
    back: card.back,
    questionId: card.question_id,
    examId: card.exam_id
  }));
};

export default {
  fetchFlashcardsBySubject,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
  getFlashcardsForQuestion
};