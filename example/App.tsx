// src/App.tsx
import React from 'react';
import Dropdown from '../src/components/Dropdown';

const App: React.FC = () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const handleChange = (selected: any) => {
    console.log('Selected:', selected);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Dropdown Component Test</h1>
      <Dropdown
        options={options}
        onChange={handleChange}
        isMulti={true}
        searchable={true}
        className="mb-4"
      />
      <Dropdown
        options={options}
        onChange={handleChange}
        isMulti={false}
        searchable={false}
        className="mb-4"
      />
    </div>
  );
};

export default App;
