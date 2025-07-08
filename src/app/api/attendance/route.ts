import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET attendance records
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const classId = searchParams.get('classId') || ''
    const studentId = searchParams.get('studentId') || ''
    const date = searchParams.get('date') || ''
    const startDate = searchParams.get('startDate') || ''
    const endDate = searchParams.get('endDate') || ''

    const skip = (page - 1) * limit

    let whereClause = {}
    
    if (classId) {
      whereClause = { ...whereClause, classId }
    }

    if (studentId) {
      whereClause = { ...whereClause, studentId }
    }

    if (date) {
      whereClause = { 
        ...whereClause, 
        date: new Date(date)
      }
    } else if (startDate && endDate) {
      whereClause = {
        ...whereClause,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      }
    }

    const [attendances, total] = await Promise.all([
      prisma.attendance.findMany({
        where: whereClause,
        include: {
          student: {
            include: {
              user: true,
              class: true
            }
          },
          teacher: {
            include: {
              user: true
            }
          },
          class: true
        },
        skip,
        take: limit,
        orderBy: [
          { date: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.attendance.count({ where: whereClause })
    ])

    return NextResponse.json({
      success: true,
      data: {
        attendances,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Get attendance error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch attendance records' },
      { status: 500 }
    )
  }
}

// POST create attendance records
export async function POST(request: NextRequest) {
  try {
    const {
      classId,
      teacherId,
      date,
      attendanceRecords // Array of { studentId, status, remarks }
    } = await request.json()

    // Validate required fields
    if (!classId || !teacherId || !date || !attendanceRecords || !Array.isArray(attendanceRecords)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if class exists
    const classExists = await prisma.class.findUnique({
      where: { id: classId }
    })

    if (!classExists) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      )
    }

    // Check if teacher exists
    const teacherExists = await prisma.teacher.findUnique({
      where: { id: teacherId }
    })

    if (!teacherExists) {
      return NextResponse.json(
        { error: 'Teacher not found' },
        { status: 404 }
      )
    }

    const attendanceDate = new Date(date)

    // Check if attendance already exists for this date and class
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        classId,
        date: attendanceDate
      }
    })

    if (existingAttendance) {
      return NextResponse.json(
        { error: 'Attendance already recorded for this date and class' },
        { status: 400 }
      )
    }

    // Create attendance records
    const createdAttendances = await Promise.all(
      attendanceRecords.map(async (record: { studentId: string; status: string; remarks?: string }) => {
        return await prisma.attendance.create({
          data: {
            studentId: record.studentId,
            classId,
            teacherId,
            date: attendanceDate,
            status: record.status as 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED',
            remarks: record.remarks
          },
          include: {
            student: {
              include: {
                user: true
              }
            }
          }
        })
      })
    )

    return NextResponse.json({
      success: true,
      data: createdAttendances,
      message: 'Attendance recorded successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Create attendance error:', error)
    return NextResponse.json(
      { error: 'Failed to record attendance' },
      { status: 500 }
    )
  }
}
