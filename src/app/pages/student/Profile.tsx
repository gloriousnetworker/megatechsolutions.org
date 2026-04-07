import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { User, Mail, Phone, Save, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../../components/ui/dialog';

export default function StudentProfile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  // New state for avatar preview
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
    // In a real app, this would call an API to update the profile
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-gray-600 mt-2">Manage your personal information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="size-32 mb-4">
              <AvatarImage src={avatarPreview || undefined} />
              <AvatarFallback className="text-2xl">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Change Photo Button + Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Upload className="size-4" /> Change Photo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Select New Profile Photo</DialogTitle>
                  <DialogDescription>
                    Choose an image file from your computer
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setAvatarPreview(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {avatarPreview && (
                    <div className="flex justify-center">
                      <Avatar className="size-24">
                        <AvatarImage src={avatarPreview} />
                        <AvatarFallback>?</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  <Button
                    className="w-full"
                    onClick={() => toast.success('Profile photo updated!')}
                  >
                    Upload Photo
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 size-4 text-gray-400" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 size-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 size-4 text-gray-400" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                <Save className="size-4 mr-2" />
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-600">Account Type</p>
            <p className="font-medium capitalize">{user.role}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Member Since</p>
            <p className="font-medium">
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}