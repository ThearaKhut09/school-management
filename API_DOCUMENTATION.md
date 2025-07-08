# School Management System API Documentation

## Overview
This document describes all the CRUD (Create, Read, Update, Delete) API endpoints available in the School Management System.

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication

#### Login
- **POST** `/auth/login`
- **Body**: `{ email, password }`
- **Response**: `{ success, data: { user, token }, message }`

#### Register
- **POST** `/auth/register`
- **Body**: `{ email, password, firstName, lastName, role, phone? }`
- **Response**: `{ success, data: user, message }`

### Students Management

#### Get All Students
- **GET** `/students`
- **Query Params**: `page?, limit?, search?`
- **Response**: `{ success, data: { students, pagination } }`

#### Create Student
- **POST** `/students`
- **Body**: `{ email, password, firstName, lastName, phone?, rollNumber, dateOfBirth, address, parentId?, classId?, section?, admissionDate? }`
- **Response**: `{ success, data: student, message }`

#### Get Single Student
- **GET** `/students/[id]`
- **Response**: `{ success, data: student }`

#### Update Student
- **PUT** `/students/[id]`
- **Body**: `{ email?, firstName?, lastName?, phone?, classId?, section?, rollNumber?, dateOfBirth?, address?, parentId?, isActive? }`
- **Response**: `{ success, data: student, message }`

#### Delete Student
- **DELETE** `/students/[id]`
- **Response**: `{ success, message }`

### Teachers Management

#### Get All Teachers
- **GET** `/teachers`
- **Query Params**: `page?, limit?, search?, department?`
- **Response**: `{ success, data: { teachers, pagination } }`

#### Create Teacher
- **POST** `/teachers`
- **Body**: `{ email, password, firstName, lastName, phone?, department, subject, qualification?, experience?, salary?, joinDate? }`
- **Response**: `{ success, data: teacher, message }`

#### Get Single Teacher
- **GET** `/teachers/[id]`
- **Response**: `{ success, data: teacher }`

#### Update Teacher
- **PUT** `/teachers/[id]`
- **Body**: `{ email?, firstName?, lastName?, phone?, department?, subject?, qualification?, experience?, salary?, isActive? }`
- **Response**: `{ success, data: teacher, message }`

#### Delete Teacher
- **DELETE** `/teachers/[id]`
- **Response**: `{ success, message }`

### Classes Management

#### Get All Classes
- **GET** `/classes`
- **Query Params**: `page?, limit?, search?, grade?`
- **Response**: `{ success, data: { classes, pagination } }`

#### Create Class
- **POST** `/classes`
- **Body**: `{ name, grade, section, teacherId, capacity?, academicYear? }`
- **Response**: `{ success, data: class, message }`

#### Get Single Class
- **GET** `/classes/[id]`
- **Response**: `{ success, data: class }`

#### Update Class
- **PUT** `/classes/[id]`
- **Body**: `{ name?, grade?, section?, teacherId?, capacity?, academicYear? }`
- **Response**: `{ success, data: class, message }`

#### Delete Class
- **DELETE** `/classes/[id]`
- **Response**: `{ success, message }`

### Attendance Management

#### Get Attendance Records
- **GET** `/attendance`
- **Query Params**: `page?, limit?, classId?, studentId?, date?, startDate?, endDate?`
- **Response**: `{ success, data: { attendances, pagination } }`

#### Create Attendance Records
- **POST** `/attendance`
- **Body**: `{ classId, teacherId, date, attendanceRecords: [{ studentId, status, remarks? }] }`
- **Response**: `{ success, data: attendances, message }`

### Grades Management

#### Get Grades
- **GET** `/grades`
- **Query Params**: `page?, limit?, studentId?, subjectId?, examType?`
- **Response**: `{ success, data: { grades, pagination } }`

#### Create Grade
- **POST** `/grades`
- **Body**: `{ studentId, subjectId, teacherId, examType, marks, maxMarks, grade?, gpa?, examDate, remarks? }`
- **Response**: `{ success, data: grade, message }`

#### Get Single Grade
- **GET** `/grades/[id]`
- **Response**: `{ success, data: grade }`

#### Update Grade
- **PUT** `/grades/[id]`
- **Body**: `{ marks?, maxMarks?, grade?, gpa?, examDate?, remarks? }`
- **Response**: `{ success, data: grade, message }`

#### Delete Grade
- **DELETE** `/grades/[id]`
- **Response**: `{ success, message }`

### Messages Management

#### Get Messages
- **GET** `/messages`
- **Query Params**: `page?, limit?, userId?, isRead?`
- **Response**: `{ success, data: { messages, pagination } }`

#### Send Message
- **POST** `/messages`
- **Body**: `{ senderId, receiverId, subject, content, attachments? }`
- **Response**: `{ success, data: message, message }`

#### Get Single Message
- **GET** `/messages/[id]`
- **Response**: `{ success, data: message }`

#### Update Message (Mark as Read)
- **PUT** `/messages/[id]`
- **Body**: `{ isRead? }`
- **Response**: `{ success, data: message, message }`

#### Delete Message
- **DELETE** `/messages/[id]`
- **Response**: `{ success, message }`

### Dashboard

#### Get Dashboard Statistics
- **GET** `/dashboard/stats`
- **Response**: `{ success, data: { stats, recentActivities, upcomingEvents } }`

## Data Models

### User Roles
- `ADMIN` - System administrator
- `TEACHER` - Teaching staff
- `STUDENT` - Student user
- `PARENT` - Parent/Guardian

### Attendance Status
- `PRESENT` - Student was present
- `ABSENT` - Student was absent
- `LATE` - Student arrived late
- `EXCUSED` - Excused absence

### Exam Types
- `QUIZ` - Quiz exam
- `ASSIGNMENT` - Assignment submission
- `MIDTERM` - Midterm exam
- `FINAL` - Final exam
- `PROJECT` - Project submission

## Error Handling

All endpoints return consistent error responses:
```json
{
  "error": "Error message description",
  "success": false
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Sample API Calls

### Create a Student
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "email": "john.doe@student.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "rollNumber": "STU001",
    "dateOfBirth": "2005-01-15",
    "address": "123 Main St",
    "section": "A"
  }'
```

### Get Student Attendance
```bash
curl "http://localhost:3000/api/attendance?studentId=student_id&startDate=2024-01-01&endDate=2024-01-31" \
  -H "Authorization: Bearer <token>"
```

### Create Grade
```bash
curl -X POST http://localhost:3000/api/grades \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "studentId": "student_id",
    "subjectId": "subject_id",
    "teacherId": "teacher_id",
    "examType": "MIDTERM",
    "marks": 85,
    "maxMarks": 100,
    "grade": "A",
    "examDate": "2024-02-15"
  }'
```

## Notes

1. All dates should be in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.sssZ)
2. Pagination uses `page` (starting from 1) and `limit` parameters
3. Search functionality is case-insensitive and searches across multiple fields
4. Foreign key relationships are validated before creation/updates
5. Soft deletes are not implemented - deletions are permanent
6. File uploads are handled separately through file upload endpoints
