import { NextResponse } from 'next/server'

// Test endpoint to verify API structure
export async function GET() {
  try {
    const apiRoutes = [
      '/api/auth/login',
      '/api/auth/register',
      '/api/students',
      '/api/teachers',
      '/api/classes',
      '/api/attendance',
      '/api/grades',
      '/api/messages',
      '/api/dashboard/stats'
    ]

    return NextResponse.json({
      success: true,
      message: 'School Management System API is running',
      availableRoutes: apiRoutes,
      timestamp: new Date().toISOString()
    })
  } catch {
    return NextResponse.json(
      { error: 'API test failed' },
      { status: 500 }
    )
  }
}
