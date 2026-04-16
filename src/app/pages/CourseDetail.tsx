import { useParams, Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Skeleton } from '../components/ui/skeleton';
import { useApi } from '../hooks/useApi';
import { api } from '../utils/api';
import { ErrorState } from '../components/ErrorState';
import { ArrowLeft, Clock, Users, Award, BookOpen, CheckCircle, Star, Loader2 } from 'lucide-react';
import type { Course } from '../types';

export default function CourseDetail() {
  const { id } = useParams();
  const { data: course, isLoading, error, retry } = useApi<Course>(() => api.courses.get(id!), [id]);

  if (isLoading) {
    return (
      <div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 py-12">
          <div className="container mx-auto px-4 space-y-4">
            <Skeleton className="h-8 w-32 bg-white/20" />
            <Skeleton className="h-10 w-2/3 bg-white/20" />
            <Skeleton className="h-6 w-1/2 bg-white/20" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={retry} />;

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <Button asChild>
          <Link to="/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="mb-4 text-white hover:text-white/80 -ml-4" asChild>
            <Link to="/courses">
              <ArrowLeft className="mr-2 size-4" />
              Back to Courses
            </Link>
          </Button>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">{course.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg sm:text-xl text-blue-50 mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-4 sm:gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="size-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating} rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="size-5" />
                  <span>{course.enrolledStudents} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="size-5" />
                  <span>{course.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {course.image && (
              <img src={course.image} alt={course.title} className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-lg" />
            )}

            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="size-5 text-green-600 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">&#8226;</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="size-5" />
                  Course Curriculum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.curriculum.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-center size-8 rounded-full bg-blue-100 text-blue-600 font-semibold shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    &#8358;{(course.price / 1000).toFixed(0)}k
                  </div>
                  <p className="text-sm text-gray-600">One-time payment</p>
                </div>

                <Button size="lg" className="w-full mb-3" asChild>
                  <Link to="/register">Enroll Now</Link>
                </Button>

                <Button size="lg" variant="outline" className="w-full">
                  Add to Cart
                </Button>

                <Separator className="my-6" />

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Instructor:</span>
                    <span className="font-medium">{course.instructor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium">{course.enrolledStudents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Certificate:</span>
                    <span className="font-medium">Yes</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <h4 className="font-semibold">This course includes:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><CheckCircle className="size-4 text-green-600" />Lifetime access</li>
                    <li className="flex items-center gap-2"><CheckCircle className="size-4 text-green-600" />Downloadable resources</li>
                    <li className="flex items-center gap-2"><CheckCircle className="size-4 text-green-600" />Certificate of completion</li>
                    <li className="flex items-center gap-2"><CheckCircle className="size-4 text-green-600" />Hands-on projects</li>
                    <li className="flex items-center gap-2"><CheckCircle className="size-4 text-green-600" />Community support</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
