"use client";
import { Home, Mail, Facebook, MessageCircle, Twitter } from 'lucide-react';
import { Link } from '@/i18n/routing'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { useLocale } from 'next-intl';

interface HeaderSectionProps {
    pageTitle: {
        en: string;
        ar: string;
    };
    pageImage: string;
    breadCrumbArr: {
        en: string[];
        ar: string[];
    }
    breadCrumbLinkArr: string[];
}

export default function HeaderSection({ pageTitle, pageImage, breadCrumbArr, breadCrumbLinkArr }: HeaderSectionProps) {
    const lang = useLocale();
    const isRTL = lang === 'ar';
    const bgImageStyle = {
        backgroundImage: `url(/imgs/images/${pageImage})`,
        backgroundSize: 'cover',
    }

    // Reverse the arrays if isRTL is true
    const displayBreadCrumbArr = isRTL ? [...breadCrumbArr[lang as keyof typeof breadCrumbArr]].reverse() : breadCrumbArr[lang as keyof typeof breadCrumbArr];
    const displayBreadCrumbLinkArr = isRTL ? [...breadCrumbLinkArr].reverse() : breadCrumbLinkArr;

    return (
        <div className={`w-full h-[100px] navbar:h-[150px] shadow-md text-center flex flex-col justify-around`} style={bgImageStyle}>
            <div className={`w-full flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <Link href={`/`}><p className="text-white font-medium text-sm p-3 hover:text-sky-300" >{isRTL ? "الصفحة الرئيسية":"Home"}</p></Link>
                <p className="text-white font-bold text-md">|</p>
                <div className={`${isRTL ? 'mr-1' : 'ml-1'}`}>
                    <Breadcrumb>
                        <BreadcrumbList>
                            {displayBreadCrumbArr.map((item, index) => (
                                <BreadcrumbItem key={item}>
                                    <Link href={`/${displayBreadCrumbLinkArr[index]}`} className="text-white font-medium hover:text-sky-300">{item}</Link>
                                    {index < displayBreadCrumbArr.length - 1 && <p className="text-white font-bold text-md">|</p>}
                                </BreadcrumbItem>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <h1 className={`font-bold text-shadow-header text-balance text-lg md:text-2xl navbar:text-4xl mb-8 text-slate-100 ${isRTL && 'rtl-text'}`}>{pageTitle[lang as keyof typeof pageTitle]}</h1>
        </div>
    );
}