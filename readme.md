# React (Vite) + Node.js (TypeScript) Fullstack Template

A modern, scalable full-stack starter template featuring a **React (Vite) + Shadcn UI** frontend and a **Node.js (TypeScript) + Express + PostgreSQL + Prisma ORM** backend.

---

## 📁 Project Structure

```text
node-vite-template/
├── client/                     # Frontend Application
│   ├── src/
│   │   ├── components/ui/      # Shadcn UI primitives
│   │   ├── App.tsx             # Main React entry component
│   │   └── main.tsx            # React DOM mounting
│   ├── vite.config.ts          # Vite configuration with @ path alias & API proxy
│   └── package.json
│
├── server/                     # Backend API Server
│   ├── prisma/
│   │   ├── schema.prisma       # Prisma data models & PostgreSQL configuration
│   │   └── migrations/         # Prisma migration history
│   ├── src/
│   │   ├── config/             # Environment configs & constants
│   │   ├── controllers/        # Request handling & HTTP responses
│   │   ├── routers/            # Modular route definitions
│   │   ├── services/           # Business logic & Prisma DB operations
│   │   ├── lib/                # Shared utilities & Prisma singleton
│   │   ├── middlewares/        # Global error & 404 handlers
│   │   ├── app.ts              # Express application configuration
│   │   └── index.ts            # Server bootstrap
│   ├── .env.example            # Backend environment template
│   └── tsconfig.json           # TypeScript configuration (NodeNext)
│
├── .gitignore                  # Root gitignore (ignores node_modules, .env, dist)
└── package.json                # Root orchestration scripts
```

---

## 🚀 Tech Stack

### Frontend (`client/`)
- **[React](https://react.dev/)** + **[Vite](https://vitejs.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[Shadcn UI](https://ui.shadcn.com/)** (Radix UI primitives)
- **Lucide Icons**

### Backend (`server/`)
- **[Node.js](https://nodejs.org/)** (ES Modules)
- **[Express](https://expressjs.com/)** (v5)
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Prisma ORM](https://www.prisma.io/)** (PostgreSQL connector)
- **[tsx](https://github.com/privatenumber/tsx)** for instant TypeScript execution and hot reloading
- **[CORS](https://github.com/expressjs/cors)** & **[dotenv](https://github.com/motdotla/dotenv)**

---

## 🛠️ Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **PostgreSQL**: Local instance or hosted database (e.g. Supabase, Neon, Railway)

---

## ⚙️ Getting Started

### 1. Install Dependencies

Install root, server, and client dependencies:

```bash
# Root dependencies
npm install

# Backend dependencies
cd server
npm install

# Frontend dependencies
cd ../client
npm install
```

---

### 2. Configure Environment Variables

Create your `.env` file in the `server` directory:

```bash
cp server/.env.example server/.env
```

Update `server/.env` with your PostgreSQL database credentials:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/myapp_db?schema=public"
```

---

### 3. Database Migration

Run the Prisma migration to create your database tables:

```bash
cd server
npm run prisma:migrate -- --name init
```

Generate the Prisma Client types:
```bash
npm run prisma:generate
```

*(Optional)* Launch Prisma Studio to view and manage data in your browser:
```bash
npm run prisma:studio
```

---

### 4. Running the Application

From the root project folder:

```bash
# Run both Client and Server concurrently
npm run dev
```

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & server status |
| `GET` | `/api/users` | Retrieve all users |
| `GET` | `/api/users/:id` | Retrieve user by ID |
| `POST` | `/api/users` | Create a new user (`{ email, name }`) |

---

## 🧩 Adding Shadcn Components

To add more Shadcn UI components to the client, run the Shadcn CLI inside the `client` directory:

```bash
cd client
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add card
```

---

## 📜 Available Scripts

### Root (`./`)
| Command | Action |
|---|---|
| `npm run dev` | Runs both client & server concurrently in watch mode |
| `npm run build` | Builds both frontend and backend for production |
| `npm run typecheck` | Runs TypeScript type checking across both projects |
| `npm run prisma:migrate` | Runs Prisma database migrations |
| `npm run prisma:studio` | Opens Prisma database GUI in your browser |

### Backend (`server/`)
| Command | Action |
|---|---|
| `npm run dev` | Runs Express server with `tsx watch` |
| `npm run build` | Compiles TypeScript to `dist/` via `tsc` |
| `npm run start` | Runs the compiled production server (`dist/index.js`) |
| `npm run typecheck` | Runs `tsc --noEmit` to verify type safety |

### Frontend (`client/`)
| Command | Action |
|---|---|
| `npm run dev` | Starts Vite development server with HMR |
| `npm run build` | Compiles TypeScript and creates optimized Vite build |
| `npm run preview` | Previews production build locally |

---

## 📝 License
MIT