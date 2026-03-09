import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { LayoutDashboard, BookOpen, Users, UserCog, CreditCard, Image, FileText, Award, Settings, LogOut, Menu, X } from "lucide-react";
import logo from "figma:asset/5617957f48c55254a851db007d0091c8ad212892.png";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Staff", href: "/admin/staff", icon: UserCog },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Gallery", href: "/admin/gallery", icon: Image },
    { name: "Blog", href: "/admin/blog", icon: FileText },
    { name: "Certificates", href: "/admin/certificates", icon: Award },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden bg-white border-b px-4 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src={logo} alt="MTS" className="h-10 w-10" />
          <span className="font-bold text-gray-900">Admin Panel</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        <aside className={`fixed lg:sticky top-0 left-0 z-40 h-screen bg-white border-r w-64 transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex flex-col h-full">
            <div className="hidden lg:flex items-center gap-3 px-6 py-6 border-b">
              <img src={logo} alt="MTS" className="h-12 w-12" />
              <div>
                <div className="font-bold text-gray-900">Admin Panel</div>
                <div className="text-xs text-gray-600">Mega-Tech Solutions</div>
              </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      isActive(item.href) ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t p-4">
              <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
