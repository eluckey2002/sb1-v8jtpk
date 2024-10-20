import React from 'react';
import { ResponseItem } from '../utils/llmApi';
import { Zap } from 'lucide-react';

interface FocalPointProps {
  item?: ResponseItem;
}

const FocalPoint: React.FC<FocalPointProps> = ({ item }) => {
  if (!item) return null;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <Zap className="mr-2" size={28} />
        <h2 className="text-2xl font-bold">{item.title}</h2>
      </div>
      <div className="space-y-2">
        {item.items.map((point, index) => (
          <p key={index} className="text-lg">{point}</p>
        ))}
      </div>
    </div>
  );
};

export default FocalPoint;