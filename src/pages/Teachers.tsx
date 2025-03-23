import{ useState } from 'react';
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

// Mock data for teachers
const INITIAL_TEACHERS = [
  { 
    id: 1, 
    name: 'Dr. Ali Raza', 
    employeeId: 'T-001', 
    gender: 'Male',
    contact: '+92 333 1234567',
    email: 'ali.raza@example.com',
    address: '123 Main Street, Islamabad',
    department: 'Computer Science',
    qualification: 'PhD in Computer Science',
    experience: '10 years',
    designation: 'Associate Professor',
    joiningDate: '2015-09-01',
    courses: ['Data Structures', 'Algorithms'],
    salary: '150,000 PKR',
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Dr. Sarah Khan', 
    employeeId: 'T-002', 
    gender: 'Female',
    contact: '+92 321 9876543',
    email: 'sarah.khan@example.com',
    address: '456 Park Avenue, Lahore',
    department: 'Computer Science',
    qualification: 'PhD in Artificial Intelligence',
    experience: '8 years',
    designation: 'Assistant Professor',
    joiningDate: '2017-09-01',
    courses: ['Machine Learning', 'Deep Learning'],
    salary: '120,000 PKR',
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'Mr. Usman Ahmed', 
    employeeId: 'T-003', 
    gender: 'Male',
    contact: '+92 300 1122334',
    email: 'usman.ahmed@example.com',
    address: '789 University Road, Karachi',
    department: 'Computer Science',
    qualification: 'MS in Software Engineering',
    experience: '6 years',
    designation: 'Lecturer',
    joiningDate: '2019-09-01',
    courses: ['Web Development', 'Database Systems'],
    salary: '90,000 PKR',
    status: 'Active'
  },
];

export type Teacher = typeof INITIAL_TEACHERS[0];

// View Teacher Modal Component
const ViewTeacherModal = ({ teacher, isOpen, onClose }: { teacher: Teacher | null; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen || !teacher) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Teacher Details</h2>
        <div className="space-y-4">
          <div><span className="font-semibold">Name:</span> {teacher.name}</div>
          <div><span className="font-semibold">Employee ID:</span> {teacher.employeeId}</div>
          <div><span className="font-semibold">Department:</span> {teacher.department}</div>
          <div><span className="font-semibold">Designation:</span> {teacher.designation}</div>
          <div><span className="font-semibold">Qualification:</span> {teacher.qualification}</div>
          <div><span className="font-semibold">Status:</span> {teacher.status}</div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

// Edit Teacher Modal Component
const EditTeacherModal = ({ teacher, isOpen, onClose, onUpdate }: { teacher: Teacher | null; isOpen: boolean; onClose: () => void; onUpdate: (teacher: Teacher) => void }) => {
  const [formData, setFormData] = useState(teacher || {} as Teacher);

  if (!isOpen || !teacher) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Edit Teacher</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-semibold">Employee ID</label>
            <Input
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-semibold">Department</label>
            <Input
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Teacher Dialog Component
const DeleteTeacherDialog = ({ teacher, isOpen, onClose, onDelete }: { teacher: Teacher | null; isOpen: boolean; onClose: () => void; onDelete: () => void }) => {
  if (!isOpen || !teacher) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Delete Teacher</h2>
        <p>Are you sure you want to delete <strong>{teacher.name}</strong>?</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="button" variant="destructive" onClick={onDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

// Add Teacher Modal Component
const AddTeacherModal = ({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: (teacher: Omit<Teacher, 'id'>) => void }) => {
  const [formData, setFormData] = useState<Omit<Teacher, 'id'>>({
    name: '',
    employeeId: '',
    gender: 'Male',
    contact: '',
    email: '',
    address: '',
    department: '',
    qualification: '',
    experience: '',
    designation: '',
    joiningDate: '',
    courses: [],
    salary: '',
    status: 'Active'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Add Teacher</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-semibold">Employee ID</label>
            <Input
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Teachers Component
const Teachers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [filteredTeachers, setFilteredTeachers] = useState(INITIAL_TEACHERS);
  
  // Modal states
  const [viewTeacher, setViewTeacher] = useState<Teacher | null>(null);
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [deleteTeacher, setDeleteTeacher] = useState<Teacher | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    const filtered = teachers.filter(teacher => 
      teacher.name.toLowerCase().includes(term.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(term.toLowerCase()) ||
      teacher.email.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredTeachers(filtered);
  };

  // Add teacher
  const handleAddTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newTeacher = {
      ...teacher,
      id: teachers.length + 1
    };
    
    const updatedTeachers = [...teachers, newTeacher];
    setTeachers(updatedTeachers);
    setFilteredTeachers(updatedTeachers);
    setIsAddModalOpen(false);
  };

  // Update teacher
  const handleUpdateTeacher = (updatedTeacher: Teacher) => {
    const updatedTeachers = teachers.map(teacher => 
      teacher.id === updatedTeacher.id ? updatedTeacher : teacher
    );
    
    setTeachers(updatedTeachers);
    setFilteredTeachers(updatedTeachers);
    setEditTeacher(null);
  };

  // Delete teacher
  const handleDeleteTeacher = () => {
    if (!deleteTeacher) return;
    
    const updatedTeachers = teachers.filter(teacher => teacher.id !== deleteTeacher.id);
    setTeachers(updatedTeachers);
    setFilteredTeachers(updatedTeachers);
    setDeleteTeacher(null);
  };

  return (
    <DashboardLayout
      header={<DashboardHeader userName="Ahmad Samdani" userRole="Admin" />}
    >
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Teachers Management</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search teachers..."
              className="w-full md:w-[250px] pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Teacher
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Qualification</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.employeeId}</TableCell>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.department}</TableCell>
                    <TableCell>{teacher.designation}</TableCell>
                    <TableCell>{teacher.qualification}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        teacher.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {teacher.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setViewTeacher(teacher)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditTeacher(teacher)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTeacher(teacher)}
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
                    No teachers found.
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
      <ViewTeacherModal 
        teacher={viewTeacher} 
        isOpen={!!viewTeacher} 
        onClose={() => setViewTeacher(null)} 
      />
      
      <EditTeacherModal 
        teacher={editTeacher} 
        isOpen={!!editTeacher} 
        onClose={() => setEditTeacher(null)} 
        onUpdate={handleUpdateTeacher}
      />
      
      <DeleteTeacherDialog
        teacher={deleteTeacher}
        isOpen={!!deleteTeacher}
        onClose={() => setDeleteTeacher(null)}
        onDelete={handleDeleteTeacher}
      />
      
      <AddTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTeacher}
      />
    </DashboardLayout>
  );
};

export default Teachers;