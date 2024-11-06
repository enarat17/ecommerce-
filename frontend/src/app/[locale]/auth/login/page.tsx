"use client";
import React from "react";
import Image from "next/image";
import {Link} from '@/i18n/routing';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {useQueryClient,useMutation, useQuery} from "@tanstack/react-query";
import { userLogin } from "@/lib/api/userApi";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useRouter } from "@/i18n/routing";
import NavigationWrapper from "@/components/shared/NavigationWrapper";
import Footer from "@/components/shared/Footer";
import HeaderSection from "@/components/shared/HeaderSection";
import {motion} from "framer-motion";
import { useLocale } from "next-intl";
import { fetchHeaderImages } from "@/lib/api/settingsRequests";

const loginFormSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email" }),
  password: z.string().min(1, { message: "Please enter your password" }),
})

type loginFormData=z.infer< typeof loginFormSchema>
export default function Login() {

  const queryClient = useQueryClient();
  const {toast}=useToast();
  const router = useRouter();
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const form=useForm<loginFormData>({
    resolver:zodResolver(loginFormSchema),
  })
  const {mutateAsync,isPending,isError} = useMutation({
    mutationFn:userLogin,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['user']});
      router.push('/');
    },
    onError:()=>{
      toast({
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  })

  const {data:headerImages,isFetched:HTFetched} = useQuery({
    queryKey:['headerImages'],
    queryFn:fetchHeaderImages,
  })

  const onSubmit= async (data:loginFormData) => {
    try{
      mutateAsync(data);
    }catch(error){
      console.log(error);
    }
  }
  return (
    <>
      <NavigationWrapper />
      <HeaderSection pageTitle={{en:'Login to your account',ar:'تسجيل الدخول إلي حسابك'}} pageImage={HTFetched && headerImages.loggingPage} breadCrumbArr={{en:[],ar:[]}} breadCrumbLinkArr={[]} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[200px] items-center justify-center h-full w-full max-w-7xl my-4 mx-auto px-4">
          <motion.div className="hidden lg:block lg:h-fit my-2 lg:w-[70vh]"
                      initial={{x:"-100%"}}
                      animate={{x:0}}
                      transition={{duration:0.5}}>
                <Image
                  src="/imgs/auth/credImage.jpeg"
                  alt="Image"
                  width="1920"
                  height="1080"
                  className="h-full w-full object-cover rounded-lg"
                />
            </motion.div>
            <motion.div 
              initial={{opacity:0,y:50}} 
              animate={{opacity:1,y:0}} 
              transition={{duration:0.5}}
              className="w-full flex justify-center lg:justify-start"
            >
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`w-full max-w-[50vh] grid grid-cols-1 gap-5 p-8 ${isRtl ? "text-right" : ""}`} >
              <p className="text-center text-unitedPrimary font-bold">
               {isRtl ? 'تسجيل الدخول' : 'Login'}
              </p>
              <FormField 
                control={form.control}
                name='email'
                render={({ field }) =>(
                  <FormItem className="w-full">
                    <FormLabel>{isRtl ? 'البريد الإلكتروني' : 'Email'}</FormLabel>
                      <Input
                        placeholder="example@mail.com"
                        {...field}
                        type="email"
                      />
                      <FormMessage />
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name='password'
                render={({ field }) =>(
                  <FormItem>
                    <FormLabel>{isRtl ? 'كلمة المرور' : 'Password'}</FormLabel>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                )}
                />
                <Button type='submit' className="bg-unitedPrimary hover:bg-unitedPrimary/85">{isRtl ? 'تسجيل الدخول' : 'Login'}</Button>
                <div className="mt-4 text-center text-sm">
                <p className="text-muted-foreground">
                  <Link href="/signup" className="underline">
                    {isRtl ? 'نسيت كلمة المرور ؟' : 'forgot password ?'}
                  </Link>
                </p>
                <p className="text-muted-foreground">
                  {isRtl ? 'ليس لديك حساب؟ ' : 'Don\'t have an account? '}
                  <Link href="/auth/login/forgot-password" className="underline">
                    {isRtl ? 'انشاء حساب' : 'Create account'}
                  </Link>
                </p>
          </div>
            </form>
            </Form>
            </motion.div>
        </div>
    </>
  );
}