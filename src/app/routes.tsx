import { createBrowserRouter } from "react-router";
import { PublicLayout } from "./layouts/PublicLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Staff from "./pages/Staff";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import VerifyCertificate from "./pages/VerifyCertificate";
import Login from "./pages/Login";
import Register from "./pages/Register";



import StudentDashboard from "./pages/student/Dashboard";
import StudentCourses from "./pages/student/Courses";
import StudentAssignments from "./pages/student/Assignments";
import StudentCertificates from "./pages/student/Certificates";
import StudentPayments from "./pages/student/Payments";
import StudentProfile from "./pages/student/Profile";



import StaffDashboard from "./pages/staff/Dashboard";
import StaffCourseManagement from "./pages/staff/CourseManagement";
import StaffStudentManagement from "./pages/staff/StudentManagement";
import StaffProfile from "./pages/staff/Profile";



import AdminDashboard from "./pages/admin/Dashboard";
import AdminCourses from "./pages/admin/Courses";
import AdminStudents from "./pages/admin/Students";
import AdminStaff from "./pages/admin/Staff";
import AdminPayments from "./pages/admin/Payments";
import AdminGallery from "./pages/admin/Gallery";
import AdminBlog from "./pages/admin/Blog";
import AdminCertificates from "./pages/admin/Certificates";
import AdminSettings from "./pages/admin/Settings";
import AdminPartners from "./pages/admin/Partners";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminFeatures from "./pages/admin/Features";
import AdminBanners from "./pages/admin/Banners";
import AdminHeroSlides from "./pages/admin/HeroSlides";
import AdminSiteStats from "./pages/admin/SiteStats";
import AdminVideoSections from "./pages/admin/VideoSections";

import NotFound from "./pages/NotFound";



function StudentLayout() {
  return <DashboardLayout requiredRole="student" />;
}

function StaffLayout() {
  return <DashboardLayout requiredRole="staff" />;
}

function AdminLayout() {
  return <DashboardLayout requiredRole="admin" />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "courses", Component: Courses },
      { path: "courses/:id", Component: CourseDetail },
      { path: "staff", Component: Staff },
      { path: "gallery", Component: Gallery },
      { path: "blog", Component: Blog },
      { path: "shop", Component: Shop },
      { path: "contact", Component: Contact },
      { path: "faq", Component: FAQ },
      { path: "verify-certificate", Component: VerifyCertificate },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },
  {
    path: "/student",
    Component: StudentLayout,
    children: [
      { index: true, Component: StudentDashboard },
      { path: "dashboard", Component: StudentDashboard },
      { path: "courses", Component: StudentCourses },
      { path: "assignments", Component: StudentAssignments },
      { path: "certificates", Component: StudentCertificates },
      { path: "payments", Component: StudentPayments },
      { path: "profile", Component: StudentProfile },
    ],
  },
  {
    path: "/staff",
    Component: StaffLayout,
    children: [
      { index: true, Component: StaffDashboard },
      { path: "dashboard", Component: StaffDashboard },
      { path: "courses", Component: StaffCourseManagement },
      { path: "students", Component: StaffStudentManagement },
      { path: "profile", Component: StaffProfile },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "dashboard", Component: AdminDashboard },
      { path: "courses", Component: AdminCourses },
      { path: "students", Component: AdminStudents },
      { path: "staff", Component: AdminStaff },
      { path: "payments", Component: AdminPayments },
      { path: "gallery", Component: AdminGallery },
      { path: "blog", Component: AdminBlog },
      { path: "certificates", Component: AdminCertificates },
      { path: "partners", Component: AdminPartners },
      { path: "testimonials", Component: AdminTestimonials },
      { path: "features", Component: AdminFeatures },
      { path: "banners", Component: AdminBanners },
      { path: "hero-slides", Component: AdminHeroSlides },
      { path: "site-stats", Component: AdminSiteStats },
      { path: "video-sections", Component: AdminVideoSections },
      { path: "settings", Component: AdminSettings },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);