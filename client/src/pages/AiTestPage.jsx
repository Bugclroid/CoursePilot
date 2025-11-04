import React, { useState } from 'react';
import { testAiAnalysis } from '../services/api';

function AiTestPage() {
  const [text, setText] = useState('I need to book a flight day after tomorrow at 10 pm');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError('');
    try {
      const res = await testAiAnalysis(text);
      
      // --- THIS IS THE FIX ---
      // The data from the server is inside res.data
      // The analysis is inside res.data.analysis
      setResult(res.data.analysis);

    } catch (err) {
      setError('Failed to get AI response.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">AI Task Finder (Proof of Concept)</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <textarea
          className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md font-bold"
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Text'}
        </button>
      </form>

      {error && <pre className="mt-6 p-4 bg-red-900 text-red-100 rounded-md">{error}</pre>}
      
      {result && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold">AI Response (JSON):</h2>
          <pre className="mt-2 p-4 bg-gray-700 text-white rounded-md">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default AiTestPage;

