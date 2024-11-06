import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ServiceCard from "./ServiceCard";
import { Consultation } from "@/components/types/ConsultationTableColumns";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

interface ServiceTabsProps {
  services: Consultation[];
  isRtl: boolean;
}

export default function ServicesTabs({ services, isRtl }: ServiceTabsProps) {
  const [selectedCategory, setSelectedCategory] = React.useState("Business Services");

  const categories = [
    { name: "Business Services", value: "Business Services", route: "business-services" },
    { name: "Accounting Services", value: "Accounting Services", route: "accounting-services" },
    { name: "Auditing Services", value: "Auditing Services", route: "auditing-services" },
    { name: "Financial Services", value: "Financial Services", route: "financial-services" },
    { name: "HR Services", value: "HR Services", route: "hr-services" },
  ];

  const categoriesAr = [
    { name: "خدمات أعمالي", value: "Business Services", route: "business-services" },
    { name: "الخدمات المحاسبية", value: "Accounting Services", route: "accounting-services" },
    { name: "خدمات المراجعة", value: "Auditing Services", route: "auditing-services" },
    { name: "الخدمات المالية", value: "Financial Services", route: "financial-services" },
    { name: "الخدمات الإدارية", value: "HR Services", route: "hr-services" },
  ];

  const getServiceCards = (category: string, route: string) => {
    const filteredServices = services.filter(service => service.category === category);
    const displayedServices = filteredServices.slice(0, 5);

    return (
      <>
        <div className={`flex justify-around flex-wrap gap-4 ${isRtl ? "order-last" : ""}`}>
          {displayedServices.map(service => (
            <ServiceCard key={service.slug} service={service} serviceType={route} isRtl={isRtl} />
          ))}
        </div>
        {filteredServices.length > 5 && (
          <Link href={`/services/${route}`}>
            <Button className={`mt-4 bg-unitedPrimary text-white py-2 px-4 rounded hover:bg-sky-700 ${isRtl ? "ml-auto" : ""}`}>
              {isRtl ? "عرض المزيد" : "Show More"}
            </Button>
          </Link>
        )}
      </>
    );
  };

  const selectedCategories = isRtl ? categoriesAr : categories;

  return (
    <div className={`w-full mx-2 my-5 p-5 ${isRtl ? "text-right" : ""}`}>
      {/* Dropdown for smaller screens */}
      <div className="md:hidden">
        <Select onValueChange={setSelectedCategory} defaultValue="Business Services" dir={isRtl ? "rtl" : "ltr"}>
          <SelectTrigger className={`w-full bg-unitedPrimary text-white font-semibold `}>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className='text-unitedPrimary font-semibold border border-unitedSecondary'>
            {selectedCategories.map(category => (
              <SelectItem key={category.value} value={category.value} className='hover:cursor-pointer'>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="mt-4">
          {getServiceCards(selectedCategory, selectedCategories.find(c => c.value === selectedCategory)?.route || '')}
        </div>
      </div>

      {/* Tabs for larger screens */}
      <div className="hidden md:block">
        <Tabs defaultValue="Business Services" className="w-full">
          <TabsList className={isRtl ? "flex-row-reverse bg-unitedPrimary" : "bg-unitedPrimary"}>
            {selectedCategories.map(category => (
              <TabsTrigger key={category.value} value={category.value} className="font-bold px-5 text-white">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {selectedCategories.map(category => (
            <TabsContent key={category.value} value={category.value}>
              {getServiceCards(category.value, category.route)}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}