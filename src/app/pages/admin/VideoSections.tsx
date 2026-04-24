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
import { Video, Plus, Edit, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { VideoSectionItem } from '../../types';

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/);
  return match ? match[1] : null;
}

const defaultForm = { youtubeUrl: '', title: '', description: '', active: true };

export default function AdminVideoSections() {
  const { data: videoSections, isLoading, error, retry } = useApi<VideoSectionItem[]>(() => api.videoSections.listAll());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultForm);

  const handleCreate = () => {
    setEditId(null);
    setFormData(defaultForm);
    setDialogOpen(true);
  };

  const handleEdit = (video: VideoSectionItem) => {
    setEditId(video.id);
    setFormData({
      youtubeUrl: video.youtubeUrl,
      title: video.title || '',
      description: video.description || '',
      active: video.active,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        youtubeUrl: formData.youtubeUrl,
        title: formData.title || undefined,
        description: formData.description || undefined,
        active: formData.active,
      };
      if (editId) {
        await api.videoSections.update(editId, payload);
        toast.success('Video updated!');
      } else {
        await api.videoSections.create(payload);
        toast.success('Video added!');
      }
      setDialogOpen(false);
      retry();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save video');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Video Sections</h1>
          <p className="text-sm text-gray-600 mt-1">Manage video content displayed on the site</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={handleCreate}>
          <Plus className="size-4 mr-2" />
          Add Video
        </Button>
      </div>

      {(!videoSections || videoSections.length === 0) ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Video className="size-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Videos Yet</h3>
            <p className="text-gray-600">Add your first video to display it on the site.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videoSections.map((video) => {
            const videoId = getYouTubeId(video.youtubeUrl);
            return (
              <Card key={video.id} className="flex flex-col overflow-hidden">
                {videoId && (
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt={video.title || 'Video thumbnail'}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-2">
                    {video.title && <p className="font-medium truncate">{video.title}</p>}
                    <Badge variant={video.active ? 'default' : 'secondary'} className={video.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
                      {video.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  {video.description && <p className="text-sm text-gray-600 truncate">{video.description}</p>}
                  <div className="flex gap-2 mt-auto pt-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(video)}>
                      <Edit className="size-3 mr-1" /> Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm"><Trash2 className="size-3 text-red-500" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Video</AlertDialogTitle>
                          <AlertDialogDescription>Remove this video? This cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={async () => { try { await api.videoSections.delete(video.id); toast.success('Video removed'); retry(); } catch (err: any) { toast.error(err.message || 'Failed to delete'); } }}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[95vw] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? 'Edit Video' : 'Add Video'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>YouTube URL</Label>
              <Input value={formData.youtubeUrl} onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })} placeholder="https://www.youtube.com/watch?v=..." required />
            </div>
            <div>
              <Label>Title</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea rows={2} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="active" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} />
              <Label htmlFor="active">Active</Label>
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              {editId ? 'Save Changes' : 'Add Video'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
