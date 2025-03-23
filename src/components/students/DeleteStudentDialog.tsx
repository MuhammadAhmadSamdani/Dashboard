
import React from 'react';
import { Student } from '@/pages/Students';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteStudentDialogProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteStudentDialog: React.FC<DeleteStudentDialogProps> = ({ 
  student, 
  isOpen, 
  onClose, 
  onDelete 
}) => {
  if (!student) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the student record for <span className="font-semibold">{student.name} ({student.rollNumber})</span>. 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteStudentDialog;
