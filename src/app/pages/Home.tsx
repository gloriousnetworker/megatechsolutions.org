import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useApi } from '../hooks/useApi';
import { api } from '../utils/api';
import { CourseGridSkeleton } from '../components/skeletons/CourseCardSkeleton';
import { BlogGridSkeleton } from '../components/skeletons/BlogCardSkeleton';
import { ArrowRight, Award, Users, BookOpen, TrendingUp, Star, CheckCircle } from 'lucide-react';
import type { Course, BlogPost, Partner } from '../types';

export default function Home() {
  const { data: courses } = useApi<Course[]>(() => api.courses.list());
  const { data: posts } = useApi<BlogPost[]>(() => api.blog.list());
  const { data: partners } = useApi<Partner[]>(() => api.partners.list());

  const featuredCourses = (courses || []).filter(c => c.isFeatured).slice(0, 3);
  const latestPosts = (posts || []).slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Empowering Tech Professionals Since 2023
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Career with World-Class Tech Education
            </h1>
            <p className="text-xl mb-8 text-blue-50">
              Join thousands of students mastering the skills that matter. Learn from industry experts and build your future in technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/courses">
                  Explore Courses
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                <Link to="/register">Register Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Expert Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Courses Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most popular courses designed to help you succeed in today's tech industry
            </p>
          </div>

          {!courses ? <CourseGridSkeleton count={3} /> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
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
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="size-4" />
                      {course.enrolledStudents} students
                    </span>
                    <span>{course.duration}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ₦{(course.price / 1000).toFixed(0)}k
                  </span>
                  <Button asChild>
                    <Link to={`/courses/${course.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>}

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/courses">
                View All Courses
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose MEGA-TECH?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Award className="size-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Industry-Recognized Certificates</h3>
              <p className="text-gray-600">
                Earn certificates that are valued by employers worldwide
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Users className="size-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals with real-world experience
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <BookOpen className="size-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hands-On Projects</h3>
              <p className="text-gray-600">
                Build real projects to add to your portfolio
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <TrendingUp className="size-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Support</h3>
              <p className="text-gray-600">
                Get guidance to land your dream tech job
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <CheckCircle className="size-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
              <p className="text-gray-600">
                Study at your own pace with lifetime access
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Users className="size-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600">
                Join a vibrant community of learners
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Success Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Michael Okafor',
                role: 'Full Stack Developer at TechCorp',
                image: 'https://images.unsplash.com/photo-1684337399050-0412ebed8005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
                quote: 'MEGA-TECH transformed my career. The instructors are amazing and the curriculum is top-notch!'
              },
              {
                name: 'Grace Adeyemi',
                role: 'Data Scientist at DataHub',
                image: 'https://images.unsplash.com/photo-1746104718762-fb421954cc1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
                quote: 'Best investment I ever made. I landed my dream job just 2 months after graduation!'
              },
              {
                name: 'Chidi Nwankwo',
                role: 'Mobile Developer at AppWorks',
                image: 'https://images.unsplash.com/photo-1764169689207-e23fb66e1fcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400',
                quote: 'The hands-on projects gave me the confidence to build real applications. Highly recommended!'
              }
            ].map((story, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={story.image} alt={story.name} className="size-16 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold">{story.name}</div>
                      <div className="text-sm text-gray-600">{story.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{story.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest News & Updates</h2>
          </div>

          {!posts ? <BlogGridSkeleton count={3} /> : <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {latestPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="link" className="px-0" asChild>
                    <Link to={`/blog/${post.id}`}>
                      Read More
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>}

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link to="/blog">View All Posts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      {partners && partners.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Our Partners</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We collaborate with leading companies to provide real-world experience and career opportunities.
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              {partners.map((partner) => (
                <div key={partner.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-center w-32 h-20 hover:shadow-md transition-shadow">
                  {partner.website ? (
                    <a href={partner.website} target="_blank" rel="noopener noreferrer">
                      <img src={partner.logo} alt={partner.name} className="max-w-full max-h-12 object-contain grayscale hover:grayscale-0 transition-all" />
                    </a>
                  ) : (
                    <img src={partner.logo} alt={partner.name} className="max-w-full max-h-12 object-contain grayscale hover:grayscale-0 transition-all" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-blue-50 max-w-2xl mx-auto">
            Join MEGA-TECH today and take the first step towards your dream tech career
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Get Started Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}