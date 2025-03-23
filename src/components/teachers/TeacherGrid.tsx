
import React, { useState } from 'react';
import { Teacher } from '@/types/teacher';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Mail, Phone, CalendarDays } from 'lucide-react';
import ViewTeacherModal from './ViewTeacherModal';
import EditTeacherModal from './EditTeacherModal';
import DeleteTeacherDialog from './DeleteTeacherDialog';

interface TeacherGridProps {
  teachers: Teacher[];
  onEdit: (teacher: Teacher) => void;
  onDelete: (id: number) => void;
}

const TeacherGrid: React.FC<TeacherGridProps> = ({ teachers, onEdit, onDelete }) => {
  const [viewingTeacher, setViewingTeacher] = useState<Teacher | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [deletingTeacherId, setDeletingTeacherId] = useState<number | null>(null);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {teachers.length === 0 ? (
        <div className="col-span-full py-12 text-center text-muted-foreground">
          No teachers found
        </div>
      ) : (
        teachers.map((teacher, index) => (
          <Card 
            key={teacher.id} 
            className="overflow-hidden animate-fade-in hover:shadow-md transition-shadow duration-300" 
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="relative p-6 flex flex-col items-center">
              <Badge 
                variant="outline" 
                className={`absolute top-4 right-4 ${getStatusColor(teacher.status)}`}
              >
                {teacher.status}
              </Badge>
              
              <Avatar className="h-24 w-24 mb-4 animate-scale-in">
                <AvatarImage src={teacher.image} alt={teacher.name} />
                <AvatarFallback className="text-2xl">
                  {getInitials(teacher.name)}
                </AvatarFallback>
              </Avatar>
              
              <h3 className="text-xl font-medium text-center">{teacher.name}</h3>
              <p className="text-muted-foreground text-center">{teacher.department}</p>
              <p className="text-sm mt-1 text-center">{teacher.qualification}</p>
            </div>
            
            <CardContent className="px-6 pb-2 pt-0">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{teacher.phone}</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Joined {formatDate(teacher.joinDate)}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="px-6 py-4 flex justify-between gap-2 border-t mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => setViewingTeacher(teacher)}
              >
                <Eye className="h-3.5 w-3.5 mr-1" />
                View
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => setEditingTeacher(teacher)}
              >
                <Edit className="h-3.5 w-3.5 mr-1" />
                Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-destructive hover:text-destructive"
                onClick={() => setDeletingTeacherId(teacher.id)}
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))
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

export default TeacherGrid;
