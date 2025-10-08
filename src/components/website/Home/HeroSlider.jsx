import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      mainImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&q=80&w=2000",
      title: "Tourism & Sightseeing",
      description: "Explore sights, celebrate traditions, enjoy authentic flavours, expand trade opportunities, and experience global care.",
      buttonText: "Explore ZATRA",
      thumbnails: [
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1533130061792-64b345e4a833?ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&q=80&w=400",
      ]
    },
    {
      id: 2,
      mainImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&q=80&w=2000",
      title: "Cultural Heritage",
      description: "Discover ancient temples, vibrant festivals, traditional arts, and immerse yourself in rich cultural experiences.",
      buttonText: "Discover Culture",
      thumbnails: [
        "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1516490701209-76ca8f6f3a93?ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1533130061792-64b345e4a833?ixlib=rb-4.0.3&q=80&w=400",
      ]
    },
    {
      id: 3,
      mainImage: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?ixlib=rb-4.0.3&q=80&w=2000",
      title: "Adventure & Nature",
      description: "Trek through mountains, explore wildlife, experience thrilling adventures, and connect with pristine nature.",
      buttonText: "Start Adventure",
      thumbnails: [
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&q=80&w=400",
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&q=80&w=400",
      ]
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${activeSlide === index ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={slide.mainImage}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col justify-center">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 animate-fade-in">
            The 5T Promise: Experience. Connect. Thrive.
          </h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto w-full">
          {/* Left Side - Thumbnails Grid */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-3 gap-4">
              {slides[activeSlide].thumbnails.map((thumb, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Content Card */}
          <div className="order-1 lg:order-2 animate-slide-left">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {slides[activeSlide].title}
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
                {slides[activeSlide].description}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105">
                {slides[activeSlide].buttonText}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute left-4 right-4 top-1/2 transform -translate-y-1/2 flex justify-between pointer-events-none z-20">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-lg hover:shadow-xl"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-gray-800" size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-lg hover:shadow-xl"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-gray-800" size={20} />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${activeSlide === index
                  ? "w-12 h-3 bg-white"
                  : "w-3 h-3 bg-white/50 hover:bg-white/80"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out backwards;
        }
        .animate-slide-left {
          animation: slideLeft 1s ease-out;
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
