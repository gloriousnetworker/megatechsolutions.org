import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { blogPosts } from "../data/mockData";

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id || "0"));

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

        <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-8"></div>

        <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
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

        <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
          <p className="text-gray-700 leading-relaxed mt-4">
            This article explores the latest developments and trends in {post.category.toLowerCase()}. 
            Our expert team at Mega-Tech Solutions continues to stay at the forefront of technology 
            education, ensuring our students learn the most relevant and in-demand skills.
          </p>
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
