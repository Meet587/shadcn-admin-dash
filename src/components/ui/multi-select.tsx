import { ChevronDown, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const MultiSelect = ({
  options = [],
  value = [],
  onChange,
  placeholder = 'Select options...',
  label,
  required = false,
}: {
  options: { label: string; value: string }[];
  value: { label: string; value: string }[];
  onChange: (value: { label: string; value: string }[]) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !value.some((selected) => selected.value === option.value),
  );

  const handleSelect = (option: { label: string; value: string }) => {
    const newValue = [...value, option];
    onChange(newValue);
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const handleRemove = (optionToRemove: { label: string; value: string }) => {
    const newValue = value.filter(
      (option) => option.value !== optionToRemove.value,
    );
    onChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && searchTerm === '' && value.length > 0) {
      handleRemove(value[value.length - 1]);
    }
  };

  return (
    <div className="w-[70%] max-w-md" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <div
          className={`min-h-4 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-foreground-500 focus-within:border-transparent cursor-text ${
            isOpen ? 'ring-2 ring-foreground-500 border-transparent' : ''
          }`}
          onClick={() => {
            setIsOpen(true);
            inputRef.current?.focus();
          }}
        >
          <div className="flex flex-wrap gap-1 items-center">
            {value.map((option) => (
              <span
                key={option.value}
                className="inline-flex items-center gap-1 rounded-md bg-foreground-50 px-2 py-1 text-xs font-medium text-foreground-700 border border-foreground-200"
              >
                {option.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(option);
                  }}
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-foreground-200 focus:outline-none focus:bg-blue-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              onFocus={() => setIsOpen(true)}
              placeholder={value.length === 0 ? placeholder : ''}
              className="flex-1 min-w-0 outline-none bg-transparent text-sm"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                >
                  {option.label}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                {searchTerm ? 'No options found' : 'No more options available'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { MultiSelect };
