import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { useApi } from '../../hooks/useApi';
import { api } from '../../utils/api';
import { ErrorState } from '../../components/ErrorState';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Award, FileText, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import type { Enrollment, Assignment } from '../../types';

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-xl" />
    </div>
  );
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const { data: enrollments, isLoading: loadingEnrollments, error: enrollError, retry: retryEnroll } = useApi<Enrollment[]>(() => api.enrollments.my());
  const { data: assignments, isLoading: loadingAssignments } = useApi<Assignment[]>(() => api.assignments.my());

  const isLoading = loadingEnrollments || loadingAssignments;

  if (isLoading) return <DashboardSkeleton />;
  if (enrollError) return <ErrorState message={enrollError} onRetry={retryEnroll} />;

  const allEnrollments = enrollments || [];
  const allAssignments = assignments || [];

  const activeCourses = allEnrollments.filter(e => e.status !== 'completed');
  const completedCount = allEnrollments.filter(e => e.status === 'completed').length;
  const pendingAssignments = allAssignments.filter(a => a.status === 'pending').length;
  const averageProgress = allEnrollments.length > 0
    ? Math.round(allEnrollments.reduce((sum, e) => sum + e.progress, 0) / allEnrollments.length)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome Back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!</h1>
        <p className="text-gray-600 text-sm md:text-base">Here's your learning progress overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{activeCourses.length}</div>
            <p className="text-xs text-gray-500">Currently enrolled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Award className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{completedCount}</div>
            <p className="text-xs text-gray-500">Courses finished</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <FileText className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{pendingAssignments}</div>
            <p className="text-xs text-gray-500">Assignments due</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <TrendingUp className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{averageProgress}%</div>
            <p className="text-xs text-gray-500">Overall completion</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-2">
            <CardTitle className="text-lg md:text-xl">My Active Courses</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/courses" className="flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <CardDescription>Continue your learning journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeCourses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="size-12 mx-auto mb-3 text-gray-300" />
              <p>No active courses yet.</p>
              <Button variant="link" asChild><Link to="/courses">Browse courses</Link></Button>
            </div>
          )}
          {activeCourses.map((enrollment) => (
            <div key={enrollment.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              {enrollment.course?.image && (
                <img src={enrollment.course.image} alt={enrollment.course.title} className="w-full sm:w-24 h-24 rounded object-cover flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0 space-y-1">
                <h4 className="font-semibold text-sm md:text-base truncate">{enrollment.course?.title}</h4>
                <p className="text-xs text-gray-600">Instructor: {enrollment.course?.instructor}</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{enrollment.progress}%</span>
                  </div>
                  <Progress className="w-full" value={enrollment.progress} />
                </div>
              </div>
              <Button size="sm" className="mt-2 sm:mt-0 flex-shrink-0" asChild>
                <Link to="/student/courses">Continue</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>Don't miss your deadlines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {allAssignments.filter(a => a.status === 'pending').length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No pending assignments</p>
            )}
            {allAssignments.filter(a => a.status === 'pending').slice(0, 3).map((assignment) => {
              const daysUntilDue = assignment.dueDate
                ? Math.ceil((new Date(assignment.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                : 0;
              return (
                <div key={assignment.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 border rounded-lg">
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-medium text-sm truncate">{assignment.title}</h4>
                    <p className="text-xs text-gray-600 truncate">{assignment.course?.title}</p>
                    {assignment.dueDate && (
                      <div className="flex items-center gap-2 text-xs">
                        <Clock className="h-3 w-3" />
                        <span className={daysUntilDue <= 3 ? 'text-red-600' : 'text-gray-600'}>
                          Due in {daysUntilDue} days
                        </span>
                      </div>
                    )}
                  </div>
                  <Badge variant={daysUntilDue <= 3 ? 'destructive' : 'secondary'}>{assignment.status}</Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access your most-used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: BookOpen, label: 'My Courses', link: '/student/courses' },
                { icon: FileText, label: 'Assignments', link: '/student/assignments' },
                { icon: Award, label: 'Certificates', link: '/student/certificates' },
                { icon: TrendingUp, label: 'Browse Courses', link: '/courses' }
              ].map((action) => (
                <Button key={action.label} variant="outline" className="h-auto flex flex-col items-center gap-2 p-4" asChild>
                  <Link to={action.link} className="flex flex-col items-center gap-1">
                    <action.icon className="h-8 w-8" />
                    <span className="text-sm">{action.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
