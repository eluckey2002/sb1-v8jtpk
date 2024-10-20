import React from 'react';

interface DynamicComponentProps {
  componentString: string;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({ componentString }) => {
  const Component = React.useMemo(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      return new Function(`return ${componentString}`)();
    } catch (error) {
      console.error('Error creating dynamic component:', error);
      return () => <div>Error rendering component</div>;
    }
  }, [componentString]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Component />
    </div>
  );
};

export default DynamicComponent;