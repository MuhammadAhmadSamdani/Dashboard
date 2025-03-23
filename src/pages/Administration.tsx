
import React, { useState } from 'react';
import { Building2, Search, Plus, FileDown, Trash2, Edit, Eye, Check, X } from 'lucide-react';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Mock Data for employees
const employees = [
  { id: 1, name: "John Smith", role: "Administrator", department: "Administration", email: "john.smith@school.edu", phone: "+1 234 567 890", status: "active" },
  { id: 2, name: "Sarah Johnson", role: "Librarian", department: "Library", email: "sarah.johnson@school.edu", phone: "+1 234 567 891", status: "active" },
  { id: 3, name: "Michael Brown", role: "IT Specialist", department: "IT Department", email: "michael.brown@school.edu", phone: "+1 234 567 892", status: "active" },
  { id: 4, name: "Jennifer Davis", role: "Accountant", department: "Finance", email: "jennifer.davis@school.edu", phone: "+1 234 567 893", status: "inactive" },
  { id: 5, name: "Robert Wilson", role: "Security Officer", department: "Security", email: "robert.wilson@school.edu", phone: "+1 234 567 894", status: "active" },
];

const Administration = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [employeeData, setEmployeeData] = useState(employees);
  
  // Filter employees based on search query
  const filteredEmployees = employeeData.filter(employee => 
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Mock new employee form data
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
    status: "active"
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value
    });
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setNewEmployee({
      ...newEmployee,
      [field]: value
    });
  };
  
  const handleAddEmployee = () => {
    const newId = employeeData.length > 0 ? Math.max(...employeeData.map(e => e.id)) + 1 : 1;
    const employee = {
      id: newId,
      ...newEmployee
    };
    setEmployeeData([...employeeData, employee]);
    setNewEmployee({
      name: "",
      role: "",
      department: "",
      email: "",
      phone: "",
      status: "active"
    });
    setShowAddDialog(false);
  };
  
  return (
    <DashboardLayout
      header={<DashboardHeader userName="Ahmad Samdani" userRole="Admin" />}
    >
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">Administration</h1>
          
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new employee. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={newEmployee.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Input
                      id="role"
                      name="role"
                      value={newEmployee.role}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="department" className="text-right">
                      Department
                    </Label>
                    <Select 
                      value={newEmployee.department} 
                      onValueChange={(value) => handleSelectChange("department", value)}
                    >
                      <SelectTrigger id="department" className="col-span-3">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Administration">Administration</SelectItem>
                        <SelectItem value="IT Department">IT Department</SelectItem>
                        <SelectItem value="Library">Library</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Security">Security</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={newEmployee.phone}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select 
                      value={newEmployee.status} 
                      onValueChange={(value) => handleSelectChange("status", value)}
                    >
                      <SelectTrigger id="status" className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleAddEmployee}>
                    Add Employee
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="employees">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="employees" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Employee Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>
                          {employee.status === "active" ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <Check className="w-3 h-3 mr-1" /> Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                              <X className="w-3 h-3 mr-1" /> Inactive
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredEmployees.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No employees found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="departments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Department Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['Administration', 'IT Department', 'Library', 'Finance', 'Security'].map((dept) => (
                    <Card key={dept}>
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">{dept}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Employees:</span>
                            <span className="font-medium">
                              {employeeData.filter(e => e.department === dept).length}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Active:</span>
                            <span className="font-medium">
                              {employeeData.filter(e => e.department === dept && e.status === 'active').length}
                            </span>
                          </div>
                          <div className="flex justify-end mt-2">
                            <Button variant="outline" size="sm">Manage</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Administration;
