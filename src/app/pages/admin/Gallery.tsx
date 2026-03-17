import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { mockGallery } from '../../data/mockData';
import { Image as ImageIcon, Video, Upload, Trash2, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { toast } from 'sonner';

export default function AdminGallery() {
  const [gallery, setGallery] = useState(mockGallery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    category: 'trainings' as const,
    type: 'image' as const,
    url: ''
  });

  const filteredGallery = selectedCategory === 'all' 
    ? gallery 
    : gallery.filter(item => item.category === selectedCategory);

  const handleUpload = () => {
    const item = {
      id: `${Date.now()}`,
      ...newItem,
      date: new Date().toISOString().split('T')[0]
    };
    
    setGallery([item, ...gallery]);
    toast.success('Gallery item uploaded successfully!');
    setDialogOpen(false);
    setNewItem({ title: '', category: 'trainings', type: 'image', url: '' });
  };

  const handleDelete = (id: string) => {
    setGallery(gallery.filter(item => item.id !== id));
    toast.success('Gallery item deleted successfully!');
  };

  return (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Gallery Management</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Upload and manage photos and videos
        </p>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto">
            <Upload className="mr-2 size-4" />
            Upload Media
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
            <DialogDescription>
              Add a new photo or video to the gallery
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newItem.title}
                onChange={(e) =>
                  setNewItem({ ...newItem, title: e.target.value })
                }
                placeholder="e.g., Web Development Workshop 2026"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={newItem.category}
                onValueChange={(value: any) =>
                  setNewItem({ ...newItem, category: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trainings">Trainings</SelectItem>
                  <SelectItem value="workshops">Workshops</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="graduation">Graduation</SelectItem>
                  <SelectItem value="conferences">Conferences</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={newItem.type}
                onValueChange={(value: any) =>
                  setNewItem({ ...newItem, type: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="url">Media URL</Label>
              <Input
                id="url"
                value={newItem.url}
                onChange={(e) =>
                  setNewItem({ ...newItem, url: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              className="w-full sm:w-auto"
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Media</CardTitle>
          <ImageIcon className="size-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">{gallery.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Images</CardTitle>
          <ImageIcon className="size-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">
            {gallery.filter((item) => item.type === "image").length}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Videos</CardTitle>
          <Video className="size-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold">
            {gallery.filter((item) => item.type === "video").length}
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Filter */}
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle>Gallery Items</CardTitle>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="size-4 shrink-0" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="trainings">Trainings</SelectItem>
                <SelectItem value="workshops">Workshops</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="graduation">Graduation</SelectItem>
                <SelectItem value="conferences">Conferences</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredGallery.map((item) => (
            <div key={item.id} className="relative group">
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="size-12 text-white drop-shadow-lg" />
                  </div>
                )}
              </div>

              <div className="mt-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="size-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);
}
