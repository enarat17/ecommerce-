'use client'
import * as React from "react"
import { cn } from "@/lib/utils"
import { Link } from "@/i18n/routing";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import { useUserContext } from "@/lib/Providers/UserProvider";
import {NavigationMenuLink } from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Store, User, Menu, LogIn, UserPlus ,Languages, LogOut, ShoppingCart, ShoppingBag} from 'lucide-react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { userLogout } from "@/lib/api/userApi";
import { fetchConsults } from "@/lib/api/consultsApi";
import {usePathname,useRouter} from '@/i18n/routing';
import NavigationMenu from "@/components/shared/NavigationMenu";
import VNavMenu from "@/components/shared/VerticalNavigationMenu";
import AccordionMenu from "@/components/shared/AccordionMenu";


interface UserMenuProps {
  user: any;
  logout: () => void;
}
const UserMenu = ({ user, logout }: UserMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <User size={36} className="text-white mr-l p-1 rounded-full hover:text-black hover:bg-white" />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-36 mr-1 flex flex-col items-center" align='end'>
      <DropdownMenuItem className="w-full flex flex-col items-center hover:bg-blue-500 hover:text-white font-semibold text-base">
        <Link href={`/user/${user._id}/cart`}>سلة التسوق</Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="w-full flex flex-col items-center hover:bg-blue-500 hover:text-white font-semibold text-base">
        <Link href={`/user/${user._id}/orders`}>الطلبات</Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="w-full flex flex-col items-center hover:bg-blue-500 hover:text-white font-semibold text-base">
        <p className="hover:cursor-pointer" onClick={logout}>تسجيل خروج</p>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

interface NavItemProps {
  title: string;
  consults: any[];
}

const businessServices = [
  {nameEn:'lshfgag',nameAr:'لسم اليبكنشايبلا',link:'dgfhsdgjsfdghjfhj'},
  {nameEn:'lshfgagsfjhgajsfhglahsfgsdghnlsdgjhspldgjhj',nameAr:'يلسيلتيلت',link:'dgfhsdgjsfdghjfhj'},
  {nameEn:'lshfgaglshf;lhafsgkdfuklhjshdflhl;sdghsl;dghlsdgh',nameAr:'سيلتسيلت',link:'dgfhsdgjsfdghjfhj'},
  {nameEn:'lshfgag',nameAr:'يتلتسيلت',link:'dgfhsdgjsfdghjfhj'},
  {nameEn:'lshfgag',nameAr:'ستلتيبلتسيلتلتلتسيلتسيلمشتسبالتشبسال',link:'dgfhsdgjsfdghjfhj'},
]

const NavItem = ({ title, consults }: NavItemProps) => {
  const chunkedConsults = React.useMemo(() => {
    const maxRows = 10;
    const columns = Math.ceil(consults.length / maxRows);
    const chunks = Array.from({ length: columns }, (_, columnIndex) => 
      consults.slice(columnIndex * maxRows, columnIndex * maxRows + maxRows)
    );
    return chunks;
  }, [consults]);

  return (
    <NavigationMenu rtl={true} title={title} items={consults} />
    // <NavigationMenu dir="rtl" className="text-right" >
    //   <NavigationMenuList className="relative">
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger className="bg-transparent text-white">{title}</NavigationMenuTrigger>
    //       <NavigationMenuContent  className="z-50 absolute right-0 top-full w-full" >
    //         <div className="flex flex-row-reverse gap-3 p-4">
    //           {chunkedConsults.map((chunk, index) => (
    //             <ul key={index} className="space-y-3 ">
    //               {chunk.map((consult) => (
    //                 <li key={consult.slug} className="whitespace-nowrap line-clamp-2 text-right">
    //                   <ListItem 
    //                     title={consult.title_AR} 
    //                     href={`/services/${consult.slug}`} 
    //                   />
    //                 </li>
    //               ))}
    //             </ul>
    //           ))}
    //         </div>
    //       </NavigationMenuContent>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>
    // </NavigationMenu>
  );
};

interface MobileNavItemProps {
  title: string;
  consults: any[];
}

const MobileNavItem = ({ title, consults }: MobileNavItemProps) => (
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value={title}>
      <AccordionTrigger className="text-white">{title}</AccordionTrigger>
      <AccordionContent>
        {consults.map((consult) => (
          <Link key={consult.slug} href={`/services/${consult.slug}`} className="block py-2 text-white">
            {consult.title_AR}
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

interface MobileUserMenuProps {
  user: any;
  logout: () => void;
}
const MobileUserMenu = ({ user, logout }: MobileUserMenuProps) => (
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="user-menu">
      <AccordionTrigger className="text-white">الملف الشخصي</AccordionTrigger>
      <AccordionContent>
        <Link href={`/user/${user._id}/cart`} className="block py-2 text-white">سلة التسوق</Link>
        <Link href={`/user/${user._id}/orders`} className="block py-2 text-white">الطلبات</Link>
        <button onClick={logout} className="block py-2 text-white">تسجيل خروج</button>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)


export default function NavigationBarAR(){
  const queryClient = useQueryClient();
  const { user: user } = useUserContext();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const {data:consults,isFetched}=useQuery({
    queryKey:['consults'],
    queryFn:fetchConsults,
    staleTime:1000*60*60,
    gcTime:1000*60*60*24,
  })

  const categories = [
    { name: "خدمات أعمالي", value: "Business Services" },
    { name: "الخدمات المحاسبية", value: "Accounting Services" },
    { name: "خدمات المراجعة", value: "Auditing Services" },
    { name: "الخدمات المالية", value: "Financial Services" },
    { name: "الخدمات الإدارية", value: "HR Services" },
  ];

  const getConsultsByCategory = (category: string) => {
    return consults?.filter((consult: { category: string; }) => consult.category === category) || [];
  }

  const toggleLocale = () => {
      router.replace(pathname,{locale:'en'})
  }

  const {mutateAsync:mutateUserLogout}=useMutation({
    mutationFn:userLogout,
    onSuccess:()=>{
      setTimeout(() => {
        queryClient.invalidateQueries({queryKey:['user']})
      }, 1000);
      router.replace('/'); 
    }
  })
  const logout = async () => {
    try {
      mutateUserLogout();
    }catch (error) {
      console.log(error);
    }
  }

    return(
      <header className="w-full">
      <nav className={`transition-colors duration-300 bg-unitedPrimary w-full h-[60px] navbar:h-[100px] relative z-50 rtl`} dir='rtl'>
      <div className="w-full px-4 sm:px-6 lg:px-4 ">
          <div className="flex flex-row items-center justify-between h-full">
            <Link href="/" className="block navbar:hidden"><Image src="/UnitedLogo.png" alt="logo" width={120} height={60}/></Link>
            <Link href="/" className="hidden navbar:block"><Image src="/UnitedLogo.png" alt="logo" width={175} height={80}/></Link>
            <div className="hidden navbar:block">
              <div className="flex items-center">
                  <Link href="/store"><Button variant="ghost" className="text-unitedPrimary font-semibold bg-unitedSecondary mx-1">المتجر الإلكتروني <Store className="h-6 w-6 mx-1" /></Button></Link>
               </div>
            </div>
            <div className="flex items-center navbar:hidden relative z-50">
              <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    type="button"
                      className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-unitedSecondary "
                    aria-controls="mobile-menu"
                    aria-expanded={menuOpen}
                  >
                      <span className="sr-only">{menuOpen ? 'اغلق القائمة الرئيسية' : 'إفتح القائمة الرئيسية'}</span>
                      <Menu className={`block h-8 w-8 transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`} aria-hidden="true" />
                  </button>
            </div>
          </div>
          
          <div className="hidden navbar:block">
            <div className="w-full px-1 lg:px-2">
            <div className="flex flex-row justify-between ">
              <div className="flex items-center space-x-1">
                  {/* {isFetched && categories.map((category) => (
                  <NavItem key={category.value} title={category.name} consults={getConsultsByCategory(category.value)} />
                    ))} */}
                    <VNavMenu  menuName="خدمات أعمالي" items={businessServices} parentLink="/services/business-services" rtl={true}/>
                    <VNavMenu  menuName="الخدمات المالية" items={businessServices} parentLink="/services/financial-services" rtl={true}/>
                    <VNavMenu  menuName="الخدمات المحاسبية" items={businessServices} parentLink="/services/accounting-services" rtl={true}/>
                    <VNavMenu  menuName="خدمات المراجعة" items={businessServices} parentLink="/services/auditing-services" rtl={true}/>
                    <VNavMenu  menuName="خدمات الموارد البشرية" items={businessServices} parentLink="/services/hr-services" rtl={true}/>
                    <Link href='/client-list'><Button variant="ghost" className="text-white hover:bg-slate-100/50">عملاؤنا</Button></Link>
                    <Link href='/contact-us'><Button variant="ghost" className="text-white hover:bg-slate-100/50">تواصل معنا</Button></Link>
                    <Link href='/articles'><Button variant="ghost" className="text-white hover:bg-slate-100/50">المقالات</Button></Link>
              </div>
              <div className="flex items-center space-x-1">
              {!user || user.role === "admin" ? (
              <>
                <Link href='/auth/login'>
                  <Button variant="link" className="text-white font-semibold hover:text-sky-200 hover:no-underline hover:-translate-y-1.5 duration-300 transition-all"><LogIn className="h-6 w-6 mx-1" />تسجيل دخول</Button>
                </Link>
                <div className="w-[1px] inline pt-2 bg-white h-[20px]"> </div>
                <Link href='/signup'>
                  <Button variant="link" className="text-white font-semibold hover:text-sky-200 hover:no-underline hover:-translate-y-1.5 duration-300 transition-all"><UserPlus className="h-6 w-6 mx-1" />مستخدم جديد</Button>
                </Link>
                <div className="w-[1px] inline pt-2 bg-white h-[20px]"> </div>
              </>
              ) : (
                <>
                <Link href='/'>
                    <Button variant="link" onClick={logout} className="text-white font-semibold hover:text-sky-200 hover:no-underline hover:-translate-y-1.5 duration-300 transition-all">
                    <LogOut className="h-6 w-6 mx-1 inline" />تسجيل خروج
                   </Button>
                  </Link>
                  <div className="w-[1px] inline pt-2 bg-white h-[20px]"> </div>
                  <Link href={`/user/${user._id}/cart`} className="text-white font-semibold ">
                    <Button variant="link" className="text-white font-semibold hover:text-sky-200 hover:no-underline hover:-translate-y-1.5 duration-300 transition-all">
                    <ShoppingCart className="h-6 w-6 mx-1 inline" />سلة المشتريات
                    </Button>
                  </Link>
                  <div className="w-[1px] inline pt-2 bg-white h-[20px]"> </div>
                  <Link href={`/user/${user._id}/orders`} className="text-white font-semibold ">
                    <Button variant="link" className="text-white font-semibold hover:text-sky-200 hover:no-underline hover:-translate-y-1.5 duration-300 transition-all">
                    <ShoppingBag className="h-6 w-6 mx-1 inline" />الطلبات
                    </Button>
                  </Link>
                  <div className="w-[1px] inline pt-2 bg-white h-[20px]"> </div>
                </>
                // <UserMenu user={user} logout={logout} />
              )}
              <Button onClick={toggleLocale} variant="link" className="text-white font-semibold hover:text-sky-200 hover:no-underline hover:-translate-y-1.5 duration-300 transition-all"><Languages className="h-6 w-6 mx-1" /> : <p className='text-md'>english</p></Button>
            </div>
            </div>
          </div>
          </div>
      </div>
      </nav>

      {menuOpen && (
        <div className="navbar:hidden fixed top-0 left-0 w-64 h-screen bg-unitedPrimary shadow-lg overflow-y-auto z-40 pt-[60px]">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <AccordionMenu menuName="خدمات أعمالي" items={businessServices} parentLink="/services/business-services" rtl={false} />
          <AccordionMenu menuName="الخدمات المحاسبية" items={businessServices} parentLink="/services/accounting-services" rtl={false}/>
          <AccordionMenu menuName="الخدمات المالية" items={businessServices} parentLink="/services/financial-services" rtl={false}/>
          <AccordionMenu menuName="خدمات المراجعة" items={businessServices} parentLink="/services/auditing-services" rtl={false}/>
          <AccordionMenu menuName="خدمات المواردالبشرية" items={businessServices} parentLink="/services/HR-services" rtl={false}/>
          <Link href='/client-list' className="block text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm font-medium transition-colors">عملاؤنا</Link>
          <Link href='/blogs' className="block text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm font-medium transition-colors">المقالات</Link>
          <Link href='/services' className="block text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm font-medium transition-colors"><Store className="h-5 w-5 mr-2 inline" /> المتجر اللإلكتروني</Link>
        </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-2 space-y-1">
              {!user || user.role === "admin" ? (
                <Link href='auth/login' className="block text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  <LogIn className="h-5 w-5 mr-2 inline" /> تسجيل دخول
                </Link>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="user-menu">
                    <AccordionTrigger className="text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm font-medium transition-colors">الملف الشخصي</AccordionTrigger>
                    <AccordionContent>
                      <Link href={`/user/${user._id}/cart`} className="block text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm transition-colors">سلة المشتريات</Link>
                      <Link href={`/user/${user._id}/orders`} className="block text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm transition-colors">المشتريات</Link>
                      <button onClick={logout} className="w-full text-left text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm transition-colors">تسجيل خروج</button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
              <Button onClick={toggleLocale} variant="ghost" className="w-full text-left text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <Languages className="h-5 w-5 mr-2 inline" /> english
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a 
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"