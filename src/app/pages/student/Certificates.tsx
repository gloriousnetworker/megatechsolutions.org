import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Award, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

// MOCK DATA
const mockCertificates = [
  {
    id: 'MT-2026-99084',
    courseName: 'Web Development Bootcamp',
    issued_at: '2026-03-01T12:00:00Z',
  },
  {
    id: 'MT-2026-99085',
    courseName: 'Data Science & Analytics',
    issued_at: '2026-02-15T12:00:00Z',
  },
  {
    id: 'MT-2026-99086',
    courseName: 'React & TypeScript Mastery',
    issued_at: '2026-01-20T12:00:00Z',
  },
];

export default function StudentCertificates() {
  const { accessToken } = useAuth();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // USE MOCK DATA INSTEAD OF API
    setCertificates(mockCertificates);
    setLoading(false);
  }, [accessToken]);

  const handleDownload = (certificate: any) => {
    toast.success('Certificate download started');
  };

  const handleShare = (certificate: any) => {
    if (navigator.share) {
      navigator.share({
        title: `${certificate.courseName} Certificate`,
        text: `I've earned a certificate from MEGA-TECH Solutions!`,
        url: window.location.href,
      });
    } else {
      toast.success('Certificate link copied to clipboard');
    }
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
      <div>
        <h1 className="text-3xl font-bold">My Certificates</h1>
        <p className="text-gray-600 mt-2">View and download your earned certificates</p>
      </div>

      {certificates.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Award className="size-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
            <p className="text-gray-600 mb-4">Complete courses to earn certificates.</p>
            <Button asChild>
              <a href="/student/courses">View My Courses</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert: any) => (
            <Card
              key={cert.id}
              className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white flex flex-col"
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-amber-100 rounded-full">
                    <Award className="size-12 text-amber-600" />
                  </div>
                </div>
                <CardTitle className="text-xl truncate">{cert.courseName}</CardTitle>
                <p className="text-sm text-gray-600">Certificate of Completion</p>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Certificate ID</p>
                  <p className="font-mono font-bold text-lg truncate">{cert.id}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">Issued on</p>
                  <p className="font-medium">
                    {new Date(cert.issued_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={() => handleDownload(cert)}>
                    <Download className="size-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => handleShare(cert)}>
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