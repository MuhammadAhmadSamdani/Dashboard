
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Student } from '@/pages/Students';

interface ViewStudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewStudentModal: React.FC<ViewStudentModalProps> = ({ student, isOpen, onClose }) => {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Student Details</span>
            <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100">
              <X className="h-4 w-4" />
            </button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p className="mt-1">{student.name}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Roll Number</h3>
              <p className="mt-1">{student.rollNumber}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Gender</h3>
              <p className="mt-1">{student.gender}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Contact</h3>
              <p className="mt-1">{student.contact}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1">{student.email}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Department</h3>
              <p className="mt-1">{student.department}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Semester</h3>
              <p className="mt-1">{student.semester}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">CGPA</h3>
              <p className="mt-1">{student.cgpa}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Fee Status</h3>
              <p className="mt-1 inline-flex px-2 py-1 rounded-full text-xs capitalize" 
                style={{ 
                  backgroundColor: student.feeStatus === 'Paid' ? '#dcfce7' : '#fef9c3',
                  color: student.feeStatus === 'Paid' ? '#166534' : '#854d0e'  
                }}>
                {student.feeStatus}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Enrollment Date</h3>
              <p className="mt-1">{student.enrollmentDate}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Address</h3>
            <p className="mt-1">{student.address}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewStudentModal;
