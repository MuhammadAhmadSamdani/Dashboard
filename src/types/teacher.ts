
export interface Teacher {
  id: number;
  name: string;
  department: string;
  qualification: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  image: string;
  subjects: string[];
  office: string;
}
