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
import { Megaphone, Plus, Edit, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Banner } from '../../types';

const defaultForm = { text: '', image: '', bgColor: '#1d4ed8', textColor: '#ffffff', link: '', startTime: '', endTime: '', active: true, order: '0' };

export default function AdminBanners() {
  const { data: banners, isLoading, error, retry } = useApi<Banner[]>(() => api.banners.list());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultForm);

  const handleCreate = () => {
    setEditId(null);
    setFormData(defaultForm);
    setDialogOpen(true);
  };

  const handleEdit = (banner: Banner) => {
    setEditId(banner.id);
    setFormData({
      text: banner.text,
      image: banner.image || '',
      bgColor: banner.bgColor,
      textColor: banner.textColor,
      link: banner.link || '',
      startTime: banner.startTime || '',
      endTime: banner.endTime || '',
      active: banner.active,
      order: String(banner.order),
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        text: formData.text,
        image: formData.image || undefined,
        bgColor: formData.bgColor,
        textColor: formData.textColor,
        link: formData.link || undefined,
        startTime: formData.startTime || undefined,
        endTime: formData.endTime || undefined,
        active: formData.active,
        order: Number(formData.order),
      };
      if (editId) {
        await api.banners.update(editId, payload);
        toast.success('Banner updated!');
      } else {
        await api.banners.create(payload);
        toast.success('Banner added!');
      }
      setDialogOpen(false);
      retry();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save banner');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Banners</h1>
          <p className="text-sm text-gray-600 mt-1">Manage headline banners displayed on the site</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={handleCreate}>
          <Plus className="size-4 mr-2" />
          Add Banner
        </Button>
      </div>

      {(!banners || banners.length === 0) ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Megaphone className="size-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Banners Yet</h3>
            <p className="text-gray-600">Add your first banner to display it on the site.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {banners.map((banner) => (
            <Card key={banner.id} className="overflow-hidden">
              <div
                className="h-12 rounded-t-xl overflow-hidden flex items-center px-4 text-sm truncate"
                style={{ backgroundColor: banner.bgColor, color: banner.textColor }}
              >
                {banner.text}
              </div>
              <CardContent className="pt-3 pb-4 px-4 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {(banner.startTime || banner.endTime) && (
                    <span className="text-xs text-gray-500">
                      {banner.startTime || '00:00'} - {banner.endTime || '23:59'} GMT
                    </span>
                  )}
                  <Badge className={banner.active ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}>
                    {banner.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(banner)}>
                    <Edit className="size-3 mr-1" /> Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm"><Trash2 className="size-3 text-red-500" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Banner</AlertDialogTitle>
                        <AlertDialogDescription>Remove this banner? This cannot be undone.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={async () => { try { await api.banners.delete(banner.id); toast.success('Banner removed'); retry(); } catch (err: any) { toast.error(err.message || 'Failed to delete'); } }}>Delete</AlertDialogAction>
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
        <DialogContent className="w-[95vw] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? 'Edit Banner' : 'Add Banner'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Banner Text</Label>
              <Textarea rows={2} value={formData.text} onChange={(e) => setFormData({ ...formData, text: e.target.value })} placeholder="Enter banner text..." required />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://example.com/image.png" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Background Color</Label>
                <Input type="color" value={formData.bgColor} onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })} />
              </div>
              <div>
                <Label>Text Color</Label>
                <Input type="color" value={formData.textColor} onChange={(e) => setFormData({ ...formData, textColor: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Link URL</Label>
              <Input value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} placeholder="https://example.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Time (GMT 24hr)</Label>
                <Input type="time" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} />
              </div>
              <div>
                <Label>End Time (GMT 24hr)</Label>
                <Input type="time" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label>Active</Label>
            </div>
            <div>
              <Label>Display Order</Label>
              <Input type="number" min="0" value={formData.order} onChange={(e) => setFormData({ ...formData, order: e.target.value })} />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              {editId ? 'Save Changes' : 'Add Banner'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
