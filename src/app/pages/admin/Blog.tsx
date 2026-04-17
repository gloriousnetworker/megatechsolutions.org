import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { useApi } from '../../hooks/useApi';
import { api } from '../../utils/api';
import { ErrorState } from '../../components/ErrorState';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/alert-dialog';
import { Newspaper, Plus, Loader2, Calendar, User, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { BlogPost } from '../../types';

export default function AdminBlog() {
  const { data: posts, isLoading, error, retry } = useApi<BlogPost[]>(() => api.blog.list());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', excerpt: '', category: '', image: '', tags: '' });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.blog.create({ ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) });
      toast.success('Blog post created!');
      setDialogOpen(false);
      setFormData({ title: '', content: '', excerpt: '', category: '', image: '', tags: '' });
      retry();
    } catch (err: any) {
      toast.error(err.message || 'Failed to create post');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}</div>;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Blog Management</h1>
          <p className="text-sm text-gray-600 mt-1">Create and manage blog posts</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button><Plus className="size-4 mr-2" />New Post</Button></DialogTrigger>
          <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Create Blog Post</DialogTitle></DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div><Label>Title</Label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required /></div>
              <div><Label>Excerpt</Label><Input value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} required placeholder="Short summary" /></div>
              <div><Label>Content</Label><Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={6} required /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label>Category</Label><Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required placeholder="e.g., Tech Updates" /></div>
                <div><Label>Tags (comma-separated)</Label><Input value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="AI, Education" /></div>
              </div>
              <div><Label>Image URL</Label><Input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." /></div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}Publish Post
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {(posts || []).length === 0 ? (
        <Card><CardContent className="pt-6 text-center py-12"><Newspaper className="size-16 mx-auto text-gray-400 mb-4" /><h3 className="text-lg font-semibold mb-2">No Blog Posts Yet</h3></CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(posts || []).map((post) => (
            <Card key={post.id} className="flex flex-col">
              {post.image && <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded-t-xl" />}
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">{post.tags.map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><User className="size-3" />{post.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="size-3" />{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild><Button variant="ghost" size="sm"><Trash2 className="size-4 text-red-500" /></Button></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader><AlertDialogTitle>Delete Post</AlertDialogTitle><AlertDialogDescription>Delete "{post.title}"? This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={async () => { try { await api.blog.delete(post.id); toast.success('Post deleted'); retry(); } catch (err: any) { toast.error(err.message || 'Failed to delete'); } }}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
