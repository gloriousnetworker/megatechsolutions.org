import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Award, 
  CreditCard, 
  User, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";
import logo from "figma:asset/5617957f48c55254a851db007d0091c8ad212892.png";

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const navigation = [
    { name: "Dashboard", href: "/student", icon: LayoutDashboard },
    { name: "My Courses", href: "/student/courses", icon: BookOpen },
    { name: "Assignments", href: "/student/assignments", icon: FileText },
    { name: "Certificates", href: "/student/certificates", icon: Award },
    { name: "Payments", href: "/student/payments", icon: CreditCard },
    { name: "Profile", href: "/student/profile", icon: User },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src={logo} alt="MTS" className="h-10 w-10" />
          <span className="font-bold text-gray-900">Student Portal</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 w-64
          transform transition-transform lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="hidden lg:flex items-center gap-3 px-6 py-6 border-b">
              <img src={logo} alt="MTS" className="h-12 w-12" />
              <div>
                <div className="font-bold text-gray-900">Student Portal</div>
                <div className="text-xs text-gray-600">Mega-Tech Solutions</div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors
                      ${isActive(item.href)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* User Info & Logout */}
            <div className="border-t p-4">
              <div className="flex items-center gap-3 mb-3 px-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">
                    {localStorage.getItem("userName") || "Student"}
                  </div>
                  <div className="text-xs text-gray-600 truncate">
                    {localStorage.getItem("userEmail") || "student@example.com"}
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
