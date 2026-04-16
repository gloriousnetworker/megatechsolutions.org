import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { useApi } from '../../hooks/useApi';
import { api } from '../../utils/api';
import { ErrorState } from '../../components/ErrorState';
import { Upload, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { GalleryItem } from '../../types';

export default function AdminGallery() {
  const { data: gallery, isLoading, error, retry } = useApi<GalleryItem[]>(() => api.gallery.list());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'trainings', type: 'image', url: '' });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.gallery.add(formData);
      toast.success('Gallery item added!');
      setDialogOpen(false);
      setFormData({ title: '', category: 'trainings', type: 'image', url: '' });
      retry();
    } catch (err: any) {
      toast.error(err.message || 'Failed to add item');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.gallery.delete(id);
      toast.success('Item deleted');
      retry();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}</div>;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Gallery Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage photos and videos</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button><Upload className="size-4 mr-2" />Add Media</Button></DialogTrigger>
          <DialogContent className="w-[95vw] sm:max-w-lg">
            <DialogHeader><DialogTitle>Add Gallery Item</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div><Label>Title</Label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required /></div>
              <div><Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trainings">Trainings</SelectItem><SelectItem value="workshops">Workshops</SelectItem>
                    <SelectItem value="events">Events</SelectItem><SelectItem value="graduation">Graduation</SelectItem>
                    <SelectItem value="conferences">Conferences</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Media URL</Label><Input value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} required placeholder="https://..." /></div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}Add Item
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(gallery || []).map((item) => (
          <Card key={item.id} className="overflow-hidden group">
            <div className="relative">
              <img src={item.url} alt={item.title} className="w-full h-48 object-cover" />
              <Button variant="destructive" size="sm" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(item.id)}>
                <Trash2 className="size-4" />
              </Button>
            </div>
            <CardContent className="pt-4">
              <h3 className="font-semibold truncate">{item.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="secondary" className="capitalize">{item.category}</Badge>
                <span className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {(gallery || []).length === 0 && <div className="text-center py-12 text-gray-500">No gallery items yet</div>}
    </div>
  );
}
