import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET grades
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const studentId = searchParams.get('studentId') || ''
    const subjectId = searchParams.get('subjectId') || ''
    const examType = searchParams.get('examType') || ''

    const skip = (page - 1) * limit

    let whereClause = {}
    
    if (studentId) {
      whereClause = { ...whereClause, studentId }
    }

    if (subjectId) {
      whereClause = { ...whereClause, subjectId }
    }

    if (examType) {
      whereClause = { ...whereClause, examType }
    }

    const [grades, total] = await Promise.all([
      prisma.grade.findMany({
        where: whereClause,
        include: {
          student: {
            include: {
              user: true,
              class: true
            }
          },
          subject: {
            include: {
              class: true
            }
          },
          teacher: {
            include: {
              user: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: [
          { examDate: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.grade.count({ where: whereClause })
    ])

    return NextResponse.json({
      success: true,
      data: {
        grades,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Get grades error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch grades' },
      { status: 500 }
    )
  }
}

// POST create grade
export async function POST(request: NextRequest) {
  try {
    const {
      studentId,
      subjectId,
      teacherId,
      examType,
      marks,
      maxMarks,
      grade,
      gpa,
      examDate,
      remarks
    } = await request.json()

    // Validate required fields
    if (!studentId || !subjectId || !teacherId || !examType || marks === undefined || !maxMarks || !examDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate marks
    if (parseFloat(marks) > parseFloat(maxMarks)) {
      return NextResponse.json(
        { error: 'Marks cannot exceed maximum marks' },
        { status: 400 }
      )
    }

    // Check if student exists
    const studentExists = await prisma.student.findUnique({
      where: { id: studentId }
    })

    if (!studentExists) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Check if subject exists
    const subjectExists = await prisma.subject.findUnique({
      where: { id: subjectId }
    })

    if (!subjectExists) {
      return NextResponse.json(
        { error: 'Subject not found' },
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

    // Create grade
    const newGrade = await prisma.grade.create({
      data: {
        studentId,
        subjectId,
        teacherId,
        examType: examType as 'QUIZ' | 'ASSIGNMENT' | 'MIDTERM' | 'FINAL' | 'PROJECT',
        marks: parseFloat(marks),
        maxMarks: parseFloat(maxMarks),
        grade: grade || '',
        gpa: gpa ? parseFloat(gpa) : null,
        examDate: new Date(examDate),
        remarks
      },
      include: {
        student: {
          include: {
            user: true
          }
        },
        subject: {
          include: {
            class: true
          }
        },
        teacher: {
          include: {
            user: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: newGrade,
      message: 'Grade created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Create grade error:', error)
    return NextResponse.json(
      { error: 'Failed to create grade' },
      { status: 500 }
    )
  }
}
