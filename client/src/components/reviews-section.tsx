import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Amina Hassan",
    location: "Garissa Township",
    rating: 5,
    review: "Excellent service! The maid was very professional and thorough. My house has never been cleaner. I will definitely book again.",
    service: "House Cleaning"
  },
  {
    id: 2,
    name: "Fatuma Mohamed",
    location: "Iftin Estate",
    rating: 5,
    review: "Very reliable and trustworthy. She took great care of my elderly mother and kept the house spotless. Highly recommended!",
    service: "Elderly Care"
  },
  {
    id: 3,
    name: "Halima Abdi",
    location: "Bulla Mpya",
    rating: 4,
    review: "Good service overall. The babysitter was patient with my children and very caring. Will use the service again.",
    service: "Babysitting"
  },
  {
    id: 4,
    name: "Sahra Omar",
    location: "Garissa University Area",
    rating: 5,
    review: "Professional and affordable. The cleaning was done to perfection and on time. Great value for money!",
    service: "House Cleaning"
  },
  {
    id: 5,
    name: "Khadija Ali",
    location: "Chief Estate",
    rating: 5,
    review: "Outstanding service! Very punctual and the quality of work exceeded my expectations. Thank you for the excellent service.",
    service: "House Cleaning"
  },
  {
    id: 6,
    name: "Nasra Ibrahim",
    location: "Township",
    rating: 4,
    review: "Reliable and professional. The caregiver was gentle and kind to my grandmother. Very satisfied with the service.",
    service: "Elderly Care"
  }
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real reviews from satisfied customers across Garissa who trust our professional maid services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({review.rating}/5)
                </span>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{review.review}"
              </p>

              {/* Customer Info */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {review.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {review.service}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Stats */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1200+</div>
              <div className="text-gray-600">Services Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}