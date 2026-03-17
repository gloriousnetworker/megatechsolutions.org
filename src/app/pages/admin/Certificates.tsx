import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { mockCourses } from '../../data/mockData';
import { Award, Download, CheckCircle, XCircle, ArrowUpCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '../../components/ui/dialog';
import { toast } from 'sonner';

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState([
    {
      id: '1',
      studentId: 'stu-001',
      studentName: 'Boluwatife Adebayo',
      courseId: 'course-001',
      courseName: 'React & Next.js Bootcamp',
      certificateNumber: 'MT-2026-99084',
      issueDate: '2026-01-10',
      status: 'valid' as const,
    },
    {
      id: '2',
      studentId: 'stu-002',
      studentName: 'Chinedu Okafor',
      courseId: 'course-002',
      courseName: 'Fullstack Web Development',
      certificateNumber: 'MT-2026-990845',
      issueDate: '2026-02-05',
      status: 'valid' as const,
    },
    {
      id: '3',
      studentId: 'stu-003',
      studentName: 'Amaka Nwosu',
      courseId: 'course-003',
      courseName: 'UI/UX Design Fundamentals',
      certificateNumber: 'MT-2026-990846',
      issueDate: '2026-03-01',
      status: 'revoked' as const,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<any>(null);
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
    if (!newCert.studentId || !newCert.studentName || !newCert.courseId) {
      toast.error("Please fill all fields");
      return;
    }
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

  const handleRevoke = (cert: any) => {
    setSelectedCert(cert);
    setConfirmOpen(true);
  };

  const confirmRevoke = () => {
    if (!selectedCert) return;
    setCertificates(certificates.map(cert =>
      cert.id === selectedCert.id ? { ...cert, status: 'revoked' as const } : cert
    ));
    toast.success('Certificate revoked successfully!');
    setSelectedCert(null);
    setConfirmOpen(false);
  };

  const handleRestore = (cert: any) => {
    setCertificates(certificates.map(c =>
      c.id === cert.id ? { ...c, status: 'valid' as const } : c
    ));
    toast.success('Certificate restored successfully!');
  };

  const handleDownload = (cert: any) => {
    toast.success(`Certificate ${cert.certificateNumber} downloaded!`);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">Certificate Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Issue and manage student certificates</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Award className="mr-2 size-4" /> Issue Certificate
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[95vw] sm:max-w-lg rounded-xl">
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
                <Select
                  value={newCert.courseId}
                  onValueChange={(value) => {
                    const course = mockCourses.find(c => c.id === value);
                    setNewCert({ ...newCert, courseId: value, courseName: course?.title || '' });
                  }}
                >
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

            <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)} className="w-full sm:w-auto">Cancel</Button>
              <Button onClick={handleIssueCertificate} className="w-full sm:w-auto">Issue Certificate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Issued</CardTitle>
            <Award className="size-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Valid</CardTitle>
            <CheckCircle className="size-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.filter(c => c.status === 'valid').length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revoked</CardTitle>
            <XCircle className="size-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.filter(c => c.status === 'revoked').length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Certificates List */}
      <Card className="overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold">All Certificates</h2>
            <div className="relative w-full sm:w-72">
              <Input
                placeholder="Search certificates..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredCertificates.map((cert) => (
              <div key={cert.id} className="border rounded-xl p-4">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                  {/* Info */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                      🎖️
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-base sm:text-lg">{cert.studentName}</h3>
                      <p className="text-sm text-gray-600">{cert.courseName}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-500">
                        <span>Certificate #{cert.certificateNumber}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Issued: {cert.issueDate}</span>
                        <Badge className={`ml-1 ${cert.status === 'valid' ? 'bg-green-600' : 'bg-red-600'}`}>
                          {cert.status === 'valid' ? 'Valid' : 'Revoked'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full xl:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto" onClick={() => handleDownload(cert)}>
                      <Download className="mr-2 size-4" /> Download
                    </Button>

                    {cert.status === 'valid' ? (
                      <Button variant="destructive" className="w-full sm:w-auto" onClick={() => handleRevoke(cert)}>
                        Revoke
                      </Button>
                    ) : (
                      <Button variant="secondary" className="w-full sm:w-auto" onClick={() => handleRestore(cert)}>
                        <ArrowUpCircle className="mr-2 size-4" /> Restore
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="w-[90vw] max-w-sm rounded-xl">
          <DialogHeader>
            <DialogTitle>Confirm Revoke</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke the certificate for <strong>{selectedCert?.studentName}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmRevoke}>Revoke</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}