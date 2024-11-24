import { LanguageContext } from "../../context/LanguageContext";
import { useContext } from "react";
import { 
    Zap, 
    Building2, 
    Shield, 
    Sun, 
    Award, 
    Users, 
    Package, 
    CloudLightning,
    Eye,
    CheckCircle
  } from 'lucide-react';


const AboutUsPageComponent = () => {
    const { language } = useContext(LanguageContext);
    const isRtl = language === 'ar';

    const content = {
        en: {
          title: "About Al-Noor Electric Equipment",
          subtitle: "Leading Electrical Solutions in Saudi Arabia",
          introduction: "Established in 1995, Al-Noor has been at the forefront of electrical equipment distribution in the Kingdom of Saudi Arabia.",
          stats: [
            { value: "25+", label: "Years Experience" },
            { value: "5000+", label: "Projects Completed" },
            { value: "1000+", label: "Products" },
            { value: "98%", label: "Client Satisfaction" }
          ],
          vision: {
            title: "Our Vision",
            content: "To become the most trusted name in electrical equipment solutions across the Middle East, delivering innovation and reliability to every project."
          },
          expertise: {
            title: "Our Expertise",
            points: [
              { text: "Premium Electrical Equipment", icon: CloudLightning },
              { text: "Industrial Solutions", icon: Building2 },
              { text: "Smart Building Technologies", icon: Shield },
              { text: "Renewable Energy Systems", icon: Sun }
            ]
          },
          products: {
            title: "Product Range",
            content: "From industrial-grade switchgear to smart home solutions, we offer comprehensive electrical equipment including transformers, circuit breakers, control systems, and renewable energy components."
          },
          quality: {
            title: "Quality Commitment",
            content: "We partner with global manufacturers and maintain ISO 9001:2015 certification, ensuring every product meets international safety and quality standards."
          }
        },
        ar: {
          title: "عن النور للمعدات الكهربائية",
          subtitle: "حلول كهربائية رائدة في المملكة العربية السعودية",
          introduction: "منذ تأسيسها في عام 1995، كانت النور في طليعة توزيع المعدات الكهربائية في المملكة العربية السعودية.",
          stats: [
            { value: "+25", label: "سنوات من الخبرة" },
            { value: "+5000", label: "مشروع منجز" },
            { value: "+1000", label: "منتج" },
            { value: "98%", label: "رضا العملاء" }
          ],
          vision: {
            title: "رؤيتنا",
            content: "أن نصبح الاسم الأكثر موثوقية في حلول المعدات الكهربائية في الشرق الأوسط، ونقدم الابتكار والموثوقية لكل مشروع."
          },
          expertise: {
            title: "خبراتنا",
            points: [
              { text: "معدات كهربائية ممتازة", icon: CloudLightning },
              { text: "حلول صناعية", icon: Building2 },
              { text: "تقنيات المباني الذكية", icon: Shield },
              { text: "أنظمة الطاقة المتجددة", icon: Sun }
            ]
          },
          products: {
            title: "مجموعة المنتجات",
            content: "من معدات التحويل الصناعية إلى حلول المنازل الذكية، نقدم معدات كهربائية شاملة تشمل المحولات وقواطع الدوائر وأنظمة التحكم ومكونات الطاقة المتجددة."
          },
          quality: {
            title: "التزام الجودة",
            content: "نتشارك مع مصنعين عالميين ونحافظ على شهادة الآيزو 9001:2015، مما يضمن تلبية كل منتج للمعايير الدولية للسلامة والجودة."
          }
        }
      };

      const text = content[language];
    return (
        <section className={`w-full py-16 ${isRtl ? 'text-right' : 'text-left'} bg-gradient-to-r ${isRtl ? 'from-gray-900/90 to-blue-900/90' : 'from-blue-900/90 to-gray-900/90'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={` rounded-3xl p-4 md:p-8 text-white shadow-xl`}>
          
          {/* Header Section with Animated Background */}
          <div className="text-center mb-12 relative overflow-hidden rounded-2xl p-8">
            <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm"></div>
            <Zap className="w-12 h-12 mx-auto mb-4 animate-bounce text-yellow-400" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 relative">{text.title}</h1>
            <p className="text-lg md:text-xl text-gray-300 relative">{text.subtitle}</p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {text.stats.map((stat, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <p className="text-2xl md:text-3xl font-bold text-blue-400">{stat.value}</p>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Introduction with Icon */}
          <div className="mb-12 flex items-center gap-4">
            <Users className="w-8 h-8 text-blue-400 flex-shrink-0" />
            <p className="text-lg leading-relaxed">{text.introduction}</p>
          </div>

          {/* Vision with Animated Icon */}
          <div className="mb-12 bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <Eye className="w-8 h-8 text-blue-400 animate-pulse" />
              <h2 className="text-2xl font-semibold">{text.vision.title}</h2>
            </div>
            <p className="text-gray-300">{text.vision.content}</p>
          </div>

          {/* Expertise Grid with Icons */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Award className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-semibold">{text.expertise.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {text.expertise.points.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <div key={index} className="bg-white/10 rounded-lg p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group">
                    <IconComponent className="w-8 h-8 mb-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-gray-100">{point.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Products Section with Icon */}
          <div className="mb-12 bg-white/5 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <Package className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-semibold">{text.products.title}</h2>
            </div>
            <p className="text-gray-300">{text.products.content}</p>
          </div>

          {/* Quality Section with Animated Border */}
          <div className="border border-white/20 rounded-xl p-6 relative overflow-hidden group hover:border-blue-400 transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-semibold">{text.quality.title}</h2>
            </div>
            <p className="text-gray-300 relative">{text.quality.content}</p>
          </div>
        </div>
      </div>
    </section>
    )
}


export default AboutUsPageComponent;