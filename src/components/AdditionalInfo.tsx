import React from 'react';
import { Info } from 'lucide-react';

const AdditionalInfo: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-full">
      <div className="flex items-center mb-4">
        <Info className="text-blue-500 mr-2" size={24} />
        <h2 className="text-xl font-semibold">Additional Information</h2>
      </div>
      <p className="text-gray-700 mb-4">
        This section provides extra context and resources related to your query.
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>Explore related topics for a broader understanding</li>
        <li>Find recommended readings and external resources</li>
        <li>Discover expert opinions and latest research</li>
      </ul>
    </div>
  );
};

export default AdditionalInfo;