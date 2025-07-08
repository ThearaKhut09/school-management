'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  Users,
  Clock,
  Plus
} from 'lucide-react'

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'admin@school.com',
  avatar: '',
  role: 'Administrator'
}

// Mock classes data
const classes = [
  {
    id: 1,
    name: 'Mathematics 10-A',
    teacher: 'Dr. Sarah Johnson',
    students: 28,
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    room: 'Room 101',
    subject: 'Mathematics'
  },
  {
    id: 2,
    name: 'Physics 11-B',
    teacher: 'Prof. Michael Chen',
    students: 24,
    schedule: 'Tue, Thu - 10:30 AM',
    room: 'Lab 203',
    subject: 'Physics'
  },
  {
    id: 3,
    name: 'English Literature 9-C',
    teacher: 'Ms. Emily Davis',
    students: 30,
    schedule: 'Mon, Wed, Fri - 2:00 PM',
    room: 'Room 105',
    subject: 'English'
  },
  {
    id: 4,
    name: 'Chemistry 12-A',
    teacher: 'Dr. Robert Wilson',
    students: 22,
    schedule: 'Tue, Thu - 1:00 PM',
    room: 'Lab 301',
    subject: 'Chemistry'
  }
]

export default function ClassesPage() {
  return (
    <DashboardLayout user={mockUser}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Classes</h1>
            <p className="text-muted-foreground mt-1">
              Manage all classes and their schedules
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Class
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {classes.reduce((total, cls) => total + cls.students, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <Card key={cls.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{cls.name}</CardTitle>
                  <Badge variant="secondary">{cls.subject}</Badge>
                </div>
                <CardDescription>{cls.teacher}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    {cls.students} students
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    {cls.schedule}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="mr-2 h-4 w-4" />
                    {cls.room}
                  </div>
                </div>
                <div className="mt-4 space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
