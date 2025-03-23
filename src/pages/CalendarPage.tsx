import{ useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Calendar } from '@/components/ui/calendar';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'teachers' | 'students'>('teachers');
  
  // Mock events data
  const mockEvents = {
    teachers: [
      { id: 1, title: 'Faculty Meeting', date: new Date(2025, 4, 15), teacher: 'Dr. Smith' },
      { id: 2, title: 'Research Presentation', date: new Date(2025, 4, 18), teacher: 'Prof. Johnson' },
      { id: 3, title: 'Department Evaluation', date: new Date(2025, 4, 20), teacher: 'Dr. Williams' },
    ],
    students: [
      { id: 1, title: 'Semester Exams Begin', date: new Date(2025, 4, 10) },
      { id: 2, title: 'Science Project Submission', date: new Date(2025, 4, 22) },
      { id: 3, title: 'Sports Day', date: new Date(2025, 4, 25) },
    ]
  };

  const [currentEvents, setCurrentEvents] = useState(mockEvents.teachers);

  const handleViewChange = (newView: 'teachers' | 'students') => {
    setView(newView);
    setCurrentEvents(mockEvents[newView]);
  };

  return (
    <DashboardLayout
      header={<DashboardHeader userName="Ahmad Samdani" userRole="Admin" />}
    >
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">Calendar</h1>
          <div className="flex items-center gap-2">
            <Select
              value={view}
              onValueChange={(value) => handleViewChange(value as 'teachers' | 'students')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teachers">Teachers</SelectItem>
                <SelectItem value="students">Students</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{view === 'teachers' ? 'Teacher Calendar' : 'Student Calendar'}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setDate(subMonths(date, 1))}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span className="font-medium">{format(date, 'MMMM yyyy')}</span>
                    <button
                      onClick={() => setDate(addMonths(date, 1))}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  className="rounded-md border"
                  month={date}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Events</CardTitle>
                <CardDescription>
                  {format(date, 'MMMM dd, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentEvents.length > 0 ? (
                    currentEvents.map(event => (
                      <div 
                        key={event.id} 
                        className="flex items-start p-3 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {format(event.date, 'MMM dd, yyyy')}
                          </p>
                          {event.teacher && (
                            <p className="text-sm text-primary">{event.teacher}</p>
                          )}
                        </div>
                        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No events scheduled for this day</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;