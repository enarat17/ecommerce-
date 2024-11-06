"use client";
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Globe, Users, FileText, Phone, Mail, Facebook, Twitter, Instagram, PhoneCall } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Footer() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const contactInfo = {
    email: 'challengers2030@gmail.com',
    mobile: '+966506049133',
    whatsapp: '+966506049133',
    facebook: 'https://www.facebook.com/',
    twitter: 'https://twitter.com/',
    instagram: 'https://www.instagram.com/',
  }

  const content = {
    en: {
      about: "About Us",
      support: "Support",
      terms: "Terms and Conditions",
      privacy: "Privacy Policy",
      contact: "Contact Us",
      follow: "Follow Us",
      team: "Team",
      clients: "Clients",
      contactLinks: [
        { icon: PhoneCall, text: 'WhatsApp', link: `https://wa.me/${contactInfo?.whatsapp}` },
        { icon: Phone, text: 'Mobile', link: `tel:${contactInfo?.mobile}` },
        { icon: Mail, text: 'Mail', link: `mailto:${contactInfo?.email}` }
      ],
      socialLinks: [
        { icon: Facebook, link: contactInfo?.facebook },
        { icon: Twitter, link: contactInfo?.twitter },
        { icon: Instagram, link: contactInfo?.instagram }
      ],
      companyLinks: [
        { link: '/team', text: 'Team' },
        { link: '/client-list', text: 'Clients' },
        { link: '/about-us', text: 'About Us' },
        { link: '/profile', text: 'Profile' },
      ],
      supportLinks: [
        { link: '/terms-conditions', text: 'Terms & Conditions' },
        { link: '/privacy-policy', text: 'Privacy Policy' },
        { link: '/contact-us', text: 'Contact Us' },
        { link: '/join-us', text: 'Join Us' },
      ]
    },
    ar: {
      about: "من نحن",
      support: "الدعم",
      terms: "الشروط والأحكام",
      privacy: "سياسة الخصوصية",
      contact: "اتصل بنا",
      follow: "تابعنا",
      team: "فريق العمل",
      clients: "العملاء",
      contactLinks: [
        { icon: PhoneCall, text: 'واتساب', link: `https://wa.me/${contactInfo?.whatsapp}` },
        { icon: Phone, text: 'جوال', link: `tel:${contactInfo?.mobile}` },
        { icon: Mail, text: 'بريد', link: `mailto:${contactInfo?.email}` }
      ],
      socialLinks: [
        { icon: Facebook, link: contactInfo?.facebook },
        { icon: Twitter, link: contactInfo?.twitter },
        { icon: Instagram, link: contactInfo?.instagram }
      ],
      companyLinks: [
        { link: '/team', text: 'فريق العمل' },
        { link: '/client-list', text: 'العملاء' },
        { link: '/about-us', text: 'من نحن' },
        { link: '/profile', text: 'الملف التعريفي' },
      ],
      supportLinks: [
        { link: '/terms-conditions', text: 'الشروط والأحكام' },
        { link: '/privacy-policy', text: 'سياسة الخصوصية' },
        { link: '/contact-us', text: 'اتصل بنا' },
        { link: '/join-us', text: 'انضم الينا' },
      ]
    }
  };

  const localeContent = isRTL ? content.ar : content.en;

  return (
    <footer className={`bg-unitedPrimary w-full text-white/90 py-3 ${isRTL && 'text-right'}`}>
      <div className="container mx-auto px-4">
        {/* Grid for larger screens */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className={`font-semibold mb-4 flex items-center ${isRTL && 'flex-row-reverse'}`}>
              <Globe className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
              {localeContent.about}
            </h2>
            <ul>
              {localeContent.companyLinks.map(({ link, text }, index) => (
                <li key={index}>
                  <Link href={link} className="block mb-2 hover:text-unitedSecondary/75">{text}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h2 className={`font-semibold mb-4 flex items-center ${isRTL && 'flex-row-reverse'}`}>
              <FileText className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
              {localeContent.support}
            </h2>
            <ul>
              {localeContent.supportLinks.map(({ link, text }, index) => (
                <li key={index}>
                  <Link href={link} className="block mb-2 hover:text-unitedSecondary/75">{text}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="font-semibold mb-4">{localeContent.follow}</h2>
            <div className={`flex flex-col w-full ${isRTL ? 'items-end':'items-start'} space-y-4`}>
              {localeContent.socialLinks.map(({ icon: Icon, link }, index) => (
                <Link key={index} href={link} className="hover:text-unitedSecondary/75">
                  <Icon size={24} />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="font-semibold mb-4">{localeContent.contact}</h2>
            <ul>
              {localeContent.contactLinks.map(({ icon: Icon, text, link }, index) => (
                <li key={index}>
                  <Link href={link} className={`mb-2 hover:text-unitedSecondary/75 flex items-center ${isRTL && 'flex-row-reverse'}`}>
                    <Icon className={`${isRTL ? 'ml-2' : 'mr-2'}`} size={16} />
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Accordion for smaller screens */}
        <div className="md:hidden w-full">
          <Accordion type="single" collapsible className="w-full" dir={isRTL ? "rtl" : "ltr"}>
            {/* About Section */}
            <AccordionItem value="about">
              <AccordionTrigger className={`font-semibold flex items-center cursor-pointer [&[data-state=open]>div>svg]:rotate-180 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Globe className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {localeContent.about}
                </div>
              </AccordionTrigger>
              <AccordionContent className={`mt-2 space-y-2 ${isRTL ? 'pr-4' : 'pl-4'}`}>
                {localeContent.companyLinks.map(({ link, text }, index) => (
                  <Link key={index} href={link} className="block hover:text-unitedSecondary/75">{text}</Link>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Support Section */}
            <AccordionItem value="support">
              <AccordionTrigger className={`font-semibold flex items-center cursor-pointer [&[data-state=open]>div>svg]:rotate-180 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <FileText className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {localeContent.support}
                </div>
              </AccordionTrigger>
              <AccordionContent className={`mt-2 space-y-2 ${isRTL ? 'pr-4' : 'pl-4'}`}>
                {localeContent.supportLinks.map(({ link, text }, index) => (
                  <Link key={index} href={link} className="block hover:text-unitedSecondary/75">{text}</Link>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Follow Section */}
            <AccordionItem value="follow">
              <AccordionTrigger className={`font-semibold flex items-center cursor-pointer [&[data-state=open]>div>svg]:rotate-180 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Users className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {localeContent.follow}
                </div>
              </AccordionTrigger>
              <AccordionContent className={`mt-2 ${isRTL ? 'pr-4' : 'pl-4'}`}>
                <div className={`flex ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                  {localeContent.socialLinks.map(({ icon: Icon, link }, index) => (
                    <Link key={index} href={link} className="hover:text-unitedSecondary/75">
                      <Icon size={24} />
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Contact Section */}
            <AccordionItem value="contact">
              <AccordionTrigger className={`font-semibold flex items-center cursor-pointer [&[data-state=open]>div>svg]:rotate-180 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Phone className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {localeContent.contact}
                </div>
              </AccordionTrigger>
              <AccordionContent className={`mt-2 space-y-2 ${isRTL ? 'pr-4' : 'pl-4'}`}>
                {localeContent.contactLinks.map(({ icon: Icon, text, link }, index) => (
                  <Link key={index} href={link} className={`block hover:text-unitedSecondary/75 ${isRTL ? 'text-right' : ''}`}>
                    <Icon size={16} className={`${isRTL ? 'ml-2' : 'mr-2'} inline`} />
                    {text}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </footer>
  );
}