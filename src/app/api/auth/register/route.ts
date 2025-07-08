import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { UserRole } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      role, 
      phone 
    } = await request.json()

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role: role as UserRole,
      },
    })

    // Create role-specific profile
    switch (role) {
      case UserRole.ADMIN:
        await prisma.admin.create({
          data: {
            userId: user.id,
            permissions: ['all'], // Default admin permissions
          },
        })
        break

      case UserRole.TEACHER:
        await prisma.teacher.create({
          data: {
            userId: user.id,
            employeeId: `T${Date.now()}`, // Generate employee ID
            department: 'General',
            subject: 'General',
            joinDate: new Date(),
          },
        })
        break

      case UserRole.STUDENT:
        await prisma.student.create({
          data: {
            userId: user.id,
            studentId: `S${Date.now()}`, // Generate student ID
            rollNumber: `R${Date.now()}`,
            classId: '', // This should be set when assigning to a class
            section: 'A',
            admissionDate: new Date(),
            dateOfBirth: new Date(), // This should be provided in the request
            address: '', // This should be provided in the request
          },
        })
        break

      case UserRole.PARENT:
        await prisma.parent.create({
          data: {
            userId: user.id,
            relationship: 'Guardian',
            address: '', // This should be provided in the request
          },
        })
        break
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        message: 'User registered successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
