import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Skeleton } from '../../components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/alert-dialog';
import { useApi } from '../../hooks/useApi';
import { api } from '../../utils/api';
import { ErrorState } from '../../components/ErrorState';
import { MessageSquareQuote, Plus, Edit, Loader2, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';
import type { Testimonial } from '../../types';

const defaultForm = { name: '', role: '', quote: '', image: '', rating: '5', order: '0' };

export default function AdminTestimonials() {
  const { data: testimonials, isLoading, error, retry } = useApi<Testimonial[]>(() => api.testimonials.list());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultForm);

  const handleCreate = () => {
    setEditId(null);
    setFormData(defaultForm);
    setDialogOpen(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditId(testimonial.id);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      quote: testimonial.quote,
      image: testimonial.image || '',
      rating: String(testimonial.rating),
      order: String(testimonial.order),
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        role: formData.role,
        quote: formData.quote,
        image: formData.image || undefined,
        rating: Number(formData.rating),
        order: Number(formData.order),
      };
      if (editId) {
        await api.testimonials.update(editId, payload);
        toast.success('Testimonial updated!');
      } else {
        await api.testimonials.create(payload);
        toast.success('Testimonial added!');
      }
      setDialogOpen(false);
      retry();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save testimonial');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Testimonials</h1>
          <p className="text-sm text-gray-600 mt-1">Manage testimonials shown on the homepage</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={handleCreate}>
          <Plus className="size-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {(!testimonials || testimonials.length === 0) ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <MessageSquareQuote className="size-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Testimonials Yet</h3>
            <p className="text-gray-600">Add your first testimonial to display them on the homepage.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col items-center p-4 gap-3">
              {testimonial.image && (
                <img src={testimonial.image} alt={testimonial.name} className="rounded-full size-16 object-cover" />
              )}
              <p className="text-sm font-medium text-center truncate w-full">{testimonial.name}</p>
              <p className="text-xs text-gray-500 text-center truncate w-full">{testimonial.role}</p>
              <p className="text-xs text-gray-600 text-center line-clamp-2 w-full">{testimonial.quote}</p>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`size-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <div className="flex gap-2 w-full">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(testimonial)}>
                  <Edit className="size-3 mr-1" /> Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm"><Trash2 className="size-3 text-red-500" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
                      <AlertDialogDescription>Remove "{testimonial.name}"'s testimonial? This cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={async () => { try { await api.testimonials.delete(testimonial.id); toast.success('Testimonial removed'); retry(); } catch (err: any) { toast.error(err.message || 'Failed to delete'); } }}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[95vw] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Full name" required />
            </div>
            <div>
              <Label>Role</Label>
              <Input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g., Web Development Graduate" required />
            </div>
            <div>
              <Label>Quote</Label>
              <Textarea value={formData.quote} onChange={(e) => setFormData({ ...formData, quote: e.target.value })} placeholder="Their testimonial..." rows={3} required />
            </div>
            <div>
              <Label>Image URL (optional)</Label>
              <Input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://example.com/photo.jpg" />
              {formData.image && (
                <div className="mt-2 p-2 bg-gray-50 rounded-lg flex items-center justify-center h-16">
                  <img src={formData.image} alt="preview" className="max-h-12 max-w-full object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}
            </div>
            <div>
              <Label>Rating</Label>
              <Input type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} />
            </div>
            <div>
              <Label>Display Order</Label>
              <Input type="number" min="0" value={formData.order} onChange={(e) => setFormData({ ...formData, order: e.target.value })} />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              {editId ? 'Save Changes' : 'Add Testimonial'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
