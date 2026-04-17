import { http, HttpResponse } from 'msw'

const API = import.meta.env?.VITE_API_BASE_URL || 'https://mts-server-production.up.railway.app'

const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User',
  role: 'student' as const,
  avatar: null,
  phone: null,
  twoFactorEnabled: false,
  createdAt: '2026-01-01T00:00:00.000Z',
}

const mockCourse = {
  id: 'course-1',
  title: 'Full Stack Web Development',
  description: 'Master modern web development',
  instructor: 'Dr. Chukwuemeka',
  instructorId: 'staff-1',
  price: 100000,
  category: 'Web Development',
  level: 'Intermediate',
  duration: '12 weeks',
  image: '',
  curriculum: ['React', 'Node.js'],
  requirements: ['Basic JS'],
  learningOutcomes: ['Build apps'],
  enrolledStudents: 50,
  rating: 4.8,
  isFeatured: true,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
}

export const handlers = [
  http.get(`${API}/health`, () => HttpResponse.json({ status: 'ok' })),

  http.get(`${API}/auth/me`, () =>
    HttpResponse.json({ success: true, data: { user: mockUser } })
  ),

  http.post(`${API}/auth/login`, async ({ request }) => {
    const body = await request.json() as any
    if (body.email && body.password) {
      return HttpResponse.json({ success: true, data: { user: mockUser } })
    }
    return HttpResponse.json({ success: false, error: { message: 'Invalid credentials', code: 'UNAUTHORIZED' } }, { status: 401 })
  }),

  http.post(`${API}/auth/register`, () =>
    HttpResponse.json({ success: true, data: { user: mockUser } }, { status: 201 })
  ),

  http.post(`${API}/auth/logout`, () =>
    HttpResponse.json({ success: true, data: { message: 'Logged out' } })
  ),

  http.post(`${API}/auth/refresh`, () =>
    HttpResponse.json({ success: true, data: { user: mockUser } })
  ),

  http.get(`${API}/courses`, () =>
    HttpResponse.json({ success: true, data: [mockCourse] })
  ),

  http.get(`${API}/courses/:id`, () =>
    HttpResponse.json({ success: true, data: mockCourse })
  ),

  http.get(`${API}/blog`, () =>
    HttpResponse.json({ success: true, data: [] })
  ),

  http.get(`${API}/gallery`, () =>
    HttpResponse.json({ success: true, data: [] })
  ),

  http.get(`${API}/staff/public`, () =>
    HttpResponse.json({ success: true, data: [] })
  ),

  http.get(`${API}/enrollments/my`, () =>
    HttpResponse.json({ success: true, data: [] })
  ),

  http.get(`${API}/assignments/my`, () =>
    HttpResponse.json({ success: true, data: [] })
  ),

  http.get(`${API}/certificates/my`, () =>
    HttpResponse.json({ success: true, data: [] })
  ),

  http.get(`${API}/payments/my`, () =>
    HttpResponse.json({ success: true, data: [] })
  ),

  http.get(`${API}/stats/dashboard`, () =>
    HttpResponse.json({
      success: true,
      data: {
        totalStudents: 100,
        totalCourses: 10,
        totalEnrollments: 200,
        totalStaff: 10,
        totalBlogPosts: 5,
        totalRevenue: 5000000,
        recentEnrollments: [],
        recentPayments: [],
      },
    })
  ),
]
