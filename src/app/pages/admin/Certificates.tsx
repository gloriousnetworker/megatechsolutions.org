import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { mockCertificates, mockCourses } from '../../data/mockData';
import { Award, Download, Search, CheckCircle, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { toast } from 'sonner';

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState(mockCertificates);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCert, setNewCert] = useState({
    studentId: '',
    studentName: '',
    courseId: '',
    courseName: ''
  });

  const filteredCertificates = certificates.filter(cert =>
    cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIssueCertificate = () => {
    const cert = {
      id: `${Date.now()}`,
      ...newCert,
      issueDate: new Date().toISOString().split('T')[0],
      certificateNumber: `MT-${new Date().getFullYear()}-${Math.floor(Math.random() * 900000 + 100000)}`,
      status: 'valid' as const
    };
    
    setCertificates([cert, ...certificates]);
    toast.success('Certificate issued successfully!');
    setDialogOpen(false);
    setNewCert({ studentId: '', studentName: '', courseId: '', courseName: '' });
  };

  const handleRevoke = (id: string) => {
    setCertificates(certificates.map(cert =>
      cert.id === id ? { ...cert, status: 'revoked' as const } : cert
    ));
    toast.success('Certificate revoked successfully!');
  };

  const handleRestore = (id: string) => {
    setCertificates(certificates.map(cert =>
      cert.id === id ? { ...cert, status: 'valid' as const } : cert
    ));
    toast.success('Certificate restored successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Certificate Management</h1>
          <p className="text-gray-600">Issue and manage student certificates</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Award className="mr-2 size-4" />
              Issue Certificate
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Issue New Certificate</DialogTitle>
              <DialogDescription>Award a certificate to a student</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={newCert.studentId}
                  onChange={(e) => setNewCert({ ...newCert, studentId: e.target.value })}
                  placeholder="student-123"
                />
              </div>
              <div>
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  value={newCert.studentName}
                  onChange={(e) => setNewCert({ ...newCert, studentName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="courseId">Course ID</Label>
                <Select value={newCert.courseId} onValueChange={(value) => {
                  const course = mockCourses.find(c => c.id === value);
                  setNewCert({ ...newCert, courseId: value, courseName: course?.title || '' });
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCourses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleIssueCertificate}>Issue Certificate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issued</CardTitle>
            <Award className="size-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valid</CardTitle>
            <CheckCircle className="size-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.filter(c => c.status === 'valid').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revoked</CardTitle>
            <XCircle className="size-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.filter(c => c.status === 'revoked').length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Certificates List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Certificates</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCertificates.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex items-center justify-center size-12 rounded-lg bg-blue-100">
                    <Award className="size-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{cert.studentName}</h3>
                    <p className="text-sm text-gray-600 mb-2">{cert.courseName}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>Certificate #{cert.certificateNumber}</span>
                      <span>•</span>
                      <span>Issued: {cert.issueDate}</span>
                      <span>•</span>
                      <Badge variant={cert.status === 'valid' ? 'default' : 'destructive'}>
                        {cert.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="size-4 mr-2" />
                    Download
                  </Button>
                  {cert.status === 'valid' ? (
                    <Button variant="destructive" size="sm" onClick={() => handleRevoke(cert.id)}>
                      Revoke
                    </Button>
                  ) : (
                    <Button variant="default" size="sm" onClick={() => handleRestore(cert.id)}>
                      Restore
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
