'use client'
import React from 'react';
import { Link, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import NavigationWrapper from "@/components/shared/NavigationWrapper"
import HeaderSection from "@/components/shared/HeaderSection"
import { UserCircle, Wallet } from 'lucide-react'
import { useQuery } from '@tanstack/react-query';
import { fetchHeaderImages } from "@/lib/api/settingsRequests";

const cards = [
  {
    id: 'hr-store',
    title: { en: 'HR Store', ar: 'متجر الموارد البشرية' },
    description: { 
      en: 'Find HR-related products and services to manage your workforce effectively.',
      ar: 'اعثر على منتجات وخدمات متعلقة بالموارد البشرية لإدارة القوى العاملة بفعالية.'
    },
    icon: UserCircle,
    link: '/store/hr-store'
  },
  {
    id: 'financial-store',
    title: { en: 'Financial Store', ar: 'المتجر المالي' },
    description: {
      en: 'Discover financial products and tools to optimize your business finances.',
      ar: 'اكتشف المنتجات والأدوات المالية لتحسين الشؤون المالية لعملك.'
    },
    icon: Wallet,
    link: '/store/financial-store'
  }
]

export default function Store() {
    const router = useRouter()
    const locale = useLocale();
    const isArabic = locale === 'ar'

    const { data: headerImages, isFetched } = useQuery({
        queryKey: ['headerImages'],
        queryFn: fetchHeaderImages,
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
                pageTitle={{en:'Store',ar:'المتجر'}} 
                pageImage={isFetched && headerImages.storePage} 
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