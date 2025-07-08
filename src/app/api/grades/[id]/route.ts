import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET single grade
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const grade = await prisma.grade.findUnique({
      where: { id },
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
      }
    })

    if (!grade) {
      return NextResponse.json(
        { error: 'Grade not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: grade
    })
  } catch (error) {
    console.error('Get grade error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch grade' },
      { status: 500 }
    )
  }
}

// PUT update grade
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const {
      marks,
      maxMarks,
      grade,
      gpa,
      examDate,
      remarks
    } = await request.json()

    // Check if grade exists
    const existingGrade = await prisma.grade.findUnique({
      where: { id }
    })

    if (!existingGrade) {
      return NextResponse.json(
        { error: 'Grade not found' },
        { status: 404 }
      )
    }

    // Validate marks if provided
    if (marks !== undefined && maxMarks !== undefined && parseFloat(marks) > parseFloat(maxMarks)) {
      return NextResponse.json(
        { error: 'Marks cannot exceed maximum marks' },
        { status: 400 }
      )
    }

    // Update grade
    const updatedGrade = await prisma.grade.update({
      where: { id },
      data: {
        ...(marks !== undefined && { marks: parseFloat(marks) }),
        ...(maxMarks !== undefined && { maxMarks: parseFloat(maxMarks) }),
        ...(grade && { grade }),
        ...(gpa !== undefined && { gpa: gpa ? parseFloat(gpa) : null }),
        ...(examDate && { examDate: new Date(examDate) }),
        ...(remarks !== undefined && { remarks })
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
      data: updatedGrade,
      message: 'Grade updated successfully'
    })
  } catch (error) {
    console.error('Update grade error:', error)
    return NextResponse.json(
      { error: 'Failed to update grade' },
      { status: 500 }
    )
  }
}

// DELETE grade
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if grade exists
    const existingGrade = await prisma.grade.findUnique({
      where: { id }
    })

    if (!existingGrade) {
      return NextResponse.json(
        { error: 'Grade not found' },
        { status: 404 }
      )
    }

    // Delete grade
    await prisma.grade.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Grade deleted successfully'
    })
  } catch (error) {
    console.error('Delete grade error:', error)
    return NextResponse.json(
      { error: 'Failed to delete grade' },
      { status: 500 }
    )
  }
}
