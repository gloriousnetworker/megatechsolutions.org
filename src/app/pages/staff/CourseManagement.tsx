import { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { BookOpen, Plus, Edit, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function StaffCourseManagement() {
  // Mock token & user
  const accessToken = 'mock-token';
  const user = { id: 1, role: 'staff', name: 'Boluwatife' };

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    level: 'beginner',
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Mock fetching courses
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          title: 'React Basics',
          description: 'Learn the fundamentals of React',
          price: 49.99,
          duration: '4 weeks',
          level: 'beginner',
          materials: [],
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  // Create Course
  const handleCreateClick = () => {
    if (!accessToken || user.role !== 'staff') {
      toast.error('Only staff can create courses');
      return;
    }
    setFormData({ title: '', description: '', price: '', duration: '', level: 'beginner' });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse = {
      id: courses.length + 1,
      ...formData,
      materials: [],
    };
    setCourses([...courses, newCourse]);
    toast.success('Course created successfully!');
    setDialogOpen(false);
  };

  // Edit Course
  const handleEditClick = (course: any) => {
    setCurrentCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      duration: course.duration,
      level: course.level,
    });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCourses((prev) =>
      prev.map((c) =>
        c.id === currentCourse.id ? { ...c, ...formData } : c
      )
    );
    toast.success('Course updated successfully!');
    setEditDialogOpen(false);
  };

  // Upload Files
  const handleUploadClick = (course: any) => {
    setCurrentCourse(course);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files).map((f) => f.name);

    setCourses((prev) =>
      prev.map((c) =>
        c.id === currentCourse.id ? { ...c, materials: filesArray } : c
      )
    );

    toast.success('Materials uploaded!');
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

        <Button className="w-full sm:w-auto" onClick={handleCreateClick}>
          <Plus className="size-4 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Courses Grid */}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription className="text-sm">{course.description}</CardDescription>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditClick(course)}>
                      <Edit className="size-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleUploadClick(course)}>
                      <Upload className="size-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col flex-1 justify-between">
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
                  <div>
                    <span className="font-medium">Materials:</span>{' '}
                    {course.materials?.length > 0 ? course.materials.join(', ') : 'None'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        multiple
        onChange={handleFileChange}
      />

      {/* Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[95vw] sm:max-w-2xl rounded-xl">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />

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

            <Button type="submit" className="w-full">
              Create Course
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="w-[95vw] sm:max-w-2xl rounded-xl">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4">
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />

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

            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}