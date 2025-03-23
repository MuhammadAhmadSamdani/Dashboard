
import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ViewStudentModal from '@/components/students/ViewStudentModal';
import EditStudentModal from '@/components/students/EditStudentModal';
import DeleteStudentDialog from '@/components/students/DeleteStudentDialog';
import AddStudentModal from '@/components/students/AddStudentModal';

// Mock data for students
const INITIAL_STUDENTS = [
  { 
    id: 1, 
    name: 'John Doe', 
    rollNumber: 'BSCS-F19-001', 
    gender: 'Male',
    contact: '+92 333 1234567',
    email: 'john.doe@example.com',
    address: '123 Main Street, Islamabad',
    department: 'Computer Science',
    semester: '8th',
    cgpa: '3.8',
    feeStatus: 'Paid',
    enrollmentDate: '2019-09-01',
    fatherName: 'Robert Doe',
    siblings: '1 Brother',
    matricMarks: '980/1100',
    fscMarks: '1020/1100'
  },
  { 
    id: 2, 
    name: 'Sarah Khan', 
    rollNumber: 'BSCS-F19-025', 
    gender: 'Female',
    contact: '+92 321 9876543',
    email: 'sarah.khan@example.com',
    address: '456 Park Avenue, Lahore',
    department: 'Computer Science',
    semester: '8th',
    cgpa: '3.9',
    feeStatus: 'Paid',
    enrollmentDate: '2019-09-01',
    fatherName: 'Ahmed Khan',
    siblings: '2 Sisters',
    matricMarks: '950/1100',
    fscMarks: '990/1100'
  },
  { 
    id: 3, 
    name: 'Ali Hassan', 
    rollNumber: 'BSCS-F19-034', 
    gender: 'Male',
    contact: '+92 300 1122334',
    email: 'ali.hassan@example.com',
    address: '789 University Road, Karachi',
    department: 'Computer Science',
    semester: '8th',
    cgpa: '3.5',
    feeStatus: 'Pending',
    enrollmentDate: '2019-09-01',
    fatherName: 'Imran Hassan',
    siblings: '1 Brother, 1 Sister',
    matricMarks: '920/1100',
    fscMarks: '970/1100'
  },
  { 
    id: 4, 
    name: 'Ayesha Malik', 
    rollNumber: 'BSCS-F19-045', 
    gender: 'Female',
    contact: '+92 345 5544332',
    email: 'ayesha.malik@example.com',
    address: '321 Canal Road, Faisalabad',
    department: 'Computer Science',
    semester: '8th',
    cgpa: '3.7',
    feeStatus: 'Paid',
    enrollmentDate: '2019-09-01',
    fatherName: 'Tariq Malik',
    siblings: '2 Brothers',
    matricMarks: '940/1100',
    fscMarks: '980/1100'
  },
  { 
    id: 5, 
    name: 'Usman Ahmed', 
    rollNumber: 'BSCS-F19-056', 
    gender: 'Male',
    contact: '+92 312 9988776',
    email: 'usman.ahmed@example.com',
    address: '654 College Road, Peshawar',
    department: 'Computer Science',
    semester: '8th',
    cgpa: '3.4',
    feeStatus: 'Pending',
    enrollmentDate: '2019-09-01',
    fatherName: 'Khalid Ahmed',
    siblings: '1 Sister',
    matricMarks: '900/1100',
    fscMarks: '950/1100'
  },
];

export type Student = typeof INITIAL_STUDENTS[0];

const Students = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [filteredStudents, setFilteredStudents] = useState(INITIAL_STUDENTS);
  
  // Modal states
  const [viewStudent, setViewStudent] = useState<Student | null>(null);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [deleteStudent, setDeleteStudent] = useState<Student | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    const filtered = students.filter(student => 
      student.name.toLowerCase().includes(term.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(term.toLowerCase()) ||
      student.email.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredStudents(filtered);
  };

  // Add student
  const handleAddStudent = (student: Omit<Student, 'id'>) => {
    const newStudent = {
      ...student,
      id: students.length + 1
    };
    
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
    setIsAddModalOpen(false);
  };

  // Update student
  const handleUpdateStudent = (updatedStudent: Student) => {
    const updatedStudents = students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    );
    
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
    setEditStudent(null);
  };

  // Delete student
  const handleDeleteStudent = () => {
    if (!deleteStudent) return;
    
    const updatedStudents = students.filter(student => student.id !== deleteStudent.id);
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
    setDeleteStudent(null);
  };

  return (
    <DashboardLayout
      header={<DashboardHeader userName="Ahmad Samdani" userRole="Admin" />}
    >
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Students Management</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="w-full md:w-[250px] pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>CGPA</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.rollNumber}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.semester}</TableCell>
                    <TableCell>{student.cgpa}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        student.feeStatus === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {student.feeStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setViewStudent(student)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditStudent(student)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteStudent(student)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No students found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Modals */}
      <ViewStudentModal 
        student={viewStudent} 
        isOpen={!!viewStudent} 
        onClose={() => setViewStudent(null)} 
      />
      
      <EditStudentModal 
        student={editStudent} 
        isOpen={!!editStudent} 
        onClose={() => setEditStudent(null)} 
        onUpdate={handleUpdateStudent}
      />
      
      <DeleteStudentDialog
        student={deleteStudent}
        isOpen={!!deleteStudent}
        onClose={() => setDeleteStudent(null)}
        onDelete={handleDeleteStudent}
      />
      
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddStudent}
      />
    </DashboardLayout>
  );
};

export default Students;
