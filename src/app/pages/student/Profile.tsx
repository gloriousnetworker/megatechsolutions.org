import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Separator } from '../../components/ui/separator';
import { User, Mail, Phone, Save, Upload, ShieldCheck, ShieldOff, Loader2, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../../components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../../components/ui/input-otp';

export default function StudentProfile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null);

  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [changingPassword, setChangingPassword] = useState(false);

  const [twoFaSetup, setTwoFaSetup] = useState<{ secret: string; qrCode: string } | null>(null);
  const [twoFaCode, setTwoFaCode] = useState('');
  const [twoFaLoading, setTwoFaLoading] = useState(false);
  const [disableCode, setDisableCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setChangingPassword(true);
    try {
      await api.auth.changePassword({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword });
      toast.success('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      toast.error(err.message || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleSetup2fa = async () => {
    setTwoFaLoading(true);
    try {
      const data = await api.auth.setup2fa();
      setTwoFaSetup(data);
    } catch (err: any) {
      toast.error(err.message || 'Failed to setup 2FA');
    } finally {
      setTwoFaLoading(false);
    }
  };

  const handleEnable2fa = async () => {
    setTwoFaLoading(true);
    try {
      await api.auth.enable2fa({ code: twoFaCode });
      toast.success('2FA enabled successfully!');
      setTwoFaSetup(null);
      setTwoFaCode('');
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || 'Invalid code');
    } finally {
      setTwoFaLoading(false);
    }
  };

  const handleDisable2fa = async () => {
    setTwoFaLoading(true);
    try {
      await api.auth.disable2fa({ code: disableCode });
      toast.success('2FA disabled');
      setDisableCode('');
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || 'Invalid code');
    } finally {
      setTwoFaLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
        <p className="text-gray-600 mt-2">Manage your personal information and security</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader><CardTitle>Profile Picture</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="size-32 mb-4">
              <AvatarImage src={avatarPreview || undefined} />
              <AvatarFallback className="text-2xl">{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Upload className="size-4" /> Change Photo
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Select New Profile Photo</DialogTitle>
                  <DialogDescription>Choose an image file from your computer</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => setAvatarPreview(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }} />
                  {avatarPreview && (
                    <div className="flex justify-center">
                      <Avatar className="size-24"><AvatarImage src={avatarPreview} /><AvatarFallback>?</AvatarFallback></Avatar>
                    </div>
                  )}
                  <Button className="w-full" onClick={() => toast.success('Profile photo updated!')}>Upload Photo</Button>
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
                  <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="pl-10" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 size-4 text-gray-400" />
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="pl-10" />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 size-4 text-gray-400" />
                  <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="pl-10" />
                </div>
              </div>
              <Button type="submit" className="w-full"><Save className="size-4 mr-2" />Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Lock className="size-5" />Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            <div>
              <Label>Current Password</Label>
              <Input type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} required />
            </div>
            <div>
              <Label>New Password</Label>
              <Input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} required />
            </div>
            <div>
              <Label>Confirm New Password</Label>
              <Input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} required />
            </div>
            <Button type="submit" disabled={changingPassword}>
              {changingPassword ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck className="size-5" />Two-Factor Authentication</CardTitle>
          <CardDescription>
            {user.twoFactorEnabled ? 'Two-factor authentication is currently enabled.' : 'Add an extra layer of security to your account.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!user.twoFactorEnabled ? (
            <div className="space-y-4">
              {!twoFaSetup ? (
                <Button onClick={handleSetup2fa} disabled={twoFaLoading}>
                  {twoFaLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : <ShieldCheck className="size-4 mr-2" />}
                  Setup 2FA
                </Button>
              ) : (
                <div className="space-y-4 max-w-sm">
                  <p className="text-sm text-gray-600">Scan this QR code with your authenticator app, then enter the 6-digit code below.</p>
                  <div className="flex justify-center">
                    <img src={twoFaSetup.qrCode} alt="2FA QR Code" className="w-48 h-48" />
                  </div>
                  <p className="text-xs text-gray-500 text-center font-mono break-all">{twoFaSetup.secret}</p>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={twoFaCode} onChange={setTwoFaCode}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} />
                        <InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <Button className="w-full" onClick={handleEnable2fa} disabled={twoFaCode.length !== 6 || twoFaLoading}>
                    {twoFaLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
                    Enable 2FA
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 max-w-sm">
              <p className="text-sm text-gray-600">Enter your 2FA code to disable two-factor authentication.</p>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={disableCode} onChange={setDisableCode}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} />
                    <InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button variant="destructive" className="w-full" onClick={handleDisable2fa} disabled={disableCode.length !== 6 || twoFaLoading}>
                {twoFaLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : <ShieldOff className="size-4 mr-2" />}
                Disable 2FA
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Account Information</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-600">Account Type</p>
            <p className="font-medium capitalize">{user.role}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Member Since</p>
            <p className="font-medium">{new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
