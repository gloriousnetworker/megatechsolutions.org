import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Plus, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminStaff() {
  const { accessToken } = useAuth();
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    position: '',
  });

  useEffect(() => {
    fetchStaff();
  }, [accessToken]);

  const fetchStaff = async () => {
    if (!accessToken) return;
    
    try {
      const data = await api.getStaff(accessToken);
      setStaff(data.staff || []);
    } catch (error) {
      console.error('Error fetching staff:', error);
      toast.error('Failed to load staff');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    try {
      await api.createStaff(formData, accessToken);
      toast.success('Staff member added successfully!');
      setDialogOpen(false);
      setFormData({ name: '', email: '', password: '', phone: '', position: '' });
      fetchStaff();
    } catch (error) {
      console.error('Error creating staff:', error);
      toast.error('Failed to add staff member');
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
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
    
    {/* Header */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Staff Management</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Manage teaching staff and instructors
        </p>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto">
            <Plus className="size-4 mr-2" />
            Add Staff
          </Button>
        </DialogTrigger>

        {/* Responsive Dialog */}
        <DialogContent className="w-[95vw] sm:max-w-lg rounded-xl">
          <DialogHeader>
            <DialogTitle>Add New Staff Member</DialogTitle>
            <DialogDescription>
              Create a new staff account with instructor privileges
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                placeholder="e.g., Senior Instructor"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full">
              Add Staff Member
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>

    {/* Staff Table */}
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">
          All Staff Members ({staff.length})
        </CardTitle>
      </CardHeader>

      <CardContent>
        {staff.length === 0 ? (
          <div className="text-center py-12">
            <Users className="size-14 sm:size-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Staff Yet</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Add your first staff member to get started.
            </p>
          </div>
        ) : (
          
          /* Responsive Table Wrapper */
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {staff.map((member: any) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3 min-w-[180px]">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>
                            {member.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium whitespace-nowrap">
                          {member.name}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="whitespace-nowrap">
                      {member.email}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">
                      {member.position || 'Instructor'}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">
                      {member.created_at
                        ? new Date(member.created_at).toLocaleDateString()
                        : 'N/A'}
                    </TableCell>
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
