
import React, { useState } from 'react';
import { Teacher } from '@/types/teacher';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ViewTeacherModal from './ViewTeacherModal';
import EditTeacherModal from './EditTeacherModal';
import DeleteTeacherDialog from './DeleteTeacherDialog';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface TeacherListProps {
  teachers: Teacher[];
  onEdit: (teacher: Teacher) => void;
  onDelete: (id: number) => void;
}

const TeacherList: React.FC<TeacherListProps> = ({ teachers, onEdit, onDelete }) => {
  const [viewingTeacher, setViewingTeacher] = useState<Teacher | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [deletingTeacherId, setDeletingTeacherId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 5;

  // Calculate pagination
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = teachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
  const totalPages = Math.ceil(teachers.length / teachersPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
  };

  const handleDelete = (id: number) => {
    setDeletingTeacherId(id);
  };

  const handleView = (teacher: Teacher) => {
    setViewingTeacher(teacher);
  };

  return (
    <div className="rounded-md border animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTeachers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No teachers found
              </TableCell>
            </TableRow>
          ) : (
            currentTeachers.map((teacher, index) => (
              <TableRow 
                key={teacher.id} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={teacher.image} alt={teacher.name} />
                      <AvatarFallback>{getInitials(teacher.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{teacher.name}</div>
                      <div className="text-sm text-muted-foreground md:hidden">{teacher.department}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{teacher.department}</TableCell>
                <TableCell className="hidden md:table-cell">{teacher.email}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline" className={getStatusColor(teacher.status)}>
                    {teacher.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(teacher)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(teacher)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(teacher.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {teachers.length > teachersPerPage && (
        <div className="p-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {viewingTeacher && (
        <ViewTeacherModal
          teacher={viewingTeacher}
          isOpen={!!viewingTeacher}
          onClose={() => setViewingTeacher(null)}
        />
      )}

      {editingTeacher && (
        <EditTeacherModal
          teacher={editingTeacher}
          isOpen={!!editingTeacher}
          onClose={() => setEditingTeacher(null)}
          onSave={(updatedTeacher) => {
            onEdit(updatedTeacher);
            setEditingTeacher(null);
          }}
        />
      )}

      {deletingTeacherId && (
        <DeleteTeacherDialog
          isOpen={!!deletingTeacherId}
          onClose={() => setDeletingTeacherId(null)}
          onConfirm={() => {
            onDelete(deletingTeacherId);
            setDeletingTeacherId(null);
          }}
        />
      )}
    </div>
  );
};

export default TeacherList;
