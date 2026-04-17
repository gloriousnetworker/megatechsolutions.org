import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Label } from '../../components/ui/label';
import { Skeleton } from '../../components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { useApi } from '../../hooks/useApi';
import { api } from '../../utils/api';
import { ErrorState } from '../../components/ErrorState';
import { Award, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Course } from '../../types';

export default function AdminCertificates() {
  const { data: courses, isLoading: loadingCourses } = useApi<Course[]>(() => api.courses.list());
  const { data: students, isLoading: loadingStudents, error, retry } = useApi<any[]>(() => api.students.list());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ studentId: '', courseId: '' });
  const [issuedCert, setIssuedCert] = useState<any>(null);

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const result = await api.certificates.issue(formData);
      setIssuedCert(result);
      toast.success(`Certificate issued: ${result.certificateNumber}`);
      setFormData({ studentId: '', courseId: '' });
    } catch (err: any) {
      toast.error(err.message || 'Failed to issue certificate');
    } finally {
      setSubmitting(false);
    }
  };

  const isLoading = loadingCourses || loadingStudents;
  if (isLoading) return <div className="space-y-4"><Skeleton className="h-10 w-48" /><Skeleton className="h-64 rounded-xl" /></div>;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Certificate Management</h1>
          <p className="text-sm text-gray-600 mt-1">Issue certificates to students who completed courses</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setIssuedCert(null); }}>
          <DialogTrigger asChild><Button><Award className="size-4 mr-2" />Issue Certificate</Button></DialogTrigger>
          <DialogContent className="w-[95vw] sm:max-w-lg">
            <DialogHeader><DialogTitle>Issue Certificate</DialogTitle></DialogHeader>
            {issuedCert ? (
              <div className="space-y-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <Award className="size-12 text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg">Certificate Issued!</h3>
                  <p className="font-mono text-xl mt-2">{issuedCert.certificateNumber}</p>
                  <p className="text-sm text-gray-600 mt-2">{issuedCert.studentName} - {issuedCert.courseName}</p>
                </div>
                <Button className="w-full" onClick={() => setIssuedCert(null)}>Issue Another</Button>
              </div>
            ) : (
              <form onSubmit={handleIssue} className="space-y-4">
                <div>
                  <Label>Student</Label>
                  <Select value={formData.studentId} onValueChange={(v) => setFormData({ ...formData, studentId: v })}>
                    <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
                    <SelectContent>{(students || []).map((s: any) => <SelectItem key={s.id} value={s.id}>{s.name} ({s.email})</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Course</Label>
                  <Select value={formData.courseId} onValueChange={(v) => setFormData({ ...formData, courseId: v })}>
                    <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                    <SelectContent>{(courses || []).map((c) => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={submitting || !formData.studentId || !formData.courseId}>
                  {submitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}Issue Certificate
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader><CardTitle>How It Works</CardTitle><CardDescription>Certificate issuance workflow</CardDescription></CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
              <h4 className="font-medium mb-1">Select Student</h4>
              <p className="text-sm text-gray-600">Choose a student who completed the course</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
              <h4 className="font-medium mb-1">Select Course</h4>
              <p className="text-sm text-gray-600">Pick the course they completed</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
              <h4 className="font-medium mb-1">Issue Certificate</h4>
              <p className="text-sm text-gray-600">A unique certificate number is generated</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
