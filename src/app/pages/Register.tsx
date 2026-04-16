import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import logo from '../../assets/5617957f48c55254a851db007d0091c8ad212892.png';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.fullName.length < 2) newErrors.fullName = 'Name must be at least 2 characters';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email address';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(formData.password)) newErrors.password = 'Must contain an uppercase letter';
    if (!/[a-z]/.test(formData.password)) newErrors.password = 'Must contain a lowercase letter';
    if (!/[0-9]/.test(formData.password)) newErrors.password = 'Must contain a number';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      await register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
      });
      toast.success('Account created successfully!');
      navigate('/student/dashboard');
    } catch (err: any) {
      if (err.code === 'CONFLICT') {
        setErrors({ email: 'This email is already registered' });
      } else if (err.code === 'VALIDATION_ERROR') {
        setErrors({ form: err.message });
      } else {
        setErrors({ form: err.message || 'Registration failed. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <img src={logo} alt="MEGA-TECH" className="h-10 w-10 object-contain" />
            <span className="font-bold text-2xl">MEGA-TECH</span>
          </Link>
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-gray-600 mt-2">Start your learning journey today</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Student Registration</CardTitle>
            <CardDescription>Fill in your details to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                  {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                  {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+234 800 000 0000"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder="Min 8 chars, uppercase, lowercase, number"
                    required
                  />
                  {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {errors.form && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{errors.form}</p>
                </div>
              )}

              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" className="rounded mt-1" required />
                <label htmlFor="terms" className="text-sm font-normal flex flex-wrap gap-1">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:underline">Terms and Conditions</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
                Create Account
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 text-center sm:text-left">
            <div className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">Login here</Link>
            </div>
            <Link to="/" className="text-sm text-gray-600 hover:text-blue-600">Back to website</Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
