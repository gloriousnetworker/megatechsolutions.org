import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { mockCertificates } from '../data/mockData';
import { Search, CheckCircle, XCircle, Award } from 'lucide-react';

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState('');
  const [result, setResult] = useState<typeof mockCertificates[0] | null | 'not-found'>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const certificate = mockCertificates.find(c => c.certificateNumber === certificateId);
    setResult(certificate || 'not-found');
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Verify Certificate</h1>
          <p className="text-xl text-blue-50 max-w-3xl">
            Enter a certificate ID to verify its authenticity
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Verification Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Certificate Verification</CardTitle>
              <CardDescription>
                Enter the certificate number to verify its authenticity and view details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <Label htmlFor="certificateId">Certificate Number</Label>
                  <Input
                    id="certificateId"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    placeholder="MT-2025-001234"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Example: MT-2025-001234
                  </p>
                </div>
                <Button type="submit" className="w-full">
                  <Search className="mr-2 size-4" />
                  Verify Certificate
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {result === 'not-found' && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-red-600">
                  <XCircle className="size-8 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Certificate Not Found</h3>
                    <p className="text-sm">
                      The certificate number you entered could not be found in our database. 
                      Please check the number and try again.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {result && result !== 'not-found' && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-6">
                  <div className="p-3 rounded-full bg-green-100">
                    <CheckCircle className="size-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-900 mb-1">
                      Valid Certificate
                    </h3>
                    <p className="text-sm text-green-700">
                      This certificate has been verified and is authentic
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                    <Award className="size-12 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-lg">MEGA-TECH Solutions Ltd</h4>
                      <p className="text-sm text-gray-600">Certificate of Completion</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-600">Certificate Number</Label>
                      <p className="font-semibold">{result.certificateNumber}</p>
                    </div>

                    <div>
                      <Label className="text-gray-600">Student Name</Label>
                      <p className="font-semibold">{result.studentName}</p>
                    </div>

                    <div>
                      <Label className="text-gray-600">Course Name</Label>
                      <p className="font-semibold">{result.courseName}</p>
                    </div>

                    <div>
                      <Label className="text-gray-600">Issue Date</Label>
                      <p className="font-semibold">
                        {new Date(result.issueDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>

                    <div>
                      <Label className="text-gray-600">Status</Label>
                      <div className="mt-1">
                        <Badge variant={result.status === 'valid' ? 'default' : 'destructive'}>
                          {result.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>About Certificate Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <p>
                MEGA-TECH Solutions Ltd issues certificates to students who successfully complete our courses.
                Each certificate has a unique number that can be verified through this system.
              </p>
              <p>
                If you suspect fraud or have questions about a certificate, please contact us at 
                <a href="mailto:certificates@megatech.com" className="text-blue-600 hover:underline ml-1">
                  certificates@megatech.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}