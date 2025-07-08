'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  FileText,
  Plus
} from 'lucide-react'

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'admin@school.com',
  avatar: '',
  role: 'Administrator'
}

// Mock grades data
const gradeStats = {
  averageGrade: 87.3,
  passingRate: 94.2,
  excellentGrades: 156,
  totalAssignments: 342
}

const recentGrades = [
  {
    id: 1,
    assignment: 'Math Quiz - Chapter 5',
    class: 'Mathematics 10-A',
    teacher: 'Dr. Sarah Johnson',
    average: 88.5,
    submitted: 26,
    total: 28,
    graded: 26,
    date: '2025-07-07'
  },
  {
    id: 2,
    assignment: 'Physics Lab Report',
    class: 'Physics 11-B',
    teacher: 'Prof. Michael Chen',
    average: 92.3,
    submitted: 22,
    total: 24,
    graded: 20,
    date: '2025-07-06'
  },
  {
    id: 3,
    assignment: 'English Essay - Romeo & Juliet',
    class: 'English Literature 9-C',
    teacher: 'Ms. Emily Davis',
    average: 85.7,
    submitted: 28,
    total: 30,
    graded: 28,
    date: '2025-07-05'
  },
  {
    id: 4,
    assignment: 'Chemistry Experiment Analysis',
    class: 'Chemistry 12-A',
    teacher: 'Dr. Robert Wilson',
    average: 89.1,
    submitted: 20,
    total: 22,
    graded: 18,
    date: '2025-07-04'
  }
]

const gradeDistribution = [
  { grade: 'A', count: 342, percentage: 27.5 },
  { grade: 'B', count: 486, percentage: 39.0 },
  { grade: 'C', count: 298, percentage: 23.9 },
  { grade: 'D', count: 87, percentage: 7.0 },
  { grade: 'F', count: 32, percentage: 2.6 }
]

export default function GradesPage() {
  return (
    <DashboardLayout user={mockUser}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Grades</h1>
            <p className="text-muted-foreground mt-1">
              Manage assignments, grades, and academic performance
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Assignment
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gradeStats.averageGrade}%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +2.3% from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Passing Rate</CardTitle>
              <Award className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gradeStats.passingRate}%</div>
              <Progress value={gradeStats.passingRate} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Excellent Grades</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gradeStats.excellentGrades}</div>
              <p className="text-xs text-muted-foreground">
                Students with A grades
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gradeStats.totalAssignments}</div>
              <p className="text-xs text-muted-foreground">
                This semester
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Assignments */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Assignments</CardTitle>
                <CardDescription>
                  Latest graded assignments and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentGrades.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{assignment.assignment}</h3>
                        <p className="text-sm text-muted-foreground">{assignment.class} • {assignment.teacher}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span className="text-muted-foreground">
                            Submitted: {assignment.submitted}/{assignment.total}
                          </span>
                          <span className="text-muted-foreground">
                            Graded: {assignment.graded}/{assignment.submitted}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{assignment.average}%</div>
                        <Badge variant={assignment.average >= 90 ? 'default' : assignment.average >= 80 ? 'secondary' : 'destructive'}>
                          {assignment.average >= 90 ? 'Excellent' : assignment.average >= 80 ? 'Good' : 'Needs Improvement'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grade Distribution */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>
                  Overall grade distribution across all classes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gradeDistribution.map((item) => (
                    <div key={item.grade} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          item.grade === 'A' ? 'bg-green-500' :
                          item.grade === 'B' ? 'bg-blue-500' :
                          item.grade === 'C' ? 'bg-yellow-500' :
                          item.grade === 'D' ? 'bg-orange-500' :
                          'bg-red-500'
                        }`} />
                        <span className="font-medium">Grade {item.grade}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{item.count}</div>
                        <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
