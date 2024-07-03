import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Dropdown.css'
import { DropdownProps, OptionProps } from './Dropdown.types';

const Dropdown: React.FC<DropdownProps> = ({
  options,
  isMulti = false,
  searchable = false,
  renderOption,
  onChange,
  usePortal = false,
  searchFilter,
  zIndex = 1000,
  className = '',
}) => {
  const [open, setOpen] = useState(false); // State to control dropdown open/close
  const [search, setSearch] = useState(''); // State to control search input
  const [selected, setSelected] = useState<Array<OptionProps> | OptionProps | null>(isMulti ? [] : null); // State to store selected options
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to the dropdown for handling outside clicks

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Function to toggle the dropdown open/close state
  const toggleDropdown = () => setOpen(!open);

  // Function to handle option selection
  const handleOptionClick = (option: OptionProps) => {
    if (isMulti) {
      setSelected((prev: any) => {
        if (Array.isArray(prev)) {
          if (prev.find(item => item.value === option.value)) {
            return prev.filter(item => item.value !== option.value);
          }
          return [...prev, option];
        }
        return [option];
      });
    } else {
      setSelected(option);
      setOpen(false);
    }
    if (onChange) {
      if (isMulti) {
        if (Array.isArray(selected)) {
          if (selected.find(item => item.value === option.value)) {
            onChange(selected.filter(item => item.value !== option.value));
          } else {
            onChange([...selected, option]);
          }
        }
      } else {
        onChange(option);
      }
    }
  };

  // Function to handle removing a selected option
  const handleRemoveSelected = (option: OptionProps) => {
    if (isMulti && Array.isArray(selected)) {
      const newSelected = selected.filter(item => item.value !== option.value);
      setSelected(newSelected);
      onChange && onChange(newSelected);
    } else {
      setSelected(null);
      onChange && onChange(null);
    }
  };

  // Filter options based on search input
  const filteredOptions = options.filter(option => {
    if (searchable && search) {
      if (searchFilter) {
        return searchFilter(option, search);
      }
      return option.label.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  // Function to render the list of options
  const renderOptions = () => (
    <div className="relative mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10" style={{ zIndex, width: 'inherit' }}>
      {searchable && (
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border-b border-gray-300"
          placeholder="Search..."
        />
      )}
      <ul className="max-h-60 overflow-auto">
        {filteredOptions.map(option => (
          <li
            key={option.value}
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
            onClick={() => handleOptionClick(option)}
          >
            <input
              type="checkbox"
              checked={Array.isArray(selected) ? selected.some(item => item.value === option.value) : selected?.value === option.value}
              readOnly
              className="mr-2"
            />
            {renderOption ? renderOption(option) : option.label}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={`relative text-left text-gray-800 min-w-60 ${className}`} ref={dropdownRef}>
      <div
        className="cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-md"
        onClick={toggleDropdown}
      >
        {isMulti && Array.isArray(selected) && selected.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selected.map(item => (
              <div key={item.value} className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                {item.label}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveSelected(item);
                  }}
                  className="ml-1 text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        ) : !isMulti && selected ? (
          <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
            {(selected as OptionProps).label}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveSelected(selected as OptionProps);
              }}
              className="ml-1 text-red-500"
            >
              &times;
            </button>
          </div>
        ) : (
          'Select...'
        )}
      </div>
      {open && (usePortal ? (
        <Portal>{renderOptions()}</Portal>
      ) : (
        renderOptions()
      ))}
    </div>
  );
};

// Component for Portal rendering to ensure zIndex compatibility
const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const el = useRef(document.createElement('div'));

  useEffect(() => {
    const current = el.current;
    document.body.appendChild(current);
    return () => void document.body.removeChild(current);
  }, []);

  return el.current ? ReactDOM.createPortal(children, el.current) : null;
};

export default Dropdown;
