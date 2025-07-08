import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET single student
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        user: true,
        class: {
          include: {
            teacher: {
              include: {
                user: true
              }
            }
          }
        },
        parent: {
          include: {
            user: true
          }
        }
      }
    })

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: student
    })
  } catch (error) {
    console.error('Get student error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch student' },
      { status: 500 }
    )
  }
}

// PUT update student
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const {
      email,
      firstName,
      lastName,
      phone,
      classId,
      section,
      rollNumber,
      dateOfBirth,
      address,
      parentId,
      isActive
    } = await request.json()

    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { id },
      include: { user: true }
    })

    if (!existingStudent) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Check if email is being changed and if it already exists
    if (email && email !== existingStudent.user.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email }
      })
      if (emailExists) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        )
      }
    }

    // Check if roll number is being changed and if it already exists
    if (rollNumber && rollNumber !== existingStudent.rollNumber) {
      const rollNumberExists = await prisma.student.findUnique({
        where: { rollNumber }
      })
      if (rollNumberExists) {
        return NextResponse.json(
          { error: 'Roll number already exists' },
          { status: 400 }
        )
      }
    }

    // Update user
    await prisma.user.update({
      where: { id: existingStudent.userId },
      data: {
        ...(email && { email }),
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phone && { phone }),
        ...(typeof isActive === 'boolean' && { isActive })
      }
    })

    // Update student
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        ...(classId && { classId }),
        ...(section && { section }),
        ...(rollNumber && { rollNumber }),
        ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
        ...(address && { address }),
        ...(parentId && { parentId })
      },
      include: {
        user: true,
        class: {
          include: {
            teacher: {
              include: {
                user: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: updatedStudent,
      message: 'Student updated successfully'
    })
  } catch (error) {
    console.error('Update student error:', error)
    return NextResponse.json(
      { error: 'Failed to update student' },
      { status: 500 }
    )
  }
}

// DELETE student
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { id },
      include: { user: true }
    })

    if (!existingStudent) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Delete student first (foreign key constraint)
    await prisma.student.delete({
      where: { id }
    })

    // Delete user
    await prisma.user.delete({
      where: { id: existingStudent.userId }
    })

    return NextResponse.json({
      success: true,
      message: 'Student deleted successfully'
    })
  } catch (error) {
    console.error('Delete student error:', error)
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    )
  }
}
