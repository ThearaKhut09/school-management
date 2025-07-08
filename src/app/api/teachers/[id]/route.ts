import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET single teacher
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        user: true,
        classes: {
          include: {
            students: {
              include: {
                user: true
              }
            },
            subjects: true
          }
        },
        subjects: {
          include: {
            class: true
          }
        },
        assignments: {
          include: {
            subject: true,
            class: true,
            submissions: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!teacher) {
      return NextResponse.json(
        { error: 'Teacher not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: teacher
    })
  } catch (error) {
    console.error('Get teacher error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch teacher' },
      { status: 500 }
    )
  }
}

// PUT update teacher
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
      department,
      subject,
      qualification,
      experience,
      salary,
      isActive
    } = await request.json()

    // Check if teacher exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: { id },
      include: { user: true }
    })

    if (!existingTeacher) {
      return NextResponse.json(
        { error: 'Teacher not found' },
        { status: 404 }
      )
    }

    // Check if email is being changed and if it already exists
    if (email && email !== existingTeacher.user.email) {
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

    // Update user
    await prisma.user.update({
      where: { id: existingTeacher.userId },
      data: {
        ...(email && { email }),
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phone && { phone }),
        ...(typeof isActive === 'boolean' && { isActive })
      }
    })

    // Update teacher
    const updatedTeacher = await prisma.teacher.update({
      where: { id },
      data: {
        ...(department && { department }),
        ...(subject && { subject }),
        ...(qualification && { qualification }),
        ...(experience && { experience: parseInt(experience) }),
        ...(salary && { salary: parseFloat(salary) })
      },
      include: {
        user: true
      }
    })

    return NextResponse.json({
      success: true,
      data: updatedTeacher,
      message: 'Teacher updated successfully'
    })
  } catch (error) {
    console.error('Update teacher error:', error)
    return NextResponse.json(
      { error: 'Failed to update teacher' },
      { status: 500 }
    )
  }
}

// DELETE teacher
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if teacher exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: { id },
      include: { user: true }
    })

    if (!existingTeacher) {
      return NextResponse.json(
        { error: 'Teacher not found' },
        { status: 404 }
      )
    }

    // Delete teacher first (foreign key constraint)
    await prisma.teacher.delete({
      where: { id }
    })

    // Delete user
    await prisma.user.delete({
      where: { id: existingTeacher.userId }
    })

    return NextResponse.json({
      success: true,
      message: 'Teacher deleted successfully'
    })
  } catch (error) {
    console.error('Delete teacher error:', error)
    return NextResponse.json(
      { error: 'Failed to delete teacher' },
      { status: 500 }
    )
  }
}
