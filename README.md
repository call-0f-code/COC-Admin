# COC-Admin

> Admin Dashboard for [Call of Code](https://callofcode.in)

COC-Admin is the administrative web application for managing the Call of Code platforms (callofcode.in and members.callofcode.in). This application provides a comprehensive dashboard for administrators to manage users, projects, achievements, DSA questions, and other platform resources.

## 📋 Overview

This admin application serves as the central management system, enabling administrators to:

- Manage user accounts and member profiles
- Create and organize DSA (Data Structures & Algorithms) questions
- Oversee project submissions and showcases
- Track and award achievements
- Manage topics and categories
- Monitor platform activity and analytics

## 🏗️ Architecture

This is a monorepo containing both frontend and backend applications:

```
COC-Admin/
├── frontend/          # React + TypeScript + Vite frontend
├── backend/           # Express + Bun backend API
├── package.json       # Root package with dev scripts
└── README.md          # This file
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v7
- **Authentication**: JWT
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Bun
- **Framework**: Express 5
- **Language**: TypeScript
- **Authentication**: JWT
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting
- **Password Hashing**: bcrypt
- **File Uploads**: Multer

### Development Tools
- **Package Manager**: Bun
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Testing**: Jest
- **Git Hooks**: Husky + lint-staged
- **Concurrent Dev**: concurrently

## ✨ Features

### User Management
- View and manage admin users
- Member profile management
- User authentication and authorization

### DSA Questions
- Create, edit, and delete DSA questions
- Organize questions by topics and difficulty
- Question metadata management

### Project Management
- Review and manage project submissions
- Project approval workflow
- Project showcase organization

### Achievements
- Create and manage achievement badges
- Award achievements to users
- Track achievement statistics

### Topics & Categories
- Organize content by topics
- Manage category hierarchies
- Tag-based filtering

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.2.18 or higher)
- Node.js (for compatibility)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/call-0f-code/COC-Admin.git
   cd COC-Admin
   ```

2. **Install root dependencies**
   ```bash
   bun install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   bun install
   cd ..
   ```

4. **Install backend dependencies**
   ```bash
   cd backend
   bun install
   cd ..
   ```

5. **Configure environment variables**

   Backend (`backend/.env`):
   ```env
   API_URL=your_api_url
   SALTING=your_salt_rounds
   JWT_SECRET=your_jwt_secret
   RATE_LIMIT_WINDOW_MINUTES=15
   RATE_LIMIT_MAX_REQUESTS=100
   ```

   Refer to `backend/.env.example` for all available options.

### Development

**Run both frontend and backend concurrently:**
```bash
bun run dev
```

**Run backend only:**
```bash
bun run backend-dev
# or
cd backend && bun run dev
```

**Run frontend only:**
```bash
bun run frontend-dev
# or
cd frontend && bun run dev
```

The frontend will typically run on `http://localhost:5173` and the backend on the configured API port.


## 🎨 Code Quality

### Linting

**Backend:**
```bash
cd backend
bun run lint        # Check for issues
bun run lint:fix    # Auto-fix issues
```

**Frontend:**
```bash
cd frontend
bun run lint        # Check for issues
bun run lint:fix    # Auto-fix issues
```

### Formatting

**Backend:**
```bash
cd backend
bun run format
```

**Frontend:**
```bash
cd frontend
bun run format
```

### Pre-commit Hooks

This project uses Husky and lint-staged to automatically lint and format code before commits.

## 📁 Project Structure

### Backend (`/backend`)
```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   ├── config/          # Configuration files
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── validation/      # Zod validation schemas
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── tests/               # Test files
└── package.json
```

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── Components/      # React components
│   ├── pages/          # Page components
│   │   ├── AdminDashboard.tsx
│   │   ├── DsaDashboard.tsx
│   │   ├── ProjectDashboard.tsx
│   │   ├── AchievementPage.tsx
│   │   └── Authentication.tsx
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript types
│   ├── assets/         # Static assets
│   ├── App.tsx         # Main App component
│   └── main.tsx        # Entry point
├── public/             # Public assets
└── package.json
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Rate Limiting**: Protect against brute force attacks
- **CORS**: Configured cross-origin resource sharing
- **Helmet**: Security headers for Express
- **Input Validation**: Zod schemas for request validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Lint and format your code
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

Please ensure your code:
- Passes all tests
- Follows the existing code style
- Includes appropriate documentation
- Has no linting errors

## 📝 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [Call of Code Platform](https://callofcode.in) - The main platform website
- Call of Code API - Backend API for the main platform

## 📧 Contact

For questions or support regarding the admin dashboard, please contact the Call of Code team.

---

Made with ❤️ for the Call of Code community
