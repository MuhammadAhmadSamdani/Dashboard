
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface CardWithHeaderProps {
  title: string;
  children: ReactNode;
  dropdown?: {
    selected: string;
    options: string[];
    onChange: (option: string) => void;
  };
  className?: string;
}

const CardWithHeader: React.FC<CardWithHeaderProps> = ({ 
  title, 
  children, 
  dropdown,
  className 
}) => {
  return (
    <div className={cn("bg-white rounded-xl shadow-sm overflow-hidden animate-fade-in", className)}>
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-medium">{title}</h2>
        
        {dropdown && (
          <div className="relative group">
            <button className="flex items-center text-sm text-slate-600 px-3 py-1 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors">
              {dropdown.selected}
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            
            <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-md py-1 w-32 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {dropdown.options.map((option) => (
                <button
                  key={option}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-slate-50 transition-colors"
                  onClick={() => dropdown.onChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default CardWithHeader;
