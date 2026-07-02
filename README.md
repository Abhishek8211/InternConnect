<p align="center">
  <img src="https://img.shields.io/badge/InternConnect-Live-6366f1?style=for-the-badge&logoColor=white" alt="InternConnect"/>
</p>

<h1 align="center">🚀 InternConnect</h1>

<p align="center">
  <strong>AI-Powered Internship Matching Portal</strong><br/>
  A production-ready MERN stack application where students find internships, recruiters post opportunities, and admins manage the platform — all with real live data.
</p>

<p align="center">
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"/></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js"/></a>
  <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-8.x-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB"/></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white" alt="Express"/></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"/></a>
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License"/>
</p>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Project Structure](#️-project-structure)
- [⚡ Quick Start](#-quick-start)
- [🔧 Environment Variables](#-environment-variables)
- [📡 API Reference](#-api-reference)
- [👤 User Roles](#-user-roles)
- [🎨 Design System](#-design-system)
- [🔒 Security](#-security)
- [📦 Scripts](#-scripts)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 👨‍🎓 For Students
- 🔍 **Smart Search & Filters** — Browse internships by role, company, work type (Remote / Hybrid / On-site), and more
- 📝 **One-Click Apply** — Submit applications with an optional cover letter; your saved resume is auto-attached
- 📊 **Application Tracker** — Real-time status timeline (Pending → Reviewed → Shortlisted → Accepted / Rejected) with recruiter notes
- 🔖 **Save Internships** — Bookmark listings and retrieve them anytime
- 👤 **Rich Profile** — Edit bio, headline, skills, education, certifications, social links; upload avatar & resume directly
- 📈 **Personal Dashboard** — Live stats, 6-month activity chart, profile completion score — all from real MongoDB data
- 🔔 **Status Notifications** — See application updates the moment recruiters act on them

### 🏢 For Recruiters
- 📝 **Post Internships** — Create detailed listings with skills, stipend, duration, work type, and application deadline
- 📬 **Applicant Management** — View all applicants for a listing, add recruiter notes, and update status
- 🏷️ **Company Profile** — Build a verified company page with logo and description
- 📈 **Listing Analytics** — Track view counts and total applications per listing

### 🛡️ For Admins
- 📊 **Platform Dashboard** — Real-time stats across users, internships, applications, and companies
- ✅ **Company Verification** — Approve or reject company registrations
- ⭐ **Feature Listings** — Pin high-quality internships to the top of search results
- 🔧 **User Management** — Activate or deactivate any account on the platform

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
| --- | --- | --- |
| React | 18.3.1 | UI library |
| Vite | 5.x | Build tool & dev server |
| Tailwind CSS | 3.x | Utility-first styling |
| React Router DOM | 6.x | Client-side routing |
| Axios | 1.7.x | HTTP client with interceptors |
| Recharts | 2.x | Dashboard charts (area, pie) |
| Lucide React | 0.468.x | Icon library |
| date-fns | 4.x | Relative time formatting |

### Backend

| Technology | Version | Purpose |
| --- | --- | --- |
| Node.js | ≥ 18 | Runtime |
| Express.js | 4.x | Web framework |
| MongoDB | — | NoSQL database |
| Mongoose | 8.x | ODM / schema validation |
| JSON Web Token | 9.x | Authentication tokens |
| bcryptjs | 2.4.x | Password hashing (12 rounds) |
| Multer | 1.x | File upload handling |
| Cloudinary | 1.x | Cloud media storage (avatars, resumes) |
| Helmet | 8.x | HTTP security headers |
| express-rate-limit | 7.x | Rate limiting |
| Nodemailer | 6.x | Password reset emails |

---

## 🏗️ Project Structure

```
InternConnect/
│
├── package.json                    # Root monorepo — concurrent dev scripts
├── .gitignore
├── .gitattributes
├── README.md
│
├── backend/
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── server.js               # Entry point — DB connect → HTTP server
│       ├── app.js                  # Express app (CORS, helmet, rate-limit, routes)
│       │
│       ├── config/
│       │   ├── db.js               # Mongoose connection + retry logic
│       │   ├── cloudinary.js       # Cloudinary SDK setup
│       │   └── constants.js        # Roles, application statuses, pagination limits
│       │
│       ├── models/
│       │   ├── User.model.js       # Roles, avatar, profile, savedInternships, bcrypt hook
│       │   ├── Internship.model.js # Full-text index, stipend, AI score placeholder
│       │   ├── Application.model.js# Compound unique index, status history, recruiterNote
│       │   └── Company.model.js    # Auto-slug, logo, virtual populate
│       │
│       ├── middleware/
│       │   ├── auth.middleware.js  # protect() + authorise(...roles)
│       │   ├── error.middleware.js # asyncHandler + global error handler
│       │   ├── upload.middleware.js# Multer + Cloudinary storage
│       │   └── validate.middleware.js
│       │
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── user.controller.js  # Profile, avatar, resume, dashboard stats, save toggle
│       │   ├── internship.controller.js
│       │   ├── application.controller.js
│       │   └── admin.controller.js
│       │
│       └── routes/
│           ├── index.js
│           ├── auth.routes.js
│           ├── user.routes.js      # Includes /dashboard/student, /saved
│           ├── internship.routes.js
│           ├── application.routes.js
│           └── admin.routes.js
│
└── frontend/
    ├── package.json
    ├── vite.config.js              # Path alias @/ + proxy to backend :5000
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    ├── .env.example
    └── src/
        ├── main.jsx
        ├── App.jsx                 # Lazy routes + ProtectedRoute guard
        ├── index.css               # Tailwind + CSS vars + global animations
        │
        ├── context/
        │   └── AuthContext.jsx     # login / logout / register / updateUser
        │
        ├── hooks/
        │   ├── useAuth.js
        │   ├── useDebounce.js
        │   └── usePagination.js
        │
        ├── services/               # All Axios API calls live here
        │   ├── api.js              # Axios instance + interceptors
        │   ├── auth.service.js
        │   ├── user.service.js     # Profile, avatar, resume, dashboard, saved
        │   ├── internship.service.js
        │   └── application.service.js
        │
        ├── components/
        │   ├── layout/
        │   │   ├── StudentLayout.jsx
        │   │   ├── RecruiterLayout.jsx
        │   │   ├── AdminLayout.jsx
        │   │   ├── Navbar.jsx
        │   │   └── Sidebar.jsx
        │   │
        │   └── ui/
        │       ├── Button.jsx
        │       ├── Input.jsx
        │       ├── Badge.jsx
        │       ├── Card.jsx
        │       ├── Modal.jsx
        │       ├── Spinner.jsx
        │       ├── Avatar.jsx
        │       └── Tooltip.jsx
        │
        └── pages/
            ├── Home.jsx
            ├── Login.jsx
            ├── Register.jsx        # Role selector: student / recruiter
            ├── ForgotPassword.jsx
            ├── ResetPassword.jsx
            ├── student/
            │   ├── Dashboard.jsx   # Live stats, trend chart, profile score
            │   ├── BrowseInternships.jsx  # Real search + filter + pagination + apply
            │   ├── MyApplications.jsx     # Real status tracker + withdraw
            │   └── Profile.jsx     # Full profile editor synced to backend
            ├── recruiter/
            │   ├── Dashboard.jsx
            │   ├── PostInternship.jsx
            │   └── ManageListings.jsx
            └── admin/
                ├── Dashboard.jsx
                ├── Users.jsx
                └── Internships.jsx
```

---

## ⚡ Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) local instance or Atlas cluster
- [Cloudinary](https://cloudinary.com/) account (free tier works)
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/Abhishek8211/InternConnect.git
cd InternConnect
```

### 2. Set up environment variables

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

> Fill in your MongoDB URI, JWT secret, and Cloudinary credentials before starting.

### 3. Install all dependencies

```bash
npm run install:all
```

### 4. Start development servers

```bash
npm run dev
```

This starts **both** servers concurrently:

| Server | URL |
|---|---|
| Frontend (Vite) | http://localhost:5173 |
| Backend API | http://localhost:5000/api/v1 |

---

## 🔧 Environment Variables

### `backend/.env`

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/internconnect

# JWT
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Client origin (for CORS)
CLIENT_URL=http://localhost:5173

# Email (Nodemailer — for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=InternConnect <noreply@internconnect.com>
```

### `frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

## 📡 API Reference

All endpoints are prefixed with `/api/v1`.

### 🔐 Auth

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Public | Register as student or recruiter |
| `POST` | `/auth/login` | Public | Login and receive JWT cookie |
| `POST` | `/auth/logout` | Protected | Clear auth cookie |
| `GET` | `/auth/me` | Protected | Get current authenticated user |
| `POST` | `/auth/forgot-password` | Public | Send password reset email |
| `PATCH` | `/auth/reset-password/:token` | Public | Reset password with token |

### 👤 Users

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/users/profile` | Protected | Get own full profile |
| `PUT` | `/users/profile` | Protected | Update name, bio, skills, education, links |
| `PUT` | `/users/avatar` | Protected | Upload / replace avatar image |
| `PUT` | `/users/resume` | Student | Upload / replace resume PDF |
| `GET` | `/users/dashboard/student` | Student | Dashboard stats, trend chart, profile score |
| `GET` | `/users/saved` | Student | Get saved internships |
| `PATCH` | `/users/saved/:internshipId` | Student | Toggle save / unsave an internship |
| `GET` | `/users` | Admin | List all users (paginated) |
| `PATCH` | `/users/:id/toggle-status` | Admin | Activate / deactivate user |

### 💼 Internships

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/internships` | Public | Search & filter with pagination |
| `GET` | `/internships/:id` | Public | Get single internship (increments viewCount) |
| `GET` | `/internships/my/listings` | Recruiter | Get own listings |
| `POST` | `/internships` | Recruiter | Create a new internship |
| `PUT` | `/internships/:id` | Recruiter | Update an internship |
| `DELETE` | `/internships/:id` | Recruiter | Delete an internship |

**Query params for `GET /internships`:**

| Param | Type | Description |
|---|---|---|
| `search` | string | Full-text search on title / description |
| `type` | string | `Remote` \| `Hybrid` \| `On-site` |
| `category` | string | Domain category |
| `skills` | string | Comma-separated skill filter |
| `minStipend` | number | Minimum stipend (₹) |
| `page` | number | Page number (default: 1) |
| `limit` | number | Results per page (default: 10, max: 50) |
| `sort` | string | Sort field e.g. `-createdAt` |

### 📄 Applications

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/applications` | Student | Apply to an internship (multipart/form-data) |
| `GET` | `/applications/my` | Student | Get all own applications with status |
| `GET` | `/applications/internship/:id` | Recruiter | Get all applicants for a listing |
| `PATCH` | `/applications/:id/status` | Recruiter | Update status + add recruiter note |
| `DELETE` | `/applications/:id` | Student | Withdraw a pending application |

### 🛡️ Admin

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/admin/stats` | Admin | Platform-wide statistics |
| `PATCH` | `/admin/internships/:id/feature` | Admin | Toggle featured status on a listing |
| `PATCH` | `/admin/companies/:id/verify` | Admin | Verify / reject a company |
| `GET` | `/health` | Public | API health check |

---

## 👤 User Roles

| Role | How to Get | Capabilities |
| --- | --- | --- |
| `student` | Self-register | Browse, apply, track applications, save listings, full profile management |
| `recruiter` | Self-register | Post internships, manage listings, review & update applicants |
| `admin` | Manual DB assignment | Full platform access — verification, moderation, analytics |

---

## 🎨 Design System

InternConnect uses a custom **dark-first** design system built on Tailwind CSS.

### Color Palette

| Token | Value | Usage |
| --- | --- | --- |
| `blue-600` | `#2563eb` | Primary actions, active nav, CTAs |
| `cyan-400` | `#38bdf8` | Gradient accents, chart lines |
| `emerald-400` | `#34d399` | Success, accepted status, verified |
| `amber-400` | `#fbbf24` | Pending, warnings |
| `red-400` | `#f87171` | Rejected, errors |
| `slate-900` | `#0f172a` | Page background |
| `[#111827]` | `#111827` | Card backgrounds |

### Animations

| Name | Effect |
| --- | --- |
| `animate-fade-in` | Slide up + fade in on mount |
| `animate-spin` | Loading spinners |
| `float` | Gentle vertical bob (hero blobs) |
| `shimmer` | Skeleton loading sweep |
| `gradient-shift` | Animated gradient background |

---

## 🔒 Security

- **HTTP-only cookies** for JWT — safe from XSS attacks
- **Helmet.js** — sets `Content-Security-Policy`, `X-Frame-Options`, and other secure headers
- **CORS** — restricted to `CLIENT_URL` only
- **Rate limiting** — 200 req / 15 min globally; 20 req / 15 min on `/auth` routes
- **bcryptjs** — passwords hashed with 12 salt rounds; never stored in plaintext
- **Role-based access control** — `protect()` verifies JWT; `authorise(...roles)` checks role
- **Mongoose schema validation** — type and constraint checks at the ODM layer
- **Compound unique index** — one application per student per internship, enforced at DB level

---

## 📦 Scripts

### Root (run from project root)

```bash
npm run dev              # Start frontend + backend concurrently
npm run dev:frontend     # Start only Vite dev server  → :5173
npm run dev:backend      # Start only Express server   → :5000
npm run install:all      # Install packages for root + frontend + backend
npm run build            # Production build of frontend
```

### Backend

```bash
npm run dev    # nodemon — auto-restart on file changes
npm start      # node    — production start
```

### Frontend

```bash
npm run dev      # Vite dev server with HMR
npm run build    # Production bundle → dist/
npm run preview  # Serve the production build locally
```

---

## 🗺️ Roadmap

### Phase 1 — Project Scaffold ✅ *(complete)*

- [x] Monorepo structure and tooling configuration
- [x] Mongoose models — User, Internship, Application, Company
- [x] Full Express middleware stack — auth, error, upload, validate, rate-limit, CORS
- [x] REST API controllers and routes for all resources
- [x] React component library — Button, Input, Badge, Card, Modal, Spinner, Avatar, Tooltip
- [x] AuthContext, Axios service layer, protected routing

### Phase 2 — Authentication ✅ *(complete)*

- [x] Login / Register with JWT HTTP-only cookie flow
- [x] Role-based route protection (student / recruiter / admin)
- [x] Persistent sessions via localStorage + server re-validation
- [x] Forgot & reset password via email token (Nodemailer)

### Phase 3 — Live Backend Integration ✅ *(complete)*

- [x] Student Dashboard — real MongoDB stats, 6-month trend chart via aggregation, profile score
- [x] Browse Internships — real paginated listings with search & filter, bookmark toggle persisted in DB
- [x] Apply modal — submits `multipart/form-data` to backend with cover letter; shows "Applied" badge
- [x] My Applications — real status timeline with recruiter notes, working Withdraw API
- [x] Student Profile — each section (bio, skills, education, certifications, links) saves to backend; avatar & resume upload to Cloudinary
- [x] Saved internships — `savedInternships[]` persisted on User document

### Phase 4 — Recruiter & Admin Dashboards 🔜

- [ ] Recruiter applicant review UI with inline status update
- [ ] Admin platform analytics page with live charts
- [ ] Company verification workflow

### Phase 5 — AI Integration

- [ ] Profile ↔ internship match score using skill vector comparison
- [ ] Skill gap recommendations based on desired roles
- [ ] Auto-generated cover letter suggestions

---

## 🤝 Contributing

Contributions are welcome!

1. **Fork** this repository
2. **Create** a feature branch

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit** using Conventional Commits

   ```bash
   git commit -m "feat: add your feature description"
   ```

4. **Push** to your fork

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open** a Pull Request against `main`

### Commit Types

| Prefix | When to use |
| --- | --- |
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `style:` | Formatting, no logic change |
| `refactor:` | Code restructure |
| `chore:` | Dependency / tooling updates |

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License — Copyright (c) 2025 InternConnect

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files, to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software.
```

---

<p align="center">
  Made with ❤️ for students and recruiters &nbsp;|&nbsp; <a href="#-internconnect">⬆ Back to top</a>
</p>