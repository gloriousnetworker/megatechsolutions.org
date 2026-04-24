import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Skeleton } from '../../components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/alert-dialog';
import { useApi } from '../../hooks/useApi';
import { api } from '../../utils/api';
import { ErrorState } from '../../components/ErrorState';
import { BarChart3, Plus, Edit, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { SiteStat } from '../../types';

const defaultForm = { value: '', suffix: '+', label: '', order: '0' };

export default function AdminSiteStats() {
  const { data: siteStats, isLoading, error, retry } = useApi<SiteStat[]>(() => api.siteStats.list());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultForm);

  const handleCreate = () => {
    setEditId(null);
    setFormData(defaultForm);
    setDialogOpen(true);
  };

  const handleEdit = (stat: SiteStat) => {
    setEditId(stat.id);
    setFormData({
      value: String(stat.value),
      suffix: stat.suffix,
      label: stat.label,
      order: String(stat.order),
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        value: Number(formData.value),
        suffix: formData.suffix,
        label: formData.label,
        order: Number(formData.order),
      };
      if (editId) {
        await api.siteStats.update(editId, payload);
        toast.success('Stat updated!');
      } else {
        await api.siteStats.create(payload);
        toast.success('Stat added!');
      }
      setDialogOpen(false);
      retry();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save stat');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
          <h1 className="text-2xl sm:text-3xl font-bold">Site Stats</h1>
          <p className="text-sm text-gray-600 mt-1">Manage statistics displayed on the homepage</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={handleCreate}>
          <Plus className="size-4 mr-2" />
          Add Stat
        </Button>
      </div>

      {(!siteStats || siteStats.length === 0) ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <BarChart3 className="size-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Stats Yet</h3>
            <p className="text-gray-600">Add your first stat to display it on the homepage.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {siteStats.map((stat) => (
            <Card key={stat.id} className="flex flex-col items-center p-4 gap-3">
              <span className="text-2xl font-bold text-blue-600">{stat.value}{stat.suffix}</span>
              <span className="text-sm text-gray-600">{stat.label}</span>
              <div className="flex gap-2 w-full">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(stat)}>
                  <Edit className="size-3 mr-1" /> Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm"><Trash2 className="size-3 text-red-500" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Stat</AlertDialogTitle>
                      <AlertDialogDescription>Remove "{stat.label}" from site stats? This cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={async () => { try { await api.siteStats.delete(stat.id); toast.success('Stat removed'); retry(); } catch (err: any) { toast.error(err.message || 'Failed to delete'); } }}>Delete</AlertDialogAction>
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
            <DialogTitle>{editId ? 'Edit Stat' : 'Add Stat'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Label</Label>
              <Input value={formData.label} onChange={(e) => setFormData({ ...formData, label: e.target.value })} placeholder="e.g., Students Trained" required />
            </div>
            <div>
              <Label>Value</Label>
              <Input type="number" min="0" value={formData.value} onChange={(e) => setFormData({ ...formData, value: e.target.value })} required />
            </div>
            <div>
              <Label>Suffix</Label>
              <Input value={formData.suffix} onChange={(e) => setFormData({ ...formData, suffix: e.target.value })} placeholder="e.g., +, %, k" />
            </div>
            <div>
              <Label>Display Order</Label>
              <Input type="number" min="0" value={formData.order} onChange={(e) => setFormData({ ...formData, order: e.target.value })} />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              {editId ? 'Save Changes' : 'Add Stat'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
