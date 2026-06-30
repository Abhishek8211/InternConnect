<div align="center">

# 🚀 InternConnect

### AI-Powered Internship Matching Portal

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

<p align="center">
  InternConnect is a modern, full-stack web application that helps <strong>students</strong> discover and apply to internships, enables <strong>recruiters</strong> to post opportunities and manage applicants, and gives <strong>admins</strong> full control of the platform — all powered by intelligent AI matching.
</p>

---

</div>

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
- 🤖 **AI Matching** — Get personalized recommendations based on your profile and skills
- 📄 **One-Click Apply** — Upload resume and submit applications in seconds
- 📊 **Application Tracker** — Real-time status updates for every application
- 👤 **Rich Profile** — Showcase education, skills, projects, and social links

### 🏢 For Recruiters
- 📝 **Post Internships** — Create detailed listings with requirements, stipend, and deadline
- 📬 **Applicant Management** — Review applications, add notes, and update status
- 🏷️ **Company Profile** — Build a verified company page with logo and branding
- 📈 **Analytics** — Track views, application rates, and hiring funnel

### 🛡️ For Admins
- 📊 **Platform Dashboard** — Real-time stats: users, internships, applications, companies
- ✅ **Company Verification** — Approve or reject company registrations
- ⭐ **Feature Listings** — Pin high-quality internships to the top
- 🔧 **User Management** — Activate, deactivate, and manage all platform users

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.1 | UI library |
| Vite | 5.x | Build tool & dev server |
| Tailwind CSS | 3.x | Utility-first styling |
| React Router DOM | 6.x | Client-side routing |
| Axios | 1.7.x | HTTP client |
| Lucide React | 0.468.x | Icon library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | ≥18 | Runtime |
| Express.js | 4.x | Web framework |
| MongoDB | — | NoSQL database |
| Mongoose | 8.x | ODM / schema validation |
| JWT | 9.x | Authentication tokens |
| bcryptjs | 2.4.x | Password hashing |
| Multer | 1.x | File upload handling |
| Cloudinary | 1.x | Cloud media storage |
| Helmet | 8.x | HTTP security headers |
| express-rate-limit | 7.x | Rate limiting |

---

## 🏗️ Project Structure

```
InternConnect/
│
├── 📄 package.json              # Root monorepo — concurrent dev scripts
├── 📄 .gitignore
│
├── 📁 backend/
│   ├── 📄 package.json
│   ├── 📄 .env.example          # ← copy to .env and fill in
│   └── 📁 src/
│       ├── 📄 server.js         # Entry point — DB → HTTP + graceful shutdown
│       ├── 📄 app.js            # Express app factory
│       │
│       ├── 📁 config/
│       │   ├── db.js            # Mongoose connection + retry logic
│       │   ├── cloudinary.js    # Cloudinary SDK setup
│       │   └── constants.js     # App-wide constants (roles, statuses…)
│       │
│       ├── 📁 models/
│       │   ├── User.model.js        # Roles, avatar, profile, bcrypt hook
│       │   ├── Internship.model.js  # Full-text index, stipend, AI score
│       │   ├── Application.model.js # Unique compound index, status history
│       │   └── Company.model.js     # Auto-slug, logo, virtual populate
│       │
│       ├── 📁 middleware/
│       │   ├── auth.middleware.js    # protect() + authorise(...roles)
│       │   ├── error.middleware.js   # asyncHandler + global error handler
│       │   ├── upload.middleware.js  # Multer + Cloudinary storage
│       │   └── validate.middleware.js # express-validator checker
│       │
│       ├── 📁 controllers/
│       │   ├── auth.controller.js
│       │   ├── user.controller.js
│       │   ├── internship.controller.js
│       │   ├── application.controller.js
│       │   └── admin.controller.js
│       │
│       ├── 📁 routes/
│       │   ├── index.js             # Route aggregator
│       │   ├── auth.routes.js
│       │   ├── user.routes.js
│       │   ├── internship.routes.js
│       │   ├── application.routes.js
│       │   └── admin.routes.js
│       │
│       └── 📁 utils/
│           ├── apiResponse.js       # ApiResponse + ApiError classes
│           ├── generateToken.js     # JWT signing helper
│           └── email.js             # Nodemailer + email templates
│
└── 📁 frontend/
    ├── 📄 package.json
    ├── 📄 vite.config.js        # @/ alias + proxy to backend
    ├── 📄 tailwind.config.js    # Design tokens + animations
    ├── 📄 index.html            # Inter font, SEO meta, OG tags
    ├── 📄 .env.example          # ← copy to .env and fill in
    └── 📁 src/
        ├── 📄 main.jsx          # ReactDOM + providers
        ├── 📄 App.jsx           # Router + lazy routes + ProtectedRoute
        ├── 📄 index.css         # Tailwind + CSS vars + global reset
        │
        ├── 📁 context/
        │   ├── AuthContext.jsx  # Auth state (login/logout/register)
        │   └── ThemeContext.jsx # Dark/light mode toggle
        │
        ├── 📁 hooks/
        │   ├── useAuth.js
        │   ├── useDebounce.js
        │   └── usePagination.js
        │
        ├── 📁 services/
        │   ├── api.js                   # Axios instance + interceptors
        │   ├── auth.service.js
        │   ├── internship.service.js
        │   └── application.service.js
        │
        ├── 📁 utils/
        │   ├── formatDate.js    # timeAgo, formatDate, daysUntilDeadline
        │   ├── validators.js    # Email, password, file type/size checks
        │   └── constants.js     # Roles, status colors, nav links per role
        │
        ├── 📁 components/
        │   ├── 📁 layout/
        │   │   ├── Navbar.jsx   # Sticky, scroll-aware, role nav links
        │   │   ├── Footer.jsx
        │   │   ├── Sidebar.jsx  # Collapsible dashboard sidebar
        │   │   └── PageWrapper.jsx
        │   │
        │   ├── 📁 ui/           # Reusable design-system components
        │   │   ├── Button.jsx   # 6 variants + loading state + polymorphic
        │   │   ├── Input.jsx    # Label + icons + error state
        │   │   ├── Badge.jsx    # 6 color variants
        │   │   ├── Card.jsx     # Glassmorphism + hover lift
        │   │   ├── Modal.jsx    # Accessible dialog + Escape key
        │   │   ├── Spinner.jsx  # 3 sizes + fullScreen overlay
        │   │   ├── Avatar.jsx   # Image or gradient initials fallback
        │   │   └── Tooltip.jsx  # 4 position variants
        │   │
        │   └── 📁 sections/
        │       └── Hero.jsx     # Landing hero with animated blobs
        │
        └── 📁 pages/
            ├── Home.jsx
            ├── Login.jsx
            ├── Register.jsx     # Role selector (student / recruiter)
            ├── NotFound.jsx
            ├── 📁 student/
            │   ├── Dashboard.jsx
            │   ├── BrowseInternships.jsx
            │   ├── MyApplications.jsx
            │   └── Profile.jsx
            ├── 📁 recruiter/
            │   ├── Dashboard.jsx
            │   ├── PostInternship.jsx
            │   └── ManageListings.jsx
            └── 📁 admin/
                ├── Dashboard.jsx
                ├── Users.jsx
                └── Internships.jsx
```

---

## ⚡ Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) **v18 or higher**
- [MongoDB](https://www.mongodb.com/) (local or Atlas cluster)
- [Cloudinary](https://cloudinary.com/) account (free tier is fine)
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/internconnect.git
cd internconnect
```

### 2. Set up environment variables

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

> ⚠️ Edit both `.env` files before starting — see [Environment Variables](#-environment-variables).

### 3. Install dependencies

```bash
# Install all dependencies (root + frontend + backend)
npm run install:all
```

### 4. Start the development servers

```bash
# Starts both frontend (:5173) and backend (:5000) concurrently
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🔧 Environment Variables

### `backend/.env`

```env
# ── Server ──────────────────────────────────────────────────────
PORT=5000
NODE_ENV=development

# ── MongoDB ─────────────────────────────────────────────────────
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/internconnect

# ── JWT ─────────────────────────────────────────────────────────
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7

# ── Cloudinary ──────────────────────────────────────────────────
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ── Client ──────────────────────────────────────────────────────
CLIENT_URL=http://localhost:5173

# ── Email (Nodemailer) ──────────────────────────────────────────
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
|---|---|---|---|
| `POST` | `/auth/register` | Public | Register student or recruiter |
| `POST` | `/auth/login` | Public | Login and receive JWT cookie |
| `POST` | `/auth/logout` | Protected | Clear auth cookie |
| `GET` | `/auth/me` | Protected | Get current user |

### 👤 Users
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/users/profile` | Protected | Get own profile |
| `PUT` | `/users/profile` | Protected | Update profile |
| `PUT` | `/users/avatar` | Protected | Upload avatar |
| `PUT` | `/users/resume` | Student | Upload resume PDF |
| `GET` | `/users` | Admin | List all users |
| `PATCH` | `/users/:id/toggle-status` | Admin | Activate / deactivate user |

### 💼 Internships
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/internships` | Public | Search & filter internships |
| `GET` | `/internships/:id` | Public | Get single internship |
| `POST` | `/internships` | Recruiter | Create internship |
| `PUT` | `/internships/:id` | Recruiter | Update internship |
| `DELETE` | `/internships/:id` | Recruiter | Delete internship |
| `GET` | `/internships/my/listings` | Recruiter | Get own listings |

### 📄 Applications
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/applications` | Student | Apply to internship |
| `GET` | `/applications/my` | Student | Get own applications |
| `GET` | `/applications/internship/:id` | Recruiter | Get applications for a listing |
| `PATCH` | `/applications/:id/status` | Recruiter | Update application status |
| `DELETE` | `/applications/:id` | Student | Withdraw application |

### 🛡️ Admin
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/admin/stats` | Admin | Platform dashboard stats |
| `PATCH` | `/admin/internships/:id/feature` | Admin | Toggle featured status |
| `PATCH` | `/admin/companies/:id/verify` | Admin | Verify a company |

### 🩺 Health
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/health` | Public | API status check |

---

## 👤 User Roles

| Role | Registration | Capabilities |
|---|---|---|
| `student` | Self-register | Browse, apply, track applications, manage profile |
| `recruiter` | Self-register | Post internships, manage listings, review applicants |
| `admin` | Manual DB assignment | Full platform access, verification, moderation |

---

## 🎨 Design System

InternConnect uses a custom dark-first design system built on Tailwind CSS.

### Brand Colors
| Token | Hex | Usage |
|---|---|---|
| `brand-500` | `#6366f1` | Primary actions, links |
| `brand-600` | `#4f46e5` | Button hover states |
| `accent-500` | `#d946ef` | Gradient accents, badges |
| `surface` | `#0f0e17` | Page background |
| `surface-card` | `#1a1929` | Card backgrounds |
| `surface-border` | `#2d2b50` | Borders, dividers |
| `surface-muted` | `#6b6b8a` | Secondary text |

### Utility Classes
```css
.card-glass        /* Glassmorphism card */
.gradient-text     /* Brand gradient text fill */
.gradient-bg       /* Brand gradient background */
.container-page    /* Centered max-w-7xl container */
.badge             /* Base badge styles */
.badge-brand       /* Indigo badge */
.badge-success     /* Emerald badge */
.input-base        /* Standard input styling */
.skeleton          /* Shimmer loading placeholder */
```

### Animations
- `fade-in` — Slide up + opacity
- `fade-in-scale` — Scale up + opacity
- `float` — Gentle vertical bob
- `shimmer` — Skeleton loading sweep
- `gradient-shift` — Animated gradient background

---

## 🔒 Security

- **HTTP-only cookies** for JWT storage (XSS-safe)
- **Helmet.js** for secure HTTP headers
- **CORS** restricted to `CLIENT_URL`
- **Rate limiting** — 200 req/15min globally; 20 req/15min on auth routes
- **bcryptjs** with salt rounds of 12 for password hashing
- **Role-based access control** via `protect()` + `authorise()` middleware
- **Mongoose schema validation** + `express-validator` on all input
- **Compound unique index** on applications (one apply per internship per user)

---

## 📦 Scripts

### Root (run from `SUMMERPROJECT/`)
```bash
npm run dev              # Start frontend + backend concurrently
npm run dev:frontend     # Start only Vite dev server (:5173)
npm run dev:backend      # Start only Express server (:5000)
npm run install:all      # Install dependencies for all packages
npm run build            # Production build of frontend
```

### Backend (run from `backend/`)
```bash
npm run dev    # nodemon — auto-restart on file changes
npm start      # node — production start
```

### Frontend (run from `frontend/`)
```bash
npm run dev      # Vite dev server with HMR
npm run build    # Production bundle → dist/
npm run preview  # Preview the production build locally
```

---

## 🗺️ Roadmap

### Phase 1 — Scaffold ✅ *(current)*
- [x] Project structure & configuration
- [x] Mongoose models (User, Internship, Application, Company)
- [x] Express middleware stack
- [x] REST API controllers & routes
- [x] React component library (Button, Input, Badge, Card, Modal…)
- [x] Auth context, hooks, services

### Phase 2 — Core Auth 🔜
- [ ] Functional login / register forms
- [ ] JWT cookie authentication flow
- [ ] Protected route enforcement
- [ ] Password reset via email

### Phase 3 — Internship Features
- [ ] Internship listing page with search + filters
- [ ] Internship detail page
- [ ] Multi-step post internship form (recruiter)
- [ ] Application submission with resume upload

### Phase 4 — Dashboards
- [ ] Student: application tracker with live status
- [ ] Recruiter: applicant review interface
- [ ] Admin: platform analytics with charts

### Phase 5 — AI Integration
- [ ] AI-based profile ↔ internship matching score
- [ ] Smart skill gap recommendations
- [ ] Auto-generated cover letter suggestions

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

### Commit Convention
This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:     New feature
fix:      Bug fix
docs:     Documentation change
style:    Formatting (no logic change)
refactor: Code restructure
chore:    Tooling / dependency update
```

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License — Copyright (c) 2025 InternConnect
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software to use, copy, modify, merge, publish, distribute, and/or sell
copies of the software.
```

---

<div align="center">

**Built with ❤️ for students and recruiters**

[⬆ Back to top](#-internconnect)

</div>
#   I n t e r n C o n n e c t  
 