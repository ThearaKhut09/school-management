'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Filter
} from 'lucide-react'

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'admin@school.com',
  avatar: '',
  role: 'Administrator'
}

// Mock attendance data
const attendanceStats = {
  totalClasses: 42,
  presentStudents: 1148,
  totalStudents: 1245,
  attendanceRate: 92.2,
  absentStudents: 97
}

const recentAttendance = [
  {
    id: 1,
    className: 'Mathematics 10-A',
    date: '2025-07-08',
    present: 26,
    absent: 2,
    total: 28,
    teacher: 'Dr. Sarah Johnson'
  },
  {
    id: 2,
    className: 'Physics 11-B',
    date: '2025-07-08',
    present: 22,
    absent: 2,
    total: 24,
    teacher: 'Prof. Michael Chen'
  },
  {
    id: 3,
    className: 'English Literature 9-C',
    date: '2025-07-08',
    present: 28,
    absent: 2,
    total: 30,
    teacher: 'Ms. Emily Davis'
  },
  {
    id: 4,
    className: 'Chemistry 12-A',
    date: '2025-07-08',
    present: 20,
    absent: 2,
    total: 22,
    teacher: 'Dr. Robert Wilson'
  }
]

export default function AttendancePage() {
  return (
    <DashboardLayout user={mockUser}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage student attendance
            </p>
          </div>
          <div className="space-x-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Take Attendance
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceStats.attendanceRate}%</div>
              <Progress value={attendanceStats.attendanceRate} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceStats.presentStudents}</div>
              <p className="text-xs text-muted-foreground">
                out of {attendanceStats.totalStudents} students
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceStats.absentStudents}</div>
              <p className="text-xs text-muted-foreground">
                {((attendanceStats.absentStudents / attendanceStats.totalStudents) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceStats.totalClasses}</div>
              <p className="text-xs text-muted-foreground">
                All attendance recorded
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Attendance</CardTitle>
            <CardDescription>
              Attendance records for all classes today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAttendance.map((record) => {
                const attendancePercentage = (record.present / record.total) * 100
                return (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-medium">{record.className}</h3>
                          <p className="text-sm text-muted-foreground">{record.teacher}</p>
                        </div>
                        <Badge variant={attendancePercentage >= 90 ? 'default' : attendancePercentage >= 80 ? 'secondary' : 'destructive'}>
                          {attendancePercentage.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>{record.present} Present</span>
                      </div>
                      <div className="flex items-center space-x-1 text-red-600">
                        <XCircle className="h-4 w-4" />
                        <span>{record.absent} Absent</span>
                      </div>
                      <div className="text-muted-foreground">
                        Total: {record.total}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
