import { useEffect } from 'react';
import Image from 'next/image';
import {Link} from '@/i18n/routing';
import { Button } from '@/components/ui/button'
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface IntroductionProps {
  locale: string;
  text: string;
  image: string;
}

export default function Introduction({ locale, text,image }: IntroductionProps) {
  const isRTL = locale === 'ar';
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative bg-unitedPrimary py-16 px-8 flex items-center justify-center min-h-[69vh] overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={`/imgs/images/${image}`}
          alt="Background"
          layout="fill"
          objectFit='cover'
          className="opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-unitedSecondary/40 to-indigo-500/40" />
      </div>
      
      <div className="relative z-10 text-center mx-3 ">
        <motion.div variants={itemVariants}>
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-relaxed mb-10 rtl-text">
            {text}
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Link href="/services">
            <Button 
              className="text-unitedPrimary bg-white p-4 font-semibold text-xl w-[240px] h-[60px] hover:bg-unitedSecondary"
            >
              {isRTL && <ArrowLeft className="mr-2" />}
              {isRTL ? 'خدماتنا' : 'Our Services'}
              {!isRTL &&<ArrowRight className="ml-2" />}
            </Button>
          </Link>
          <Link href="/profile" locale={isRTL ? 'ar' : 'en'}>
            <Button 
              className="p-4 bg-transparent border-2 text-unitedSecondary border-unitedSecondary font-semibold text-xl w-[240px] h-[60px] hover:bg-white/10"
            >
              {isRTL && <ArrowLeft className="mr-2" />}
              {isRTL ? 'معلومات عنا' : 'About Us'}
              {!isRTL &&<ArrowRight className="ml-2" />}
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}