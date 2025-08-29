import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({ children, onValueChange, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleValueChange = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  const selectContext = {
    selectedValue,
    handleValueChange,
    toggleOpen,
    isOpen,
  };

  return <SelectContext.Provider value={selectContext}>{children}</SelectContext.Provider>;
};

const SelectContext = React.createContext();

export const SelectTrigger = ({ children, className }) => {
  const { toggleOpen, isOpen } = React.useContext(SelectContext);
  return (
    <button onClick={toggleOpen} className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>
      {children}
      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
    </button>
  );
};

export const SelectValue = ({ placeholder }) => {
  const { selectedValue } = React.useContext(SelectContext);
  return <span className="text-gray-900">{selectedValue || placeholder}</span>;
};

export const SelectContent = ({ children, className }) => {
  const { isOpen } = React.useContext(SelectContext);
  if (!isOpen) {
    return null;
  }
  return (
    <div className={`absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95 ${className}`}>
      {children}
    </div>
  );
};

export const SelectItem = ({ children, value }) => {
  const { handleValueChange, selectedValue } = React.useContext(SelectContext);
  const isSelected = selectedValue === value;

  return (
    <div
      onClick={() => handleValueChange(value)}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${isSelected ? 'bg-accent text-accent-foreground' : ''}`}
    >
      {children}
    </div>
  );
};
