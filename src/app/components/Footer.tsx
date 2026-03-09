import { Link } from 'react-router';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import logo from '../../assets/5617957f48c55254a851db007d0091c8ad212892.png';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="MEGA-TECH" className="size-8" />
              <span className="font-bold text-xl text-white">MEGA-TECH</span>
            </div>
            <p className="text-sm mb-4">
              Empowering the next generation of tech professionals through quality education and hands-on training since 2023.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook className="size-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Twitter className="size-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Linkedin className="size-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Instagram className="size-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-blue-500 transition-colors">Courses</Link></li>
              <li><Link to="/staff" className="hover:text-blue-500 transition-colors">Our Staff</Link></li>
              <li><Link to="/gallery" className="hover:text-blue-500 transition-colors">Gallery</Link></li>
              <li><Link to="/blog" className="hover:text-blue-500 transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-blue-500 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Student Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Student Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/register" className="hover:text-blue-500 transition-colors">Register</Link></li>
              <li><Link to="/login" className="hover:text-blue-500 transition-colors">Student Login</Link></li>
              <li><Link to="/verify-certificate" className="hover:text-blue-500 transition-colors">Verify Certificate</Link></li>
              <li><Link to="/shop" className="hover:text-blue-500 transition-colors">Shop</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="size-5 shrink-0 mt-0.5" />
                <span>Top Floor, Rianzo Plaza, Ganaja Junction, Opposite Halims Hotel, Lokoja, Kogi State, Nigeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-5 shrink-0" />
                <div className="flex flex-col">
                  <span>08135118427 (General)</span>
                  <span>08134305251 (Business)</span>
                  <span>08169966823 (MD)</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-5 shrink-0" />
                <a href="mailto:Megatechsolution2023@gmail.com" className="hover:text-blue-500">
                  Megatechsolution2023@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} MEGA-TECH SOLUTIONS LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}