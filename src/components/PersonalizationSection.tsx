import React, { useState, useRef, useEffect } from 'react';
import { Settings, ChevronDown, ChevronUp, X } from 'lucide-react';

interface FilterOption {
  id: string;
  title: string;
  type: 'single' | 'multiple';
  options: string[];
}

interface PersonalizationSectionProps {
  filters: FilterOption[];
  onFilterChange: (filters: Record<string, string | string[]>) => void;
}

const PersonalizationSection: React.FC<PersonalizationSectionProps> = ({ filters, onFilterChange }) => {
  const [filterValues, setFilterValues] = useState<Record<string, string | string[]>>({});
  const [expanded, setExpanded] = useState(false);
  const [visibleFilters, setVisibleFilters] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateVisibleFilters = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const filterWidth = 200; // Approximate width of each filter
        const visibleCount = Math.floor(containerWidth / filterWidth);
        setVisibleFilters(visibleCount);
      }
    };

    calculateVisibleFilters();
    window.addEventListener('resize', calculateVisibleFilters);
    return () => window.removeEventListener('resize', calculateVisibleFilters);
  }, []);

  useEffect(() => {
    onFilterChange(filterValues);
  }, [filterValues, onFilterChange]);

  const handleToggle = (filterId: string, option: string) => {
    setFilterValues(prev => {
      const currentValue = prev[filterId];
      const filter = filters.find(f => f.id === filterId);
      
      if (filter?.type === 'multiple') {
        const newValue = Array.isArray(currentValue) 
          ? currentValue.includes(option)
            ? currentValue.filter(v => v !== option)
            : [...currentValue, option]
          : [option];
        return { ...prev, [filterId]: newValue };
      } else {
        return { ...prev, [filterId]: option };
      }
    });
  };

  const renderOption = (filterId: string, label: string, isSelected: boolean) => (
    <button
      key={label}
      onClick={() => handleToggle(filterId, label)}
      className={`px-3 py-1 rounded-full text-sm mr-2 mb-2 transition-colors duration-200 ${
        isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );

  const renderFilterSection = ({ id, title, type, options }: FilterOption) => {
    const value = filterValues[id] || (type === 'multiple' ? [] : '');

    return (
      <div key={id} className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
        <div className="flex flex-wrap">
          {options.map((option) => (
            renderOption(
              id,
              option,
              Array.isArray(value) ? value.includes(option) : value === option
            )
          ))}
        </div>
      </div>
    );
  };

  const renderActiveTags = () => {
    const tags = Object.entries(filterValues).flatMap(([filterId, value]) => {
      const filter = filters.find(f => f.id === filterId);
      if (!filter) return [];
      
      if (Array.isArray(value)) {
        return value.map(v => ({ filterId, value: v, title: filter.title }));
      } else if (value) {
        return [{ filterId, value, title: filter.title }];
      }
      return [];
    });

    return (
      <div className="flex flex-wrap mt-4">
        {tags.map(({ filterId, value, title }) => (
          <span key={`${filterId}-${value}`} className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full flex items-center">
            {title}: {value}
            <button onClick={() => handleToggle(filterId, value)} className="ml-1 focus:outline-none">
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Settings className="text-blue-500 mr-3" size={28} />
          <h2 className="text-2xl font-semibold text-gray-800">Personalize Your Experience</h2>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 hover:text-blue-700 focus:outline-none transition-colors duration-200"
          aria-label={expanded ? "Collapse filters" : "Expand filters"}
        >
          {expanded ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
        </button>
      </div>
      {renderActiveTags()}
      <div ref={containerRef} className="space-y-6 transition-all duration-300">
        {filters.slice(0, expanded ? filters.length : visibleFilters).map(renderFilterSection)}
      </div>
      {!expanded && visibleFilters < filters.length && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-6 text-blue-500 hover:text-blue-700 focus:outline-none transition-colors duration-200"
        >
          Show More Filters
        </button>
      )}
    </div>
  );
};

export default PersonalizationSection;