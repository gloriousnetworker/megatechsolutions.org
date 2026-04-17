import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useApi } from '../hooks/useApi';
import { api } from '../utils/api';
import { CourseGridSkeleton } from '../components/skeletons/CourseCardSkeleton';
import { ErrorState } from '../components/ErrorState';
import { Search, Users, Star } from 'lucide-react';
import type { Course } from '../types';

export default function Courses() {
  const { data: courses, isLoading, error, retry } = useApi<Course[]>(() => api.courses.list());
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const allCourses = courses || [];
  const categories = [...new Set(allCourses.map(c => c.category))];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Courses</h1>
          <p className="text-xl text-blue-50 max-w-3xl">
            Explore our comprehensive range of technology courses designed to help you master in-demand skills
          </p>
        </div>
      </section>

      <section className="py-8 border-b bg-white sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {!isLoading && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredCourses.length} of {allCourses.length} courses
            </div>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading && <CourseGridSkeleton count={6} />}
          {error && <ErrorState message={error} onRetry={retry} />}
          {!isLoading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow flex flex-col">
                    <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-t-lg" />
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{course.level}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="size-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Instructor:</span>
                          <span className="font-medium">{course.instructor}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users className="size-4" />
                            {course.enrolledStudents} students
                          </span>
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between pt-4 border-t">
                      <span className="text-2xl font-bold text-blue-600">
                        &#8358;{(course.price / 1000).toFixed(0)}k
                      </span>
                      <Button asChild>
                        <Link to={`/courses/${course.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No courses found matching your criteria</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
