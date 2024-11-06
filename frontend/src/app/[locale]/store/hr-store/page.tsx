'use client';
import React from 'react';
import { useState, useEffect, SetStateAction } from 'react';
import NavigationWrapper from '@/components/shared/NavigationWrapper';
import ProductCard from '@/components/shared/ProductCard';
import HeaderSection from '@/components/shared/HeaderSection';
import { useQuery } from '@tanstack/react-query';
import { getFilteredProducts } from '@/lib/api/productsApi';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { usePathname } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { fetchHeaderImages } from '@/lib/api/settingsRequests';

export default function ProductsPage() {
    const pathname = usePathname();
    const isRTL = pathname.startsWith('/ar');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(18);

    const { data: products, isLoading, isError } = useQuery({
        queryKey: ['hr-products'],
        queryFn: () => getFilteredProducts('category=Hr'),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 24,
    });

    const {data:headerImages,isFetched:HTFetched} = useQuery({
        queryKey:['headerImages'],
        queryFn:fetchHeaderImages,
    })

    const filteredProducts = Array.isArray(products) 
        ? products.filter(product => 
            product.title_EN.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.title_AR.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

    const handleSearch = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    if (isLoading) {
        return (
            <div className='w-full h-screen'>
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <>
            <NavigationWrapper />
                <HeaderSection pageTitle={{en:'HR Store',ar:'متجر الموراد البشرية'}} pageImage={HTFetched&& headerImages.HR_Store} breadCrumbArr={{en:['store'],ar:['المتجر']}} breadCrumbLinkArr={['store']}/>
                <div className="w-full max-w-4xl min-h-[21vh] mx-auto px-4 py-8">
                    <form onSubmit={handleSearch} className={`flex ${isRTL ? 'flex-row-reverse':'flex-row'} space-x-2 gap-2 mb-2`}>
                        <Input
                            type="text"
                            placeholder={isRTL ? "البحث عن المنتجات..." : "Search products..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-grow"
                        />
                        <Button type="submit" className="bg-unitedPrimary hover:bg-unitedPrimary/80">
                            <Search className="h-4 w-4 mr-2" />
                            {isRTL ? "بحث" : "Search"}
                        </Button>
                    </form>
                </div>

                <div className="w-full flex flex-wrap gap-4 items-center justify-center bg-transparent p-8">
                    {currentProducts.map((product, id) => (
                        <ProductCard key={id} product={product} storeType='hr-store' isRtl={isRTL} />
                    ))}
                </div>

                {filteredProducts.length > productsPerPage && (
                    <div className="flex justify-center space-x-2 mt-8">
                        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
                            <Button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-unitedPrimary text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </div>
                )}

                {filteredProducts.length === 0 && (
                    <p className="text-center text-3xl text-unitedPrimary mt-8">
                        {isRTL ? "لا توجد منتجات مطابقة لبحثك." : "No products match your search."}
                    </p>
                )}
        </>
    );
}