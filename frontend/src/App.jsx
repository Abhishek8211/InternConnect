import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/ui/Spinner";
import PageWrapper from "@/components/layout/PageWrapper";

// ── Public Pages ─────────────────────────────────────────────────
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// ── Student Pages ─────────────────────────────────────────────────
const StudentDashboard = lazy(() => import("@/pages/student/Dashboard"));
const BrowseInternships = lazy(
  () => import("@/pages/student/BrowseInternships"),
);
const MyApplications = lazy(() => import("@/pages/student/MyApplications"));
const StudentProfile = lazy(() => import("@/pages/student/Profile"));

// ── Recruiter Pages ──────────────────────────────────────────────
const RecruiterDashboard = lazy(() => import("@/pages/recruiter/Dashboard"));
const PostInternship = lazy(() => import("@/pages/recruiter/PostInternship"));
const ManageListings = lazy(() => import("@/pages/recruiter/ManageListings"));

// ── Admin Pages ───────────────────────────────────────────────────
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminUsers = lazy(() => import("@/pages/admin/Users"));
const AdminInternships = lazy(() => import("@/pages/admin/Internships"));

// ── Protected Route Guard ─────────────────────────────────────────
const ProtectedRoute = ({ children, roles }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Spinner fullScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  return (
    <Suspense fallback={<Spinner fullScreen />}>
      <Routes>
        {/* ── Public ──────────────────────────────────────── */}
        <Route element={<PageWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/internships" element={<BrowseInternships />} />
        </Route>

        {/* ── Student ─────────────────────────────────────── */}
        <Route
          element={
            <ProtectedRoute roles={["student"]}>
              <PageWrapper />
            </ProtectedRoute>
          }
        >
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/applications" element={<MyApplications />} />
          <Route path="/student/profile" element={<StudentProfile />} />
        </Route>

        {/* ── Recruiter ────────────────────────────────────── */}
        <Route
          element={
            <ProtectedRoute roles={["recruiter"]}>
              <PageWrapper />
            </ProtectedRoute>
          }
        >
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/post" element={<PostInternship />} />
          <Route path="/recruiter/listings" element={<ManageListings />} />
        </Route>

        {/* ── Admin ────────────────────────────────────────── */}
        <Route
          element={
            <ProtectedRoute roles={["admin"]}>
              <PageWrapper />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/internships" element={<AdminInternships />} />
        </Route>

        {/* ── 404 ─────────────────────────────────────────── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
