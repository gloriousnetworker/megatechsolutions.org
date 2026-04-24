import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Skeleton } from '../../components/ui/skeleton';
import { useApi } from '../../hooks/useApi';
import { api } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { ErrorState } from '../../components/ErrorState';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/alert-dialog';
import { BookOpen, Plus, Edit, Loader2, Star, Users, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Course } from '../../types';

const defaultForm = { title: '', description: '', price: '', duration: '', level: 'Beginner', category: '', image: '' };

export default function StaffCourseManagement() {
  const { user } = useAuth();
  const { data: courses, isLoading, error, retry } = useApi<Course[]>(() => api.courses.list());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultForm);

  const myCourses = (courses || []).filter(c =>
    user?.role === 'admin' || c.instructorId === user?.id
  );

  const handleCreate = () => {
    setEditId(null);
    setFormData(defaultForm);
    setDialogOpen(true);
  };

  const handleEdit = (course: Course) => {
    setEditId(course.id);
    setFormData({
      title: course.title,
      description: course.description,
      price: String(course.price),
      duration: course.duration,
      level: course.level,
      category: course.category,
      image: course.image || '',
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        duration: formData.duration,
        level: formData.level,
        category: formData.category,
        image: formData.image,
      };

      if (editId) {
        await api.courses.update(editId, payload);
        toast.success('Course updated!');
      } else {
        await api.courses.create(payload);
        toast.success('Course created!');
      }
      setDialogOpen(false);
      retry();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save course');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Course Management</h1>
          <p className="text-sm text-gray-600 mt-1">Create and manage your courses</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={handleCreate}>
          <Plus className="size-4 mr-2" />
          Create Course
        </Button>
      </div>

      {myCourses.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <BookOpen className="size-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Courses Yet</h3>
            <p className="text-gray-600">Create your first course to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {myCourses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              {course.image && (
                <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-t-xl" />
              )}
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{course.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{course.description}</CardDescription>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {user?.role === 'admin' && (
                      <Button
                        variant={course.isFeatured ? "default" : "outline"}
                        size="sm"
                        className={course.isFeatured ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""}
                        onClick={async () => {
                          try {
                            await api.courses.update(course.id, { isFeatured: !course.isFeatured });
                            toast.success(course.isFeatured ? 'Removed from featured' : 'Set as featured');
                            retry();
                          } catch (err: any) { toast.error(err.message || 'Failed to update'); }
                        }}
                      >
                        <Star className={`size-4 ${course.isFeatured ? 'fill-white' : ''}`} />
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleEdit(course)}>
                      <Edit className="size-4 mr-1" /> Edit
                    </Button>
                    {user?.role === 'admin' && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm"><Trash2 className="size-4 text-red-500" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader><AlertDialogTitle>Delete Course</AlertDialogTitle><AlertDialogDescription>Delete "{course.title}"? This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={async () => { try { await api.courses.delete(course.id); toast.success('Course deleted'); retry(); } catch (err: any) { toast.error(err.message || 'Failed to delete'); } }}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <Badge variant="secondary">{course.level}</Badge>
                  <span className="flex items-center gap-1"><Star className="size-3 fill-yellow-400 text-yellow-400" />{course.rating}</span>
                  <span className="flex items-center gap-1"><Users className="size-3" />{course.enrolledStudents}</span>
                  <span>&#8358;{(course.price / 1000).toFixed(0)}k</span>
                  <span>{course.duration}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[95vw] sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editId ? 'Edit Course' : 'Create New Course'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Course Title</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Price (&#8358;)</Label>
                <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
              </div>
              <div>
                <Label>Duration</Label>
                <Input placeholder="e.g., 12 weeks" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Level</Label>
                <Select value={formData.level} onValueChange={(v) => setFormData({ ...formData, level: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Category</Label>
                <Input placeholder="e.g., Web Development" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
              </div>
            </div>
            <div>
              <Label>Image URL</Label>
              <Input placeholder="https://..." value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              {editId ? 'Save Changes' : 'Create Course'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
