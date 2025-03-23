
import React, { useState } from 'react';
import { CalendarClock, Filter, Plus, Save, User, Clock, FileDown, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

import {
  Card,
  CardContent,
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const TimeTable = () => {
  const [department, setDepartment] = useState("cs");
  const [semester, setSemester] = useState("1");
  const [section, setSection] = useState("A");
  
  // Mock timetable data
  const timetableData = {
    Monday: [
      { id: 1, subject: 'Introduction to Programming', teacher: 'Prof. Johnson', time: '9:00 AM - 10:30 AM', room: 'A-101' },
      { id: 2, subject: 'Mathematics', teacher: 'Dr. Williams', time: '11:00 AM - 12:30 PM', room: 'A-102' },
      { id: 3, subject: 'Physics Lab', teacher: 'Dr. Brown', time: '2:00 PM - 4:00 PM', room: 'Lab-01' },
    ],
    Tuesday: [
      { id: 4, subject: 'Digital Logic Design', teacher: 'Prof. Smith', time: '9:00 AM - 10:30 AM', room: 'A-103' },
      { id: 5, subject: 'English Communication', teacher: 'Prof. Davis', time: '11:00 AM - 12:30 PM', room: 'A-104' },
    ],
    Wednesday: [
      { id: 6, subject: 'Introduction to Programming', teacher: 'Prof. Johnson', time: '9:00 AM - 10:30 AM', room: 'A-101' },
      { id: 7, subject: 'Mathematics', teacher: 'Dr. Williams', time: '11:00 AM - 12:30 PM', room: 'A-102' },
      { id: 8, subject: 'Computer Networks', teacher: 'Dr. Miller', time: '2:00 PM - 3:30 PM', room: 'A-105' },
    ],
    Thursday: [
      { id: 9, subject: 'Digital Logic Design', teacher: 'Prof. Smith', time: '9:00 AM - 10:30 AM', room: 'A-103' },
      { id: 10, subject: 'English Communication', teacher: 'Prof. Davis', time: '11:00 AM - 12:30 PM', room: 'A-104' },
    ],
    Friday: [
      { id: 11, subject: 'Computer Networks', teacher: 'Dr. Miller', time: '9:00 AM - 10:30 AM', room: 'A-105' },
      { id: 12, subject: 'Physics Lab', teacher: 'Dr. Brown', time: '11:00 AM - 1:00 PM', room: 'Lab-01' },
    ]
  };
  
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  return (
    <DashboardLayout
      header={<DashboardHeader userName="Ahmad Samdani" userRole="Admin" />}
    >
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">Class Timetable</h1>
          
          <div className="flex flex-wrap items-center gap-2">
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Semester 1</SelectItem>
                <SelectItem value="2">Semester 2</SelectItem>
                <SelectItem value="3">Semester 3</SelectItem>
                <SelectItem value="4">Semester 4</SelectItem>
                <SelectItem value="5">Semester 5</SelectItem>
                <SelectItem value="6">Semester 6</SelectItem>
                <SelectItem value="7">Semester 7</SelectItem>
                <SelectItem value="8">Semester 8</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Class
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5" />
              Timetable for {department.toUpperCase()} - Semester {semester} (Section {section})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {weekdays.map((day) => (
                <div key={day} className="space-y-2">
                  <h3 className="text-lg font-medium">{day}</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timetableData[day as keyof typeof timetableData]?.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.subject}</TableCell>
                          <TableCell>{item.teacher}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.time}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.room}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {(!timetableData[day as keyof typeof timetableData] || timetableData[day as keyof typeof timetableData].length === 0) && (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No classes scheduled for {day}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TimeTable;
