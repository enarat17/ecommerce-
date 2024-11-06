'use client'
import * as React from "react"
import { cn } from "@/lib/utils"
import { Link } from "@/i18n/routing";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import { useUserContext } from "@/lib/Providers/UserProvider";
import {NavigationMenuLink} from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Store, User, Menu, LogIn,LogOut,ShoppingCart, UserPlus ,Languages, ShoppingBag} from 'lucide-react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { userLogout } from "@/lib/api/userApi";
import { fetchConsults } from "@/lib/api/consultsApi";
import {usePathname,useRouter} from '@/i18n/routing';
import NavigationMenu from "@/components/shared/NavigationMenu";
import VNavMenu from "@/components/shared/VerticalNavigationMenu";
import AccordionMenu from "@/components/shared/AccordionMenu";
import Cookies from "js-cookie";


interface UserMenuProps {
  user: any;
  logout: () => void;
}

const businessServices = [
  {nameEn:'lshfgag',nameAr:'لسم اليبكنشايبلا',link:'dgfhsdgjsfdghjfhj'},
  {nameEn:'lshfgagsfjhgajsfhglahsfgsdghnlsdgjhspldgjhj',nameAr:'يلسيلتيلت',link:'dgfhsdgjsfdghjfhj'},
  {nameEn:'lshfgaglshf;lhafsgkdfuklhjshdflhl;sdghsl;dghlsdgh',nameAr:'سيلتسيلت',link:'dgfhsdgjsfdghjfhj'},
  {nameEn:'lshfgag',nameAr:'يتلتسيلت',link:'dgfhsdgjsfdghjfhj'},
  {nameEn:'lshfgag',nameAr:'ستلتيبلتسيلتلتلتسيلتسيلمشتسبالتشبسال',link:'dgfhsdgjsfdghjfhj'},
]
const UserMenu = ({ user, logout }: UserMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <User size={36} className="text-white ml-4 p-1 rounded-full hover:text-black hover:bg-white" />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-36 ml-1 flex flex-col items-center">
      <DropdownMenuItem className="w-full flex flex-col items-center hover:bg-blue-500 hover:text-white font-semibold text-base">
        <Link href={`/user/${user._id}/cart`}>Cart</Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="w-full flex flex-col items-center hover:bg-blue-500 hover:text-white font-semibold text-base">
        <Link href={`/user/${user._id}/orders`}>Orders</Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="w-full flex flex-col items-center hover:bg-blue-500 hover:text-white font-semibold text-base">
        <p className="hover:cursor-pointer" onClick={logout}>Logout</p>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

interface NavItemProps {
  title: string;
  consults: any[];
}
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
    <NavigationMenu rtl={false} title={title} items={consults} />
    // <NavigationMenu>
    //   <NavigationMenuList>
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger className="bg-transparent text-white">{title}</NavigationMenuTrigger>
    //       <NavigationMenuContent className="z-50">
    //         <div className="flex gap-3 p-4 ">
    //           {chunkedConsults.map((chunk, index) => (
    //             <ul key={index} className="space-y-3">
    //               {chunk.map((consult) => (
    //                 <li key={consult.slug} className="whitespace-nowrap line-clamp-2">
    //                   <ListItem 
    //                     title={consult.title_EN} 
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
            {consult.title_EN}
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
      <AccordionTrigger className="text-white">Profile</AccordionTrigger>
      <AccordionContent>
        <Link href={`/user/${user.data.data._id}/cart`} className="block py-2 text-white">Cart</Link>
        <Link href={`/user/${user.data.data._id}/orders`} className="block py-2 text-white">Orders</Link>
        <button onClick={logout} className="block py-2 text-white">Logout</button>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)


export default function NavigationBar(){
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
      { name: "Business Services", value: "Business Services" },
      { name: "Accounting Services", value: "Accounting Services" },
      { name: "Auditing Services", value: "Auditing Services" },
      { name: "Financial Services", value: "Financial Services" },
      { name: "HR Services", value: "HR Services" },
    ];

    const getConsultsByCategory = (category: string) => {
      return consults?.filter((consult: { category: string; }) => consult.category === category) || [];
    }

    const toggleLocale = () => {
        router.replace(pathname,{locale:'ar'})
    }

    const {mutateAsync:mutateUserLogout}=useMutation({
      mutationFn:userLogout,
      onSuccess:()=>{
        Cookies.remove('united_user_c',{path:'/'});
        setTimeout(()=>{
          queryClient.removeQueries({queryKey:['user']})
          window.location.href='/';  
        },1);  
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
        <nav className={`transition-colors duration-300 bg-unitedPrimary w-full h-[60px] navbar:h-[100px] relative z-50`}>
          <div className="w-full px-4 sm:px-6 lg:px-4 ">
              <div className="flex flex-row items-center justify-between h-full">
                <div className="flex items-center navbar:hidden relative z-50">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    type="button"
                      className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-unitedSecondary "
                    aria-controls="mobile-menu"
                    aria-expanded={menuOpen}
                  >
                    <span className="sr-only">{menuOpen ? 'Close main menu' : 'Open main menu'}</span>
                    <Menu className={`block h-8 w-8 transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`} aria-hidden="true" />
                  </button>
                </div>
                <Link href="/" className="block navbar:hidden"><Image src="/UnitedLogo.png" alt="logo" width={120} height={60}/></Link>
                <Link href="/" className="hidden navbar:block"><Image src="/UnitedLogo.png" alt="logo" width={175} height={80}/></Link>
                <div className="hidden navbar:block">
                  <div className="flex items-center">
                    <Link href="/store"><Button variant="ghost" className="text-unitedPrimary font-semibold bg-unitedSecondary mx-1"><Store className="h-6 w-6 mx-1" />E-store</Button></Link>
                  </div>
                </div>
              </div>
          </div>
            
          <div className="hidden navbar:block">
              <div className="w-full px-1 lg:px-2">
                <div className="flex flex-row justify-between ">
                  <div className="flex items-baseline space-x-1">
                    <VNavMenu menuName="Business Services" items={businessServices} parentLink="/services/business-services" rtl={false} />
                    <VNavMenu menuName="Accounting Services" items={businessServices} parentLink="/services/accounting-services" rtl={false} />
                    <VNavMenu menuName="Financial Services" items={businessServices} parentLink="/services/financial-services" rtl={false} />
                    <VNavMenu menuName="Auditing Services" items={businessServices} parentLink="/services/auditing-services" rtl={false} />
                    <VNavMenu menuName="HR Services" items={businessServices} parentLink="/services/HR-services" rtl={false} />
                    <Link href='/contact-us'><Button variant="ghost" className="text-white hover:bg-slate-100/50">contact us</Button></Link>
                    <Link href='/client-list'><Button variant="ghost" className="text-white hover:bg-slate-100/50">Our Clients</Button></Link>
                    <Link href='/articles'><Button variant="ghost" className="text-white hover:bg-slate-100/50">Articles</Button></Link>  
                  </div>
              <div className="flex items-center space-x-1">
              {!user || user.role === "admin" ? (
                    <>
                    <Link href='/auth/login'>
                      <Button variant="link" className="text-white font-semibold hover:text-sky-200 hover:no-underline hover:-translate-y-1.5 duration-300 transition-all">
                      <LogIn className="h-6 w-6 mx-1 inline" />Login
                    </Button>
                    </Link>
                    <div className="w-[1px] inline pt-2 bg-white h-[20px]"> </div>
                    <Link href='/signup' className="text-white font-semibold ">
                      <Button variant="link" className="text-white font-semibold hover:text-sky-200 hover:no-underline hover:-translate-y-1.5 duration-300 transition-all">
                      <UserPlus className="h-6 w-6 mx-1 inline" />Sign Up
                      </Button>
                    </Link>
                    <div className="w-[1px] inline pt-2 bg-white h-[20px]"> </div>
                    </>
                  ) : (
                    <>
                    <Link href='/'>
                      <Button variant="link" onClick={logout} className="text-white font-semibold hover:text-sky-200 hover:no-underline hover:-translate-y-1.5 duration-300 transition-all">
                      <LogOut className="h-6 w-6 mx-1 inline" />Logout
                    </Button>
                    </Link>
                    <div className="w-[1px] inline pt-2 bg-white h-[20px]"> </div>
                    <Link href={`/user/${user._id}/cart`} className="text-white font-semibold ">
                      <Button variant="link" className="text-white font-semibold hover:text-sky-200 hover:no-underline hover:-translate-y-1.5 duration-300 transition-all">
                      <ShoppingCart className="h-6 w-6 mx-1 inline" />Cart
                      </Button>
                    </Link>
                    <div className="w-[1px] inline pt-2 bg-white h-[20px]"> </div>
                    <Link href={`/user/${user._id}/orders`} className="text-white font-semibold ">
                      <Button variant="link" className="text-white font-semibold hover:text-sky-200 hover:no-underline hover:-translate-y-1.5 duration-300 transition-all">
                      <ShoppingBag className="h-6 w-6 mx-1 inline" />Orders
                      </Button>
                    </Link>
                    <div className="w-[1px] inline pt-2 bg-white h-[20px]"> </div>
                    </>
                    // <UserMenu user={user} logout={logout} />
                  )}
                  <Button onClick={toggleLocale} variant="link" className="text-white font-semibold hover:text-sky-200 hover:no-underline hover:-translate-y-1.5 duration-300 transition-all"><Languages className="h-6 w-6 mx-1" /> : <p className='text-md'>العربية</p></Button>
                  </div>
              </div>
            </div>
          </div>
      </nav>

      {menuOpen && (
        <div className="navbar:hidden fixed top-0 left-0 w-64 h-screen bg-unitedPrimary shadow-lg overflow-y-auto z-40 pt-[60px]">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <AccordionMenu menuName="Business Services" items={businessServices} parentLink="/services/business-services" rtl={false} />
          <AccordionMenu menuName="Accounting Services" items={businessServices} parentLink="/services/accounting-services" rtl={false}/>
          <AccordionMenu menuName="Financial Services" items={businessServices} parentLink="/services/financial-services" rtl={false}/>
          <AccordionMenu menuName="Auditing Services" items={businessServices} parentLink="/services/auditing-services" rtl={false}/>
          <AccordionMenu menuName="HR Services" items={businessServices} parentLink="/services/HR-services" rtl={false}/>
          <Link href='/client-list' className="block text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm font-medium transition-colors">Our Clients</Link>
          <Link href='/blogs' className="block text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm font-medium transition-colors">Articles</Link>
          <Link href='/services' className="block text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm font-medium transition-colors"><Store className="h-5 w-5 mr-2 inline" /> Store</Link>
        </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-2 space-y-1">
              {!user || user.role === "admin" ? (
                <Link href='auth/login' className="block text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  <LogIn className="h-5 w-5 mr-2 inline" /> Login
                </Link>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="user-menu">
                    <AccordionTrigger className="text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm font-medium transition-colors">Profile</AccordionTrigger>
                    <AccordionContent>
                      <Link href={`/user/${user._id}/cart`} className="block text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm transition-colors">Cart</Link>
                      <Link href={`/user/${user._id}/orders`} className="block text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm transition-colors">Orders</Link>
                      <button onClick={logout} className="w-full text-left text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm transition-colors">Logout</button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
              <Button onClick={toggleLocale} variant="ghost" className="w-full text-left text-white hover:bg-unitedSecondary hover:text-unitedPrimary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <Languages className="h-5 w-5 mr-2 inline" /> العربية
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