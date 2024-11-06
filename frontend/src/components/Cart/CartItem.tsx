import Image from 'next/image';
import {useQueryClient,useMutation} from '@tanstack/react-query';
import {Link} from '@/i18n/routing';
import { removeFromCart } from '@/lib/api/userApi';
import { useToast } from '../ui/use-toast';
import { Trash } from 'lucide-react';
import {Button} from '@/components/ui/button';
import { useLocale } from 'next-intl';

interface Product {
  _id:string;
  title_AR:string;
  title_EN:string;
  price:string;
  coverImage:string;
}
interface CartItemProps {
    item: Product;
    version:string;
}
export default function CartItem({item,version}: CartItemProps) {
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const {mutateAsync,isPending,isError} = useMutation({
        mutationFn: removeFromCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cartItems'] });
            toast({
                title: 'Item successfully removed from cart',

            })
        },
        onError: () => {
            toast({
                title: 'Failed to remove item from cart',
                variant:'destructive'
            })
        }
    })

    const removeItem = async () => {
        try {
            await mutateAsync({ data: item._id });
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
        }
    };

  return (
    <div className={`flex items-center justify-between p-4 border-b ${isRTL ? 'flex-row-reverse text-right' : 'flex-row'}`}>
      <div className={`flex items-center ${isRTL ? 'ml-4 flex-row-reverse':'mr-4 flex-row'} `}>
        {item.coverImage && (
          <Image src={`/imgs/images/${item.coverImage}`} alt={item.title_EN} width={96} height={96} className="w-24 h-24 object-cover rounded-md shadow-md" />
        )}
        <div >
        <h2 className="text-xl text-balance text-unitedPrimary font-semibold mx-1">{isRTL ? item.title_AR : item.title_EN}</h2>
        <p className={`text-gray-600 font-semibold my-1 mx-2 ${isRTL && 'rtl-text text-right'}`}>{item.price}{!isRTL && ' SAR'}{isRTL && 'ريال '}</p>
      </div>
      </div>
      <div className={` ${isRTL ? 'mr-4':'ml-4'}`}>
        <Button 
          className=" bg-red-500 rounded-lg text-white hover:bg-red-700 disabled:opacity-50"
          onClick={removeItem}
          disabled={isPending}
        >
          <Trash className="h-4 w-4" />
        </Button>
        {isError && <p className="text-red-500 text-sm mt-1">{isRTL ? 'خطأ في إزالة المنتج':'Error removing item'}</p>}
      </div>
    </div>
  );
}