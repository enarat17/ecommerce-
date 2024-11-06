'use client';
import ReviewSection from "@/components/ReviewSection";
import HeaderSection from "@/components/shared/HeaderSection";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import NavigationWrapper from "@/components/shared/NavigationWrapper";
import { getOneProduct } from "@/lib/api/productsApi";
import { useQuery } from '@tanstack/react-query';
import { sanitizeHtml } from '@/components/Security/dompurify';
import { useLocale } from 'next-intl';
import YouTube from 'react-youtube';
import VersionViewer from '@/components/shared/productsPage/VersionViewer';
import {motion} from "framer-motion";
import { TextEffect } from '@/components/animations/TextEffect';
import { fetchHeaderImages } from "@/lib/api/settingsRequests";
import Footer from "@/components/shared/Footer";
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ProductPage({params}: {params: {slug: string}}) {
    const slug = params.slug;
    const locale = useLocale();
    const isRtl = locale === 'ar';

    const {data:product, isLoading, isError} = useQuery({
        queryKey:['hr-product', slug],
        queryFn:() => getOneProduct(slug),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 24,
    })

    const {data:headerImages,isFetched:HTFetched} = useQuery({
        queryKey:['headerImages'],
        queryFn:fetchHeaderImages,
    })

    const getYoutubeVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }


    if(isLoading){
        return(
            <div className='w-full h-screen'>
                <LoadingSpinner />
            </div>
        )
    }

    const renderMediaContent = () => {
        const mediaStyle = {
            width: '100%',
            height: '480px',
            objectFit: 'cover' as 'cover',
        };

        if (product.video) {
            return (
                <YouTube
                    videoId={getYoutubeVideoId(product.video) ?? ''}
                    opts={{
                        width: '100%',
                        height: '480',
                        playerVars: {
                            autoplay: 0
                        },
                    }}
                />
            );
        } else if (product.images && product.images.length > 0) {
            return (
                <Carousel showArrows={true} showThumbs={false} infiniteLoop={true}>
                    {product.images.map((image: string, index: number) => (
                        <div key={index} style={mediaStyle}>
                            <Image src={`/imgs/images/${image}`} alt={`Product image ${index + 1}`} layout="fill" objectFit="cover" />
                        </div>
                    ))}
                </Carousel>
            );
        } else {
            return (
                <div style={mediaStyle}>
                    <Image src={`/imgs/images/${product.coverImage}`} alt="Product cover image"  objectFit="fill" height={480} width={1000} />
                </div>
            );
        }
    }
    
    return (
        <body className='w-full' >
            <NavigationWrapper />
            <div className='flex flex-col items-center'>
                <HeaderSection pageTitle={{en:product.title_EN,ar:product.title_AR}} pageImage={HTFetched && headerImages.HR_Store} breadCrumbArr={{en:['store','hr-store'],ar:['المتجر','متجر الموارد البشرية ']}} breadCrumbLinkArr={['/store','/store/hr-store']}/>
                <div className='w-full max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 my-8'>
                    <div className={`flex flex-col lg:flex-row ${isRtl ? 'lg:flex-row-reverse' : ''} justify-between items-start gap-8`}>
                        <motion.div 
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5}}
                            className="w-full lg:w-1/2 bg-white p-4 rounded-xl shadow-md">
                            <div className={`text-zinc-900 font-semibold mb-6 ${isRtl && 'text-right'}`} dangerouslySetInnerHTML={{ __html: sanitizeHtml(isRtl ? product.body_AR : product.body_EN) }} />
                        </motion.div>
                        <motion.div 
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 0.2}}
                            className={`w-full lg:w-1/2 flex flex-col items-center`}>
                            <div className="w-full mb-8 rounded-xl overflow-hidden shadow-md">
                                {renderMediaContent()}
                            </div>
                            <div className="w-full flex flex-col items-center bg-white p-4 rounded-xl shadow-md">
                                <h2 className={`text-xl font-bold text-unitedPrimary mb-2 text-center`}>
                                    {isRtl ? "الإصدارات المتاحة" : "Available Versions"}
                                </h2>
                                <VersionViewer isArabic={isRtl} price={product.price} productId={product._id} />
                            </div>
                        </motion.div>
                    </div>
                </div>
                <ReviewSection  id={product._id} /> 
            </div>
            <Footer />
        </body>
    );
}