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
import { Handshake, Plus, Edit, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Partner } from '../../types';

const defaultForm = { name: '', logo: '', website: '', order: '0' };

export default function AdminPartners() {
  const { data: partners, isLoading, error, retry } = useApi<Partner[]>(() => api.partners.list());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultForm);

  const handleCreate = () => {
    setEditId(null);
    setFormData(defaultForm);
    setDialogOpen(true);
  };

  const handleEdit = (partner: Partner) => {
    setEditId(partner.id);
    setFormData({
      name: partner.name,
      logo: partner.logo,
      website: partner.website || '',
      order: String(partner.order),
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        logo: formData.logo,
        website: formData.website || undefined,
        order: Number(formData.order),
      };
      if (editId) {
        await api.partners.update(editId, payload);
        toast.success('Partner updated!');
      } else {
        await api.partners.create(payload);
        toast.success('Partner added!');
      }
      setDialogOpen(false);
      retry();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save partner');
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
          <h1 className="text-2xl sm:text-3xl font-bold">Partners</h1>
          <p className="text-sm text-gray-600 mt-1">Manage partner companies shown on the homepage</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={handleCreate}>
          <Plus className="size-4 mr-2" />
          Add Partner
        </Button>
      </div>

      {(!partners || partners.length === 0) ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Handshake className="size-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Partners Yet</h3>
            <p className="text-gray-600">Add your first partner to display them on the homepage.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {partners.map((partner) => (
            <Card key={partner.id} className="flex flex-col items-center p-4 gap-3">
              <div className="w-full h-16 flex items-center justify-center bg-gray-50 rounded-lg">
                <img src={partner.logo} alt={partner.name} className="max-h-12 max-w-full object-contain" />
              </div>
              <p className="text-sm font-medium text-center truncate w-full">{partner.name}</p>
              {partner.website && (
                <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline truncate w-full text-center">
                  {partner.website.replace(/^https?:\/\//, '')}
                </a>
              )}
              <div className="flex gap-2 w-full">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(partner)}>
                  <Edit className="size-3 mr-1" /> Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm"><Trash2 className="size-3 text-red-500" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Partner</AlertDialogTitle>
                      <AlertDialogDescription>Remove "{partner.name}" from partners? This cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={async () => { try { await api.partners.delete(partner.id); toast.success('Partner removed'); retry(); } catch (err: any) { toast.error(err.message || 'Failed to delete'); } }}>Delete</AlertDialogAction>
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
            <DialogTitle>{editId ? 'Edit Partner' : 'Add Partner'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Partner Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Google" required />
            </div>
            <div>
              <Label>Logo URL</Label>
              <Input value={formData.logo} onChange={(e) => setFormData({ ...formData, logo: e.target.value })} placeholder="https://example.com/logo.png" required />
              {formData.logo && (
                <div className="mt-2 p-2 bg-gray-50 rounded-lg flex items-center justify-center h-16">
                  <img src={formData.logo} alt="preview" className="max-h-12 max-w-full object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}
            </div>
            <div>
              <Label>Website (optional)</Label>
              <Input value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="https://example.com" />
            </div>
            <div>
              <Label>Display Order</Label>
              <Input type="number" min="0" value={formData.order} onChange={(e) => setFormData({ ...formData, order: e.target.value })} />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              {editId ? 'Save Changes' : 'Add Partner'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
