import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET dashboard statistics
export async function GET() {
  try {
    // Get current date
    const today = new Date()

    // Get basic counts
    const [
      totalStudents,
      totalTeachers,
      totalClasses,
      totalSubjects,
      todayAttendance
    ] = await Promise.all([
      prisma.student.count({
        where: {
          user: {
            isActive: true
          }
        }
      }),
      prisma.teacher.count({
        where: {
          user: {
            isActive: true
          }
        }
      }),
      prisma.class.count(),
      prisma.subject.count(),
      prisma.attendance.count({
        where: {
          date: {
            gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
            lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
          },
          status: {
            in: ['PRESENT', 'LATE']
          }
        }
      })
    ])

    // Calculate attendance rate
    const totalTodayStudents = await prisma.attendance.count({
      where: {
        date: {
          gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
          lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
        }
      }
    })

    const attendanceRate = totalTodayStudents > 0 ? (todayAttendance / totalTodayStudents) * 100 : 0

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalStudents,
          totalTeachers,
          totalClasses,
          totalSubjects,
          todayAttendance,
          attendanceRate: parseFloat(attendanceRate.toFixed(1))
        },
        recentActivities: [],
        upcomingEvents: []
      }
    })
  } catch (error) {
    console.error('Get dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    )
  }
}
