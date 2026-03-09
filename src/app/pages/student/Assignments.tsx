import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { FileText, Upload, CheckCircle, Clock, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function StudentAssignments() {
  const { accessToken } = useAuth();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    courseId: '',
    description: '',
    fileUrl: '',
  });

  useEffect(() => {
    fetchAssignments();
  }, [accessToken]);

  const fetchAssignments = async () => {
    if (!accessToken) return;
    
    try {
      const data = await api.getMyAssignments(accessToken);
      setAssignments(data.assignments || []);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      toast.error('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    try {
      await api.submitAssignment(formData, accessToken);
      toast.success('Assignment submitted successfully!');
      setDialogOpen(false);
      setFormData({ title: '', courseId: '', description: '', fileUrl: '' });
      fetchAssignments();
    } catch (error) {
      console.error('Error submitting assignment:', error);
      toast.error('Failed to submit assignment');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: any = {
      submitted: { variant: 'default', icon: Clock, label: 'Pending Review' },
      approved: { variant: 'default', icon: CheckCircle, label: 'Approved' },
      rejected: { variant: 'destructive', icon: XCircle, label: 'Needs Revision' },
    };

    const config = variants[status] || variants.submitted;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="size-3" />
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-gray-600 mt-2">Submit and track your assignments</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="size-4 mr-2" />
              Submit Assignment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Assignment</DialogTitle>
              <DialogDescription>
                Upload your completed assignment for review
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Assignment Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="courseId">Course ID</Label>
                <Input
                  id="courseId"
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="fileUrl">File URL</Label>
                <Input
                  id="fileUrl"
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <Button type="submit" className="w-full">Submit Assignment</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {assignments.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <FileText className="size-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Assignments Yet</h3>
            <p className="text-gray-600">Your submitted assignments will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {assignments.map((assignment: any) => (
            <Card key={assignment.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{assignment.title}</CardTitle>
                    <CardDescription>
                      Submitted on {new Date(assignment.submitted_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  {getStatusBadge(assignment.status)}
                </div>
              </CardHeader>
              <CardContent>
                {assignment.description && (
                  <p className="text-gray-600 mb-4">{assignment.description}</p>
                )}
                {assignment.fileUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={assignment.fileUrl} target="_blank" rel="noopener noreferrer">
                      View Submission
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
