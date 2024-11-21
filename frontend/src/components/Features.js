import React from 'react';
import { Shield, Zap, Trophy, Globe, Clock, Wrench } from 'lucide-react';

const content = {
  en: {
    features: {
      title: "Why Choose Us",
      subtitle: "Leading electrical equipment supplier in Saudi Arabia",
      points: [
        {
          title: "Premium Quality Products",
          description: "Direct partnerships with world-renowned manufacturers ensuring authentic products",
          icon: Shield
        },
        {
          title: "Expert Technical Support",
          description: "Dedicated team of electrical engineers providing 24/7 consultation",
          icon: Wrench
        },
        {
          title: "Nationwide Distribution",
          description: "Fast delivery across Saudi Arabia with local warehouses in major cities",
          icon: Globe
        },
        {
          title: "Industry Experience",
          description: "Over 20 years serving the Saudi Arabian electrical industry",
          icon: Trophy
        },
        {
          title: "Rapid Response",
          description: "Emergency delivery services and 24-hour order processing",
          icon: Clock
        },
        {
          title: "Certified Equipment",
          description: "All products meet SASO standards and international certifications",
          icon: Zap
        }
      ]
    }
  },
  ar: {
    features: {
      title: "لماذا تختارنا",
      subtitle: "الشركة الرائدة في توريد المعدات الكهربائية في المملكة العربية السعودية",
      points: [
        {
          title: "منتجات عالية الجودة",
          description: "شراكات مباشرة مع مصنعين عالميين لضمان أصالة المنتجات",
          icon: Shield
        },
        {
          title: "دعم فني متخصص",
          description: "فريق متخصص من المهندسين الكهربائيين يقدم استشارات على مدار الساعة",
          icon: Wrench
        },
        {
          title: "توزيع في جميع أنحاء المملكة",
          description: "توصيل سريع في جميع أنحاء المملكة مع مستودعات محلية في المدن الرئيسية",
          icon: Globe
        },
        {
          title: "خبرة في الصناعة",
          description: "أكثر من 20 عاماً في خدمة قطاع الكهرباء السعودي",
          icon: Trophy
        },
        {
          title: "استجابة سريعة",
          description: "خدمات توصيل طارئة ومعالجة الطلبات على مدار 24 ساعة",
          icon: Clock
        },
        {
          title: "معدات معتمدة",
          description: "جميع المنتجات تلبي معايير الهيئة السعودية للمواصفات والمقاييس والشهادات الدولية",
          icon: Zap
        }
      ]
    }
  }
};



export const FeaturesSection = ({ language = 'en' }) => {
  const isArabic = language === 'ar';
  const text = content[language].features;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 ${isArabic ? 'rtl' : ''}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{text.title}</h2>
          <p className="text-xl text-gray-600">{text.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {text.points.map((point, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out p-6 ${isArabic ? 'rtl' : ''}`}
            >
              <div className={`flex items-start gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0">
                  <point.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{point.title}</h3>
                  <p className="text-gray-600">{point.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection ;