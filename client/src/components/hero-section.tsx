import { Button } from "@/components/ui/button";
import ServiceRequestModal from "./service-request-modal";
import { useState } from "react";

export default function HeroSection() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="home" className="hero-bg pt-16 pb-20">
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Professional Home <span className="text-primary">Maid Services</span> in Garissa
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with trusted, verified domestic helpers for all your household needs. 
                Quality service, reliable professionals, competitive rates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setIsRequestModalOpen(true)}
                  className="bg-primary text-white px-8 py-4 text-lg font-semibold hover:bg-primary/90 transform hover:scale-105 transition duration-300 shadow-lg"
                  size="lg"
                >
                  Request a Maid
                </Button>
                <Button
                  onClick={scrollToAbout}
                  variant="outline"
                  className="border-2 border-primary text-primary px-8 py-4 text-lg font-semibold hover:bg-primary hover:text-white transition duration-300"
                  size="lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="fade-in">
              <div className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition duration-500 bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                <svg viewBox="0 0 400 300" className="w-full h-auto">
                  {/* Background elements */}
                  <rect x="0" y="0" width="400" height="300" fill="url(#roomGradient)" />
                  
                  {/* Define gradients */}
                  <defs>
                    <linearGradient id="roomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>
                    <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fdbcb4" />
                      <stop offset="100%" stopColor="#f4a5a5" />
                    </linearGradient>
                    <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b4513" />
                      <stop offset="100%" stopColor="#654321" />
                    </linearGradient>
                    <linearGradient id="uniformGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                  
                  {/* Floor */}
                  <rect x="0" y="250" width="400" height="50" fill="#e5e7eb" />
                  
                  {/* Window */}
                  <rect x="300" y="50" width="80" height="100" fill="#87ceeb" stroke="#6b7280" strokeWidth="3" />
                  <line x1="340" y1="50" x2="340" y2="150" stroke="#6b7280" strokeWidth="2" />
                  <line x1="300" y1="100" x2="380" y2="100" stroke="#6b7280" strokeWidth="2" />
                  
                  {/* Furniture - Cabinet */}
                  <rect x="20" y="180" width="60" height="70" fill="#8b4513" stroke="#654321" strokeWidth="2" />
                  <circle cx="35" cy="210" r="3" fill="#ffd700" />
                  <circle cx="65" cy="210" r="3" fill="#ffd700" />
                  
                  {/* Woman cleaning - Body */}
                  <ellipse cx="200" cy="200" rx="25" ry="40" fill="url(#uniformGradient)" />
                  
                  {/* Arms */}
                  <ellipse cx="175" cy="180" rx="8" ry="25" fill="url(#uniformGradient)" transform="rotate(-20 175 180)" />
                  <ellipse cx="225" cy="185" rx="8" ry="25" fill="url(#uniformGradient)" transform="rotate(45 225 185)" />
                  
                  {/* Hands */}
                  <circle cx="170" cy="165" r="8" fill="url(#skinGradient)" />
                  <circle cx="240" cy="175" r="8" fill="url(#skinGradient)" />
                  
                  {/* Head */}
                  <circle cx="200" cy="140" r="20" fill="url(#skinGradient)" />
                  
                  {/* Hair */}
                  <path d="M 180 130 Q 200 115 220 130 Q 215 125 200 125 Q 185 125 180 130" fill="url(#hairGradient)" />
                  
                  {/* Face features */}
                  <circle cx="195" cy="135" r="2" fill="#2d3748" />
                  <circle cx="205" cy="135" r="2" fill="#2d3748" />
                  <path d="M 195 145 Q 200 150 205 145" stroke="#2d3748" strokeWidth="2" fill="none" />
                  
                  {/* Cleaning cloth */}
                  <ellipse cx="240" cy="175" rx="12" ry="8" fill="#fbbf24" />
                  
                  {/* Legs */}
                  <ellipse cx="190" cy="245" rx="8" ry="25" fill="#1f2937" />
                  <ellipse cx="210" cy="245" rx="8" ry="25" fill="#1f2937" />
                  
                  {/* Feet */}
                  <ellipse cx="190" cy="270" rx="12" ry="6" fill="#374151" />
                  <ellipse cx="210" cy="270" rx="12" ry="6" fill="#374151" />
                  
                  {/* Cleaning bucket */}
                  <ellipse cx="120" cy="260" rx="20" ry="15" fill="#6b7280" />
                  <ellipse cx="120" cy="255" rx="18" ry="12" fill="#9ca3af" />
                  <rect x="110" y="250" width="20" height="3" fill="#4b5563" />
                  
                  {/* Soap bubbles */}
                  <circle cx="150" cy="120" r="5" fill="#e0f2fe" opacity="0.8" />
                  <circle cx="160" cy="110" r="3" fill="#e0f2fe" opacity="0.6" />
                  <circle cx="140" cy="105" r="4" fill="#e0f2fe" opacity="0.7" />
                  <circle cx="170" cy="100" r="3" fill="#e0f2fe" opacity="0.5" />
                  <circle cx="145" cy="95" r="2" fill="#e0f2fe" opacity="0.6" />
                  
                  {/* Surface being cleaned */}
                  <rect x="180" y="120" width="80" height="15" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
                  <path d="M 240 125 Q 260 120 280 125" stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.7" />
                  
                  {/* Sparkles indicating cleanliness */}
                  <g fill="#fbbf24" opacity="0.8">
                    <path d="M 250 110 L 252 115 L 257 113 L 252 118 L 250 123 L 248 118 L 243 113 L 248 115 Z" />
                    <path d="M 270 105 L 271 108 L 274 107 L 271 110 L 270 113 L 269 110 L 266 107 L 269 108 Z" />
                    <path d="M 235 100 L 236 103 L 239 102 L 236 105 L 235 108 L 234 105 L 231 102 L 234 103 Z" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceRequestModal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)} 
      />
    </>
  );
}
