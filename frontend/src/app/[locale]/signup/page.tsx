"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userSignup } from "@/lib/api/userApi";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from '@/i18n/routing';
import NavigationWrapper from "@/components/shared/NavigationWrapper";
import Footer from "@/components/shared/Footer";
import HeaderSection from "@/components/shared/HeaderSection";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { fetchHeaderImages } from "@/lib/api/settingsRequests";

const signupFormSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(1, { message: "Please enter your phone number" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  passwordConfirm: z.string().min(1, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

type SignupFormData = z.infer<typeof signupFormSchema>;

export default function Signup() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
  });
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const {data:headerImages,isFetched:HTFetched} = useQuery({
    queryKey:['headerImages'],
    queryFn:fetchHeaderImages,
})

  const { mutateAsync, isPending } = useMutation({
    mutationFn: userSignup,
    onSuccess: () => {
      toast({
        description: "Signup successful!",
        variant: "default",
      });
      router.push('/auth/login');
    },
    onError: () => {
      toast({
        description: "Something went wrong during signup",
        variant: "destructive",
      });
    }
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <NavigationWrapper />
    <HeaderSection
      pageTitle={{ en: 'Join our platform', ar: 'إنضم إلي منصتنا' }}
      pageImage={HTFetched && headerImages.loggingPage}
      breadCrumbArr={{ en: [], ar: [] }}
      breadCrumbLinkArr={[]}
    />
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-[100px]">
        <motion.div
          className="hidden lg:block lg:w-[40%] max-w-[500px]"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/imgs/auth/credImage.jpeg"
            alt="Image"
            width={500}
            height={500}
            className="rounded-lg object-cover w-full h-auto"
          />
        </motion.div>
        <motion.div
          className="w-full max-w-[500px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`w-full ${isRtl ? "text-right" : ""} text-unitedPrimary`}>
              <p className="text-center text-unitedPrimary font-bold">
           {isRtl ? ' ادخل بيانتك للتسجيل': 'Enter your information to sign up'}
            </p>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >{isRtl ? 'الاسم': 'Name'}</FormLabel>
                  <FormControl>
                    <Input placeholder={isRtl ? 'ادخل اسمك' : 'Enter your name'} {...field} className={isRtl ?"text-right":""}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{ isRtl ? 'البريد الالكتروني': 'Email'}</FormLabel>
                  <FormControl>
                    <Input placeholder={isRtl ? 'ادخل بريدك الالكتروني' : 'Enter your email'} {...field}  className={isRtl ?"text-right":""}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{ isRtl ? 'رقم الهاتف': 'Phone Number'}</FormLabel>
                  <FormControl>
                    <Input placeholder={isRtl ? 'ادخل رقم هاتفك' : 'Enter your phone number'} className={isRtl ?"text-right":""}{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{ isRtl ? 'كلمة المرور': 'Password'}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={ isRtl ? 'ادخل كلمة المرور' : 'Enter your password'} {...field} className={isRtl ?"text-right":""}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{ isRtl ? 'تاكيد كلمة المرور': 'Confirm Password'}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={ isRtl ? 'تاكيد كلمة المرور' : 'Confirm your password'} {...field} className={isRtl ?"text-right":""}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full bg-unitedPrimary mt-6">
                  {isRtl ? 'انشاء حساب' : 'Create Account'}
                </Button>
                <div className="mt-4 text-center text-sm">
                  {isRtl ? 'لديك حساب بالفعل ؟' : 'Already have an account?'}
                  <Link href="/auth/login" className="underline ml-1">
                    {isRtl ? 'تسجيل الدخول' : 'Login'}
                  </Link>
                </div>
            </form>
        </Form>
        </motion.div>
        </div>
      </div>
    </>
  );
}