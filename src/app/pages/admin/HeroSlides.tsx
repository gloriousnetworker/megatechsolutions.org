import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/alert-dialog';
import { useApi } from '../../hooks/useApi';
import { api } from '../../utils/api';
import { ErrorState } from '../../components/ErrorState';
import { Layers, Plus, Edit, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { HeroSlide } from '../../types';

const defaultForm = {
  title: '',
  subtitle: '',
  buttonText: 'Explore Courses',
  buttonLink: '/courses',
  bgImage: '',
  bgColor: '#1d4ed8',
  textColor: '#ffffff',
  duration: '6',
  order: '0',
  active: true,
};

export default function AdminHeroSlides() {
  const { data: slides, isLoading, error, retry } = useApi<HeroSlide[]>(() => api.heroSlides.listAll());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultForm);

  const handleCreate = () => {
    setEditId(null);
    setFormData(defaultForm);
    setDialogOpen(true);
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditId(slide.id);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink,
      bgImage: slide.bgImage || '',
      bgColor: slide.bgColor,
      textColor: slide.textColor,
      duration: String(slide.duration / 1000),
      order: String(slide.order),
      active: slide.active,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        subtitle: formData.subtitle,
        buttonText: formData.buttonText,
        buttonLink: formData.buttonLink,
        bgImage: formData.bgImage || undefined,
        bgColor: formData.bgColor,
        textColor: formData.textColor,
        duration: Number(formData.duration) * 1000,
        order: Number(formData.order),
        active: formData.active,
      };
      if (editId) {
        await api.heroSlides.update(editId, payload);
        toast.success('Hero slide updated!');
      } else {
        await api.heroSlides.create(payload);
        toast.success('Hero slide added!');
      }
      setDialogOpen(false);
      retry();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save hero slide');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-56 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Hero Slides</h1>
          <p className="text-sm text-gray-600 mt-1">Manage hero banner slides on the homepage</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={handleCreate}>
          <Plus className="size-4 mr-2" />
          Add Slide
        </Button>
      </div>

      {(!slides || slides.length === 0) ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Layers className="size-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Hero Slides Yet</h3>
            <p className="text-gray-600">Add your first hero slide to display on the homepage.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {slides.map((slide) => (
            <Card key={slide.id} className="overflow-hidden">
              <div
                className="h-32 rounded-t-xl relative flex flex-col justify-center px-6"
                style={{
                  backgroundColor: slide.bgColor,
                  ...(slide.bgImage ? { backgroundImage: `url(${slide.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}),
                }}
              >
                <p className="text-lg font-bold truncate" style={{ color: slide.textColor }}>{slide.title}</p>
                <p className="text-sm truncate mt-1 opacity-80" style={{ color: slide.textColor }}>{slide.subtitle}</p>
              </div>
              <CardContent className="pt-4 pb-4 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary">{slide.buttonText}</Badge>
                  <Badge variant="outline">{Number(slide.duration) / 1000}s</Badge>
                  <Badge variant={slide.active ? 'default' : 'destructive'}>
                    {slide.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(slide)}>
                    <Edit className="size-3 mr-1" /> Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm"><Trash2 className="size-3 text-red-500" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Slide</AlertDialogTitle>
                        <AlertDialogDescription>Remove "{slide.title}" from hero slides? This cannot be undone.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={async () => { try { await api.heroSlides.delete(slide.id); toast.success('Slide removed'); retry(); } catch (err: any) { toast.error(err.message || 'Failed to delete'); } }}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[95vw] sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editId ? 'Edit Hero Slide' : 'Add Hero Slide'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g., Welcome to MegaTech" required />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Textarea rows={2} value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} placeholder="A brief description for the slide" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Button Text</Label>
                <Input value={formData.buttonText} onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })} placeholder="Explore Courses" />
              </div>
              <div>
                <Label>Button Link</Label>
                <Input value={formData.buttonLink} onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })} placeholder="/courses" />
              </div>
            </div>
            <div>
              <Label>Background Image URL</Label>
              <Input value={formData.bgImage} onChange={(e) => setFormData({ ...formData, bgImage: e.target.value })} placeholder="https://example.com/image.jpg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Background Color</Label>
                <Input type="color" value={formData.bgColor} onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })} />
              </div>
              <div>
                <Label>Text Color</Label>
                <Input type="color" value={formData.textColor} onChange={(e) => setFormData({ ...formData, textColor: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Slide Duration (seconds)</Label>
                <Input type="number" min="1" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
              </div>
              <div>
                <Label>Display Order</Label>
                <Input type="number" min="0" value={formData.order} onChange={(e) => setFormData({ ...formData, order: e.target.value })} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="slide-active" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} className="size-4 rounded border-gray-300" />
              <Label htmlFor="slide-active">Active</Label>
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              {editId ? 'Save Changes' : 'Add Slide'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
