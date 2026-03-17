import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { BookOpen, Plus, Edit, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function StaffCourseManagement() {
  const { accessToken } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    level: 'beginner',
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await api.getCourses();
      setCourses(data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    try {
      await api.createCourse({
        ...formData,
        price: parseFloat(formData.price),
      }, accessToken);
      toast.success('Course created successfully!');
      setDialogOpen(false);
      setFormData({ title: '', description: '', price: '', duration: '', level: 'beginner' });
      fetchCourses();
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('Failed to create course');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

 
  return (
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
    
    {/* Header */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Course Management</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Create and manage your courses
        </p>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto">
            <Plus className="size-4 mr-2" />
            Create Course
          </Button>
        </DialogTrigger>

        {/* Responsive Dialog */}
        <DialogContent className="w-[95vw] sm:max-w-2xl rounded-xl">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              Add a new course to your teaching portfolio
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 8 weeks"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="level">Level</Label>
              <select
                id="level"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <Button type="submit" className="w-full">Create Course</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>

    {/* Empty State */}
    {courses.length === 0 ? (
      <Card>
        <CardContent className="pt-6 text-center py-12">
          <BookOpen className="size-14 sm:size-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Courses Yet</h3>
          <p className="text-sm sm:text-base text-gray-600">
            Create your first course to get started.
          </p>
        </CardContent>
      </Card>
    ) : (
      /* Courses Grid */
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course: any) => (
          <Card key={course.id} className="h-full flex flex-col">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {course.description}
                  </CardDescription>
                </div>

                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Edit className="size-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col flex-1 justify-between">
              
              {/* Course Info */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Price:</span> ${course.price || '0'}
                </div>
                <div>
                  <span className="font-medium">Duration:</span> {course.duration || 'N/A'}
                </div>
                <div>
                  <span className="font-medium">Level:</span>{' '}
                  <span className="capitalize">{course.level || 'N/A'}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Upload className="size-4 mr-2" />
                  Upload Materials
                </Button>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    )}
  </div>
);
}
