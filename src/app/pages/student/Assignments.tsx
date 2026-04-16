import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { useApi } from '../../hooks/useApi';
import { api } from '../../utils/api';
import { ErrorState } from '../../components/ErrorState';
import { FileText, Upload, CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Assignment, Enrollment } from '../../types';

export default function StudentAssignments() {
  const { data: assignments, isLoading, error, retry } = useApi<Assignment[]>(() => api.assignments.my());
  const { data: enrollments } = useApi<Enrollment[]>(() => api.enrollments.my());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: '', courseId: '', description: '', fileUrl: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.assignments.submit(formData);
      toast.success('Assignment submitted!');
      setDialogOpen(false);
      setFormData({ title: '', courseId: '', description: '', fileUrl: '' });
      retry();
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit assignment');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'destructive' | 'secondary'; icon: typeof Clock; label: string }> = {
      pending: { variant: 'secondary', icon: Clock, label: 'Pending' },
      submitted: { variant: 'default', icon: Clock, label: 'Submitted' },
      graded: { variant: 'default', icon: CheckCircle, label: 'Graded' },
    };
    const config = variants[status] || variants.pending;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="size-3" />
        {config.label}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Assignments</h1>
          <p className="text-gray-600 mt-2">Submit and track your assignments</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" size="sm">
              <Upload className="size-4" />
              Submit Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Submit Assignment</DialogTitle>
              <DialogDescription>Upload your completed assignment for review</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Assignment Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="courseId">Course</Label>
                <Select value={formData.courseId} onValueChange={(v) => setFormData({ ...formData, courseId: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {(enrollments || []).map((e) => (
                      <SelectItem key={e.courseId} value={e.courseId}>{e.course?.title || e.courseId}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} />
              </div>
              <div>
                <Label htmlFor="fileUrl">File URL</Label>
                <Input id="fileUrl" value={formData.fileUrl} onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })} placeholder="https://..." />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
                Submit Assignment
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {(assignments || []).length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <FileText className="size-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Assignments Yet</h3>
            <p className="text-gray-600">Your submitted assignments will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {(assignments || []).map((assignment) => (
            <Card key={assignment.id}>
              <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <CardTitle className="text-base md:text-lg">{assignment.title}</CardTitle>
                  <CardDescription>
                    {assignment.course?.title}
                    {assignment.submittedDate && ` \u00B7 Submitted ${new Date(assignment.submittedDate).toLocaleDateString()}`}
                  </CardDescription>
                </div>
                {getStatusBadge(assignment.status)}
              </CardHeader>
              <CardContent>
                {assignment.description && <p className="text-gray-600 mb-4 text-sm">{assignment.description}</p>}
                {assignment.grade !== null && assignment.grade !== undefined && (
                  <p className="text-sm font-medium">Grade: <span className="text-blue-600">{assignment.grade}%</span></p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
