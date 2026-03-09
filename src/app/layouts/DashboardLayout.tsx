import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { Button } from '../components/ui/button';
import logo from '../../assets/5617957f48c55254a851db007d0091c8ad212892.png';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  Award,
  CreditCard,
  UserCircle,
  Settings,
  LogOut,
  Image,
  Newspaper,
  Menu
} from 'lucide-react';
import { useState } from 'react';

interface DashboardLayoutProps {
  requiredRole: 'student' | 'staff' | 'admin';
}

export function DashboardLayout({ requiredRole }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user || user.role !== requiredRole) {
      navigate('/login');
    }
  }, [user, requiredRole, navigate]);

  if (!user || user.role !== requiredRole) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Define menu items based on role
  const getMenuItems = () => {
    const basePrefix = `/${requiredRole}`;
    
    if (requiredRole === 'student') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: `${basePrefix}/dashboard` },
        { icon: BookOpen, label: 'My Courses', path: `${basePrefix}/courses` },
        { icon: FileText, label: 'Assignments', path: `${basePrefix}/assignments` },
        { icon: Award, label: 'Certificates', path: `${basePrefix}/certificates` },
        { icon: CreditCard, label: 'Payments', path: `${basePrefix}/payments` },
        { icon: UserCircle, label: 'Profile', path: `${basePrefix}/profile` }
      ];
    }
    
    if (requiredRole === 'staff') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: `${basePrefix}/dashboard` },
        { icon: BookOpen, label: 'Course Management', path: `${basePrefix}/courses` },
        { icon: Users, label: 'Student Management', path: `${basePrefix}/students` },
        { icon: UserCircle, label: 'Profile', path: `${basePrefix}/profile` }
      ];
    }
    
    // Admin menu
    return [
      { icon: LayoutDashboard, label: 'Dashboard', path: `${basePrefix}/dashboard` },
      { icon: BookOpen, label: 'Courses', path: `${basePrefix}/courses` },
      { icon: Users, label: 'Students', path: `${basePrefix}/students` },
      { icon: Users, label: 'Staff', path: `${basePrefix}/staff` },
      { icon: CreditCard, label: 'Payments', path: `${basePrefix}/payments` },
      { icon: Image, label: 'Gallery', path: `${basePrefix}/gallery` },
      { icon: Newspaper, label: 'Blog', path: `${basePrefix}/blog` },
      { icon: Award, label: 'Certificates', path: `${basePrefix}/certificates` },
      { icon: Settings, label: 'Settings', path: `${basePrefix}/settings` }
    ];
  };

  const menuItems = getMenuItems();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r transition-transform duration-300`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 p-6 border-b">
            <img src={logo} alt="MEGA-TECH Logo" className="size-8 text-blue-600" />
            <div>
              <div className="font-bold text-lg">MEGA-TECH</div>
              <div className="text-xs text-gray-500 capitalize">{requiredRole} Portal</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="size-5 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-3">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="size-10 rounded-full object-cover" />
              ) : (
                <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserCircle className="size-6 text-blue-600" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{user.name}</div>
                <div className="text-xs text-gray-500 truncate">{user.email}</div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="size-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between md:justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">Back to Website</Link>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}