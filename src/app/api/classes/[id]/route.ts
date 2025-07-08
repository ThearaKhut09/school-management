import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET single class
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const classData = await prisma.class.findUnique({
      where: { id },
      include: {
        teacher: {
          include: {
            user: true
          }
        },
        students: {
          include: {
            user: true
          }
        },
        subjects: {
          include: {
            teacher: {
              include: {
                user: true
              }
            }
          }
        },
        assignments: {
          include: {
            subject: true,
            teacher: {
              include: {
                user: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        timetable: {
          include: {
            subject: true
          },
          orderBy: [
            { dayOfWeek: 'asc' },
            { startTime: 'asc' }
          ]
        }
      }
    })

    if (!classData) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: classData
    })
  } catch (error) {
    console.error('Get class error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch class' },
      { status: 500 }
    )
  }
}

// PUT update class
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const {
      name,
      grade,
      section,
      teacherId,
      capacity,
      academicYear
    } = await request.json()

    // Check if class exists
    const existingClass = await prisma.class.findUnique({
      where: { id }
    })

    if (!existingClass) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      )
    }

    // Check if teacher exists if being changed
    if (teacherId && teacherId !== existingClass.teacherId) {
      const teacherExists = await prisma.teacher.findUnique({
        where: { id: teacherId }
      })
      if (!teacherExists) {
        return NextResponse.json(
          { error: 'Teacher not found' },
          { status: 404 }
        )
      }
    }

    // Check if updated grade/section combination already exists
    if ((grade && parseInt(grade) !== existingClass.grade) || 
        (section && section !== existingClass.section) ||
        (academicYear && academicYear !== existingClass.academic_year)) {
      const duplicateClass = await prisma.class.findFirst({
        where: {
          id: { not: id },
          grade: grade ? parseInt(grade) : existingClass.grade,
          section: section || existingClass.section,
          academic_year: academicYear || existingClass.academic_year
        }
      })

      if (duplicateClass) {
        return NextResponse.json(
          { error: 'Class with this grade and section already exists for this academic year' },
          { status: 400 }
        )
      }
    }

    // Update class
    const updatedClass = await prisma.class.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(grade && { grade: parseInt(grade) }),
        ...(section && { section }),
        ...(teacherId && { teacherId }),
        ...(capacity && { capacity: parseInt(capacity) }),
        ...(academicYear && { academic_year: academicYear })
      },
      include: {
        teacher: {
          include: {
            user: true
          }
        },
        _count: {
          select: {
            students: true,
            subjects: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: updatedClass,
      message: 'Class updated successfully'
    })
  } catch (error) {
    console.error('Update class error:', error)
    return NextResponse.json(
      { error: 'Failed to update class' },
      { status: 500 }
    )
  }
}

// DELETE class
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if class exists
    const existingClass = await prisma.class.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            students: true
          }
        }
      }
    })

    if (!existingClass) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      )
    }

    // Check if class has students
    if (existingClass._count.students > 0) {
      return NextResponse.json(
        { error: 'Cannot delete class with enrolled students' },
        { status: 400 }
      )
    }

    // Delete class
    await prisma.class.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Class deleted successfully'
    })
  } catch (error) {
    console.error('Delete class error:', error)
    return NextResponse.json(
      { error: 'Failed to delete class' },
      { status: 500 }
    )
  }
}
