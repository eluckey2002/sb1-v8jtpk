import React, { useState } from 'react';
import { ResponseItem, FilterOption } from '../utils/llmApi';
import ResponseCard from './ResponseCard';
import PersonalizationSection from './PersonalizationSection';

interface ResponseLayoutProps {
  responseItems: {
    user_query: string;
    content: ResponseItem[];
    filters?: FilterOption[];
  };
}

const ResponseLayout: React.FC<ResponseLayoutProps> = ({ responseItems }) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string | string[]>>({});

  const handleFilterChange = (filters: Record<string, string | string[]>) => {
    setActiveFilters(filters);
    console.log('Filters updated:', filters);
  };

  const getZoneItems = (zone: string) => responseItems.content.filter(item => item.layout_zone === zone);

  return (
    <div className="container mx-auto px-4 py-8">
      {responseItems.filters && (
        <PersonalizationSection 
          filters={responseItems.filters} 
          onFilterChange={handleFilterChange}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Pane */}
        <div className="md:col-span-1 space-y-8">
          {getZoneItems('left_pane').map((item, index) => (
            <ResponseCard key={index} item={item} />
          ))}
        </div>

        {/* Center Zone */}
        <div className="md:col-span-1 space-y-8">
          {/* Main Content Zone */}
          {getZoneItems('main_content_zone').map((item, index) => (
            <ResponseCard key={index} item={item} />
          ))}
          {/* Under Main Content Zone */}
          {getZoneItems('under_main_content_zone').map((item, index) => (
            <ResponseCard key={index} item={item} />
          ))}
        </div>

        {/* Right Pane */}
        <div className="md:col-span-1 space-y-8">
          {getZoneItems('right_pane').map((item, index) => (
            <ResponseCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponseLayout;