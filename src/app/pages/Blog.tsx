import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useApi } from '../hooks/useApi';
import { api } from '../utils/api';
import { BlogGridSkeleton } from '../components/skeletons/BlogCardSkeleton';
import { ErrorState } from '../components/ErrorState';
import { Calendar, User, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../types';

export default function Blog() {
  const { data: posts, isLoading, error, retry } = useApi<BlogPost[]>(() => api.blog.list());

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & News</h1>
          <p className="text-xl text-blue-50 max-w-3xl">
            Stay updated with the latest tech trends, announcements, and insights from our experts
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading && <BlogGridSkeleton count={6} />}
          {error && <ErrorState message={error} onRetry={retry} />}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(posts || []).map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow flex flex-col">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <User className="size-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="link" className="px-0" asChild>
                      <Link to={`/blog/${post.id}`}>
                        Read More
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          {!isLoading && !error && (posts || []).length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blog posts yet</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
