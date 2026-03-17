import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { useAuth } from '../context/AuthContext';
import logo from '../../assets/5617957f48c55254a851db007d0091c8ad212892.png';
import { toast } from 'sonner';
import type { UserRole } from '../types';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, role);
      toast.success('Login successful!');
      switch (role) {
        case 'admin': navigate('/admin/dashboard'); break;
        case 'staff': navigate('/staff/dashboard'); break;
        case 'student': navigate('/student/dashboard'); break;
      }
    } catch {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src={logo} alt="MEGA-TECH" className="h-10" />
            <span className="font-bold text-2xl">MEGA-TECH</span>
          </Link>
          <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
          <p className="text-gray-600 text-sm">Login to access your portal</p>
        </div>

        {/* Login Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription className="text-sm">Select your role and enter credentials</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={role} onValueChange={(v) => setRole(v as UserRole)}>
              <TabsList className="grid w-full grid-cols-3 mb-3">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <TabsContent value={role}>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={`${role}@megatech.com`}
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

                 {/* Remember Me & Forgot Password */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Remember me
                      </label>
                      <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm">
                        Forgot password?
                      </Link>
                    </div>

                  <Button type="submit" className="w-full">
                    Login as {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
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

        {/* Demo Credentials */}
        <Card className="mt-4 bg-blue-50 border-blue-200">
          <CardContent className="pt-4 text-sm">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <p className="text-gray-600">Use any email and password to login. The selected role determines the portal.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}