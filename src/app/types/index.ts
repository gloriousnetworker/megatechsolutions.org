export type UserRole = 'student' | 'staff' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  twoFactorEnabled: boolean;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  price: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  image: string;
  curriculum: string[];
  requirements: string[];
  learningOutcomes: string[];
  enrolledStudents: number;
  rating: number;
  isFeatured?: boolean;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledDate: string;
  progress: number;
  status: 'active' | 'completed' | 'pending';
  course?: Course;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  submittedDate?: string;
  course?: { id: string; title: string };
}

export interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  issueDate: string;
  certificateNumber: string;
  status: 'valid' | 'revoked';
}

export interface Payment {
  id: string;
  studentId: string;
  courseId: string;
  amount: number;
  date: string;
  status: 'pending' | 'confirmed' | 'failed';
  method: string;
  reference?: string;
  currency?: string;
  student?: { id: string; name: string; email: string };
  course?: { id: string; title: string };
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'trainings' | 'workshops' | 'events' | 'graduation' | 'conferences';
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  date: string;
}

export interface Staff {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: string;
  skills: string[];
  email: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string | null;
  order: number;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
  order: number;
  createdAt: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  type: 'course' | 'ebook' | 'material';
  price: number;
  description: string;
  image: string;
}

export interface LoginResult {
  requiresTwoFactor?: boolean;
  user?: User;
}

export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalEnrollments: number;
  totalStaff: number;
  totalBlogPosts: number;
  totalRevenue: number;
  recentEnrollments: Array<{
    id: string;
    studentName: string;
    courseName: string;
    enrolledDate: string;
    status: string;
  }>;
  recentPayments: Array<{
    id: string;
    studentName: string;
    courseName: string;
    amount: number;
    status: string;
    date: string;
  }>;
}
