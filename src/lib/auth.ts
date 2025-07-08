import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserRole } from '@/types'

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

export const generateToken = (payload: Record<string, unknown>): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '7d'
  })
}

export const verifyToken = (token: string): Record<string, unknown> => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as Record<string, unknown>
  } catch {
    throw new Error('Invalid token')
  }
}

export const generateRandomPassword = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let password = ''
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

export const hasPermission = (userRole: UserRole, requiredRoles: UserRole[]): boolean => {
  return requiredRoles.includes(userRole)
}

export const getRolePermissions = (role: UserRole): string[] => {
  const permissions = {
    [UserRole.ADMIN]: [
      'user:create',
      'user:read',
      'user:update',
      'user:delete',
      'class:create',
      'class:read',
      'class:update',
      'class:delete',
      'subject:create',
      'subject:read',
      'subject:update',
      'subject:delete',
      'grade:read',
      'attendance:read',
      'fee:create',
      'fee:read',
      'fee:update',
      'fee:delete',
      'announcement:create',
      'announcement:read',
      'announcement:update',
      'announcement:delete',
      'report:generate'
    ],
    [UserRole.TEACHER]: [
      'student:read',
      'class:read',
      'subject:read',
      'assignment:create',
      'assignment:read',
      'assignment:update',
      'assignment:delete',
      'grade:create',
      'grade:read',
      'grade:update',
      'attendance:create',
      'attendance:read',
      'attendance:update',
      'announcement:create',
      'announcement:read',
      'message:send',
      'message:read'
    ],
    [UserRole.STUDENT]: [
      'assignment:read',
      'assignment:submit',
      'grade:read',
      'attendance:read',
      'announcement:read',
      'message:send',
      'message:read',
      'fee:read'
    ],
    [UserRole.PARENT]: [
      'student:read',
      'grade:read',
      'attendance:read',
      'announcement:read',
      'message:send',
      'message:read',
      'fee:read'
    ]
  }

  return permissions[role] || []
}
