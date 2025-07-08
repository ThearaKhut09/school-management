'use client'

import { DashboardLayout } from '@/components/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  MessageSquare,
  Send,
  Users,
  Clock,
  Search,
  Plus
} from 'lucide-react'

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'admin@school.com',
  avatar: '',
  role: 'Administrator'
}

// Mock messages data
const messageStats = {
  totalMessages: 1247,
  unreadMessages: 23,
  activeConversations: 45,
  todayMessages: 89
}

const recentMessages = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    role: 'Teacher',
    subject: 'Student Performance Update',
    message: 'I wanted to discuss the recent performance of students in my mathematics class...',
    time: '2 minutes ago',
    unread: true,
    avatar: ''
  },
  {
    id: 2,
    sender: 'Michael Chen',
    role: 'Teacher',
    subject: 'Lab Equipment Request',
    message: 'We need additional equipment for the physics lab experiments next week...',
    time: '15 minutes ago',
    unread: true,
    avatar: ''
  },
  {
    id: 3,
    sender: 'Emily Davis',
    role: 'Teacher',
    subject: 'Parent Meeting Schedule',
    message: 'Could we schedule the parent-teacher meetings for next Friday?',
    time: '1 hour ago',
    unread: false,
    avatar: ''
  },
  {
    id: 4,
    sender: 'Robert Wilson',
    role: 'Teacher',
    subject: 'Field Trip Approval',
    message: 'I would like to organize a field trip to the science museum for my chemistry class...',
    time: '3 hours ago',
    unread: false,
    avatar: ''
  },
  {
    id: 5,
    sender: 'Lisa Anderson',
    role: 'Parent',
    subject: 'Student Absence Notification',
    message: 'My daughter Emma will be absent tomorrow due to a medical appointment...',
    time: '5 hours ago',
    unread: true,
    avatar: ''
  }
]

const conversations = [
  {
    id: 1,
    name: 'Teachers Group',
    type: 'group',
    participants: 12,
    lastMessage: 'Meeting scheduled for tomorrow',
    lastMessageTime: '10 minutes ago',
    unread: 3
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    type: 'direct',
    role: 'Teacher',
    lastMessage: 'Thanks for the update!',
    lastMessageTime: '2 hours ago',
    unread: 0
  },
  {
    id: 3,
    name: 'Parent Committee',
    type: 'group',
    participants: 8,
    lastMessage: 'Event planning discussion',
    lastMessageTime: '1 day ago',
    unread: 1
  }
]

export default function MessagesPage() {
  return (
    <DashboardLayout user={mockUser}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Messages</h1>
            <p className="text-muted-foreground mt-1">
              Communicate with teachers, students, and parents
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{messageStats.totalMessages}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
              <Send className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{messageStats.unreadMessages}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Conversations</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{messageStats.activeConversations}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today&apos;s Messages</CardTitle>
              <Clock className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{messageStats.todayMessages}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Messages */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Messages</CardTitle>
                  <Button variant="outline" size="sm">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
                <CardDescription>
                  Your latest messages and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className={`flex items-start space-x-4 p-4 rounded-lg border ${
                      message.unread ? 'bg-accent/50 border-primary/20' : 'bg-background'
                    }`}>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.avatar} alt={message.sender} />
                        <AvatarFallback>
                          {message.sender.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{message.sender}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {message.role}
                            </Badge>
                            {message.unread && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="font-medium text-sm mt-1">{message.subject}</p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conversations */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Active Conversations</CardTitle>
                <CardDescription>
                  Your ongoing conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversations.map((conversation) => (
                    <div key={conversation.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {conversation.type === 'group' ? 
                              <Users className="h-4 w-4" /> :
                              conversation.name.split(' ').map(n => n[0]).join('')
                            }
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-sm">{conversation.name}</h4>
                            {conversation.type === 'group' && (
                              <Badge variant="outline" className="text-xs">
                                {conversation.participants}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground">
                          {conversation.lastMessageTime}
                        </span>
                        {conversation.unread > 0 && (
                          <div className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs mt-1">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
