import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import logo from '../../assets/5617957f48c55254a851db007d0091c8ad212892.png';
import { toast } from 'sonner';
import { Loader2, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { login, login2fa } = useAuth();
  const navigate = useNavigate();

  const navigateByRole = (role: string) => {
    switch (role) {
      case 'admin': navigate('/admin/dashboard'); break;
      case 'staff': navigate('/staff/dashboard'); break;
      default: navigate('/student/dashboard'); break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await login(email, password);

      if (result.requiresTwoFactor) {
        setRequiresTwoFactor(true);
        setIsSubmitting(false);
        return;
      }

      toast.success('Login successful!');
      navigateByRole(result.user?.role || 'student');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTwoFactorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login2fa(email, password, twoFactorCode);
      toast.success('Login successful!');
      const meData = await api.auth.me();
      navigateByRole(meData.user?.role || 'student');
    } catch (err: any) {
      setError(err.message || 'Invalid 2FA code');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src={logo} alt="MEGA-TECH" className="h-10" />
            <span className="font-bold text-2xl">MEGA-TECH</span>
          </Link>
          <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
          <p className="text-gray-600 text-sm">Login to access your portal</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{requiresTwoFactor ? 'Two-Factor Authentication' : 'Login'}</CardTitle>
            <CardDescription className="text-sm">
              {requiresTwoFactor
                ? 'Enter the 6-digit code from your authenticator app'
                : 'Enter your email and password to continue'
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            {requiresTwoFactor ? (
              <form onSubmit={handleTwoFactorSubmit} className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <ShieldCheck className="size-12 text-blue-600" />
                  <InputOTP
                    maxLength={6}
                    value={twoFactorCode}
                    onChange={setTwoFactorCode}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                <Button type="submit" className="w-full" disabled={isSubmitting || twoFactorCode.length !== 6}>
                  {isSubmitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
                  Verify & Login
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => { setRequiresTwoFactor(false); setTwoFactorCode(''); setError(''); }}
                >
                  Back to login
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
                  Login
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 text-center sm:text-left">
            <div className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">
                Register here
              </Link>
            </div>
            <Link to="/" className="text-sm text-gray-600 hover:text-blue-600">
              Back to website
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
