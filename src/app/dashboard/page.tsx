'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  TrendingUp,
  Clock,
  Bell,
  MessageSquare,
  FileText
} from 'lucide-react'
import { useEffect, useState } from 'react'

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'admin@school.com',
  avatar: '',
  role: 'Administrator'
}

// Mock dashboard data
const dashboardStats = {
  totalStudents: 1245,
  totalTeachers: 87,
  totalClasses: 42,
  attendance: 94.5,
  studentsChange: +12,
  teachersChange: +3,
  classesChange: +2,
  attendanceChange: +2.1
}

const recentActivities = [
  {
    id: 1,
    type: 'attendance',
    message: 'Morning attendance recorded for Class 10-A',
    time: '10 minutes ago',
    icon: Calendar
  },
  {
    id: 2,
    type: 'grade',
    message: 'Math quiz grades published for Class 9-B',
    time: '25 minutes ago',
    icon: FileText
  },
  {
    id: 3,
    type: 'message',
    message: 'New message from Sarah Johnson (Parent)',
    time: '1 hour ago',
    icon: MessageSquare
  },
  {
    id: 4,
    type: 'assignment',
    message: 'Physics assignment submitted by Class 11-C',
    time: '2 hours ago',
    icon: BookOpen
  }
]

const upcomingEvents = [
  {
    id: 1,
    title: 'Parent-Teacher Meeting',
    date: '2025-07-10',
    time: '2:00 PM',
    type: 'meeting'
  },
  {
    id: 2,
    title: 'Science Fair',
    date: '2025-07-15',
    time: '9:00 AM',
    type: 'event'
  },
  {
    id: 3,
    title: 'Mid-term Examinations',
    date: '2025-07-20',
    time: 'All Day',
    type: 'exam'
  }
]

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <DashboardLayout user={mockUser}>
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {mockUser.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} • {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <Button>
              <Bell className="mr-2 h-4 w-4" />
              View Notifications
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalStudents.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +{dashboardStats.studentsChange} from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalTeachers}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +{dashboardStats.teachersChange} from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalClasses}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +{dashboardStats.classesChange} from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.attendance}%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +{dashboardStats.attendanceChange}% from last week
              </div>
              <Progress value={dashboardStats.attendance} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates from your school</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <activity.icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.message}
                    </p>
                    <div className="flex items-center mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Activities
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Don&apos;t miss these important dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()} • {event.time}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: 'Add Student', icon: Users, href: '/students/new' },
              { label: 'Record Attendance', icon: Calendar, href: '/attendance' },
              { label: 'Create Assignment', icon: FileText, href: '/assignments/new' },
              { label: 'Send Message', icon: MessageSquare, href: '/messages/new' },
              { label: 'Generate Report', icon: TrendingUp, href: '/reports' },
              { label: 'Schedule Event', icon: Clock, href: '/events/new' }
            ].map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2"
              >
                <action.icon className="h-5 w-5" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
