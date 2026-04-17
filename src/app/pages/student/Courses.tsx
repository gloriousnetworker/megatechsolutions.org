import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { useApi } from '../../hooks/useApi';
import { api } from '../../utils/api';
import { ErrorState } from '../../components/ErrorState';
import { CourseGridSkeleton } from '../../components/skeletons/CourseCardSkeleton';
import { BookOpen, Clock, PlayCircle } from 'lucide-react';
import { Link } from 'react-router';
import type { Enrollment } from '../../types';

export default function StudentCourses() {
  const { data: enrollments, isLoading, error, retry } = useApi<Enrollment[]>(() => api.enrollments.my());

  if (isLoading) return <CourseGridSkeleton count={4} />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  const allEnrollments = enrollments || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">My Courses</h1>
        <p className="text-gray-600 mt-2">Continue learning and track your progress</p>
      </div>

      {allEnrollments.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <BookOpen className="size-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Courses Yet</h3>
            <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
            <Button asChild><Link to="/courses">Browse Courses</Link></Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {allEnrollments.map((enrollment) => (
            <Card key={enrollment.id} className="overflow-hidden">
              {enrollment.course?.image && (
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img src={enrollment.course.image} alt={enrollment.course.title} className="w-full h-full object-cover" />
                </div>
              )}
              <CardHeader>
                <CardTitle>{enrollment.course?.title}</CardTitle>
                <CardDescription>{enrollment.course?.instructor}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{enrollment.progress}%</span>
                  </div>
                  <Progress value={enrollment.progress} />
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="size-4" />
                    <span>{enrollment.course?.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="size-4" />
                    <span>{enrollment.course?.curriculum?.length || 0} modules</span>
                  </div>
                </div>
                <Button className="w-full">
                  <PlayCircle className="size-4 mr-2" />
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
