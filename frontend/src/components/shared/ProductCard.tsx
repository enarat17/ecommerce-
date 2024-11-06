import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/ProductTableColumns";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from '@/components/animations/Dialog';
import { Eye, Download, Star } from 'lucide-react';
import { Button } from "../ui/button";

interface ProductCardProps {
  product: Product;
  storeType: string;
  isRtl: boolean;
}

export default function ProductCard({ product, storeType, isRtl }: ProductCardProps) {
  const title = isRtl ? product.title_AR : product.title_EN;
  const description = isRtl ? product.description_AR : product.description_EN;
  const viewDetails = isRtl ? "عرض التفاصيل" : "View Details";

  return (
    <Dialog
      transition={{
        type: 'spring',
        bounce: 0.05,
        duration: 0.5,
      }}
    >
      <DialogTrigger
        style={{
          borderRadius: '12px',
          direction: isRtl ? 'rtl' : 'ltr',
        }}
        className='flex w-[275px] flex-col overflow-hidden border bg-unitedPrimary shadow-md '
      >
        <DialogImage
          src={`/imgs/images/${product.coverImage}`}
          alt={title}
          className='h-32 w-full object-fill'
        />
        <div className={`flex flex-col justify-between p-2 h-24 w-full`}>
            <DialogTitle className='text-white font-medium dark:text-zinc-50'>
              {title}
            </DialogTitle>
            <DialogSubtitle className='text-white flex flex-row justify-between w-full'>
              <p className="flex items-center "><Eye size={20} className={`inline ${isRtl ? "ml-3" : "mr-3"}`} /> {product.views} </p>
              <p className="flex items-center"><Download size={20} className={`inline ${isRtl ? "ml-3" : "mr-3"}`}  /> {product.Sucessful_Purchases || 0}</p>
              <p className="flex items-center"><Star size={20} className={`inline ${isRtl ? "ml-3" : "mr-3"}`}  /> {product.ratingsAverage.toFixed(1)}</p>
            </DialogSubtitle>
        </div>
      </DialogTrigger>
      <DialogContainer>
        <DialogContent
          style={{
            borderRadius: '24px',
            direction: isRtl ? 'rtl' : 'ltr',
          }}
          className='pointer-events-auto relative flex h-auto max-h-[90vh] w-full flex-col overflow-hidden border border-unitedPrimary bg-slate-100 dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]'
        >
          <DialogImage
            src={`/imgs/images/${product.coverImage}`}
            alt={description}
            className='h-full w-full object-fill'
          />
          <div className='p-6'>
            <DialogTitle className='text-2xl text-unitedPrimary font-medium '>
              {title}
            </DialogTitle>
            <DialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 },
              }}
            >
              <p className='mt-2 text-gray-600 dark:text-zinc-500'>
                {description}
              </p>
              <Link
                href={`/${isRtl ? 'ar' : 'en'}/store/${storeType}/${product.slug}`}
              >
                <Button variant='outline' className='mt-4 font-bold border-2 border-unitedPrimary hover:bg-unitedPrimary hover:text-white'>
                  {viewDetails}
                </Button>
              </Link>
            </DialogDescription>
          </div>
          <DialogClose className='text-zinc-50' />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
}