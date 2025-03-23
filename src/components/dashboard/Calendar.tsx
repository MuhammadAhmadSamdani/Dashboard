
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarProps {
  month?: string;
  year?: number;
  events?: Array<{
    id: number;
    title: string;
    date: Date;
    teacher?: string;
  }>;
}

const Calendar: React.FC<CalendarProps> = ({ 
  month = "May", 
  year = 2025,
  events = [] 
}) => {
  const [selectedDate, setSelectedDate] = useState<number>(15); // Default selected date
  
  // Generate calendar days (simplified for this example)
  const daysInMonth = 31; // For May 2025
  const startDay = 3; // Wednesday (0 = Sunday, 3 = Wednesday)
  
  const days = [];
  // Empty cells for days before the start of the month
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
  }
  
  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === 14; // Example: 14th is today
    const isSelected = i === selectedDate;
    
    // Check if there are events for this day
    const dayEvents = events.filter(event => {
      const eventDay = event.date.getDate();
      return eventDay === i;
    });
    
    const hasEvents = dayEvents.length > 0;
    
    days.push(
      <button
        key={i}
        onClick={() => setSelectedDate(i)}
        className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center text-sm calendar-day relative",
          isSelected && "calendar-day-selected bg-blue-500 text-white",
          isToday && !isSelected && "calendar-day-today ring-2 ring-blue-200",
          hasEvents && !isSelected && "bg-purple-100"
        )}
      >
        {i}
        {hasEvents && (
          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full"></span>
        )}
      </button>
    );
  }
  
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <button className="p-1 rounded-full hover:bg-slate-100 transition-colors">
          <ChevronLeft className="h-5 w-5 text-slate-600" />
        </button>
        
        <h3 className="font-medium text-lg">
          <span className="px-3 py-1 rounded-md bg-dashboard-purple">{month} {year}</span>
        </h3>
        
        <button className="p-1 rounded-full hover:bg-slate-100 transition-colors">
          <ChevronRight className="h-5 w-5 text-slate-600" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        <div className="h-8 w-8 flex items-center justify-center text-xs font-medium text-slate-500">S</div>
        <div className="h-8 w-8 flex items-center justify-center text-xs font-medium text-slate-500">M</div>
        <div className="h-8 w-8 flex items-center justify-center text-xs font-medium text-slate-500">T</div>
        <div className="h-8 w-8 flex items-center justify-center text-xs font-medium text-slate-500">W</div>
        <div className="h-8 w-8 flex items-center justify-center text-xs font-medium text-slate-500">T</div>
        <div className="h-8 w-8 flex items-center justify-center text-xs font-medium text-slate-500">F</div>
        <div className="h-8 w-8 flex items-center justify-center text-xs font-medium text-slate-500">S</div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
      
      {selectedDate && events.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium mb-2">Events for {month} {selectedDate}</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {events
              .filter(event => event.date.getDate() === selectedDate)
              .map(event => (
                <div 
                  key={event.id}
                  className="p-2 bg-slate-50 rounded text-sm border-l-4 border-purple-400"
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs text-slate-500">{event.teacher}</div>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
