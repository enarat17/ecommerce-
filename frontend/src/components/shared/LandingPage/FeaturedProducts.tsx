import Slider from "react-slick";
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Product } from '@/components/types/ProductTableColumns';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface FeaturedProductsProps {
    products: Product[];
    locale: 'en' | 'ar';
}

export default function FeaturedProducts({ products, locale }: FeaturedProductsProps) {
    const isRTL = locale === 'ar';

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        rtl: isRTL,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className={`w-full  px-4 py-12 bg-unitedPrimary flex flex-col items-center justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
            <h2 className="text-4xl font-bold mb-12 w-full text-center text-white">
                {isRTL ? 'المنتجات المميزة' : 'Featured Products'}
            </h2>
            <Slider {...settings} className="w-full max-w-7xl">
                {products.map(product => (
                    <div key={product._id} className="px-4">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-[450px]">
                            <div className="p-8 h-full flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold mb-4 text-unitedPrimary line-clamp-2 h-16">
                                        {isRTL ? product.title_AR : product.title_EN}
                                    </h2>
                                    <p className="text-gray-600 text-base line-clamp-6 h-36 overflow-hidden">
                                        {isRTL ? product.description_AR : product.description_EN}
                                    </p>
                                </div>
                                <Link href={`/products/${product._id}`} className="mt-6">
                                    <Button 
                                        className="w-full bg-unitedPrimary/90 hover:bg-unitedPrimary text-white font-bold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center group text-lg"
                                    >
                                        <Eye className="mr-2 group-hover:animate-pulse" size={24} />
                                        {isRTL ? 'عرض المنتج' : 'View Product'}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}