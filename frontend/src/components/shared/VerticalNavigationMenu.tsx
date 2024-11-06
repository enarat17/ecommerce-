import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import {Link} from '@/i18n/routing';

interface MenuItem {
  nameEn: string;
  nameAr: string;
  link: string;
}

interface VerticalNavMenuProps {
  menuName: string;
  items: MenuItem[];
  parentLink: string;
  rtl: boolean;
}

export default function VNavMenu({ menuName, items, parentLink, rtl }: VerticalNavMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
    const handleMouseEnter = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsOpen(true);
    };
  
    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 200);
    };
  
    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);
  
    return (
      <div 
        className={`relative ${rtl ? 'rtl' : 'ltr'}`} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <nav className="text-sm font-semibold px-2 py-2 rounded-md text-white hover:bg-slate-100/50">
          <div className={`flex items-center ${rtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <button 
              ref={buttonRef}
              className={`flex items-center hover:text-gray-800 ${rtl ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <span>{menuName}</span>
              <ChevronDown size={16} className={`mx-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </nav>
        
        {isOpen && (
          <motion.div 
            ref={menuRef}
            className={`absolute mt-1 p-2 bg-slate-200 rounded-md shadow-md z-50 transition-all duration-300 ease-in ${rtl ? 'right-0' : 'left-0'}`}
            style={{ 
              top: '100%',
              minWidth: buttonRef.current ? buttonRef.current.offsetWidth : 'auto',
              maxWidth: '500px', // Adjust this value as needed
            }}
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-2">
              <ul>
                {items.map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={item.link} 
                      className="block p-2 hover:bg-unitedPrimary hover:text-slate-200 rounded-md text-unitedPrimary font-medium transition-all duration-200 ease-out"
                    >
                      <motion.div
                        className="flex items-center"
                        whileHover={{ x: rtl ? -5 : 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <ChevronRight size={16} className={`flex-shrink-0 ${rtl ? 'ml-2 rotate-180' : 'mr-2'} transition-transform group-hover:translate-x-1`} />
                        <span className="flex-grow">{rtl ? item.nameAr : item.nameEn}</span>
                      </motion.div>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link 
                    href={parentLink} 
                    className="block p-2 hover:bg-unitedPrimary hover:text-slate-200 rounded-md text-unitedPrimary font-medium transition-all duration-200 ease-out"
                  >
                    <motion.div
                      className="flex items-center"
                      whileHover={{ x: rtl ? -5 : 5 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <ChevronRight size={16} className={`flex-shrink-0 ${rtl ? 'ml-2 rotate-180' : 'mr-2'} transition-transform group-hover:translate-x-1`} />
                      <span className="flex-grow">{rtl ? 'عرض المزيد' : 'Show More'}</span>
                    </motion.div>
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    );
}