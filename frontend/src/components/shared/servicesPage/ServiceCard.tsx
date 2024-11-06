import Image from "next/image";
import { Link } from '@/i18n/routing';
import { Consultation } from "@/components/types/ConsultationTableColumns";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from '@/components/animations/Dialog';
import { Eye, Download, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface ServiceCardProps {
  service: Consultation;
  serviceType: string;
  isRtl: boolean;
}
export default function ServiceCard({ service, serviceType, isRtl }: ServiceCardProps) {
  const title = isRtl ? service.title_AR : service.title_EN;
  const description = isRtl ? service.description_AR : service.description_EN;
  const viewDetails = isRtl ? "عرض التفاصيل" : "View Details";

  return (
    <motion.div
      className="w-72 h-80 perspective-1000 cursor-pointer flex-shrink-0 "
      whileHover={{ rotateY: 180 }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative w-full h-full transition-transform duration-500" style={{ transformStyle: 'preserve-3d' }}>
        {/* Front Side */}
        <div className="absolute w-full h-full bg-white rounded-lg shadow-lg flex flex-col items-center justify-between p-3 backface-hidden">
          <Image src={`/imgs/images/${service.coverImage}`} alt={service.title_EN} width={200} height={200}
            className="object-cover w-[185px] h-[185px] rounded-full" />
          <h3 className={`text-xl font-semibold mb-2 text-unitedPrimary text-center text-balance ${isRtl && 'rtl-text'} `}>
            {isRtl ? service.title_AR : service.title_EN}
          </h3>
          {/* <p className="text-gray-600 text-center">
                                        {isRTL ? 'انقر للمزيد من التفاصيل' : 'Click for more details'}
                                    </p> */}
        </div>
        {/* Back Side */}
        <div className="absolute w-full h-full bg-unitedPrimary rounded-lg shadow-lg flex flex-col items-center justify-between p-6 backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
          <p className="text-white overflow-y-scroll text-sm text-center flex-grow">
            {isRtl ? service.description_AR : service.description_EN}
          </p>
          <Link href={`/services/${serviceType}/${service.slug}`} className="w-full mt-4">
            <Button className="w-full bg-white hover:bg-gray-300 text-unitedPrimary font-bold py-2 px-4 rounded transition duration-300">
              {isRtl ? 'عرض التفاصيل' : 'View Details'}
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}