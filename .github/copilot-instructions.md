# Copilot Instructions for School Management System

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a modern full-stack school management system built with Next.js 14, TypeScript, and Tailwind CSS. The application supports multiple user roles (Admin, Teacher, Student, Parent) with comprehensive features for managing educational institutions.

## Tech Stack
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js with JWT
- **Real-time**: Socket.io
- **UI**: Dark/Light mode, responsive design, modern components

## Key Features
- Role-based authentication and authorization
- Interactive dashboards with analytics
- Digital gradebook and attendance tracking
- Real-time messaging and notifications
- File upload and management
- Student, teacher, and parent portals
- Administrative tools and reporting
- Modern UI with dark mode support

## Code Style Guidelines
- Use TypeScript for all new files
- Follow React hooks patterns and Next.js best practices
- Implement proper error handling and loading states
- Use Tailwind CSS for styling with consistent design tokens
- Create reusable components with proper props typing
- Implement proper authentication guards for protected routes
- Use Prisma for database operations with proper error handling
- Follow RESTful API conventions for API routes

## Component Structure
- Place reusable UI components in `src/components/ui/`
- Feature-specific components in `src/components/[feature]/`
- Page components in `src/app/` following App Router structure
- API routes in `src/app/api/`
- Database schema in `prisma/schema.prisma`
- Types and interfaces in `src/types/`
- Utilities in `src/lib/`

## Authentication & Authorization
- Implement role-based access control (RBAC)
- Protect API routes with middleware
- Use session management for user state
- Implement proper logout and session cleanup

## Database Patterns
- Use Prisma relations for data modeling
- Implement proper indexing for performance
- Use transactions for complex operations
- Follow naming conventions for models and fields
