"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Search, UserCheck, UserX, User } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Simple Dashboard Header component
const DashboardHeader = ({ userName, userRole }: { userName: string; userRole: string }) => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-medium leading-none">{userName}</p>
              <p className="text-xs text-muted-foreground">{userRole}</p>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt={userName} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  )
}

// Simple Dashboard Layout component
const DashboardLayout = ({
  header,
  children,
}: {
  header: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      {header}
      <div className="flex-1">{children}</div>
    </div>
  )
}

// Types for our data
type AttendanceStatus = "present" | "absent"

interface StudentAttendance {
  id: number
  name: string
  rollNumber: string
  status: AttendanceStatus
  date: Date
}

interface TeacherAttendance {
  id: number
  name: string
  employeeId: string
  department: string
  status: AttendanceStatus
  date: Date
}

const Attendance = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [searchQuery, setSearchQuery] = useState("")

  // Modal states
  const [markAttendanceOpen, setMarkAttendanceOpen] = useState(false)
  const [editAttendanceOpen, setEditAttendanceOpen] = useState(false)
  const [currentType, setCurrentType] = useState<"students" | "teachers">("students")

  // Form states
  const [selectedPerson, setSelectedPerson] = useState<string>("")
  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceStatus>("present")
  const [attendanceDate, setAttendanceDate] = useState<Date>(new Date())

  // Editing state
  const [editingRecord, setEditingRecord] = useState<StudentAttendance | TeacherAttendance | null>(null)

  // Mock data for attendance
  const [studentAttendance, setStudentAttendance] = useState<StudentAttendance[]>([
    { id: 1, name: "John Doe", rollNumber: "STD-001", status: "present", date: new Date() },
    { id: 2, name: "Jane Smith", rollNumber: "STD-002", status: "absent", date: new Date() },
    { id: 3, name: "Mike Johnson", rollNumber: "STD-003", status: "present", date: new Date() },
    { id: 4, name: "Sarah Williams", rollNumber: "STD-004", status: "present", date: new Date() },
    { id: 5, name: "David Brown", rollNumber: "STD-005", status: "absent", date: new Date() },
  ])

  const [teacherAttendance, setTeacherAttendance] = useState<TeacherAttendance[]>([
    {
      id: 1,
      name: "Dr. Smith",
      employeeId: "TCH-001",
      department: "Computer Science",
      status: "present",
      date: new Date(),
    },
    {
      id: 2,
      name: "Prof. Johnson",
      employeeId: "TCH-002",
      department: "Mathematics",
      status: "present",
      date: new Date(),
    },
    { id: 3, name: "Dr. Williams", employeeId: "TCH-003", department: "Physics", status: "absent", date: new Date() },
    {
      id: 4,
      name: "Prof. Miller",
      employeeId: "TCH-004",
      department: "Chemistry",
      status: "present",
      date: new Date(),
    },
  ])

  // Additional data for dropdowns
  const allStudents = [
    { id: 1, name: "John Doe", rollNumber: "STD-001" },
    { id: 2, name: "Jane Smith", rollNumber: "STD-002" },
    { id: 3, name: "Mike Johnson", rollNumber: "STD-003" },
    { id: 4, name: "Sarah Williams", rollNumber: "STD-004" },
    { id: 5, name: "David Brown", rollNumber: "STD-005" },
    { id: 6, name: "Emily Davis", rollNumber: "STD-006" },
    { id: 7, name: "Robert Wilson", rollNumber: "STD-007" },
  ]

  const allTeachers = [
    { id: 1, name: "Dr. Smith", employeeId: "TCH-001", department: "Computer Science" },
    { id: 2, name: "Prof. Johnson", employeeId: "TCH-002", department: "Mathematics" },
    { id: 3, name: "Dr. Williams", employeeId: "TCH-003", department: "Physics" },
    { id: 4, name: "Prof. Miller", employeeId: "TCH-004", department: "Chemistry" },
    { id: 5, name: "Dr. Taylor", employeeId: "TCH-005", department: "Biology" },
  ]

  const filterStudents = () => {
    return studentAttendance.filter(
      (student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const filterTeachers = () => {
    return teacherAttendance.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.department.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const handleMarkAttendance = (type: "students" | "teachers") => {
    setCurrentType(type)
    setSelectedPerson("")
    setAttendanceStatus("present")
    setAttendanceDate(date)
    setMarkAttendanceOpen(true)
  }

  const handleEditAttendance = (record: StudentAttendance | TeacherAttendance, type: "students" | "teachers") => {
    setCurrentType(type)
    setEditingRecord(record)
    setAttendanceStatus(record.status)
    setAttendanceDate(record.date)
    setEditAttendanceOpen(true)
  }

  const handleMarkAttendanceSubmit = () => {
    if (!selectedPerson) {
      alert("Please select a person")
      return
    }

    if (currentType === "students") {
      const student = allStudents.find((s) => s.id.toString() === selectedPerson)
      if (student) {
        const newAttendance: StudentAttendance = {
          id: Date.now(), // Generate a unique ID
          name: student.name,
          rollNumber: student.rollNumber,
          status: attendanceStatus,
          date: attendanceDate,
        }

        setStudentAttendance([...studentAttendance, newAttendance])
        console.log("Marked student attendance:", newAttendance)
      }
    } else {
      const teacher = allTeachers.find((t) => t.id.toString() === selectedPerson)
      if (teacher) {
        const newAttendance: TeacherAttendance = {
          id: Date.now(), // Generate a unique ID
          name: teacher.name,
          employeeId: teacher.employeeId,
          department: teacher.department,
          status: attendanceStatus,
          date: attendanceDate,
        }

        setTeacherAttendance([...teacherAttendance, newAttendance])
        console.log("Marked teacher attendance:", newAttendance)
      }
    }

    setMarkAttendanceOpen(false)
  }

  const handleEditAttendanceSubmit = () => {
    if (!editingRecord) return

    if (currentType === "students") {
      const updatedAttendance = studentAttendance.map((student) =>
        student.id === editingRecord.id ? { ...student, status: attendanceStatus } : student,
      )
      setStudentAttendance(updatedAttendance)
      console.log("Updated student attendance:", editingRecord.id, attendanceStatus)
    } else {
      const updatedAttendance = teacherAttendance.map((teacher) =>
        teacher.id === editingRecord.id ? { ...teacher, status: attendanceStatus } : teacher,
      )
      setTeacherAttendance(updatedAttendance)
      console.log("Updated teacher attendance:", editingRecord.id, attendanceStatus)
    }

    setEditAttendanceOpen(false)
  }

  return (
    <DashboardLayout header={<DashboardHeader userName="Ahmad Samdani" userRole="Admin" />}>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">Attendance Management</h1>

          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {format(date, "MMM dd, yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className="rounded-md border pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="students">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Student Attendance</span>
                  <Button onClick={() => handleMarkAttendance("students")}>Mark Attendance</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No.</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterStudents().map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.rollNumber}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          {student.status === "present" ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <UserCheck className="w-3 h-3 mr-1" /> Present
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                              <UserX className="w-3 h-3 mr-1" /> Absent
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{format(student.date, "MMM dd, yyyy")}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleEditAttendance(student, "students")}>
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Teacher Attendance</span>
                  <Button onClick={() => handleMarkAttendance("teachers")}>Mark Attendance</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterTeachers().map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>{teacher.employeeId}</TableCell>
                        <TableCell>{teacher.name}</TableCell>
                        <TableCell>{teacher.department}</TableCell>
                        <TableCell>
                          {teacher.status === "present" ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <UserCheck className="w-3 h-3 mr-1" /> Present
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                              <UserX className="w-3 h-3 mr-1" /> Absent
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{format(teacher.date, "MMM dd, yyyy")}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleEditAttendance(teacher, "teachers")}>
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Mark Attendance Dialog */}
      <Dialog open={markAttendanceOpen} onOpenChange={setMarkAttendanceOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Mark Attendance</DialogTitle>
            <DialogDescription>
              {currentType === "students"
                ? "Record student attendance for the selected date."
                : "Record teacher attendance for the selected date."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="person">{currentType === "students" ? "Select Student" : "Select Teacher"}</Label>
              <Select value={selectedPerson} onValueChange={setSelectedPerson}>
                <SelectTrigger id="person">
                  <SelectValue placeholder={currentType === "students" ? "Select a student" : "Select a teacher"} />
                </SelectTrigger>
                <SelectContent>
                  {currentType === "students"
                    ? allStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id.toString()}>
                          {student.name} ({student.rollNumber})
                        </SelectItem>
                      ))
                    : allTeachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id.toString()}>
                          {teacher.name} ({teacher.department})
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Attendance Status</Label>
              <RadioGroup
                value={attendanceStatus}
                onValueChange={(value) => setAttendanceStatus(value as AttendanceStatus)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="present" id="present" />
                  <Label htmlFor="present" className="flex items-center">
                    <UserCheck className="w-4 h-4 mr-1 text-green-600" /> Present
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="absent" id="absent" />
                  <Label htmlFor="absent" className="flex items-center">
                    <UserX className="w-4 h-4 mr-1 text-red-600" /> Absent
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid gap-2">
              <Label>Date</Label>
              <Calendar
                mode="single"
                selected={attendanceDate}
                onSelect={(newDate) => newDate && setAttendanceDate(newDate)}
                initialFocus
                className="w-full border rounded-md p-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMarkAttendanceOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleMarkAttendanceSubmit}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Attendance Dialog */}
      <Dialog open={editAttendanceOpen} onOpenChange={setEditAttendanceOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Attendance</DialogTitle>
            <DialogDescription>
              {editingRecord && (
                <span>
                  Update attendance for {editingRecord.name}
                  {currentType === "teachers" && "department" in editingRecord && ` (${editingRecord.department})`}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Attendance Status</Label>
              <RadioGroup
                value={attendanceStatus}
                onValueChange={(value) => setAttendanceStatus(value as AttendanceStatus)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="present" id="edit-present" />
                  <Label htmlFor="edit-present" className="flex items-center">
                    <UserCheck className="w-4 h-4 mr-1 text-green-600" /> Present
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="absent" id="edit-absent" />
                  <Label htmlFor="edit-absent" className="flex items-center">
                    <UserX className="w-4 h-4 mr-1 text-red-600" /> Absent
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditAttendanceOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditAttendanceSubmit}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

export default Attendance

