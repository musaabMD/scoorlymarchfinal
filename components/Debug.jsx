// File: src/components/Debug.jsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Bug, AlertCircle, CheckCircle, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { fetchFlashcardsBySubject } from '@/app/src/services/flashcardService';
import { fetchConceptsBySubject } from '@/app/src/services/conceptService';
import DebugUtils from '@/app/src/utils/debugUtils';
import debugQuestions from '@/app/src/utils/debugQuestions';

/**
 * Debug component for testing and fixing Supabase integration
 * This should only be used in development, not in production
 */
const Debug = ({ selectedExam }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [subjectName, setSubjectName] = useState('');
  
  const runDiagnostics = async () => {
    if (!selectedExam) {
      setError('Please select an exam first');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResults(null);
    
    try {
      const diagnosticResults = await DebugUtils.runDiagnostics(selectedExam.id);
      setResults({
        success: diagnosticResults,
        message: 'Diagnostics completed. Check browser console for details.'
      });
    } catch (err) {
      console.error('Diagnostics error:', err);
      setError('Failed to run diagnostics: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const checkQuestions = async () => {
    if (!selectedExam) {
      setError('Please select an exam first');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResults(null);
    
    try {
      // Check questions directly
      const questionCount = await debugQuestions.getQuestionCount(selectedExam.id);
      const subjectsList = await debugQuestions.listSubjectsForExam(selectedExam.id);
      const accessCheck = await debugQuestions.checkQuestionsAccess();
      
      setResults({
        questionCount,
        subjectsList,
        accessCheck,
        message: questionCount.success 
          ? `Found ${questionCount.count} questions for this exam.` 
          : 'Failed to count questions.'
      });
    } catch (err) {
      console.error('Question check error:', err);
      setError('Failed to check questions: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const checkFlashcards = async () => {
    if (!selectedExam) {
      setError('Please select an exam first');
      return;
    }
    
    if (!subjectName.trim()) {
      setError('Please enter a subject name');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResults(null);
    
    try {
      // Check flashcard data
      const flashcardStats = await DebugUtils.checkFlashcardData(
        selectedExam.id, 
        subjectName
      );
      
      // Try to fetch flashcards using the service
      const flashcards = await fetchFlashcardsBySubject(
        selectedExam.id,
        subjectName
      );
      
      // Try to fetch concepts
      const concepts = await fetchConceptsBySubject(
        selectedExam.id,
        subjectName
      );
      
      setResults({
        flashcardStats,
        fetchedFlashcards: {
          count: flashcards.length,
          sample: flashcards.slice(0, 3)
        },
        fetchedConcepts: {
          count: concepts.length,
          flashcardFields: concepts.filter(c => c.flashcardFront || c.flashcardBack).length,
          sample: concepts.slice(0, 3)
        }
      });
    } catch (err) {
      console.error('Flashcard check error:', err);
      setError('Failed to check flashcards: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const fixFlashcards = async () => {
    if (!selectedExam) {
      setError('Please select an exam first');
      return;
    }
    
    if (!subjectName.trim()) {
      setError('Please enter a subject name');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResults(null);
    
    try {
      // Fix missing flashcard data
      const fixResults = await DebugUtils.fixMissingFlashcardData(
        selectedExam.id,
        subjectName
      );
      
      setResults({
        fixResults,
        message: `Updated ${fixResults.updated} questions with flashcard data.`
      });
    } catch (err) {
      console.error('Fix flashcards error:', err);
      setError('Failed to fix flashcards: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const createTestFlashcards = async () => {
    if (!selectedExam) {
      setError('Please select an exam first');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResults(null);
    
    try {
      // Create test flashcards
      const result = await DebugUtils.createTestFlashcards(selectedExam.id);
      
      setResults({
        createFlashcards: result,
        message: result.message || "Operation completed"
      });
    } catch (err) {
      console.error('Error creating test flashcards:', err);
      setError('Failed to create test flashcards: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const checkRecentlyImported = async () => {
    if (!selectedExam) {
      setError('Please select an exam first');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResults(null);
    
    try {
      const importResults = await debugQuestions.checkImportedQuestions(selectedExam.id);
      
      setResults({
        importCheck: importResults,
        message: importResults.message
      });
    } catch (err) {
      console.error('Import check error:', err);
      setError('Failed to check imports: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto mt-8 border-dashed border-yellow-300 bg-yellow-50">
      <CardHeader className="bg-yellow-100 border-b border-yellow-200">
        <CardTitle className="text-yellow-800 flex items-center">
          <Bug className="mr-2 h-5 w-5" />
          Debug Tools (Development Only)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-sm text-yellow-700 mb-4">
            These tools help diagnose and fix issues with Supabase integration.
            <strong> For development use only.</strong>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Button
              onClick={runDiagnostics}
              disabled={loading || !selectedExam}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Bug className="mr-2 h-4 w-4" />
              )}
              Run Diagnostics
            </Button>
            
            <Button
              onClick={checkQuestions}
              disabled={loading || !selectedExam}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Database className="mr-2 h-4 w-4" />
              Check Questions
            </Button>
            
            <Button
              onClick={checkRecentlyImported}
              disabled={loading || !selectedExam}
              className="w-full bg-purple-600 hover:bg-purple-700 col-span-2"
            >
              Check Recently Imported Questions
            </Button>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium mb-2">Flashcard Tools</h3>
            <div className="flex items-center gap-2 mb-4">
              <Input
                placeholder="Enter subject name..."
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="flex gap-2 mb-2">
              <Button
                onClick={checkFlashcards}
                disabled={loading || !selectedExam || !subjectName}
                variant="outline"
                className="flex-1"
              >
                Check Flashcards
              </Button>
              <Button
                onClick={fixFlashcards}
                disabled={loading || !selectedExam || !subjectName}
                variant="outline"
                className="flex-1"
              >
                Fix Missing Flashcards
              </Button>
            </div>
            
            <Button
              onClick={createTestFlashcards}
              disabled={loading || !selectedExam}
              variant="destructive"
              className="w-full mt-2"
            >
              Create Test Flashcards
            </Button>
          </div>
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}
          
          {results && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
              <div className="flex items-start mb-2">
                <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p className="font-medium">Results</p>
              </div>
              
              {results.message && (
                <p className="mb-2">{results.message}</p>
              )}
              
              {results.questionCount && (
                <div className="mt-2 p-3 bg-white rounded-md">
                  <h4 className="font-medium mb-1">Question Count</h4>
                  {results.questionCount.success ? (
                    <div className="text-sm">
                      <p className="font-medium">Found {results.questionCount.count} questions</p>
                      <p className="mt-1">Found {results.questionCount.subjects.length} subjects:</p>
                      <ul className="list-disc list-inside mt-1">
                        {results.questionCount.subjects.map(subject => (
                          <li key={subject}>{subject}</li>
                        ))}
                      </ul>
                      {results.questionCount.sampleQuestion && (
                        <div className="mt-2">
                          <p className="font-medium">Sample Question:</p>
                          <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-32">
                            {JSON.stringify({
                              subject: results.questionCount.sampleQuestion.subject,
                              topic: results.questionCount.sampleQuestion.topic,
                              text: results.questionCount.sampleQuestion.text?.substring(0, 100) + '...',
                              shortQuestion: results.questionCount.sampleQuestion.shortquestion,
                              shortAnswer: results.questionCount.sampleQuestion.shortanswer,
                            }, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-red-500 text-sm">{results.questionCount.error}</p>
                  )}
                </div>
              )}
              
              {results.subjectsList && results.subjectsList.success && (
                <div className="mt-2 p-3 bg-white rounded-md">
                  <h4 className="font-medium mb-1">Subject Information</h4>
                  <div className="text-sm">
                    {results.subjectsList.subjects.map(subject => (
                      <div key={subject} className="flex justify-between py-1 border-b border-gray-100">
                        <span>{subject}</span>
                        <span className="font-medium">{results.subjectsList.counts[subject]} questions</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {results.importCheck && (
                <div className="mt-2 p-3 bg-white rounded-md">
                  <h4 className="font-medium mb-1">Recently Imported Questions</h4>
                  {results.importCheck.success ? (
                    <div className="text-sm">
                      <p>Found {results.importCheck.count} recently imported questions</p>
                      {results.importCheck.recentQuestions && results.importCheck.recentQuestions.length > 0 && (
                        <div className="mt-2">
                          <p className="font-medium">Latest imported question:</p>
                          <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-32">
                            {JSON.stringify({
                              subject: results.importCheck.recentQuestions[0].subject,
                              topic: results.importCheck.recentQuestions[0].topic,
                              created_at: results.importCheck.recentQuestions[0].created_at,
                            }, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-red-500 text-sm">{results.importCheck.error}</p>
                  )}
                </div>
              )}
              
              {results.flashcardStats && (
                <div className="text-sm">
                  <p>Found {results.flashcardStats.totalQuestions} questions in this subject</p>
                  <p>{results.flashcardStats.questionsWithBoth} questions have both front/back flashcard content</p>
                  <p>{results.flashcardStats.dedicatedFlashcards} dedicated flashcards found</p>
                </div>
              )}
              
              {results.fetchedFlashcards && (
                <div className="text-sm mt-2">
                  <p>Successfully fetched {results.fetchedFlashcards.count} flashcards</p>
                  {results.fetchedFlashcards.count > 0 && (
                    <pre className="mt-1 p-2 bg-white rounded text-xs overflow-auto max-h-32">
                      {JSON.stringify(results.fetchedFlashcards.sample, null, 2)}
                    </pre>
                  )}
                </div>
              )}
              
              {results.fetchedConcepts && (
                <div className="text-sm mt-2">
                  <p>Successfully fetched {results.fetchedConcepts.count} concepts</p>
                  <p>{results.fetchedConcepts.flashcardFields} concepts have flashcard fields</p>
                  {results.fetchedConcepts.count > 0 && (
                    <pre className="mt-1 p-2 bg-white rounded text-xs overflow-auto max-h-32">
                      {JSON.stringify(results.fetchedConcepts.sample, null, 2)}
                    </pre>
                  )}
                </div>
              )}
              
              {results.fixResults && (
                <div className="text-sm mt-2">
                  <p>Fix operation completed:</p>
                  <ul className="list-disc list-inside">
                    <li>Updated: {results.fixResults.updated}</li>
                    <li>Failed: {results.fixResults.failed}</li>
                    <li>Skipped: {results.fixResults.skipped}</li>
                  </ul>
                </div>
              )}
              
              {results && results.createFlashcards && (
                <div className="text-sm mt-2">
                  <p>Create flashcards operation:</p>
                  <ul className="list-disc list-inside">
                    <li>Success: {results.createFlashcards.success ? 'Yes' : 'No'}</li>
                    {results.createFlashcards.inserted && <li>Inserted: {results.createFlashcards.inserted}</li>}
                    {results.createFlashcards.errors !== undefined && <li>Errors: {results.createFlashcards.errors}</li>}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          <div className="text-xs text-gray-500 mt-4">
            Note: All debug operations are logged to the browser console
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-yellow-50 border-t border-yellow-200 p-3">
        <div className="text-xs text-yellow-700 w-full text-center">
          Make sure you have added your questions to the database before trying to access them.
        </div>
      </CardFooter>
    </Card>
  );
};

export default Debug;