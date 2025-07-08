import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET messages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const userId = searchParams.get('userId') || ''
    const isRead = searchParams.get('isRead')

    const skip = (page - 1) * limit

    let whereClause = {}
    
    if (userId) {
      whereClause = {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      }
    }

    if (isRead !== null && isRead !== undefined) {
      whereClause = {
        ...whereClause,
        isRead: isRead === 'true'
      }
    }

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where: whereClause,
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true,
              role: true
            }
          },
          receiver: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true,
              role: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.message.count({ where: whereClause })
    ])

    return NextResponse.json({
      success: true,
      data: {
        messages,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Get messages error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

// POST create message
export async function POST(request: NextRequest) {
  try {
    const {
      senderId,
      receiverId,
      subject,
      content,
      attachments
    } = await request.json()

    // Validate required fields
    if (!senderId || !receiverId || !subject || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if sender exists
    const senderExists = await prisma.user.findUnique({
      where: { id: senderId }
    })

    if (!senderExists) {
      return NextResponse.json(
        { error: 'Sender not found' },
        { status: 404 }
      )
    }

    // Check if receiver exists
    const receiverExists = await prisma.user.findUnique({
      where: { id: receiverId }
    })

    if (!receiverExists) {
      return NextResponse.json(
        { error: 'Receiver not found' },
        { status: 404 }
      )
    }

    // Create message
    const newMessage = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        subject,
        content,
        attachments: attachments || []
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
            role: true
          }
        },
        receiver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
            role: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: newMessage,
      message: 'Message sent successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Create message error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
