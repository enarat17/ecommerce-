import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const FooterComponent = () => {
  const { language } = useContext(LanguageContext);
  const isArabic = language === 'ar';
  const Chevron = isArabic ? ChevronLeft : ChevronRight;

  const content = {
    en: {
      companyInfo: {
        name: "ElectroTech Store",
        description: "Your trusted partner for all electrical equipment and supplies. Serving professionals and businesses since 1995."
      },
      quickLinks: {
        title: "Quick Links",
        links: [
          { name: "About Us", href: "/about" },
          { name: "Products", href: "/products" },
          { name: "Services", href: "/services" },
          { name: "Special Offers", href: "/offers" },
          { name: "Contact Us", href: "/contact" }
        ]
      },
      categories: {
        title: "Categories",
        links: [
          { name: "Power Tools", href: "/category/power-tools" },
          { name: "Safety Equipment", href: "/category/safety-equipment" },
          { name: "Lighting Solutions", href: "/category/lighting" },
          { name: "Wiring & Cables", href: "/category/wiring-cables" },
          { name: "Testing Equipment", href: "/category/testing-equipment" }
        ]
      },
      contact: {
        title: "Contact Info",
        address: "123 Electric Avenue, Industrial Zone",
        phone: "+971 4 123 4567",
        email: "info@electrotech.com",
        hours: "Sun - Thu: 9:00 AM - 6:00 PM"
      },
      newsletter: {
        title: "Newsletter",
        description: "Subscribe to receive updates on new products and special offers",
        placeholder: "Enter your email",
        button: "Subscribe",
      },
      rights: "© 2024 ElectroTech. All rights reserved."
    },
    ar: {
      companyInfo: {
        name: "متجر إلكتروتك",
        description: "شريكك الموثوق لجميع المعدات والمستلزمات الكهربائية. نخدم المحترفين والشركات منذ عام 1995."
      },
      quickLinks: {
        title: "روابط سريعة",
        links: [
          { name: "من نحن", href: "/about" },
          { name: "المنتجات", href: "/products" },
          { name: "الخدمات", href: "/services" },
          { name: "العروض الخاصة", href: "/offers" },
          { name: "اتصل بنا", href: "/contact" }
        ]
      },
      categories: {
        title: "الفئات",
        links: [
          { name: "أدوات كهربائية", href: "/category/power-tools" },
          { name: "معدات السلامة", href: "/category/safety-equipment" },
          { name: "حلول الإضاءة", href: "/category/lighting" },
          { name: "الأسلاك والكابلات", href: "/category/wiring-cables" },
          { name: "معدات الفحص", href: "/category/testing-equipment" }
        ]
      },
      contact: {
        title: "معلومات التواصل",
        address: "123 شارع الكهرباء، المنطقة الصناعية",
        phone: "+971 4 123 4567",
        email: "info@electrotech.com",
        hours: "الأحد - الخميس: 9:00 ص - 6:00 م"
      },
      newsletter: {
        title: "النشرة الإخبارية",
        description: "اشترك للحصول على تحديثات حول المنتجات الجديدة والعروض الخاصة",
        placeholder: "أدخل بريدك الإلكتروني",
        button: "اشتراك",
      },
      rights: "© 2024 إلكتروتك. جميع الحقوق محفوظة."
    }
  };

  const text = content[language];

  const LinksList = ({ title, links }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a 
              href={link.href} 
              className={`text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2 ${
                isArabic ? 'flex-row-reverse' : ''
              }`}
            >
              <Chevron className="w-4 h-4" />
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-gray-900">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className={`space-y-4 ${isArabic ? 'text-right' : 'text-left'}`}>
            <h2 className="text-xl font-bold text-white">{text.companyInfo.name}</h2>
            <p className="text-gray-300">{text.companyInfo.description}</p>
            {/* Social Links */}
            <div className={`flex gap-4 ${isArabic ? 'justify-end' : 'justify-start'}`}>
              <a href="https://facebook.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={isArabic ? 'text-right' : 'text-left'}>
            <LinksList title={text.quickLinks.title} links={text.quickLinks.links} />
          </div>

          {/* Categories */}
          <div className={isArabic ? 'text-right' : 'text-left'}>
            <LinksList title={text.categories.title} links={text.categories.links} />
          </div>

          {/* Contact Info */}
          <div className={`space-y-4 ${isArabic ? 'text-right' : 'text-left'}`}>
            <h3 className="text-lg font-semibold text-white">{text.contact.title}</h3>
            <div className="space-y-3">
              <div className={`flex items-center gap-3 text-gray-300 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>{text.contact.address}</span>
              </div>
              <div className={`flex items-center gap-3 text-gray-300 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>{text.contact.phone}</span>
              </div>
              <div className={`flex items-center gap-3 text-gray-300 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>{text.contact.email}</span>
              </div>
              <div className={`flex items-center gap-3 text-gray-300 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>{text.contact.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        {/* <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-white mb-4">{text.newsletter.title}</h3>
            <p className="text-gray-300 mb-6">{text.newsletter.description}</p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder={text.newsletter.placeholder}
                className={`px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isArabic ? 'text-right' : 'text-left'
                }`}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {text.newsletter.button}
              </button>
            </form>
          </div>
        </div> */}
      </div>

      {/* Copyright */}
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className={`text-center text-gray-400 ${isArabic ? 'text-right' : 'text-left'}`}>
            {text.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};
export default FooterComponent;