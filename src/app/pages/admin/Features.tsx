import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Skeleton } from '../../components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/alert-dialog';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { useApi } from '../../hooks/useApi';
import { api } from '../../utils/api';
import { ErrorState } from '../../components/ErrorState';
import { Sparkles, Plus, Edit, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Feature } from '../../types';

const defaultForm = { title: '', description: '', icon: 'Star', order: '0' };

export default function AdminFeatures() {
  const { data: features, isLoading, error, retry } = useApi<Feature[]>(() => api.features.list());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultForm);

  const handleCreate = () => {
    setEditId(null);
    setFormData(defaultForm);
    setDialogOpen(true);
  };

  const handleEdit = (feature: Feature) => {
    setEditId(feature.id);
    setFormData({
      title: feature.title,
      description: feature.description,
      icon: feature.icon,
      order: String(feature.order),
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
        icon: formData.icon,
        order: Number(formData.order),
      };
      if (editId) {
        await api.features.update(editId, payload);
        toast.success('Feature updated!');
      } else {
        await api.features.create(payload);
        toast.success('Feature added!');
      }
      setDialogOpen(false);
      retry();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save feature');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Why Choose Mega-Tech</h1>
          <p className="text-sm text-gray-600 mt-1">Manage features shown in the "Why Choose Mega-Tech" section</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={handleCreate}>
          <Plus className="size-4 mr-2" />
          Add Feature
        </Button>
      </div>

      {(!features || features.length === 0) ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Sparkles className="size-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Features Yet</h3>
            <p className="text-gray-600">Add your first feature to display in the "Why Choose Mega-Tech" section.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Card key={feature.id} className="flex flex-col p-4 gap-3">
              <Badge variant="secondary" className="w-fit">{feature.icon}</Badge>
              <p className="text-sm font-medium">{feature.title}</p>
              <p className="text-xs text-gray-600 line-clamp-2">{feature.description}</p>
              <div className="flex gap-2 w-full mt-auto">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(feature)}>
                  <Edit className="size-3 mr-1" /> Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm"><Trash2 className="size-3 text-red-500" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Feature</AlertDialogTitle>
                      <AlertDialogDescription>Remove "{feature.title}" from features? This cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={async () => { try { await api.features.delete(feature.id); toast.success('Feature removed'); retry(); } catch (err: any) { toast.error(err.message || 'Failed to delete'); } }}>Delete</AlertDialogAction>
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
            <DialogTitle>{editId ? 'Edit Feature' : 'Add Feature'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g., Expert Instructors" required />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe this feature..." rows={3} required />
            </div>
            <div>
              <Label>Icon Name</Label>
              <Input value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} placeholder="e.g., GraduationCap, Code, Briefcase, Clock, Award, Users" required />
            </div>
            <div>
              <Label>Display Order</Label>
              <Input type="number" min="0" value={formData.order} onChange={(e) => setFormData({ ...formData, order: e.target.value })} />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              {editId ? 'Save Changes' : 'Add Feature'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
