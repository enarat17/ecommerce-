'use client';
import React from 'react';
import { useState, useEffect, SetStateAction } from 'react';
import NavigationWrapper from '@/components/shared/NavigationWrapper';
import ServiceCard from '@/components/shared/servicesPage/ServiceCard';
import HeaderSection from '@/components/shared/HeaderSection';
import { useQuery } from '@tanstack/react-query';
import {fetchConsults} from '@/lib/api/consultsApi';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { useLocale } from 'next-intl';
import { fetchHeaderImages } from '@/lib/api/settingsRequests';

export default function FinancialServicesPage() {
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [servicesPerPage] = useState(10);

    const { data: services, isLoading, isError } = useQuery({
        queryKey: ['consults'],
        queryFn: fetchConsults,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 24,
    });

    const {data:headerImages,isFetched:HTFetched} = useQuery({
        queryKey:['headerImages'],
        queryFn:fetchHeaderImages,
    })

    const filteredServices = Array.isArray(services) 
        ? services.filter(service => 
            service.category === "Financial Services" &&
            (service.title_EN.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.title_AR.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        : [];

    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

    const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

    const handleSearch = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    if (isLoading) {
        return (
            <div className='w-full h-screen'>
                <LoadingSpinner  />
            </div>
        );
    }

    return (
        <>
            <NavigationWrapper />
            <HeaderSection pageTitle={{en:'Financial Services',ar:'الخدمات المالية'}} pageImage={HTFetched && headerImages.financialServices} breadCrumbArr={{en:['services'],ar:['الخدمات']}} breadCrumbLinkArr={['/services']}/>
                <div className="w-full max-w-4xl mx-auto px-4 py-8">
                    <form onSubmit={handleSearch} className={`flex ${isRTL ? 'flex-row-reverse':'flex-row'} space-x-2 gap-2 mb-2`}>
                        <Input
                            type="text"
                            placeholder={isRTL ? "البحث عن الخدمات ..." : "Search services..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-grow"
                        />
                        <Button type="submit" className="bg-unitedPrimary hover:bg-unitedPrimary/80">
                            <Search className={`h-4 w-4 mr-2`} />
                            {isRTL ? "بحث" : "Search"}
                        </Button>
                    </form>
                </div>

                <div className="w-full flex flex-wrap gap-8 items-center justify-center bg-transparent p-4">
                    {currentServices.map((service, id) => (
                        <ServiceCard key={id} service={service} serviceType='financial-services' isRtl={isRTL} />
                    ))}
                </div>

                {filteredServices.length > servicesPerPage && (
                    <div className={`flex justify-center space-x-2 mt-8 mb-1 ${isRTL && 'flex-row-reverse'}`}>
                        {Array.from({ length: Math.ceil(filteredServices.length / servicesPerPage) }).map((_, index) => (
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

                {filteredServices.length === 0 && (
                    <p className="text-center text-3xl text-unitedPrimary mt-8">
                        {isRTL ? "لا توجد خدمات أعمال مطابقة لبحثك." : "No financial services match your search."}
                    </p>
                )}
        </>
    );
}