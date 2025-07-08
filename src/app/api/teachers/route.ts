import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { UserRole } from '@/types'
import bcrypt from 'bcryptjs'

// GET all teachers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const department = searchParams.get('department') || ''

    const skip = (page - 1) * limit

    let whereClause = {}
    
    if (search) {
      whereClause = {
        OR: [
          { user: { firstName: { contains: search, mode: 'insensitive' } } },
          { user: { lastName: { contains: search, mode: 'insensitive' } } },
          { user: { email: { contains: search, mode: 'insensitive' } } },
          { employeeId: { contains: search, mode: 'insensitive' } },
          { subject: { contains: search, mode: 'insensitive' } }
        ]
      }
    }

    if (department) {
      whereClause = {
        ...whereClause,
        department: { contains: department, mode: 'insensitive' }
      }
    }

    const [teachers, total] = await Promise.all([
      prisma.teacher.findMany({
        where: whereClause,
        include: {
          user: true,
          classes: {
            include: {
              _count: {
                select: { students: true }
              }
            }
          },
          subjects: {
            include: {
              class: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.teacher.count({ where: whereClause })
    ])

    return NextResponse.json({
      success: true,
      data: {
        teachers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Get teachers error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch teachers' },
      { status: 500 }
    )
  }
}

// POST create new teacher
export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      department,
      subject,
      qualification,
      experience,
      salary,
      joinDate
    } = await request.json()

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !department || !subject) {
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate employee ID
    const employeeId = `T${Date.now()}`

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role: UserRole.TEACHER
      }
    })

    // Create teacher
    const teacher = await prisma.teacher.create({
      data: {
        userId: user.id,
        employeeId,
        department,
        subject,
        qualification,
        experience: experience ? parseInt(experience) : undefined,
        salary: salary ? parseFloat(salary) : undefined,
        joinDate: joinDate ? new Date(joinDate) : new Date()
      },
      include: {
        user: true
      }
    })

    return NextResponse.json({
      success: true,
      data: teacher,
      message: 'Teacher created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Create teacher error:', error)
    return NextResponse.json(
      { error: 'Failed to create teacher' },
      { status: 500 }
    )
  }
}
