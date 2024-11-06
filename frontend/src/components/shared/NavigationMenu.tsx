import { useState, useRef, useEffect } from 'react';
import { ChevronDown,ChevronRight } from 'lucide-react';
import { Consultation } from '@/components/types/ConsultationTableColumns';
import { Link,useRouter } from '@/i18n/routing';
import {motion} from 'framer-motion';

interface NavMenuProps {
  title: string;
  items: Consultation[];
  rtl?: boolean;
}

const categorySlugMapping: Record<string, string> = {
  'Business Services': 'business-services',
  'Accounting Services': 'accounting-services',
  'Auditing Services': 'auditing-services',
  'Financial Services': 'financial-services',
  'HR Services': 'hr-services',
};

const categoryArMapping:Record<string, string> = {
  'خدمات أعمالي':'business-services',
  'خدمات محاسبية':'accounting-services',
  'خدمات مراجعة':'auditing-services',
  'خدمات مالية':'financial-services',
  'خدمات إدارية':'hr-services',
}

export default function NavigationMenu({ title, items, rtl = false }: NavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const directionClass = rtl ? 'rtl' : 'ltr';
  const flexDirection = rtl ? 'flex-row-reverse' : 'flex-row';

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // 300ms delay before closing
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getCategorySlug = (title: string): string => {
    if (rtl) {
      const category = Object.keys(categoryArMapping).find(cat =>
        cat === title
      );
      return category ? categoryArMapping[category] : '';
    } else {
      const category = Object.keys(categorySlugMapping).find(cat => 
        cat.toLowerCase() === title.toLowerCase()
      );
      return category ? categorySlugMapping[category] : '';
    }
  };

  const handleTitleClick = () => {
    const slug = getCategorySlug(title);
    // if (slug) {
      router.push(`/services/${slug}`);
    // }
  };

  return (
    <div className={`relative ${directionClass}`} onMouseLeave={handleMouseLeave}>
      <nav className="text-sm font-semibold px-2 py-2 rounded-md text-white hover:bg-slate-300/50">
        <div className={`flex items-center ${flexDirection}`}>
          <button
            ref={buttonRef}
            className={`flex items-center hover:text-gray-300 ${flexDirection}`}
            onMouseEnter={handleMouseEnter}
            onClick={handleTitleClick}
          >
            <span>{title}</span>
            <ChevronDown size={16} className={`mx-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </nav>
      
      {isOpen && (
        <motion.div 
          ref={menuRef}
          className="fixed left-0 right-0 w-full bg-slate-200 mx-[2px]  rounded-md shadow-md z-50 transition-all duration-300 ease-in"
          style={{ top: '100px' }} // Position the menu just below the 100px tall parent
          onMouseEnter={handleMouseEnter}
          animate={{y: 0, opacity: 1}}
          initial={{y: 50, opacity: 0}}
          transition={{duration: 0.1}}
        >
          <div className="mx-auto py-6 px-4">
            <ul className={`flex flex-wrap ${rtl ? 'justify-start' : 'justify-start'}`}>
              {items.map((item, index) => {
                  const categorySlug = categorySlugMapping[item.category];
                  return(
                <li key={index} className="w-1/4 p-2 ">
                  <Link href={`/services/${categorySlug}/${item.slug}`} 
                  className="block p-2 hover:bg-unitedPrimary hover:text-slate-200 rounded-md text-unitedPrimary font-medium transition-all duration-200 ease-out ">
                    <ChevronRight size={16} className={`inline ${rtl?'rotate-180' : ''}`} /> {rtl ? item.title_AR  : item.title_EN}
                  </Link>
                </li>
                )}
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}