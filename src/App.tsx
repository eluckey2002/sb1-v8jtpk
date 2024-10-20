import React, { useState } from 'react';
import QueryInput from './components/QueryInput';
import ResponseLayout from './components/ResponseLayout';
import { callLLM, ResponseData } from './utils/llmApi';

console.log('App component is rendering');

function App() {
  const [query, setQuery] = useState('');
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await callLLM(query);
      setResponseData(response);
      setHasSearched(true);
    } catch (error) {
      console.error('Error calling LLM:', error);
      setError('An error occurred while fetching the response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          LLM Response Generator
        </h1>
        <QueryInput
          query={query}
          setQuery={setQuery}
          handleSubmit={handleSubmit}
          loading={loading}
        />
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {hasSearched && responseData && <ResponseLayout responseItems={responseData} />}
      </div>
    </div>
  );
}

export default App;