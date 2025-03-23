
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationCardProps {
  title: string;
  color: 'blue' | 'purple' | 'green';
  onClick?: () => void;
}

const NavigationCard: React.FC<NavigationCardProps> = ({ title, color, onClick }) => {
  const bgColor = {
    blue: 'bg-dashboard-blue',
    purple: 'bg-dashboard-purple',
    green: 'bg-dashboard-green',
  }[color];

  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full py-3 px-4 rounded-xl flex items-center justify-between nav-item", 
        bgColor
      )}
    >
      <span className="font-medium">{title}</span>
      <span className="arrow-icon">
        <ArrowRight className="h-5 w-5 text-slate-500" />
      </span>
    </button>
  );
};

export default NavigationCard;
