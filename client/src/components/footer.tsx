import { Home, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="text-primary w-8 h-8" />
              <span className="text-xl font-bold">Anfa MaidCare</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner for professional home services in Garissa.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition duration-300">House Cleaning</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Babysitting</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Elderly Care</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Contact</a></li>
              <li><a href="#" className="hover:text-white transition duration-300">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 MaidCare Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
