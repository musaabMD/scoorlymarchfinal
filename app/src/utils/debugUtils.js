// File: src/utils/debugUtils.js
import { createClient } from '@/libs/supabase/client';

/**
 * Debug utility to inspect database tables and their structure
 * This is helpful for development and debugging but should not be used in production
 */
const DebugUtils = {
  /**
   * Logs the query for debugging
   * @param {string} message - Message to log
   * @param {any} data - Data to log
   */
  log(message, data) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`🐞 ${message}`, data);
    }
  },

  /**
   * Inspects a question record to see what fields are available
   * @param {string} questionId - UUID of the question to inspect
   * @returns {Promise<Object>} The full question record with all fields
   */
  async inspectQuestion(questionId) {
    const supabase = createClient();
    console.log(`Inspecting question: ${questionId}`);
    
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('id', questionId)
      .single();
    
    if (error) {
      console.error('Error inspecting question:', error);
      throw error;
    }
    
    console.log('Question structure:', data);
    console.log('Available fields:', Object.keys(data));
    
    // Check which fields contain data
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        console.log(`Field ${key} has data:`, typeof value === 'object' ? JSON.stringify(value) : value);
      }
    });
    
    return data;
  },
  
  /**
   * Inspects the first N flashcards in the database
   * @param {number} limit - Number of flashcards to inspect
   * @returns {Promise<Array>} Array of flashcard records
   */
  async inspectFlashcards(limit = 5) {
    const supabase = createClient();
    console.log(`Inspecting first ${limit} flashcards`);
    
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .limit(limit);
    
    if (error) {
      console.error('Error inspecting flashcards:', error);
      throw error;
    }
    
    if (data.length === 0) {
      console.log('No flashcards found in the database');
      return [];
    }
    
    console.log(`Found ${data.length} flashcards`);
    console.log('First flashcard structure:', data[0]);
    console.log('Available fields:', Object.keys(data[0]));
    
    return data;
  },
  
  /**
   * Checks if questions for a subject have flashcard data
   * @param {string} examId - UUID of the exam
   * @param {string} subjectName - Name of the subject
   * @returns {Promise<Object>} Statistics about flashcard data
   */
  async checkFlashcardData(examId, subjectName) {
    const supabase = createClient();
    console.log(`Checking flashcard data for exam ${examId}, subject ${subjectName}`);
    
    // Check questions table first
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('id, flashcard_front, flashcard_back')
      .eq('exam_id', examId)
      .eq('subject', subjectName)
      .eq('is_active', true);
    
    if (questionsError) {
      console.error('Error checking questions:', questionsError);
      throw questionsError;
    }
    
    // Check dedicated flashcards table
    const { data: flashcards, error: flashcardsError } = await supabase
      .from('flashcards')
      .select('*')
      .eq('exam_id', examId);
    
    if (flashcardsError) {
      console.error('Error checking flashcards:', flashcardsError);
      throw flashcardsError;
    }
    
    // Analyze results
    const stats = {
      totalQuestions: questions.length,
      questionsWithFlashcardFront: questions.filter(q => q.flashcard_front).length,
      questionsWithFlashcardBack: questions.filter(q => q.flashcard_back).length,
      questionsWithBoth: questions.filter(q => q.flashcard_front && q.flashcard_back).length,
      dedicatedFlashcards: flashcards.length
    };
    
    console.log('Flashcard data statistics:', stats);
    
    if (stats.questionsWithBoth === 0 && stats.dedicatedFlashcards === 0) {
      console.log('⚠️ No flashcard data found for this subject');
    } else {
      console.log('✅ Flashcard data available');
    }
    
    return stats;
  },
  
  /**
   * Fixes missing flashcard data by copying from title/content if needed
   * This is a development utility and should not be used in production
   * @param {string} examId - UUID of the exam
   * @param {string} subjectName - Name of the subject
   * @returns {Promise<Object>} Results of the operation
   */
  async fixMissingFlashcardData(examId, subjectName) {
    const supabase = createClient();
    console.log(`Attempting to fix missing flashcard data for exam ${examId}, subject ${subjectName}`);
    
    // Get questions that are missing flashcard data
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('id, subject, topic, shortquestion, shortanswer, text, explanation')
      .eq('exam_id', examId)
      .eq('subject', subjectName)
      .eq('is_active', true)
      .or('flashcard_front.is.null,flashcard_back.is.null');
    
    if (questionsError) {
      console.error('Error fetching questions:', questionsError);
      throw questionsError;
    }
    
    console.log(`Found ${questions.length} questions with missing flashcard data`);
    
    // Update each question with generated flashcard data
    const results = {
      updated: 0,
      failed: 0,
      skipped: 0
    };
    
    for (const question of questions) {
      // Skip if we don't have enough data to create flashcards
      if (!question.shortquestion && !question.topic && !question.text) {
        console.log(`Skipping question ${question.id} due to insufficient data`);
        results.skipped++;
        continue;
      }
      
      try {
        // Generate front and back content from available fields
        const front = question.shortquestion || question.topic || 
                     (question.text ? question.text.substring(0, 100) + '...' : '');
        
        const back = question.shortanswer || question.explanation || 
                    (question.text ? 'See full question text' : '');
        
        // Update the question with flashcard data
        const { error: updateError } = await supabase
          .from('questions')
          .update({
            flashcard_front: front,
            flashcard_back: back,
            updated_at: new Date().toISOString()
          })
          .eq('id', question.id);
        
        if (updateError) {
          console.error(`Error updating question ${question.id}:`, updateError);
          results.failed++;
        } else {
          console.log(`Updated question ${question.id} with flashcard data`);
          results.updated++;
        }
      } catch (err) {
        console.error(`Error processing question ${question.id}:`, err);
        results.failed++;
      }
    }
    
    console.log('Fix operation completed with results:', results);
    return results;
  },
  
  /**
   * Checks the database structure for required tables and fields
   * @returns {Promise<Object>} Diagnostic information about the database
   */
  async checkDatabaseStructure() {
    const supabase = createClient();
    console.log('Checking database structure...');
    
    const tables = ['questions', 'flashcards', 'notes', 'exams', 'user_exam_access'];
    const results = {};
    
    for (const table of tables) {
      try {
        // Check if table exists by attempting to select a single row
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          console.error(`Error accessing table ${table}:`, error);
          results[table] = { exists: false, error: error.message };
        } else {
          // Table exists, check its structure
          results[table] = { 
            exists: true,
            fields: data.length > 0 ? Object.keys(data[0]) : [] 
          };
          
          console.log(`✅ Table ${table} exists with fields:`, results[table].fields);
        }
      } catch (err) {
        console.error(`Error checking table ${table}:`, err);
        results[table] = { exists: false, error: err.message };
      }
    }
    
    return results;
  },
  
  /**
   * Runs diagnostics on all services to verify proper operation
   * @param {string} examId - UUID of the exam to check
   * @returns {Promise<boolean>} - Whether diagnostics completed successfully
   */
  async runDiagnostics(examId) {
    console.log('🔍 Running diagnostics on Supabase integration...');
    
    try {
      // Check database structure
      const dbStructure = await this.checkDatabaseStructure();
      
      // If exam ID is provided, check specific exam data
      if (examId) {
        console.log(`Running exam-specific diagnostics for exam ${examId}`);
        
        const supabase = createClient();
        
        // Check exam data
        const { data: exam, error: examError } = await supabase
          .from('exams')
          .select('*')
          .eq('id', examId)
          .single();
        
        if (examError) {
          console.error('❌ Failed to fetch exam data:', examError);
        } else {
          console.log('✅ Found exam:', exam.name);
          
          // Check for subjects (questions grouped by subject)
          const { data: subjectGroups, error: subjectError } = await supabase
            .from('questions')
            .select('subject, count(*)')
            .eq('exam_id', examId)
            .eq('is_active', true)
            .group('subject');
          
          if (subjectError) {
            console.error('❌ Failed to fetch subjects:', subjectError);
          } else {
            console.log(`✅ Found ${subjectGroups.length} subjects for this exam`);
            
            // Check first subject for flashcards
            if (subjectGroups.length > 0) {
              const firstSubject = subjectGroups[0].subject;
              console.log(`Checking flashcard data for first subject: ${firstSubject}`);
              await this.checkFlashcardData(examId, firstSubject);
            }
          }
        }
      }
      
      console.log('✅ Diagnostics completed');
      return true;
    } catch (error) {
      console.error('❌ Diagnostics failed:', error);
      return false;
    }
  },

  /**
   * Creates test flashcards directly in the database
   * This is a development utility for testing
   * @param {string} examId - UUID of the exam
   * @returns {Promise<Object>} Result of the operation
   */
  async createTestFlashcards(examId) {
    const supabase = createClient();
    console.log(`Creating test flashcards for exam ${examId}`);
    
    try {
      // First get subjects for this exam
      const { data: questions, error: questionsError } = await supabase
        .from('questions')
        .select('id, subject, topic, flashcard_front, flashcard_back')
        .eq('exam_id', examId)
        .eq('is_active', true);
      
      if (questionsError) {
        console.error('Error fetching questions:', questionsError);
        throw questionsError;
      }

      if (!questions || questions.length === 0) {
        return { success: false, message: 'No questions found for this exam' };
      }

      console.log(`Found ${questions.length} questions`);
      
      // Create direct flashcards for each question
      const flashcardsToInsert = questions.map(question => ({
        exam_id: examId,
        question_id: question.id,
        front: question.flashcard_front || `Front: ${question.topic || question.subject}`,
        back: question.flashcard_back || `Back: ${question.topic || question.subject}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
      
      // Insert the flashcards in batches to avoid potential issues
      const batchSize = 10;
      let insertedCount = 0;
      let errorCount = 0;
      
      for (let i = 0; i < flashcardsToInsert.length; i += batchSize) {
        const batch = flashcardsToInsert.slice(i, i + batchSize);
        const { data, error } = await supabase
          .from('flashcards')
          .insert(batch);
        
        if (error) {
          console.error(`Error inserting flashcards batch ${i}:`, error);
          errorCount += batch.length;
        } else {
          insertedCount += batch.length;
          console.log(`Inserted ${batch.length} flashcards`);
        }
      }
      
      return {
        success: true,
        inserted: insertedCount,
        errors: errorCount,
        message: `Created ${insertedCount} test flashcards with ${errorCount} errors`
      };
    } catch (error) {
      console.error('Error creating test flashcards:', error);
      return { success: false, error: error.message };
    }
  }
};

export default DebugUtils;