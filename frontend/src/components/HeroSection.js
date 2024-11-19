import React from 'react';
import { ArrowRight, ArrowLeft, Zap, Shield, Clock } from 'lucide-react';

const HeroSection = ({ language = 'en' }) => {
  const isArabic = language === 'ar';
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  const content = {
    en: {
      title: "Power Your World with Premium Electric Equipment",
      subtitle: "Discover our extensive range of professional-grade electrical equipment. From power tools to safety gear, we've got everything you need.",
      shopNow: "Shop Now",
      viewCatalog: "View Catalog",
      features: {
        quality: "Premium Quality",
        warranty: "Warranty Protected",
        support: "24/7 Support"
      }
    },
    ar: {
      title: "قم بتشغيل عالمك بمعدات كهربائية متميزة",
      subtitle: "اكتشف مجموعتنا الواسعة من المعدات الكهربائية المهنية. من الأدوات الكهربائية إلى معدات السلامة، لدينا كل ما تحتاجه.",
      shopNow: "تسوق الآن",
      viewCatalog: "عرض الكتالوج",
      features: {
        quality: "جودة متميزة",
        warranty: "حماية الضمان",
        support: "دعم على مدار الساعة"
      }
    }
  };

  const text = content[language];

  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-gray-900/90" />
      
      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isArabic ? 'direction-rtl' : ''}`}>
          {/* Text content */}
          <div className={`space-y-8 ${isArabic ? 'text-right' : 'text-left'}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {text.title}
            </h1>
            <p className="text-xl text-gray-300">
              {text.subtitle}
            </p>
            
            {/* CTA Buttons */}
            <div className={`flex flex-wrap gap-4 ${isArabic ? 'justify-end' : 'justify-start'}`}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                {isArabic && <Arrow className="w-5 h-5" />}
                {text.shopNow}
                {!isArabic && <Arrow className="w-5 h-5" />}
              </button>
              <button className="border border-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                {text.viewCatalog}
              </button>
            </div>

            {/* Features */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 ${isArabic ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Zap className="w-6 h-6 text-blue-400" />
                <span className="text-gray-300">{text.features.quality}</span>
              </div>
              <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Shield className="w-6 h-6 text-blue-400" />
                <span className="text-gray-300">{text.features.warranty}</span>
              </div>
              <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-6 h-6 text-blue-400" />
                <span className="text-gray-300">{text.features.support}</span>
              </div>
            </div>
          </div>

          {/* Image section */}
          <div className="relative">
            <div className="bg-blue-600/10 rounded-2xl p-8">
              <div className="relative h-96">
                {/* Abstract electrical background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-900 rounded-lg overflow-hidden">
                  {/* Decorative circuit-like patterns */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-px bg-blue-400 animate-pulse" />
                    <div className="absolute top-1/2 right-1/4 w-1/3 h-px bg-blue-400 animate-pulse delay-100" />
                    <div className="absolute bottom-1/3 left-1/3 w-1/4 h-px bg-blue-400 animate-pulse delay-200" />
                  </div>
                  {/* Centered wire illustration */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 text-blue-400">
                      <path
                        d="M20,50 C20,30 80,70 80,50"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="animate-pulse"
                      />
                      <circle cx="20" cy="50" r="4" fill="currentColor" />
                      <circle cx="80" cy="50" r="4" fill="currentColor" />
                    </svg> */}
                    <img src='./images/HeroImage.jpg' alt="Electrical Illustration" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;