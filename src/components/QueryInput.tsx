import React from 'react';
import { Search } from 'lucide-react';

interface QueryInputProps {
  query: string;
  setQuery: (query: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const QueryInput: React.FC<QueryInputProps> = ({ query, setQuery, handleSubmit, loading }) => {
  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <div className="relative flex-grow">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query..."
          className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`px-6 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>
    </form>
  );
};

export default QueryInput;