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
├── docker/            # Dockerfiles and env templates
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   ├── .env.example.coc-api   # Template — copy to .env.local.coc-api
│   ├── .env.local.backend
│   ├── .env.local.coc-api     # Gitignored — fill in Supabase credentials
│   └── .env.local.frontend
├── docker-compose.yml # Compose orchestration
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

### 🐳 Docker (Recommended)

The fastest way to run the full stack locally is with Docker Compose — no Bun or Node installation required.

The stack spins up three services:

| Service   | Image                              | Port   | Description                |
| --------- | ---------------------------------- | ------ | -------------------------- |
| `coc-api` | `callofcode07/coc-api:latest`      | `3000` | External COC platform API  |
| `server`  | Built from `docker/Dockerfile.backend`  | `8000` | COC-Admin backend     |
| `web`     | Built from `docker/Dockerfile.frontend` | `5173` | COC-Admin frontend    |

See **[DOCKER.md](DOCKER.md)** for the complete setup guide covering environment configuration, service startup, watch mode (hot-reload), and troubleshooting.

```bash
# 1. Copy and fill in the COC API credentials (gitignored)
cp docker/.env.example.coc-api docker/.env.local.coc-api

# 2. Start the full stack with live hot-reload (recommended for development)
docker compose up --build --watch

# Or without watch mode
docker compose up --build
```

---

### Manual Setup (Without Docker)

#### Prerequisites

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
   PORT=8000

   # Auth secrets — use long random strings in production
   JWT_SECRET=your_jwt_secret
   REFRESH_SECRET=your_refresh_secret

   # Token lifetimes
   ACCESS_TTL=15           # minutes
   REFRESH_TTL=7           # days

   # Rate limiting
   RATE_LIMIT_WINDOW_MINUTES=15
   RATE_LIMIT_MAX_REQUESTS=100

   # Password hashing cost factor
   SALTING=8

   # Email service (Resend)
   EMAIL_ID=your-sender@example.com
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxx

   # CORS — must match the frontend URL visible to your browser
   ALLOWED_ORIGINS=http://localhost:5173

   # Community links injected into email templates
   WHATSAPP_LINK=https://chat.whatsapp.com/your-group
   DISCORD_LINK=https://discord.gg/your-server
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
