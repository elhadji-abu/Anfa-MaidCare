import { Users, Star } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <img 
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Two people cooking together in modern kitchen" 
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </div>
          
          <div className="fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About <span className="text-primary">MaidCare Pro</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We are Garissa's premier maid hiring management platform, connecting households with 
              professional, vetted domestic helpers. Our mission is to make quality home services 
              accessible, reliable, and affordable for every family.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="text-primary w-8 h-8" />
                </div>
                <h4 className="font-semibold text-gray-900">500+</h4>
                <p className="text-gray-600">Verified Maids</p>
              </div>
              <div className="text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="text-emerald-600 w-8 h-8" />
                </div>
                <h4 className="font-semibold text-gray-900">4.9/5</h4>
                <p className="text-gray-600">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
