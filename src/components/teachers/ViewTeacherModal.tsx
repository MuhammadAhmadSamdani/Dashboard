
import React from 'react';
import { Teacher } from '@/types/teacher';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  Building, 
  CalendarDays, 
  GraduationCap, 
  BookOpen 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ViewTeacherModalProps {
  teacher: Teacher;
  isOpen: boolean;
  onClose: () => void;
}

const ViewTeacherModal: React.FC<ViewTeacherModalProps> = ({ 
  teacher, 
  isOpen, 
  onClose 
}) => {
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
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] overflow-auto max-h-[90vh] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-center">Teacher Information</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4">
          <Avatar className="h-24 w-24 animate-fade-in">
            <AvatarImage src={teacher.image} alt={teacher.name} />
            <AvatarFallback className="text-2xl">{getInitials(teacher.name)}</AvatarFallback>
          </Avatar>
          
          <h2 className="text-2xl font-bold mt-4 text-center animate-fade-in">{teacher.name}</h2>
          <p className="text-muted-foreground text-center mt-1 animate-fade-in">{teacher.department}</p>
          
          <Badge 
            variant="outline" 
            className={`mt-2 ${getStatusColor(teacher.status)} animate-fade-in`}
          >
            {teacher.status}
          </Badge>
        </div>
        
        <Separator className="my-2" />
        
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center">
            <GraduationCap className="h-5 w-5 mr-3 text-primary" />
            <div>
              <p className="text-sm font-medium">Qualification</p>
              <p className="text-sm text-muted-foreground">{teacher.qualification}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Mail className="h-5 w-5 mr-3 text-primary" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{teacher.email}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Phone className="h-5 w-5 mr-3 text-primary" />
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">{teacher.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Building className="h-5 w-5 mr-3 text-primary" />
            <div>
              <p className="text-sm font-medium">Office</p>
              <p className="text-sm text-muted-foreground">{teacher.office}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <CalendarDays className="h-5 w-5 mr-3 text-primary" />
            <div>
              <p className="text-sm font-medium">Join Date</p>
              <p className="text-sm text-muted-foreground">{formatDate(teacher.joinDate)}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <BookOpen className="h-5 w-5 mr-3 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Subjects</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {teacher.subjects.map((subject, index) => (
                  <Badge key={index} variant="secondary" className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} className="w-full sm:w-auto">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTeacherModal;
