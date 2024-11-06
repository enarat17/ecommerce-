import { Button } from "@/components/ui/button"
import { Consultation } from "@/components/types/ConsultationTableColumns"
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from "next/image";

interface FeaturedConsultsProps {
    consults: Consultation[];
    locale: 'en' | 'ar';
}

export default function FeaturedConsults({ consults, locale }: FeaturedConsultsProps) {
    const isRTL = locale === 'ar';

    return (
        <div className={`px-4 py-8 bg-transparent w-full  flex flex-col ${isRTL ? 'rtl' : 'ltr'}`}> 
            <h2 className="text-3xl font-bold mb-8 w-full text-center text-unitedPrimary">
                {isRTL ? 'الاستشارات المتاحة' : 'Available Consults'}
            </h2>
            <div className="flex-grow overflow-x-auto flex items-center">
                <div className="flex flex-nowrap gap-6 pb-4 mx-auto">
                    {consults.map(consult => (
                        <motion.div 
                            key={consult._id} 
                            className="w-80 h-96 perspective-1000 cursor-pointer flex-shrink-0"
                            whileHover={{ rotateY: 180 }}
                            transition={{ duration: 0.6 }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="relative w-full h-full transition-transform duration-500" style={{ transformStyle: 'preserve-3d' }}>
                                {/* Front Side */}
                                <div className="absolute w-full h-full bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-6 backface-hidden">
                                    <Image src={`/imgs/${consult.coverImage}`} alt={consult.title_EN} width={200} height={200} 
                                    className="object-cover w-[200px] h-[200px] rounded-full" />
                                    <h3 className="text-2xl font-semibold mb-4 text-unitedPrimary text-center">
                                        {isRTL ? consult.title_AR : consult.title_EN}
                                    </h3>
                                    {/* <p className="text-gray-600 text-center">
                                        {isRTL ? 'انقر للمزيد من التفاصيل' : 'Click for more details'}
                                    </p> */}
                                </div>
                                {/* Back Side */}
                                <div className="absolute w-full h-full bg-unitedPrimary rounded-lg shadow-lg flex flex-col items-center justify-between p-6 backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
                                    <p className="text-white overflow-hidden text-sm text-center flex-grow">
                                        {isRTL ? consult.description_AR : consult.description_EN}
                                    </p>
                                    <Link href={`en/consults/`} className="w-full mt-4">
                                        <Button className="w-full bg-white hover:bg-gray-100 text-unitedPrimary font-bold py-2 px-4 rounded transition duration-300">
                                            {isRTL ? 'عرض التفاصيل' : 'View Details'}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}