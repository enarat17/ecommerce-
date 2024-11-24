import React, { useState,useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Building,
  MessageSquare,
  User,
  Loader2
} from 'lucide-react';

const ContactPageComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const {language} = useContext(LanguageContext);
  const isRtl = language === 'ar';

  const content = {
    en: {
      title: "Contact Us",
      subtitle: "Get in Touch with Al-Noor Electric",
      description: "Have questions about our electrical equipment or services? We're here to help. Contact us through any of these channels or fill out the form below.",
      form: {
        title: "Send us a Message",
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        message: "Your Message",
        submit: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "Error sending message. Please try again."
      },
      contact: {
        title: "Contact Information",
        phone: "+966 12 345 6789",
        email: "info@alnoor-electric.sa",
        address: "King Fahd Road, Riyadh 11564, Saudi Arabia",
        hours: "Sunday - Thursday: 8:00 AM - 6:00 PM"
      },
      help: {
        title: "How Can We Help?",
        sales: "Sales Inquiries",
        support: "Technical Support",
        careers: "Career Opportunities"
      }
    },
    ar: {
      title: "اتصل بنا",
      subtitle: "تواصل مع النور للمعدات الكهربائية",
      description: "هل لديك أسئلة حول معداتنا الكهربائية أو خدماتنا؟ نحن هنا للمساعدة. اتصل بنا عبر أي من هذه القنوات أو املأ النموذج أدناه.",
      form: {
        title: "أرسل لنا رسالة",
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        message: "رسالتك",
        submit: "إرسال الرسالة",
        sending: "جاري الإرسال...",
        success: "تم إرسال الرسالة بنجاح!",
        error: "خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى."
      },
      contact: {
        title: "معلومات الاتصال",
        phone: "+966 12 345 6789",
        email: "info@alnoor-electric.sa",
        address: "طريق الملك فهد، الرياض 11564، المملكة العربية السعودية",
        hours: "الأحد - الخميس: 8:00 صباحاً - 6:00 مساءً"
      },
      help: {
        title: "كيف يمكننا المساعدة؟",
        sales: "استفسارات المبيعات",
        support: "الدعم الفني",
        careers: "الوظائف"
      }
    }
  };

  const text = content[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormStatus('success');
    e.target.reset();
  };

  return (
    <section className={`w-full py-16 ${isRtl ? 'text-right' : 'text-left'} bg-gradient-to-r ${isRtl ? 'from-gray-900/90 to-blue-900/90' : 'from-blue-900/90 to-gray-900/90'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={` rounded-3xl p-4 md:p-8 text-white `}>
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{text.title}</h1>
            <p className="text-xl text-gray-300 mb-4">{text.subtitle}</p>
            <p className="text-gray-400 max-w-2xl mx-auto">{text.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information Side */}
            <div className="space-y-8">
              {/* Contact Info Cards */}
              <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <Building className="w-6 h-6 text-blue-400" />
                  {text.contact.title}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 group">
                    <div className="p-3 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                      <Phone className="w-5 h-5 text-blue-400" />
                    </div>
                    <p>{text.contact.phone}</p>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="p-3 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <p>{text.contact.email}</p>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="p-3 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <p>{text.contact.address}</p>
                  </div>

                  <div className="flex items-center gap-3 group">
                    <div className="p-3 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                      <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <p>{text.contact.hours}</p>
                  </div>
                </div>
              </div>

              {/* Help Categories */}
              <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                  {text.help.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-500/10 rounded-lg text-center hover:bg-blue-500/20 transition-colors duration-300 cursor-pointer">
                    {text.help.sales}
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-lg text-center hover:bg-blue-500/20 transition-colors duration-300 cursor-pointer">
                    {text.help.support}
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-lg text-center hover:bg-blue-500/20 transition-colors duration-300 cursor-pointer">
                    {text.help.careers}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Side */}
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Send className="w-6 h-6 text-blue-400" />
                {text.form.title}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {text.form.name}
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-gray-400 absolute top-3 left-3" />
                    <input
                      type="text"
                      required
                      className="w-full bg-white/10 border border-white/10 rounded-lg py-3 px-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {text.form.email}
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-gray-400 absolute top-3 left-3" />
                    <input
                      type="email"
                      required
                      className="w-full bg-white/10 border border-white/10 rounded-lg py-3 px-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {text.form.phone}
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-gray-400 absolute top-3 left-3" />
                    <input
                      type="tel"
                      required
                      className="w-full bg-white/10 border border-white/10 rounded-lg py-3 px-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {text.form.message}
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-white/10 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  ></textarea>
                </div>

                {formStatus && (
                  <div className={`p-4 rounded-lg ${formStatus === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                    {formStatus === 'success' ? text.form.success : text.form.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3 px-6 font-medium flex items-center justify-center gap-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {text.form.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {text.form.submit}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPageComponent;