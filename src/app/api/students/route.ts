import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { UserRole } from '@/types'
import bcrypt from 'bcryptjs'

// GET all students
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    let whereClause = {}
    
    if (search) {
      whereClause = {
        OR: [
          { user: { firstName: { contains: search, mode: 'insensitive' } } },
          { user: { lastName: { contains: search, mode: 'insensitive' } } },
          { user: { email: { contains: search, mode: 'insensitive' } } },
          { studentId: { contains: search, mode: 'insensitive' } },
          { rollNumber: { contains: search, mode: 'insensitive' } }
        ]
      }
    }

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where: whereClause,
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
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.student.count({ where: whereClause })
    ])

    return NextResponse.json({
      success: true,
      data: {
        students,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Get students error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

// POST create new student
export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      classId,
      section,
      rollNumber,
      dateOfBirth,
      address,
      parentId,
      admissionDate
    } = await request.json()

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !rollNumber || !dateOfBirth || !address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    // Check if roll number already exists
    const existingStudent = await prisma.student.findUnique({
      where: { rollNumber }
    })

    if (existingStudent) {
      return NextResponse.json(
        { error: 'Roll number already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate student ID
    const studentId = `S${Date.now()}`

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role: UserRole.STUDENT
      }
    })

    // Create student
    const student = await prisma.student.create({
      data: {
        userId: user.id,
        studentId,
        rollNumber,
        classId: classId || '',
        section: section || 'A',
        admissionDate: admissionDate ? new Date(admissionDate) : new Date(),
        dateOfBirth: new Date(dateOfBirth),
        address,
        parentId
      },
      include: {
        user: true,
        class: classId ? {
          include: {
            teacher: {
              include: {
                user: true
              }
            }
          }
        } : false
      }
    })

    return NextResponse.json({
      success: true,
      data: student,
      message: 'Student created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Create student error:', error)
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    )
  }
}
