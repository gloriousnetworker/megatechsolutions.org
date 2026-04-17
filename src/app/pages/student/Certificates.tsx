import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import { useApi } from '../../hooks/useApi';
import { api } from '../../utils/api';
import { ErrorState } from '../../components/ErrorState';
import { Award, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import type { Certificate } from '../../types';

export default function StudentCertificates() {
  const { data: certificates, isLoading, error, retry } = useApi<Certificate[]>(() => api.certificates.my());

  const handleDownload = (cert: Certificate) => {
    toast.success('Certificate download started');
  };

  const handleShare = (cert: Certificate) => {
    if (navigator.share) {
      navigator.share({
        title: `${cert.courseName} Certificate`,
        text: `I've earned a certificate from MEGA-TECH Solutions!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/verify-certificate?id=${cert.certificateNumber}`);
      toast.success('Certificate link copied to clipboard');
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-72 rounded-xl" />)}
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">My Certificates</h1>
        <p className="text-gray-600 mt-2">View and download your earned certificates</p>
      </div>

      {(certificates || []).length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Award className="size-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
            <p className="text-gray-600 mb-4">Complete courses to earn certificates.</p>
            <Button asChild><Link to="/student/courses">View My Courses</Link></Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(certificates || []).map((cert) => (
            <Card key={cert.id} className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white flex flex-col">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-amber-100 rounded-full">
                    <Award className="size-12 text-amber-600" />
                  </div>
                </div>
                <CardTitle className="text-lg sm:text-xl truncate">{cert.courseName}</CardTitle>
                <p className="text-sm text-gray-600">Certificate of Completion</p>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Certificate ID</p>
                  <p className="font-mono font-bold text-base sm:text-lg truncate">{cert.certificateNumber}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Issued on</p>
                  <p className="font-medium">
                    {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" size="sm" onClick={() => handleDownload(cert)}>
                    <Download className="size-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm" onClick={() => handleShare(cert)}>
                    <Share2 className="size-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
