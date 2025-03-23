
import{ useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Search, UserCheck, UserX, Filter } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

const Attendance = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for attendance
  const studentAttendance = [
    { id: 1, name: "John Doe", rollNumber: "STD-001", status: "present", date: new Date() },
    { id: 2, name: "Jane Smith", rollNumber: "STD-002", status: "absent", date: new Date() },
    { id: 3, name: "Mike Johnson", rollNumber: "STD-003", status: "present", date: new Date() },
    { id: 4, name: "Sarah Williams", rollNumber: "STD-004", status: "present", date: new Date() },
    { id: 5, name: "David Brown", rollNumber: "STD-005", status: "absent", date: new Date() },
  ];
  
  const teacherAttendance = [
    { id: 1, name: "Dr. Smith", employeeId: "TCH-001", department: "Computer Science", status: "present", date: new Date() },
    { id: 2, name: "Prof. Johnson", employeeId: "TCH-002", department: "Mathematics", status: "present", date: new Date() },
    { id: 3, name: "Dr. Williams", employeeId: "TCH-003", department: "Physics", status: "absent", date: new Date() },
    { id: 4, name: "Prof. Miller", employeeId: "TCH-004", department: "Chemistry", status: "present", date: new Date() },
  ];
  
  const filterStudents = () => {
    return studentAttendance.filter(student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const filterTeachers = () => {
    return teacherAttendance.filter(teacher => 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <DashboardLayout
      header={<DashboardHeader userName="Ahmad Samdani" userRole="Admin" />}
    >
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">Attendance Management</h1>
          
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {format(date, "MMM dd, yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className="rounded-md border pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="students">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Student Attendance</span>
                  <Button>Mark Attendance</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No.</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterStudents().map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.rollNumber}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          {student.status === "present" ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <UserCheck className="w-3 h-3 mr-1" /> Present
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                              <UserX className="w-3 h-3 mr-1" /> Absent
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{format(student.date, "MMM dd, yyyy")}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="teachers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Teacher Attendance</span>
                  <Button>Mark Attendance</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterTeachers().map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>{teacher.employeeId}</TableCell>
                        <TableCell>{teacher.name}</TableCell>
                        <TableCell>{teacher.department}</TableCell>
                        <TableCell>
                          {teacher.status === "present" ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <UserCheck className="w-3 h-3 mr-1" /> Present
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                              <UserX className="w-3 h-3 mr-1" /> Absent
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{format(teacher.date, "MMM dd, yyyy")}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
