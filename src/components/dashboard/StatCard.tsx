
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: 'blue' | 'purple' | 'green';
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color }) => {
  const bgColor = {
    blue: 'bg-dashboard-blue',
    purple: 'bg-dashboard-purple',
    green: 'bg-dashboard-green',
  }[color];

  return (
    <div className={cn("flex items-center p-4 rounded-xl stat-card animate-scale-in", bgColor)}>
      <div className="flex-shrink-0 mr-4 text-slate-700">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-slate-600">{title}</h3>
        <p className="text-2xl font-bold tracking-tight mt-1">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
