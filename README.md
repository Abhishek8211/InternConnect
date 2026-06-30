<p align="center">
  <img src="https://img.shields.io/badge/InternConnect-AI%20Powered-6366f1?style=for-the-badge&logoColor=white" alt="InternConnect"/>
</p>

<h1 align="center">🚀 InternConnect</h1>

<p align="center">
  <strong>AI-Powered Internship Matching Portal</strong><br/>
  A full-stack MERN application connecting students with opportunities and recruiters with talent.
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
- 🔍 **Smart Search & Filters** — Browse internships by role, type, skills, stipend, and location
- 🤖 **AI Matching** — Get personalized recommendations based on your profile
- 📄 **One-Click Apply** — Upload resume and submit applications in seconds
- 📊 **Application Tracker** — Real-time status updates for every application
- 👤 **Rich Profile** — Showcase education, skills, projects, and social links

### 🏢 For Recruiters
- 📝 **Post Internships** — Create detailed listings with requirements, stipend, and deadline
- 📬 **Applicant Management** — Review applications, add notes, and update status
- 🏷️ **Company Profile** — Build a verified company page with logo and branding
- 📈 **Analytics** — Track views, application counts, and hiring funnel

### 🛡️ For Admins
- 📊 **Platform Dashboard** — Real-time stats: users, internships, applications, companies
- ✅ **Company Verification** — Approve or reject company registrations
- ⭐ **Feature Listings** — Pin high-quality internships to the top
- 🔧 **User Management** — Activate, deactivate, and manage all platform users

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
| --- | --- | --- |
| React | 18.3.1 | UI library |
| Vite | 5.x | Build tool & dev server |
| Tailwind CSS | 3.x | Utility-first styling |
| React Router DOM | 6.x | Client-side routing |
| Axios | 1.7.x | HTTP client |
| Lucide React | 0.468.x | Icon library |

### Backend

| Technology | Version | Purpose |
| --- | --- | --- |
| Node.js | ≥ 18 | Runtime |
| Express.js | 4.x | Web framework |
| MongoDB | — | NoSQL database |
| Mongoose | 8.x | ODM / schema validation |
| JSON Web Token | 9.x | Authentication tokens |
| bcryptjs | 2.4.x | Password hashing |
| Multer | 1.x | File upload handling |
| Cloudinary | 1.x | Cloud media storage |
| Helmet | 8.x | HTTP security headers |
| express-rate-limit | 7.x | Rate limiting |
| Nodemailer | 6.x | Email notifications |

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
│   ├── .env.example                # Copy to .env and fill in values
│   └── src/
│       ├── server.js               # Entry point — DB connect → HTTP server
│       ├── app.js                  # Express app (CORS, helmet, rate-limit, routes)
│       │
│       ├── config/
│       │   ├── db.js               # Mongoose connection + retry logic
│       │   ├── cloudinary.js       # Cloudinary SDK setup
│       │   └── constants.js        # App-wide constants (roles, statuses…)
│       │
│       ├── models/
│       │   ├── User.model.js       # Roles, avatar, profile, bcrypt pre-save hook
│       │   ├── Internship.model.js # Full-text index, stipend, AI score placeholder
│       │   ├── Application.model.js# Unique compound index, status history
│       │   └── Company.model.js    # Auto-slug, logo, virtual populate
│       │
│       ├── middleware/
│       │   ├── auth.middleware.js  # protect() + authorise(...roles)
│       │   ├── error.middleware.js # asyncHandler + global error handler
│       │   ├── upload.middleware.js# Multer + Cloudinary storage
│       │   └── validate.middleware.js # express-validator result checker
│       │
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── user.controller.js
│       │   ├── internship.controller.js
│       │   ├── application.controller.js
│       │   └── admin.controller.js
│       │
│       ├── routes/
│       │   ├── index.js            # Route aggregator
│       │   ├── auth.routes.js
│       │   ├── user.routes.js
│       │   ├── internship.routes.js
│       │   ├── application.routes.js
│       │   └── admin.routes.js
│       │
│       └── utils/
│           ├── apiResponse.js      # ApiResponse + ApiError classes
│           ├── generateToken.js    # JWT signing helper
│           └── email.js            # Nodemailer + email templates
│
└── frontend/
    ├── package.json
    ├── vite.config.js              # Path alias @/ + proxy to backend :5000
    ├── tailwind.config.js          # Design tokens, brand colors, animations
    ├── postcss.config.js
    ├── index.html                  # Inter font, SEO meta, Open Graph tags
    ├── .env.example                # Copy to .env and fill in values
    └── src/
        ├── main.jsx                # ReactDOM + BrowserRouter + providers
        ├── App.jsx                 # Lazy routes + ProtectedRoute guard
        ├── index.css               # Tailwind + CSS vars + global reset
        │
        ├── context/
        │   ├── AuthContext.jsx     # Auth state (login / logout / register)
        │   └── ThemeContext.jsx    # Dark / light mode toggle
        │
        ├── hooks/
        │   ├── useAuth.js
        │   ├── useDebounce.js
        │   └── usePagination.js
        │
        ├── services/
        │   ├── api.js              # Axios instance + request/response interceptors
        │   ├── auth.service.js
        │   ├── internship.service.js
        │   └── application.service.js
        │
        ├── utils/
        │   ├── formatDate.js       # timeAgo, formatDate, daysUntilDeadline
        │   ├── validators.js       # Email, password, file type/size checks
        │   └── constants.js        # Roles, status colors, nav links per role
        │
        ├── components/
        │   ├── layout/
        │   │   ├── Navbar.jsx      # Sticky, scroll-aware, role-based nav links
        │   │   ├── Footer.jsx
        │   │   ├── Sidebar.jsx     # Collapsible dashboard sidebar
        │   │   └── PageWrapper.jsx
        │   │
        │   ├── ui/                 # Reusable design-system components
        │   │   ├── Button.jsx      # 6 variants + loading state + polymorphic as prop
        │   │   ├── Input.jsx       # Label + icon slots + accessible error state
        │   │   ├── Badge.jsx       # 6 color variants
        │   │   ├── Card.jsx        # Glassmorphism + hover lift effect
        │   │   ├── Modal.jsx       # Accessible dialog + Escape key + scroll lock
        │   │   ├── Spinner.jsx     # 3 sizes + fullScreen overlay
        │   │   ├── Avatar.jsx      # Image or gradient-initials fallback
        │   │   └── Tooltip.jsx     # 4 position variants + keyboard focus
        │   │
        │   └── sections/
        │       └── Hero.jsx        # Landing hero with animated blobs + stats
        │
        └── pages/
            ├── Home.jsx
            ├── Login.jsx
            ├── Register.jsx        # Role selector (student / recruiter)
            ├── NotFound.jsx
            ├── student/
            │   ├── Dashboard.jsx
            │   ├── BrowseInternships.jsx
            │   ├── MyApplications.jsx
            │   └── Profile.jsx
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
- Frontend → http://localhost:5173
- Backend API → http://localhost:5000/api/v1

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

# Client
CLIENT_URL=http://localhost:5173

# Email (Nodemailer)
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
| `GET` | `/auth/me` | Protected | Get current user |

### 👤 Users

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/users/profile` | Protected | Get own profile |
| `PUT` | `/users/profile` | Protected | Update profile |
| `PUT` | `/users/avatar` | Protected | Upload avatar image |
| `PUT` | `/users/resume` | Student | Upload resume PDF |
| `GET` | `/users` | Admin | List all users (paginated) |
| `PATCH` | `/users/:id/toggle-status` | Admin | Activate / deactivate user |

### 💼 Internships

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/internships` | Public | Search & filter internships |
| `GET` | `/internships/:id` | Public | Get single internship |
| `GET` | `/internships/my/listings` | Recruiter | Get own listings |
| `POST` | `/internships` | Recruiter | Create internship |
| `PUT` | `/internships/:id` | Recruiter | Update internship |
| `DELETE` | `/internships/:id` | Recruiter | Delete internship |

### 📄 Applications

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/applications` | Student | Apply to an internship |
| `GET` | `/applications/my` | Student | Get own applications |
| `GET` | `/applications/internship/:id` | Recruiter | Get all applications for a listing |
| `PATCH` | `/applications/:id/status` | Recruiter | Update application status |
| `DELETE` | `/applications/:id` | Student | Withdraw application |

### 🛡️ Admin

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/admin/stats` | Admin | Platform dashboard statistics |
| `PATCH` | `/admin/internships/:id/feature` | Admin | Toggle featured status |
| `PATCH` | `/admin/companies/:id/verify` | Admin | Verify a company |
| `GET` | `/health` | Public | API health check |

---

## 👤 User Roles

| Role | How to Get | Capabilities |
| --- | --- | --- |
| `student` | Self-register | Browse, apply, track applications, manage profile |
| `recruiter` | Self-register | Post internships, manage listings, review applicants |
| `admin` | Manual DB assignment | Full platform access, verification, moderation |

---

## 🎨 Design System

InternConnect uses a custom **dark-first** design system built on Tailwind CSS.

### Brand Color Palette

| Token | Value | Usage |
| --- | --- | --- |
| `brand-500` | `#6366f1` | Primary actions, active links |
| `brand-600` | `#4f46e5` | Button hover states |
| `accent-500` | `#d946ef` | Gradient accents, badges |
| `surface` | `#0f0e17` | Page background |
| `surface-card` | `#1a1929` | Card backgrounds |
| `surface-border` | `#2d2b50` | Borders and dividers |
| `surface-muted` | `#6b6b8a` | Secondary / placeholder text |

### Utility Classes

```css
.card-glass        /* Glassmorphism card with backdrop blur */
.gradient-text     /* Indigo → violet gradient text fill    */
.gradient-bg       /* Indigo → violet gradient background   */
.container-page    /* Centered max-w-7xl page container     */
.badge             /* Base badge chip                       */
.badge-brand       /* Indigo badge variant                  */
.badge-success     /* Emerald badge variant                 */
.input-base        /* Standard dark input styling           */
.skeleton          /* Shimmer loading placeholder           */
```

### Animations

| Name | Effect |
| --- | --- |
| `fade-in` | Slide up + fade in |
| `fade-in-scale` | Scale up + fade in |
| `float` | Gentle vertical bob |
| `shimmer` | Skeleton sweep |
| `gradient-shift` | Animated gradient background |

---

## 🔒 Security

- **HTTP-only cookies** for JWT storage — safe from XSS attacks
- **Helmet.js** — sets secure HTTP response headers
- **CORS** — restricted to `CLIENT_URL` only
- **Rate limiting** — 200 req / 15 min globally; 20 req / 15 min on auth routes
- **bcryptjs** — password hashing with 12 salt rounds
- **Role-based access control** — `protect()` + `authorise()` middleware chain
- **Input validation** — Mongoose schema + `express-validator` on all endpoints
- **Unique compound index** — one application per internship per user (DB-level)

---

## 📦 Scripts

### Root (run from project root)

```bash
npm run dev              # Start frontend + backend concurrently
npm run dev:frontend     # Start only Vite dev server  → :5173
npm run dev:backend      # Start only Express server   → :5000
npm run install:all      # Install all packages
npm run build            # Production build of frontend
```

### Backend

```bash
npm run dev    # nodemon — auto-restart on file changes
npm start      # node   — production start
```

### Frontend

```bash
npm run dev      # Vite dev server with HMR
npm run build    # Production bundle → dist/
npm run preview  # Preview the production build locally
```

---

## 🗺️ Roadmap

### Phase 1 — Scaffold ✅ *(complete)*

- [x] Project structure and configuration files
- [x] Mongoose models — User, Internship, Application, Company
- [x] Express middleware stack — auth, error, upload, validate
- [x] REST API controllers and routes for all resources
- [x] React component library — Button, Input, Badge, Card, Modal, Spinner, Avatar, Tooltip
- [x] AuthContext, ThemeContext, custom hooks, Axios service layer
- [x] Comprehensive README

### Phase 2 — Core Authentication 🔜

- [ ] Functional login / register forms with validation
- [ ] JWT HTTP-only cookie auth flow end-to-end
- [ ] Protected route enforcement
- [ ] Password reset via email (Nodemailer)

### Phase 3 — Internship Features

- [ ] Internship listing page with search, filters, and pagination
- [ ] Internship detail page
- [ ] Multi-step post internship form (recruiter)
- [ ] Application submission with resume upload to Cloudinary

### Phase 4 — Dashboards

- [ ] Student — application tracker with live status badges
- [ ] Recruiter — applicant review interface with notes
- [ ] Admin — platform analytics with charts

### Phase 5 — AI Integration

- [ ] AI-based profile ↔ internship matching score
- [ ] Skill gap recommendations
- [ ] Auto-generated cover letter suggestions

---

## 🤝 Contributing

Contributions are welcome! Here is how to get started:

1. **Fork** this repository
2. **Create** a feature branch

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit** your changes using Conventional Commits

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