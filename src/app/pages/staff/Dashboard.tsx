import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Skeleton } from '../../components/ui/skeleton';
import { useApi } from '../../hooks/useApi';
import { api } from '../../utils/api';
import { ErrorState } from '../../components/ErrorState';
import { BookOpen, Users, FileText, CreditCard } from 'lucide-react';
import type { DashboardStats } from '../../types';

export default function StaffDashboard() {
  const { user } = useAuth();
  const { data: stats, isLoading, error, retry } = useApi<DashboardStats>(() => api.stats.dashboard());

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-gray-600 mt-2">Here's an overview of platform activity</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="size-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalCourses || 0}</div>
            <p className="text-xs text-gray-600 mt-1">Active courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="size-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalStudents || 0}</div>
            <p className="text-xs text-gray-600 mt-1">Enrolled students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Enrollments</CardTitle>
            <FileText className="size-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalEnrollments || 0}</div>
            <p className="text-xs text-gray-600 mt-1">Total enrollments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CreditCard className="size-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">&#8358;{(stats?.totalRevenue || 0).toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">Confirmed payments</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
            <CardDescription>Latest student enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            {(stats?.recentEnrollments || []).length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No recent enrollments</p>
            ) : (
              <div className="space-y-4">
                {(stats?.recentEnrollments || []).map((e) => (
                  <div key={e.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="p-2 bg-blue-50 rounded"><Users className="size-4 text-blue-600" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{e.studentName}</p>
                      <p className="text-xs text-gray-600 truncate">{e.courseName}</p>
                      <p className="text-xs text-gray-400">{new Date(e.enrolledDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Latest payment activity</CardDescription>
          </CardHeader>
          <CardContent>
            {(stats?.recentPayments || []).length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No recent payments</p>
            ) : (
              <div className="space-y-4">
                {(stats?.recentPayments || []).map((p) => (
                  <div key={p.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="p-2 bg-green-50 rounded"><CreditCard className="size-4 text-green-600" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{p.studentName}</p>
                      <p className="text-xs text-gray-600 truncate">{p.courseName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">&#8358;{p.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-400 capitalize">{p.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
