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
    <div className="space-y-6 p-4 md:p-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome Back!</h1>
        <p className="text-gray-600 text-sm md:text-base">Here's your learning progress overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{enrolledCourses.length}</div>
            <p className="text-xs md:text-sm text-gray-500">Currently enrolled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Award className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{completedCourses}</div>
            <p className="text-xs md:text-sm text-gray-500">Courses finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <FileText className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{pendingAssignments}</div>
            <p className="text-xs md:text-sm text-gray-500">Assignments due</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <TrendingUp className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{averageProgress}%</div>
            <p className="text-xs md:text-sm text-gray-500">Overall completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Courses */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-2">
        {/* Title */}
          <div className="flex-1">
            <CardTitle className="text-lg md:text-xl truncate">My Active Courses</CardTitle>
          </div>

            {/* View All Button */}
            <div className="flex justify-start sm:justify-end w-full sm:w-auto">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/student/courses" className="flex items-center gap-1 text-sm md:text-base">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <CardDescription>Continue your learning journey</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {enrolledCourses.map((enrollment) => {
            const course = mockCourses.find(c => c.id === enrollment.courseId);
            if (!course) return null;

            return (
              <div
                key={enrollment.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                {/* Course Image */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full sm:w-24 h-24 rounded object-cover flex-shrink-0"
                />

                {/* Course Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="font-semibold text-sm md:text-base truncate">{course.title}</h4>
                  <p className="text-xs md:text-sm text-gray-600">Instructor: {course.instructor}</p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{enrollment.progress}%</span>
                    </div>
                    <Progress className="w-full" value={enrollment.progress} />
                  </div>
                </div>

                {/* Continue Button */}
                <Button size="sm" className="mt-2 sm:mt-0 flex-shrink-0" asChild>
                  <Link to={`/student/courses/${course.id}`}>Continue</Link>
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recent Assignments & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Assignments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>Don't miss your deadlines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockAssignments.filter(a => a.status === 'pending').slice(0, 3).map((assignment) => {
              const course = mockCourses.find(c => c.id === assignment.courseId);
              const daysUntilDue = Math.ceil(
                (new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );
              return (
                <div key={assignment.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 border rounded-lg">
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-medium text-sm truncate">{assignment.title}</h4>
                    <p className="text-xs text-gray-600 truncate">{course?.title}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="h-3 w-3" />
                      <span className={daysUntilDue <= 3 ? 'text-red-600' : 'text-gray-600'}>
                        Due in {daysUntilDue} days
                      </span>
                    </div>
                  </div>
                  <Badge variant={daysUntilDue <= 3 ? 'destructive' : 'secondary'} className="mt-2 sm:mt-0">
                    {assignment.status}
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access your most-used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-3">
              {[
                { icon: BookOpen, label: 'My Courses', link: '/student/courses' },
                { icon: FileText, label: 'Assignments', link: '/student/assignments' },
                { icon: Award, label: 'Certificates', link: '/student/certificates' },
                { icon: TrendingUp, label: 'Browse Courses', link: '/courses' }
              ].map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-auto flex flex-col items-center gap-2 p-4"
                  asChild
                >
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