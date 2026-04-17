import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { useApi } from '../../hooks/useApi';
import { api } from '../../utils/api';
import { ErrorState } from '../../components/ErrorState';
import { Search } from 'lucide-react';

export default function StaffStudentManagement() {
  const { data: students, isLoading, error, retry } = useApi<any[]>(() => api.students.list());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = (students || []).filter(student =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Student Management</h1>
        <p className="text-sm text-gray-600 mt-1">View and manage students</p>
      </div>

      <Card>
        <CardHeader>
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-3 size-4 text-gray-400" />
            <Input placeholder="Search students..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          {filteredStudents.length === 0 ? (
            <div className="text-center py-12 text-gray-600">No students found</div>
          ) : (
            <div className="w-full overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Enrollments</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student: any) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>{student.name?.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium whitespace-nowrap">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{student.email}</TableCell>
                      <TableCell className="whitespace-nowrap">{student.phone || 'N/A'}</TableCell>
                      <TableCell><Badge variant="secondary">{student.enrollments || 0}</Badge></TableCell>
                      <TableCell className="whitespace-nowrap">{student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
