import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { BookOpen, Clock, Award, PlayCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function StudentCourses() {
  const { accessToken } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const fetchData = async () => {
    if (!accessToken) return;
    
    try {
      const [enrollmentsData, coursesData] = await Promise.all([
        api.getMyEnrollments(accessToken),
        api.getCourses(),
      ]);

      setEnrollments(enrollmentsData.enrollments || []);
      setCourses(coursesData.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const getEnrolledCourses = () => {
    return enrollments.map(enrollment => {
      const course = courses.find(c => c.id === enrollment.courseId);
      return course ? { ...course, enrollment } : null;
    }).filter(Boolean);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const enrolledCourses = getEnrolledCourses();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Courses</h1>
        <p className="text-gray-600 mt-2">Continue learning and track your progress</p>
      </div>

      {enrolledCourses.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <BookOpen className="size-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Courses Yet</h3>
            <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
            <Button asChild>
              <a href="/courses">Browse Courses</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {enrolledCourses.map((course: any) => (
            <Card key={course.id} className="overflow-hidden">
              {course.image && (
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.instructor}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{course.enrollment.progress || 0}%</span>
                  </div>
                  <Progress value={course.enrollment.progress || 0} />
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="size-4" />
                    <span>{course.duration || '8 weeks'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="size-4" />
                    <span>{course.lessons || 24} lessons</span>
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
