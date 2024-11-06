'use client';
import {
    FileBarChart,
    Book,
    Users,
    Home,
    Settings,
    LineChart,
    Wrench,
    LogOut,
    Mails,
    Ticket
  } from "lucide-react";
  import {Link} from '@/i18n/routing';
  import Image from "next/image";
  import {useMutation} from '@tanstack/react-query';
  import { userLogout } from "@/lib/api/userApi";
import { Button } from "@/components/ui/button";
  
  export default function CommandSidebar() {
    const {mutateAsync} = useMutation({
      mutationFn: userLogout,
      onError: (error) => {
        throw error;
      }
    });
  
    return (
      <div className="bg-unitedPrimary min-h-screen md:w-[250px] w-[50px] rounded-none shadow-lg sticky">
        <Image src={'/unitedLogo.png'} width={200} height={200} alt="logo" className="p-1" />
        <div className="flex flex-col items-start my-2">
          <div className='flex flex-row my-1 w-full'>
            <Link href={`/admin/dashboard`} className='flex flex-row items-center w-full p-1 hover:bg-sky-600'>
              <Home className="mx-2 h-5 w-5 text-white" />
              <span className="font-semibold text-white hidden md:block">Dashboard</span>
            </Link>
          </div>
          <div className="flex flex-row my-1 w-full">
            <Link href={`/admin/dashboard/consultations`} className="flex flex-row items-center w-full p-1 hover:bg-sky-600">
              <Wrench className="mx-2 h-5 w-5 text-white" />
              <span className="font-semibold text-white hidden md:block">Services</span>
            </Link>
          </div>
          <div className="flex flex-row my-1 w-full">
            <Link href={`/admin/dashboard/products`} className="flex flex-row items-center w-full p-1 hover:bg-sky-600">
              <FileBarChart className="mx-2 h-5 w-5 text-white" />
              <span className="font-semibold text-white hidden md:block">Products</span>
            </Link>
          </div>
          <div className="flex flex-row my-1 w-full">
            <Link href={`/admin/dashboard/blogs`} className="flex flex-row items-center w-full p-1 hover:bg-sky-600">
              <Book className="mx-2 h-5 w-5 text-white" />
              <span className="font-semibold text-white hidden md:block">Blogs</span>
            </Link>
          </div>
          <div className="flex flex-row my-1 w-full">
            <Link href={`/admin/dashboard/emails`} className="flex flex-row items-center w-full p-1 hover:bg-sky-600">
              <Mails className="mx-2 h-5 w-5 text-white" />
              <span className="font-semibold text-white hidden md:block">Emails</span>
            </Link>
          </div>
          <div className="flex flex-row my-1 w-full">
            <Link href={`/admin/dashboard/coupons`} className="flex flex-row items-center w-full p-1 hover:bg-sky-600">
              <Ticket className="mx-2 h-5 w-5 text-white" />
              <span className="font-semibold text-white hidden md:block">Coupons</span>
            </Link>
          </div>
          <div className="flex flex-row my-1 w-full">
            <Link href={`/admin/dashboard/users`} className="flex flex-row items-center w-full p-1 hover:bg-sky-600">
              <Users className="mx-2 h-5 w-5 text-white" />
              <span className="font-semibold text-white hidden md:block">Users</span>
            </Link>
          </div>
          <div className="flex flex-row my-1 w-full">
            <Link href={`/admin/dashboard/analytics`} className="flex flex-row items-center w-full p-1 hover:bg-sky-600">
              <LineChart className="mx-2 h-5 w-5 text-white" />
              <span className="font-semibold text-white hidden md:block">Analytics</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-row my-1 w-full">
          <Link href={`/admin/dashboard/settings`} className="flex flex-row items-center w-full p-1 hover:bg-sky-600">
            <Settings className="mx-2 h-5 w-5 text-white" />
            <span className="font-semibold text-white hidden md:block">Settings</span>
          </Link>
        </div>
        <div className="flex flex-row my-1 w-full">
          <Button variant='link' onClick={()=>mutateAsync}  className="flex flex-row items-center justify-start w-full p-1 hover:bg-sky-600 hover:no-underline rounded-none">
            <LogOut className="mx-2 h-5 w-5 text-white" />
            <span className="font-semibold text-white hidden md:block">Logout</span>
          </Button>
        </div>
      </div>
    );
  }
  