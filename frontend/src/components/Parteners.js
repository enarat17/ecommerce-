
const content = {
  en: {
    partners: {
      title: "Trusted by Industry Leaders",
      subtitle: "We collaborate with the world's leading electrical manufacturers and suppliers",
      logos: ["Schneider Electric", "ABB", "Siemens", "Eaton", "Legrand", "Philips"]
    },
    
  },
  ar: {
    partners: {
      title: "موثوق به من قادة الصناعة",
      subtitle: "نتعاون مع كبرى الشركات المصنعة والموردين للمعدات الكهربائية في العالم",
      logos: ["شنايدر إلكتريك", "آي بي بي", "سيمنز", "إيتون", "ليجراند", "فيليبس"]
    },
  }
};

export const Partners = ({ language = 'en' }) => {
  const isArabic = language === 'ar';
  const text = content[language].partners;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 ${isArabic ? 'rtl' : ''}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{text.title}</h2>
          <p className="text-xl text-gray-600">{text.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {text.logos.map((logo, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <div className="w-24 h-24 mx-auto">
                <img 
                  src={`/api/placeholder/96/96`} 
                  alt={`${logo} logo`}
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



export default Partners;