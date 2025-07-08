# 🎓 Modern School Management System 2025

A comprehensive, full-stack school management system built with the latest technologies for 2025. This modern web application provides role-based access control, real-time features, and a beautiful dark/light mode interface.

## ✨ Features

### 🔐 Authentication & Authorization
- **Role-based access control** (Admin, Teacher, Student, Parent)
- JWT-based authentication
- Secure password hashing with bcrypt
- Session management

### 📊 Interactive Dashboards
- **Real-time analytics** and statistics
- Attendance tracking and reporting
- Grade management and analytics
- Recent activities feed
- Upcoming events calendar

### 🎨 Modern UI/UX
- **Dark/Light mode toggle** with system preference detection
- Fully responsive design for all devices
- Beautiful animations and transitions
- Modern component library with Shadcn/ui
- Accessible design following WCAG guidelines

### 👥 User Management
- Comprehensive user profiles for all roles
- Student enrollment and management
- Teacher assignment and scheduling
- Parent-student relationship tracking
- Bulk user operations

### 📚 Academic Features
- Class and subject management
- Assignment creation and submission
- Digital gradebook with multiple exam types
- Attendance tracking with status types
- Timetable management

### 💬 Communication System
- Real-time messaging between users
- Announcement broadcasting
- Notification system with different types
- File attachments and sharing

### 📱 Real-time Features
- Live notifications
- Real-time messaging with Socket.io
- Instant attendance updates
- Dynamic dashboard updates

### 💳 Fee Management
- Fee structure configuration
- Payment tracking and history
- Automated fee reminders
- Multiple fee types support

### 📁 File Management
- Secure file upload and storage
- Document categorization
- Profile picture management
- Assignment file submissions

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shadcn/ui** for components
- **Lucide React** for icons
- **Next-themes** for dark mode
- **React Hook Form** with Zod validation
- **Socket.io Client** for real-time features

### Backend
- **Next.js API Routes** for serverless functions
- **Prisma ORM** for database operations
- **PostgreSQL** for data storage
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Socket.io** for real-time communication

### Development Tools
- **ESLint** for code linting
- **TypeScript** for type checking
- **Prettier** for code formatting
- **Git** for version control

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd school-management
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Copy `.env.example` to `.env` and configure your environment variables:
```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/school_management"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# JWT
JWT_SECRET="your-jwt-secret-here"

# File Upload
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE=10485760  # 10MB
```

4. **Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed database with sample data
npx prisma db seed
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Demo Credentials

Use these credentials to test different user roles:

- **Admin**: admin@school.com / admin123
- **Teacher**: teacher@school.com / teacher123  
- **Student**: student@school.com / student123
- **Parent**: parent@school.com / parent123

## 📱 Pages & Features

### 🏠 Dashboard
- Overview statistics and KPIs
- Recent activities feed
- Upcoming events
- Quick action buttons
- Real-time data updates

### 👨‍🎓 Students Management
- Student enrollment and profiles
- Academic records tracking
- Attendance monitoring
- Grade management
- Parent-student relationships

### 👨‍🏫 Teachers Management
- Teacher profiles and qualifications
- Subject assignments
- Class management
- Performance tracking

### 📚 Academic Management
- Class and section organization
- Subject curriculum planning
- Timetable scheduling
- Assignment distribution
- Examination management

### 📊 Reports & Analytics
- Attendance reports
- Grade analytics
- Performance insights
- Custom report generation
- Data export capabilities

### 💬 Communication
- Internal messaging system
- Announcement broadcasting
- Notification management
- File sharing capabilities

### ⚙️ Settings
- User profile management
- System configuration
- Role permissions
- Theme preferences

## 🔧 Database Schema

The application uses a comprehensive PostgreSQL schema with the following main entities:

- **Users** - Base user authentication and profile
- **Admin/Teacher/Student/Parent** - Role-specific profiles
- **Classes & Subjects** - Academic structure
- **Attendance** - Daily attendance tracking
- **Grades** - Assessment and examination results
- **Assignments** - Homework and project management
- **Messages** - Internal communication
- **Notifications** - System alerts and updates
- **Files** - Document and media management

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Prisma](https://www.prisma.io/) for the type-safe database toolkit
- [Lucide](https://lucide.dev/) for the beautiful icons

## 📞 Support

For support and questions, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for modern education management**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
