import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-e700f198`;

export const api = {
  // Courses
  getCourses: async () => {
    const response = await fetch(`${API_BASE}/courses`, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` },
    });
    return response.json();
  },

  getCourse: async (id: string) => {
    const response = await fetch(`${API_BASE}/courses/${id}`, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` },
    });
    return response.json();
  },

  createCourse: async (course: any, token: string) => {
    const response = await fetch(`${API_BASE}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(course),
    });
    return response.json();
  },

  updateCourse: async (id: string, course: any, token: string) => {
    const response = await fetch(`${API_BASE}/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(course),
    });
    return response.json();
  },

  deleteCourse: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE}/courses/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // Enrollments
  enrollInCourse: async (courseId: string, token: string) => {
    const response = await fetch(`${API_BASE}/enrollments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId }),
    });
    return response.json();
  },

  getMyEnrollments: async (token: string) => {
    const response = await fetch(`${API_BASE}/enrollments/my`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // Students
  getStudents: async (token: string) => {
    const response = await fetch(`${API_BASE}/students`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  updateStudent: async (id: string, student: any, token: string) => {
    const response = await fetch(`${API_BASE}/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(student),
    });
    return response.json();
  },

  // Staff
  getStaff: async (token: string) => {
    const response = await fetch(`${API_BASE}/staff`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  createStaff: async (staff: any, token: string) => {
    const response = await fetch(`${API_BASE}/staff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(staff),
    });
    return response.json();
  },

  // Payments
  createPayment: async (payment: any, token: string) => {
    const response = await fetch(`${API_BASE}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payment),
    });
    return response.json();
  },

  getMyPayments: async (token: string) => {
    const response = await fetch(`${API_BASE}/payments/my`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  getAllPayments: async (token: string) => {
    const response = await fetch(`${API_BASE}/payments`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // Certificates
  issueCertificate: async (certificate: any, token: string) => {
    const response = await fetch(`${API_BASE}/certificates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(certificate),
    });
    return response.json();
  },

  verifyCertificate: async (id: string) => {
    const response = await fetch(`${API_BASE}/certificates/${id}/verify`, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` },
    });
    return response.json();
  },

  getMyCertificates: async (token: string) => {
    const response = await fetch(`${API_BASE}/certificates/my`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // Blog
  getBlogPosts: async () => {
    const response = await fetch(`${API_BASE}/blog`, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` },
    });
    return response.json();
  },

  createBlogPost: async (post: any, token: string) => {
    const response = await fetch(`${API_BASE}/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
    return response.json();
  },

  // Gallery
  getGalleryItems: async () => {
    const response = await fetch(`${API_BASE}/gallery`, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` },
    });
    return response.json();
  },

  addGalleryItem: async (item: any, token: string) => {
    const response = await fetch(`${API_BASE}/gallery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });
    return response.json();
  },

  deleteGalleryItem: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE}/gallery/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // Dashboard Stats
  getDashboardStats: async (token: string) => {
    const response = await fetch(`${API_BASE}/stats/dashboard`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // Assignments
  submitAssignment: async (assignment: any, token: string) => {
    const response = await fetch(`${API_BASE}/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(assignment),
    });
    return response.json();
  },

  getMyAssignments: async (token: string) => {
    const response = await fetch(`${API_BASE}/assignments/my`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },
};
