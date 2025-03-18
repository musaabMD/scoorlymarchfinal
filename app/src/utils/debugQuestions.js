// File: src/utils/debugQuestions.js
import { createClient } from '@/libs/supabase/client';

const debugQuestions = {
  /**
   * Get direct count of questions in the database
   * @param {string} examId - The exam ID to check
   */
  async getQuestionCount(examId) {
    try {
      const supabase = createClient();
      
      // Check questions table directly
      const { data, error, count } = await supabase
        .from('questions')
        .select('*', { count: 'exact' })
        .eq('exam_id', examId)
        .eq('is_active', true);
      
      if (error) {
        console.error('Error fetching questions:', error);
        return {
          success: false,
          error: error.message
        };
      }
      
      // Get unique subjects
      const subjects = new Set();
      data.forEach(question => {
        if (question.subject) {
          subjects.add(question.subject);
        }
      });
      
      return {
        success: true,
        count: data.length,
        subjects: Array.from(subjects),
        sampleQuestion: data.length > 0 ? data[0] : null
      };
    } catch (err) {
      console.error('Error in getQuestionCount:', err);
      return {
        success: false,
        error: err.message
      };
    }
  },
  
  /**
   * List all subjects for an exam directly from questions table
   * @param {string} examId - The exam ID to check
   */
  async listSubjectsForExam(examId) {
    try {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('questions')
        .select('subject')
        .eq('exam_id', examId)
        .eq('is_active', true);
      
      if (error) {
        console.error('Error fetching subjects:', error);
        return {
          success: false,
          error: error.message
        };
      }
      
      // Count questions per subject
      const subjectCounts = {};
      data.forEach(question => {
        const subject = question.subject;
        if (!subjectCounts[subject]) {
          subjectCounts[subject] = 0;
        }
        subjectCounts[subject]++;
      });
      
      return {
        success: true,
        subjects: Object.keys(subjectCounts),
        counts: subjectCounts
      };
    } catch (err) {
      console.error('Error in listSubjectsForExam:', err);
      return {
        success: false,
        error: err.message
      };
    }
  },
  
  /**
   * Check direct RLS permissions for the questions table
   */
  async checkQuestionsAccess() {
    try {
      const supabase = createClient();
      
      // Try a basic select
      const { data, error } = await supabase
        .from('questions')
        .select('count(*)')
        .limit(1);
      
      if (error) {
        console.error('Error accessing questions table:', error);
        return {
          success: false,
          error: error.message,
          hint: 'This may be a Row Level Security (RLS) issue.'
        };
      }
      
      return {
        success: true,
        message: 'Successfully accessed questions table'
      };
    } catch (err) {
      console.error('Error in checkQuestionsAccess:', err);
      return {
        success: false,
        error: err.message
      };
    }
  },
  
  /**
   * Check if the questions from a CSV import are present
   * @param {string} examId - The exam ID to check
   */
  async checkImportedQuestions(examId) {
    try {
      const supabase = createClient();
      
      // Get recently created questions
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('exam_id', examId)
        .eq('is_active', true)
        .gt('created_at', oneDayAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) {
        console.error('Error fetching recent questions:', error);
        return {
          success: false,
          error: error.message
        };
      }
      
      return {
        success: true,
        recentQuestions: data,
        count: data.length,
        message: data.length > 0 
          ? 'Found recently imported questions' 
          : 'No recently imported questions found'
      };
    } catch (err) {
      console.error('Error in checkImportedQuestions:', err);
      return {
        success: false,
        error: err.message
      };
    }
  }
};

export default debugQuestions;