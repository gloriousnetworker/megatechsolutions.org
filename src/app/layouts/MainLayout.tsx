import { Outlet, Link, useLocation } from "react-router";
import { Menu, X, ChevronDown, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/5617957f48c55254a851db007d0091c8ad212892.png";

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Mega-Tech Solutions" className="h-16 w-16" />
              <div className="hidden sm:block">
                <div className="font-bold text-xl text-gray-900">MEGA-TECH SOLUTIONS</div>
                <div className="text-xs text-gray-600">...Bridging the Digital Divide</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className={`text-sm font-medium ${
                  isActive("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium ${
                  isActive("/about") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                About
              </Link>
              <Link
                to="/courses"
                className={`text-sm font-medium ${
                  isActive("/courses") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Courses
              </Link>
              <Link
                to="/staff"
                className={`text-sm font-medium ${
                  isActive("/staff") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Staff
              </Link>
              <Link
                to="/gallery"
                className={`text-sm font-medium ${
                  isActive("/gallery") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Gallery
              </Link>
              <Link
                to="/blog"
                className={`text-sm font-medium ${
                  isActive("/blog") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className={`text-sm font-medium ${
                  isActive("/contact") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <UserPlus className="w-4 h-4" />
                Register
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                About
              </Link>
              <Link
                to="/courses"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Courses
              </Link>
              <Link
                to="/staff"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Staff
              </Link>
              <Link
                to="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Gallery
              </Link>
              <Link
                to="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Contact
              </Link>
              <div className="pt-3 border-t border-gray-200 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="Mega-Tech Solutions" className="h-12 w-12" />
                <div className="font-bold text-lg">MTS</div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Bridging the Digital Divide through quality tech education and empowerment.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
                <li><Link to="/staff" className="hover:text-white">Our Staff</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
                <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
                <li><Link to="/verify-certificate" className="hover:text-white">Verify Certificate</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: info@megatech.com</li>
                <li>Phone: +234 800 123 4567</li>
                <li>Address: Lagos, Nigeria</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 Mega-Tech Solutions Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
