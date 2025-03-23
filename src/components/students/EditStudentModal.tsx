
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Student } from '@/pages/Students';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  rollNumber: z.string().min(3, { message: "Roll number is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  contact: z.string().min(5, { message: "Contact number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(5, { message: "Address is required" }),
  department: z.string().min(2, { message: "Department is required" }),
  semester: z.string().min(1, { message: "Semester is required" }),
  cgpa: z.string().min(1, { message: "CGPA is required" }),
  feeStatus: z.string().min(1, { message: "Fee status is required" }),
  enrollmentDate: z.string().min(1, { message: "Enrollment date is required" }),
});

interface EditStudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (student: Student) => void;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({ 
  student, 
  isOpen, 
  onClose, 
  onUpdate 
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: student ? {
      name: student.name,
      rollNumber: student.rollNumber,
      gender: student.gender,
      contact: student.contact,
      email: student.email,
      address: student.address,
      department: student.department,
      semester: student.semester,
      cgpa: student.cgpa,
      feeStatus: student.feeStatus,
      enrollmentDate: student.enrollmentDate,
    } : {},
  });

  React.useEffect(() => {
    if (student) {
      form.reset({
        name: student.name,
        rollNumber: student.rollNumber,
        gender: student.gender,
        contact: student.contact,
        email: student.email,
        address: student.address,
        department: student.department,
        semester: student.semester,
        cgpa: student.cgpa,
        feeStatus: student.feeStatus,
        enrollmentDate: student.enrollmentDate,
      });
    }
  }, [student, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!student) return;
    
    onUpdate({
      ...student,
      ...values,
    });
  };

  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rollNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number</FormLabel>
                    <FormControl>
                      <Input placeholder="BSCS-F19-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input placeholder="Male/Female" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="+92 300 1234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <FormControl>
                      <Input placeholder="8th" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cgpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CGPA</FormLabel>
                    <FormControl>
                      <Input placeholder="3.8" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="feeStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fee Status</FormLabel>
                    <FormControl>
                      <Input placeholder="Paid/Pending" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="enrollmentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enrollment Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="123 Main Street, Islamabad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Update Student</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentModal;
