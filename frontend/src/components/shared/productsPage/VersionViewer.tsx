'use client';
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useUserContext } from "@/lib/Providers/UserProvider";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from '@/i18n/routing';
import { useToast } from "@/components/ui/use-toast";
import { addCartItem } from '@/lib/api/userApi';

interface ProductVersion {
  name: string;
  price?: number;
  features: string[];
  buttonText: string;
  recommended?: boolean;
  version: string;
}

interface ProductVersionsProps {
  productId: string;
  isArabic: boolean;
  price: number;
}

export default function VersionViewer({
  productId,
  isArabic,
  price,
}: ProductVersionsProps) {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutateAsync } = useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: 'Success',
        description: 'Item added to cart successfully.',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  });
  const [cartDialog, setCartDialog] = useState(false);

  const translations = {
    en: {
      basic: 'Basic',
      editable: 'Editable',
      add: 'Add to cart',
      getQuote: 'Get Quote',
    },
    ar: {
      basic: 'أساسي',
      editable: 'قابل للتعديل',
      add: 'اضف الي السلة',
      getQuote: 'احصل على عرض سعر',
    },
  };

  const t = isArabic ? translations.ar : translations.en;

  const versions: ProductVersion[] = [
    {
      name: t.basic,
      price: price,
      features: [
        isArabic ? 'ملف Excel/PDF كما هو' : 'Excel/PDF file as-is',
        isArabic ? 'لا خيارات تعديل' : 'No editing options',
        isArabic ? 'وظائف أساسية' : 'Basic functionality',
      ],
      buttonText: t.add,
      version: 'basic_version',
    },
    {
      name: t.editable,
      features: [
        isArabic ? 'حل مخصص' : 'Custom-made solution',
        isArabic ? 'مصمم حسب الاحتياجات الخاصة' : 'Tailored to specific needs',
        isArabic ? 'إمكانيات تحرير كاملة' : 'Full editing capabilities',
        isArabic ? 'تسعير قابل للتفاوض' : 'Negotiable pricing',
      ],
      buttonText: t.getQuote,
      version: 'editable_version',
    },
  ];

  const handleAddToCart = async (version: string) => {
    if (!user || user.role === 'admin') {
      setCartDialog(true);
    } else {
      try {
        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('version', version);
        await mutateAsync(formData);
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  };

  return (
    <>
      <div className={`flex flex-col md:flex-row justify-center items-stretch gap-4 p-4 ${isArabic ? 'rtl' : 'ltr'}`}>
        {versions.map((version, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
            className={`flex flex-col p-6 rounded-lg shadow-md bg-slate-100 w-80 border-2 border-unitedSecondary`}
          >
            <h2 className="text-2xl text-center font-bold mb-4">{version.name}</h2>
            {version.price !== undefined ? (
              <p className="text-lg text-center text-unitedSecondary font-bold mb-6">${version.price.toFixed(2)}</p>
            ) : (
              <p className="text-lg text-center text-unitedSecondary font-bold mb-6">
                {isArabic ? 'حسب التعديل المطلوب' : 'Based on required editing'}
              </p>
            )}
            <ul className="mb-6 flex-grow">
              {version.features.map((feature, featureIndex) => (
                <li key={featureIndex} className={`flex items-center mb-2 ${isArabic && 'flex-row-reverse text-right'}`}>
                  <svg
                    className="w-4 h-4 mr-2 text-unitedSecondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => handleAddToCart(version.version)}
              className="w-full bg-unitedPrimary text-white py-2 px-4 rounded-xl hover:bg-unitedPrimary/80 transition-colors"
            >
              {version.buttonText}
            </Button>
          </motion.div>
        ))}
      </div>
      <AlertDialog open={cartDialog} onOpenChange={setCartDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You must be logged in to add an item to cart 
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Link href="/auth/login">
              <Button className="bg-sky-800 hover:bg-sky-700 text-white">Login</Button>
            </Link>
            <AlertDialogCancel>
              cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}