import { Link } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useApi } from '../hooks/useApi';
import { api } from '../utils/api';
import { StaffGridSkeleton } from '../components/skeletons/StaffCardSkeleton';
import { ErrorState } from '../components/ErrorState';
import { Mail, Linkedin, Twitter, Github } from 'lucide-react';
import type { Staff as StaffType } from '../types';

export default function Staff() {
  const { data: staffList, isLoading, error, retry } = useApi<StaffType[]>(() => api.staff.listPublic());

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Expert Team</h1>
          <p className="text-xl text-blue-50 max-w-3xl">
            Learn from industry professionals with years of real-world experience
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading && <StaffGridSkeleton count={6} />}
          {error && <ErrorState message={error} onRetry={retry} />}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(staffList || []).map((staff) => (
                <Card key={staff.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <img
                        src={staff.photo}
                        alt={staff.name}
                        className="size-32 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100"
                      />
                      <h3 className="text-xl font-bold mb-1">{staff.name}</h3>
                      <p className="text-blue-600 font-medium mb-2">{staff.position}</p>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        {staff.email && (
                          <a href={`mailto:${staff.email}`} className="text-gray-600 hover:text-blue-600">
                            <Mail className="size-5" />
                          </a>
                        )}
                        {staff.social?.linkedin && (
                          <a href={staff.social.linkedin} className="text-gray-600 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="size-5" />
                          </a>
                        )}
                        {staff.social?.twitter && (
                          <a href={staff.social.twitter} className="text-gray-600 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                            <Twitter className="size-5" />
                          </a>
                        )}
                        {staff.social?.github && (
                          <a href={staff.social.github} className="text-gray-600 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                            <Github className="size-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{staff.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {(staff.skills || []).map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to join our team?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always looking for talented instructors who are passionate about teaching and technology
          </p>
          <Button size="lg" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
