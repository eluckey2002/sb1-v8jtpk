import React from 'react';
import { ResponseItem } from '../utils/llmApi';
import { LucideIcon, Lightbulb, CheckSquare, Briefcase, RefreshCw, Info, Zap, FileText } from 'lucide-react';

interface ResponseCardProps {
  item: ResponseItem;
}

const ResponseCard: React.FC<ResponseCardProps> = ({ item }) => {
  const getIcon = (iconName: string): LucideIcon => {
    switch (iconName) {
      case 'lightbulb':
        return Lightbulb;
      case 'checklist':
        return CheckSquare;
      case 'case':
        return Briefcase;
      case 'reflect':
        return RefreshCw;
      case 'zap':
        return Zap;
      case 'document':
        return FileText;
      default:
        return Info;
    }
  };

  const Icon = getIcon(item.icon);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Icon className="text-blue-500 mr-3" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
        </div>
        <ul className="space-y-2">
          {item.items.map((listItem, index) => (
            <li 
              key={index} 
              className="text-gray-700 transition-all duration-300 hover:text-blue-500 hover:translate-x-2"
            >
              {listItem}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResponseCard;