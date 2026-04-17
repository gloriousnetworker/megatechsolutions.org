import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, User, Loader2 } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { api } from "../utils/api";
import { ErrorState } from "../components/ErrorState";
import type { BlogPost as BlogPostType } from "../types";

export default function BlogPost() {
  const { id } = useParams();
  const { data: posts, isLoading, error, retry } = useApi<BlogPostType[]>(() => api.blog.list());

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={retry} />;
  }

  const post = (posts || []).find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-blue-600 hover:text-blue-700">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {post.image ? (
          <img src={post.image} alt={post.title} className="w-full aspect-video object-cover rounded-2xl mb-8" />
        ) : (
          <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-8" />
        )}

        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {post.author}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            {post.category}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
        </div>

        <div className="mt-8 pt-8 border-t">
          <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
