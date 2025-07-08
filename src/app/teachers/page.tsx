'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'admin@school.com',
  avatar: '',
  role: 'Administrator'
}

// Mock teachers data
const teachersData = [
  {
    id: '1',
    employeeId: 'EMP001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@school.com',
    phone: '+1234567890',
    department: 'Mathematics',
    subject: 'Advanced Mathematics',
    qualification: 'M.Sc. Mathematics',
    experience: 8,
    joinDate: '2020-08-15',
    salary: 75000,
    status: 'Active',
    classesCount: 4
  },
  {
    id: '2',
    employeeId: 'EMP002',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@school.com',
    phone: '+1234567891',
    department: 'Science',
    subject: 'Physics',
    qualification: 'Ph.D. Physics',
    experience: 12,
    joinDate: '2018-01-20',
    salary: 85000,
    status: 'Active',
    classesCount: 3
  },
  {
    id: '3',
    employeeId: 'EMP003',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@school.com',
    phone: '+1234567892',
    department: 'Language Arts',
    subject: 'English Literature',
    qualification: 'M.A. English',
    experience: 6,
    joinDate: '2021-09-01',
    salary: 68000,
    status: 'Active',
    classesCount: 5
  },
  {
    id: '4',
    employeeId: 'EMP004',
    firstName: 'David',
    lastName: 'Thompson',
    email: 'david.thompson@school.com',
    phone: '+1234567893',
    department: 'Social Studies',
    subject: 'History',
    qualification: 'M.A. History',
    experience: 15,
    joinDate: '2015-03-10',
    salary: 72000,
    status: 'On Leave',
    classesCount: 2
  },
  {
    id: '5',
    employeeId: 'EMP005',
    firstName: 'Lisa',
    lastName: 'Wang',
    email: 'lisa.wang@school.com',
    phone: '+1234567894',
    department: 'Science',
    subject: 'Chemistry',
    qualification: 'M.Sc. Chemistry',
    experience: 4,
    joinDate: '2023-07-01',
    salary: 65000,
    status: 'Active',
    classesCount: 3
  }
]

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [teachers] = useState(teachersData)

  const filteredTeachers = teachers.filter(teacher =>
    teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Active
          </Badge>
        )
      case 'On Leave':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            On Leave
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <DashboardLayout user={mockUser}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Teachers</h1>
            <p className="text-muted-foreground">
              Manage teaching staff and their assignments
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">
                +3 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82</div>
              <p className="text-xs text-muted-foreground">
                94.3% of total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9.2</div>
              <p className="text-xs text-muted-foreground">
                years of experience
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                active departments
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Teachers Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Teachers</CardTitle>
            <CardDescription>
              A comprehensive list of all teaching staff members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Classes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" alt={teacher.firstName} />
                          <AvatarFallback>
                            {teacher.firstName[0]}{teacher.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {teacher.firstName} {teacher.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center space-x-2">
                            <Mail className="h-3 w-3" />
                            <span>{teacher.email}</span>
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center space-x-2">
                            <Phone className="h-3 w-3" />
                            <span>{teacher.phone}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {teacher.employeeId}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{teacher.department}</div>
                        <div className="text-sm text-muted-foreground">
                          {teacher.qualification}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>{teacher.experience} years</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {teacher.classesCount} classes
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(teacher.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Teacher
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Teacher
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
