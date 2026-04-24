import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useApi } from '../hooks/useApi';
import { api } from '../utils/api';
import { CourseGridSkeleton } from '../components/skeletons/CourseCardSkeleton';
import { BlogGridSkeleton } from '../components/skeletons/BlogCardSkeleton';
import { AnimatedSection, StaggerContainer, StaggerItem, CountUp, motion } from '../components/motion';
import {
  ArrowRight, Award, Users, BookOpen, TrendingUp, Star,
  GraduationCap, Code, Briefcase, Clock, Sparkles, Quote,
  CheckCircle, Globe, Zap, Shield, Heart, Cpu, Layers
} from 'lucide-react';
import type { Course, BlogPost, Partner, Testimonial, Feature } from '../types';

const iconMap: Record<string, React.ElementType> = {
  Award, Users, BookOpen, TrendingUp, Star, GraduationCap,
  Code, Briefcase, Clock, CheckCircle, Globe, Zap, Shield,
  Heart, Cpu, Sparkles, Layers,
};

export default function Home() {
  const { data: courses } = useApi<Course[]>(() => api.courses.list());
  const { data: posts } = useApi<BlogPost[]>(() => api.blog.list());
  const { data: partners } = useApi<Partner[]>(() => api.partners.list());
  const { data: testimonials } = useApi<Testimonial[]>(() => api.testimonials.list());
  const { data: features } = useApi<Feature[]>(() => api.features.list());

  const featuredCourses = (courses || []).filter(c => c.isFeatured).slice(0, 3);
  const latestPosts = (posts || []).slice(0, 3);

  return (
    <div className="overflow-hidden">
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge className="mb-6 bg-white/15 text-white border-white/25 backdrop-blur-sm px-4 py-1.5 text-sm">
                Empowering Tech Professionals Since 2023
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
              Transform Your Career with{' '}
              <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                World-Class
              </span>{' '}
              Tech Education
            </h1>
            <p className="text-lg md:text-xl mb-10 text-blue-100/90 leading-relaxed max-w-2xl">
              Join thousands of students mastering the skills that matter. Learn from industry experts and build your future in technology.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg shadow-black/10 font-semibold px-8" asChild>
                <Link to="/courses">
                  Explore Courses
                  <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm px-8" asChild>
                <Link to="/register">Register Now</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 bg-white border-b relative">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={0.15}>
            {[
              { end: 5000, suffix: '+', label: 'Students Trained' },
              { end: 50, suffix: '+', label: 'Expert Instructors' },
              { end: 100, suffix: '+', label: 'Courses Available' },
              { end: 95, suffix: '%', label: 'Success Rate' },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    <CountUp end={stat.end} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-500 font-medium text-sm uppercase tracking-wide">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore our most popular courses designed to help you succeed in today's tech industry
            </p>
          </AnimatedSection>

          {!courses ? <CourseGridSkeleton count={3} /> : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10" staggerDelay={0.12}>
              {featuredCourses.map((course) => (
                <StaggerItem key={course.id}>
                  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <img src={course.image} alt={course.title} className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105" />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm shadow-sm">{course.level}</Badge>
                        </div>
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
                          <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold text-gray-800">{course.rating}</span>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2 flex-1">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <Users className="size-4" />
                            {course.enrolledStudents} students
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="size-4" />
                            {course.duration}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between border-t pt-4">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                          &#8358;{(course.price / 1000).toFixed(0)}k
                        </span>
                        <Button asChild size="sm" className="shadow-sm">
                          <Link to={`/courses/${course.id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          <AnimatedSection className="text-center" delay={0.3}>
            <Button size="lg" variant="outline" className="shadow-sm" asChild>
              <Link to="/courses">
                View All Courses
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {features && features.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose MEGA-TECH?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                We provide everything you need to launch a successful tech career
              </p>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
              {features.map((feature) => {
                const IconComponent = iconMap[feature.icon] || Star;
                return (
                  <StaggerItem key={feature.id}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                      className="text-center p-8 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300"
                    >
                      <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-5 shadow-lg shadow-blue-500/25">
                        <IconComponent className="size-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      {testimonials && testimonials.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Success Stories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Hear from our graduates who transformed their careers through MEGA-TECH
              </p>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.12}>
              {testimonials.map((testimonial) => (
                <StaggerItem key={testimonial.id}>
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
                    <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <CardContent className="p-8 relative">
                        <Quote className="absolute top-4 right-4 size-10 text-blue-100" />
                        <div className="flex items-center gap-4 mb-6">
                          {testimonial.image ? (
                            <img src={testimonial.image} alt={testimonial.name} className="size-16 rounded-full object-cover ring-4 ring-blue-50 shadow-sm" />
                          ) : (
                            <div className="size-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-sm">
                              {testimonial.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-gray-900">{testimonial.name}</div>
                            <div className="text-sm text-blue-600 font-medium">{testimonial.role}</div>
                          </div>
                        </div>
                        <div className="flex gap-0.5 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`size-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 leading-relaxed italic">"{testimonial.quote}"</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest News & Updates</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Stay up to date with the latest happenings at MEGA-TECH
            </p>
          </AnimatedSection>

          {!posts ? <BlogGridSkeleton count={3} /> : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10" staggerDelay={0.12}>
              {latestPosts.map((post) => (
                <StaggerItem key={post.id}>
                  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105" />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm shadow-sm">{post.category}</Badge>
                        </div>
                      </div>
                      <CardHeader className="flex-1">
                        <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                      </CardHeader>
                      <CardFooter className="border-t pt-4">
                        <Button variant="link" className="px-0 text-blue-600 font-semibold" asChild>
                          <Link to={`/blog/${post.id}`}>
                            Read More
                            <ArrowRight className="ml-2 size-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          <AnimatedSection className="text-center" delay={0.3}>
            <Button variant="outline" size="lg" className="shadow-sm" asChild>
              <Link to="/blog">View All Posts</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {partners && partners.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Trusted by Leading Companies</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We collaborate with industry leaders to provide real-world experience and career opportunities
              </p>
            </AnimatedSection>
            <StaggerContainer className="flex flex-wrap justify-center items-center gap-6 md:gap-10" staggerDelay={0.08}>
              {partners.map((partner) => (
                <StaggerItem key={partner.id}>
                  <motion.div
                    whileHover={{ scale: 1.08, y: -2 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-center w-36 h-24 hover:shadow-md transition-all duration-300 border border-gray-100"
                  >
                    {partner.website ? (
                      <a href={partner.website} target="_blank" rel="noopener noreferrer">
                        <img src={partner.logo} alt={partner.name} className="max-w-full max-h-14 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
                      </a>
                    ) : (
                      <img src={partner.logo} alt={partner.name} className="max-w-full max-h-14 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
                    )}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      <section className="py-24 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Join MEGA-TECH today and take the first step towards your dream tech career
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg shadow-black/10 font-semibold px-8" asChild>
                <Link to="/register">Get Started Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm px-8" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
