// File: src/services/notesService.js
import { createClient } from '@/libs/supabase/client';

/**
 * Fetches all notes for a specific exam
 * @param {string} examId - UUID of the exam
 * @param {string} userId - UUID of the user (optional)
 * @returns {Promise<Array>} Array of notes
 */
export const fetchNotesByExam = async (examId, userId = null) => {
  const supabase = createClient();
  
  let query = supabase
    .from('notes')
    .select(`
      id,
      question_id,
      exam_id,
      content,
      created_at,
      updated_at,
      questions(subject, topic, text)
    `)
    .eq('exam_id', examId);
  
  const { data, error } = await query;
  
  if (error) {
    console.error(`Error fetching notes for exam ${examId}:`, error);
    throw error;
  }
  
  return data.map(note => ({
    id: note.id,
    questionId: note.question_id,
    examId: note.exam_id,
    content: note.content,
    subject: note.questions?.subject || 'General',
    topic: note.questions?.topic || 'Unknown',
    questionText: note.questions?.text || '',
    createdAt: note.created_at,
    updatedAt: note.updated_at
  }));
};

/**
 * Fetches notes for a specific subject within an exam
 * @param {string} examId - UUID of the exam
 * @param {string} subjectName - Name of the subject
 * @returns {Promise<Array>} Array of notes
 */
export const fetchNotesBySubject = async (examId, subjectName) => {
  const supabase = createClient();
  
  // First get all question IDs for this subject
  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select('id')
    .eq('exam_id', examId)
    .eq('subject', subjectName)
    .eq('is_active', true);
  
  if (questionsError) {
    console.error(`Error fetching questions for subject ${subjectName}:`, questionsError);
    throw questionsError;
  }
  
  if (!questions || questions.length === 0) {
    return [];
  }
  
  // Then get all notes associated with these questions
  const questionIds = questions.map(q => q.id);
  
  const { data: notes, error: notesError } = await supabase
    .from('notes')
    .select(`
      id,
      question_id,
      exam_id,
      content,
      created_at,
      updated_at,
      questions(subject, topic, text)
    `)
    .eq('exam_id', examId)
    .in('question_id', questionIds);
  
  if (notesError) {
    console.error(`Error fetching notes for subject ${subjectName}:`, notesError);
    throw notesError;
  }
  
  return notes.map(note => ({
    id: note.id,
    questionId: note.question_id,
    examId: note.exam_id,
    content: note.content,
    subject: note.questions?.subject || subjectName,
    topic: note.questions?.topic || 'Unknown',
    questionText: note.questions?.text || '',
    createdAt: note.created_at,
    updatedAt: note.updated_at
  }));
};

/**
 * Creates a new note
 * @param {Object} noteData - The note data
 * @returns {Promise<Object>} The created note
 */
export const createNote = async (noteData) => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('notes')
    .insert({
      ...noteData,
      created_at: new Date(),
      updated_at: new Date()
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating note:', error);
    throw error;
  }
  
  return data;
};

/**
 * Updates an existing note
 * @param {string} noteId - UUID of the note to update
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} The updated note
 */
export const updateNote = async (noteId, updates) => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('notes')
    .update({
      ...updates,
      updated_at: new Date()
    })
    .eq('id', noteId)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating note ${noteId}:`, error);
    throw error;
  }
  
  return data;
};

/**
 * Deletes a note
 * @param {string} noteId - UUID of the note to delete
 * @returns {Promise<void>}
 */
export const deleteNote = async (noteId) => {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', noteId);
  
  if (error) {
    console.error(`Error deleting note ${noteId}:`, error);
    throw error;
  }
};

/**
 * Fetches a single note by ID
 * @param {string} noteId - UUID of the note
 * @returns {Promise<Object>} The note
 */
export const fetchNoteById = async (noteId) => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('notes')
    .select(`
      id,
      question_id,
      exam_id,
      content,
      created_at,
      updated_at,
      questions(subject, topic, text)
    `)
    .eq('id', noteId)
    .single();
  
  if (error) {
    console.error(`Error fetching note ${noteId}:`, error);
    throw error;
  }
  
  return {
    id: data.id,
    questionId: data.question_id,
    examId: data.exam_id,
    content: data.content,
    subject: data.questions?.subject || 'General',
    topic: data.questions?.topic || 'Unknown',
    questionText: data.questions?.text || '',
    createdAt: data.created_at,
    updatedAt: data.updated_at
  };
};

/**
 * Gets notes from question content
 * This is useful when questions have built-in notes in the note_content field
 * @param {string} examId - UUID of the exam
 * @param {string} subjectName - Name of the subject (optional)
 * @returns {Promise<Array>} Array of notes from question content
 */
export const getNotesFromQuestions = async (examId, subjectName = null) => {
  const supabase = createClient();
  
  let query = supabase
    .from('questions')
    .select(`
      id,
      subject,
      topic,
      text,
      note_content
    `)
    .eq('exam_id', examId)
    .eq('is_active', true)
    .not('note_content', 'is', null);
  
  if (subjectName) {
    query = query.eq('subject', subjectName);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error(`Error fetching question notes:`, error);
    throw error;
  }
  
  return data
    .filter(q => q.note_content && q.note_content.trim().length > 0)
    .map((question, index) => ({
      id: `q-${question.id}`,
      questionId: question.id,
      examId,
      content: question.note_content,
      subject: question.subject,
      topic: question.topic,
      questionText: question.text,
      isQuestionNote: true,
    }));
};

/**
 * Search for notes based on content
 * @param {string} examId - UUID of the exam
 * @param {string} searchQuery - Text to search for
 * @returns {Promise<Array>} Array of matching notes
 */
export const searchNotes = async (examId, searchQuery) => {
  if (!searchQuery || searchQuery.trim().length < 2) {
    return [];
  }
  
  const supabase = createClient();
  const searchTerm = searchQuery.trim().toLowerCase();
  
  const { data, error } = await supabase
    .from('notes')
    .select(`
      id,
      question_id,
      exam_id,
      content,
      created_at,
      updated_at,
      questions(subject, topic, text)
    `)
    .eq('exam_id', examId)
    .ilike('content', `%${searchTerm}%`);
  
  if (error) {
    console.error(`Error searching notes:`, error);
    throw error;
  }
  
  // Also search in question note_content
  const { data: questionNotes, error: questionError } = await supabase
    .from('questions')
    .select(`
      id,
      subject,
      topic,
      text,
      note_content
    `)
    .eq('exam_id', examId)
    .eq('is_active', true)
    .not('note_content', 'is', null)
    .ilike('note_content', `%${searchTerm}%`);
  
  if (questionError) {
    console.error(`Error searching question notes:`, questionError);
    throw questionError;
  }
  
  const formattedNotes = data.map(note => ({
    id: note.id,
    questionId: note.question_id,
    examId: note.exam_id,
    content: note.content,
    subject: note.questions?.subject || 'General',
    topic: note.questions?.topic || 'Unknown',
    questionText: note.questions?.text || '',
    createdAt: note.created_at,
    updatedAt: note.updated_at,
    isQuestionNote: false,
  }));
  
  const formattedQuestionNotes = questionNotes
    .filter(q => q.note_content && q.note_content.trim().length > 0)
    .map(question => ({
      id: `q-${question.id}`,
      questionId: question.id,
      examId,
      content: question.note_content,
      subject: question.subject,
      topic: question.topic,
      questionText: question.text,
      isQuestionNote: true,
    }));
  
  return [...formattedNotes, ...formattedQuestionNotes];
};