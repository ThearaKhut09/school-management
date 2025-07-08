import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET all classes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const grade = searchParams.get('grade') || ''

    const skip = (page - 1) * limit

    let whereClause = {}
    
    if (search) {
      whereClause = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { section: { contains: search, mode: 'insensitive' } },
          { teacher: { 
            user: { 
              OR: [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } }
              ]
            }
          }}
        ]
      }
    }

    if (grade) {
      whereClause = {
        ...whereClause,
        grade: parseInt(grade)
      }
    }

    const [classes, total] = await Promise.all([
      prisma.class.findMany({
        where: whereClause,
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
        },
        skip,
        take: limit,
        orderBy: [
          { grade: 'asc' },
          { section: 'asc' }
        ]
      }),
      prisma.class.count({ where: whereClause })
    ])

    return NextResponse.json({
      success: true,
      data: {
        classes,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Get classes error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch classes' },
      { status: 500 }
    )
  }
}

// POST create new class
export async function POST(request: NextRequest) {
  try {
    const {
      name,
      grade,
      section,
      teacherId,
      capacity,
      academicYear
    } = await request.json()

    // Validate required fields
    if (!name || !grade || !section || !teacherId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
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

    // Check if class with same grade, section, and academic year already exists
    const existingClass = await prisma.class.findFirst({
      where: {
        grade: parseInt(grade),
        section,
        academic_year: academicYear || new Date().getFullYear().toString()
      }
    })

    if (existingClass) {
      return NextResponse.json(
        { error: 'Class with this grade and section already exists for this academic year' },
        { status: 400 }
      )
    }

    // Create class
    const newClass = await prisma.class.create({
      data: {
        name,
        grade: parseInt(grade),
        section,
        teacherId,
        capacity: capacity ? parseInt(capacity) : 30,
        academic_year: academicYear || new Date().getFullYear().toString()
      },
      include: {
        teacher: {
          include: {
            user: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: newClass,
      message: 'Class created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Create class error:', error)
    return NextResponse.json(
      { error: 'Failed to create class' },
      { status: 500 }
    )
  }
}
