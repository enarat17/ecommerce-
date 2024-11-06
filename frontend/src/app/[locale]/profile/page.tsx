'use client';
import {useState} from 'react';
import NavigationWrapper from "@/components/shared/NavigationWrapper";
import Footer from "@/components/shared/Footer";
import HTMLFlipBook from "react-pageflip";
import { Download,Eye } from 'lucide-react';
import {useLocale} from 'next-intl';
import { Button } from '@/components/ui/button';
import {motion} from 'framer-motion';

export default function Profile(){
    const [flipBookOpen,setFlipBookOpen] = useState(false);
    const locale = useLocale();
    const isRtl = locale === 'ar';

    const downloadButtonClick = ()=>{
        console.log('download')
    }
    return (
        <body className="h-screen flex flex-col items-center justify-between">
        <NavigationWrapper />
        <section className='h-[80vh] flex flex-col justify-center items-center'>
            <motion.h1 
                animate={{y:0,opacity:1}}
                initial={{y:20,opacity:0}}
                transition={{duration:.3}}
                className='font-bold text-3xl text-unitedPrimary mb-4'>{isRtl ? 'الملف التعريفي للشركة':'Company prfile'}</motion.h1>
            <motion.div 
                animate={{y:0,opacity:1}}
                initial={{y:20,opacity:0}}
                transition={{duration:.3,delay:.3}}
                className={`bg-white px-8 py-4 mt-4 w-[500px] rounded-xl shadow-md flex flex-row justify-between`}>
                <Button className={`flex justify-between w-[175px] bg-unitedPrimary hover:bg-unitedPrimary/85 ${isRtl ? 'flex-row':'flex-row-reverse'}`} onClick={()=>setFlipBookOpen(true)}>
                <Eye size={20} />{isRtl ? 'عرض الملف':'view profile'}
                </Button>
                <Button className={`flex justify-between w-[175px] bg-unitedPrimary hover:bg-unitedPrimary/85 ${isRtl ? 'flex-row':'flex-row-reverse'}`}  onClick={downloadButtonClick}>
                    <Download size={20} />{isRtl ? 'تحميل الملف':'Download profile'}
                </Button>
            </motion.div>
        </section>
        <Footer />
        </body>
    );
}