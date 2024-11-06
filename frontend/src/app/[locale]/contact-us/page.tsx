// "use client";
// import { Mail, Facebook, Phone, MessageCircle, Home, MapPin, Clock } from 'lucide-react';
// import HeaderSection from '@/components/shared/HeaderSection';
// import NavigationWrapper from '@/components/shared/NavigationWrapper';
// import InquiryForm from '@/components/InquiryForm';
// import { motion } from 'framer-motion';
// import { Link } from '@/i18n/routing';
// import { useQuery} from '@tanstack/react-query';
// import { fetchContactUsInfo } from '@/lib/api/generalRequests';
// import { useTranslations } from 'next-intl';
// import LoadingSpinner from '@/components/shared/LoadingSpinner';
// import {useLocale} from 'next-intl';

// export default function ContactUs() {
//   const t = useTranslations('contact-us');
//   const locale = useLocale();
//   const isRtl = locale === 'ar';
//   const{data:contactInfo,isFetched}=useQuery({
//     queryKey: ['contactUsInfo'],
//     queryFn:fetchContactUsInfo,
//     staleTime: 1000*60*60,
//     gcTime: 1000*60*60*24
//   })


//   const sendWhatsButton = (rtl : boolean) => {
//     const phoneNumber = `+966${contactInfo.phone}`; // Your phone number in international format
//     if (rtl) {
//       window.open(`https://wa.me/${phoneNumber}`, '_blank');
//     } else {
//       window.open(`https://wa.me/${phoneNumber}`, '_blank');
//     }
//   }

//   if (!isFetched) {
//     return <LoadingSpinner />
//   }



//   return (
//     <>
//         <NavigationWrapper />
//         <HeaderSection pageTitle={{en:'Contact us', ar:'اتصل بنا'}} pageImage={isFetched && contactInfo.coverImage} breadCrumbArr={{en:[],ar:[]}} breadCrumbLinkArr={[]} />
//         {isFetched && <div className="my-4 px-4 py-8 w-[90vw]">
//             <motion.h1 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, ease: "easeOut" }}
//               className="text-4xl font-bold mb-6 text-center text-unitedPrimary ">{t('title')}</motion.h1>
//             <div className='flex flex-row gap-8 justify-center flex-wrap'>
//             <div className="flex flex-col justify-center gap-8 text-center">
//               <motion.div 
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.5 , ease: "easeOut"}}
//                   className="flex flex-col items-center w-[300px] bg-white p-6 rounded-lg shadow-lg">
//                   <Link href={`mailto:${contactInfo.email}`}>
//                     <Mail className="text-red-700 hover:text-red-800" size={48} />
//                   </Link>
//                 <h2 className="text-xl font-semibold text-unitedPrimary mt-4">{t('Email')}</h2>
//                 <p className="text-gray-600 mt-2 font-medium">{contactInfo.email}</p>
//               </motion.div>
//               <motion.div 
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.5 , ease: "easeOut"}}
//                   className="flex flex-col items-center w-[300px] bg-white p-6 rounded-lg shadow-lg">
//                   <Link href={contactInfo.linkedin}>
//                     <Facebook className="text-blue-700 hover:text-blue-800" size={48} />
//                   </Link>
//                 <h2 className="text-xl font-semibold text-unitedPrimary mt-4">{t('Facebook')}</h2>
//                 <p className="text-gray-600 mt-2 font-medium">{t('FacebookMessage')}</p>
//               </motion.div>
//               <motion.div 
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.5 , ease: "easeOut"}}
//                   className="flex flex-col items-center w-[300px] bg-white p-6 rounded-lg shadow-lg">
//                   <button onClick={()=>sendWhatsButton(isRtl)}>
//                     <MessageCircle className="text-green-600 hover:text-green-800" size={48} />
//                   </button>
//                 <h2 className="text-xl font-semibold text-unitedPrimary mt-4">{t('Whatsapp')}</h2>
//                 <p className="text-gray-600 mt-2 font-medium">{t('WhatsappMessage')}</p>
//               </motion.div>
//               <motion.div 
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.5 , ease: "easeOut"}}
//                   className="flex flex-col items-center w-[300px] bg-white p-6 rounded-lg shadow-lg">
//                   <Link href={`tel:${contactInfo.phone}`}>
//                     <Phone className="text-slate-600 hover:text-slate-800" size={48} />
//                   </Link>
//                 <h2 className="text-xl font-semibold text-unitedPrimary mt-4">{t('Phone')}</h2>
//                 <p className="text-gray-600 mt-2 font-medium">Call us on +20{contactInfo.phone}</p>
//               </motion.div>
//             </div>
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, ease: "easeOut" }}
//               className="flex flex-col bg-white shadow-md rounded-xl items-center py-4 px-12">
//               <p className="text-lg font-medium leading-relaxed text-unitedPrimary text-center mb-8">{t('InquiryTitle')}</p>
//               <InquiryForm locale={locale} />
//             </motion.div>
//             {/* <motion.div
//               className="bg-white w-[500px] p-6 rounded-xl shadow-md flex flex-col text-start justify-center"
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//             >
//               <motion.h1
//                 className="text-2xl font-bold mb-6 text-unitedPrimary py-2"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 {t("CompanyInfo")}
//               </motion.h1>
//               <motion.div
//                 className="flex items-center text-lg leading-relaxed font-medium text-gray-700 mb-8"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <Clock className="mr-2" />
//                 <span>Opening hours</span>
//               </motion.div>

//               <motion.div
//                 className="flex items-center text-lg leading-relaxed font-medium text-gray-700 mb-8"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.6 }}
//               >
//                 <Clock className="mr-2" />
//                 <span>Monday - Friday: 9am - 5pm</span>
//               </motion.div>

//               <motion.div
//                 className="flex items-center text-lg leading-relaxed font-medium text-gray-700 mb-8"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.7 }}
//               >
//                 <MapPin className="mr-2" />
//                 <span>123 Main St, Anytown USA</span>
//               </motion.div>

//               <motion.div
//                 className="flex items-center text-lg leading-relaxed font-medium text-gray-700 mb-8"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.8 }}
//               >
//                 <Home className="mr-2" />
//                 <span>Postal code: 12345</span>
//               </motion.div>
//             </motion.div> */}
//           </div>
//         </div>}
//     </>
//   );
// }

'use client'
import React from 'react';
import { Link, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import NavigationWrapper from "@/components/shared/NavigationWrapper"
import HeaderSection from "@/components/shared/HeaderSection"
import { Lightbulb, HelpCircle } from 'lucide-react'
import { useQuery } from '@tanstack/react-query';
import { fetchHeaderImages } from "@/lib/api/settingsRequests";
import { fetchContactUsInfo } from '@/lib/api/generalRequests';

const cards = [
  {
    id: 'complient',
    title: { en: 'Complients & Suggestions', ar: 'الشكاوى والاقتراحات' },
    description: { 
      en: 'Share your thoughts and suggestions with us.',
      ar: 'شارك أفكارك واقتراحاتك معنا.'
    },
    icon: Lightbulb,
    link: '/contact-us/complient-suggestions'
  },
  {
    id: 'query',
    title: { en: 'Queries & Questions', ar: 'الأسئلة والاستفسارات' },
    description: {
      en: 'Get answers to your questions and concerns.',
      ar: 'احصل على الإجابات على أسئلتك ومخاوفك.'
    },
    icon: HelpCircle,
    link: '/contact-us/query'
  }
]

export default function ContactUs() {
    const router = useRouter()
    const locale = useLocale();
    const isArabic = locale === 'ar'

    const{data:contactInfo,isFetched}=useQuery({
          queryKey: ['contactUsInfo'],
          queryFn:fetchContactUsInfo,
          staleTime: 1000*60*60,
          gcTime: 1000*60*60*24
        })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    }

    return (
        <>
            <NavigationWrapper />
            <HeaderSection 
                pageTitle={{en:'Contact Us',ar:'تواصل معنا'}} 
                pageImage={isFetched && contactInfo.coverImage} 
                breadCrumbArr={{en:[],ar:[]}} 
                breadCrumbLinkArr={[]}
            />
            <div className="flex justify-center items-center py-8 bg-transparent w-full px-4 sm:px-6 lg:px-8">
                <motion.div 
                    className="w-full max-w-7xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {cards.map((card) => (
                            <motion.div key={card.id} variants={cardVariants} className="w-full navbar:h-[45vh]">
                                <Link href={card.link} className="block h-full">
                                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg h-full flex flex-col justify-between transition-transform duration-300 hover:scale-105">
                                        <div className={`flex flex-col ${isArabic ? 'items-end' : 'items-start'}`}>
                                            <card.icon className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 text-unitedPrimary" />
                                            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-unitedPrimary ${isArabic ? 'text-right' : 'text-left'}`}>
                                                {card.title[isArabic ? 'ar' : 'en']}
                                            </h2>
                                            <p className={`text-gray-600 text-base sm:text-lg ${isArabic ? 'text-right' : 'text-left'}`}>
                                                {card.description[isArabic ? 'ar' : 'en']}
                                            </p>
                                        </div>
                                        <div className={`text-unitedPrimary font-semibold text-base sm:text-lg mt-4 sm:mt-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                                            {isArabic ? 'اكتشف المزيد' : 'Learn More'}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </>
    );
}
