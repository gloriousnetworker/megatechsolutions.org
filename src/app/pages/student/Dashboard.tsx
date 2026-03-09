import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { mockEnrollments, mockCourses, mockAssignments } from '../../data/mockData';
import { BookOpen, Award, FileText, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export default function StudentDashboard() {
  const enrolledCourses = mockEnrollments.filter(e => e.status !== 'completed');
  const completedCourses = mockEnrollments.filter(e => e.status === 'completed').length;
  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending').length;
  const averageProgress = Math.round(
    mockEnrollments.reduce((sum, e) => sum + e.progress, 0) / mockEnrollments.length
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-gray-600">Here's your learning progress overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="size-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrolledCourses.length}</div>
            <p className="text-xs text-gray-500">Currently enrolled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Award className="size-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCourses}</div>
            <p className="text-xs text-gray-500">Courses finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <FileText className="size-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAssignments}</div>
            <p className="text-xs text-gray-500">Assignments due</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <TrendingUp className="size-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageProgress}%</div>
            <p className="text-xs text-gray-500">Overall completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Courses */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My Active Courses</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/courses">
                View All
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
          <CardDescription>Continue your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {enrolledCourses.map((enrollment) => {
              const course = mockCourses.find(c => c.id === enrollment.courseId);
              if (!course) return null;

              return (
                <div key={enrollment.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <img src={course.image} alt={course.title} className="size-16 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-1 truncate">{course.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">Instructor: {course.instructor}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} />
                    </div>
                  </div>
                  <Button size="sm" asChild>
                    <Link to={`/student/courses/${course.id}`}>Continue</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Assignments */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>Don't miss your deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAssignments.filter(a => a.status === 'pending').slice(0, 3).map((assignment) => {
                const course = mockCourses.find(c => c.id === assignment.courseId);
                const daysUntilDue = Math.ceil(
                  (new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );

                return (
                  <div key={assignment.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm mb-1">{assignment.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{course?.title}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <Clock className="size-3" />
                        <span className={daysUntilDue <= 3 ? 'text-red-600' : 'text-gray-600'}>
                          Due in {daysUntilDue} days
                        </span>
                      </div>
                    </div>
                    <Badge variant={daysUntilDue <= 3 ? 'destructive' : 'secondary'}>
                      {assignment.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access your most-used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-4" asChild>
                <Link to="/student/courses">
                  <BookOpen className="size-8" />
                  <span className="text-sm">My Courses</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-4" asChild>
                <Link to="/student/assignments">
                  <FileText className="size-8" />
                  <span className="text-sm">Assignments</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-4" asChild>
                <Link to="/student/certificates">
                  <Award className="size-8" />
                  <span className="text-sm">Certificates</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col items-center gap-2 p-4" asChild>
                <Link to="/courses">
                  <TrendingUp className="size-8" />
                  <span className="text-sm">Browse Courses</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}