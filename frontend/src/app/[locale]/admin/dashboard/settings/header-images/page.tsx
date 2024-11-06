'use client';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {useState,useRef, useEffect} from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {useMutation,useQuery, useQueryClient} from "@tanstack/react-query";
import BackButton from "@/components/shared/Dashboard/BackButton";
import { useToast } from "@/components/ui/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { updateHeaderImages,fetchHeaderImages } from "@/lib/api/settingsRequests";

const HeaderImagesSchema = z.object({
    HR_Store: z.instanceof(File).optional(),
    Financial_Store: z.instanceof(File).optional(),
    storePage: z.instanceof(File).optional(),
    loggingPage: z.instanceof(File).optional(),
    blogsPage: z.instanceof(File).optional(),
    businessServices:z.instanceof(File).optional(),
    accountingServices:z.instanceof(File).optional(),
    auditingServices:z.instanceof(File).optional(),
    financialServices:z.instanceof(File).optional(),
    HrServices:z.instanceof(File).optional(),
    servicesPage:z.instanceof(File).optional(),
    aboutUsPage:z.instanceof(File).optional(),
})

type HeaderImagesType = z.infer<typeof HeaderImagesSchema>;
export default function HeaderImages() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [showHRstoreImageInput, setShowHRstoreImageInput] = useState(false);
    const [hrStoreImageName, setHRstoreImageName] = useState('');
    const hrStoreImageRef = useRef<HTMLInputElement>(null);
    const [showFinancialstoreImageInput, setShowFinancialstoreImageInput] = useState(false);
    const [financialStoreImageName, setFinancialstoreImageName] = useState('');
    const financialStoreImageRef = useRef<HTMLInputElement>(null);
    const [showStorePageImageInput, setShowStorePageImageInput] = useState(false);
    const [storePageImageName, setStorePageImageName] = useState('');
    const storePageImageRef = useRef<HTMLInputElement>(null);
    const [showLoggingPageImageInput, setShowLoggingPageImageInput] = useState(false);
    const [loggingPageImageName, setLoggingPageImageName] = useState('');
    const loggingPageImageRef = useRef<HTMLInputElement>(null);
    const [showBlogsPageImageInput, setShowBlogsPageImageInput] = useState(false);
    const [blogsPageImageName, setBlogsPageImageName] = useState('');
    const blogsPageImageRef = useRef<HTMLInputElement>(null);
    const [showBusinessServicesImageInput, setShowBusinessServicesImageInput] = useState(false);
    const [businessServicesImageName, setBusinessServicesImageName] = useState('');
    const businessServicesImageRef = useRef<HTMLInputElement>(null);
    const [showAccountingServicesImageInput, setShowAccountingServicesImageInput] = useState(false);
    const [accountingServicesImageName, setAccountingServicesImageName] = useState('');
    const accountingServicesImageRef = useRef<HTMLInputElement>(null);
    const [showAuditingServicesImageInput, setShowAuditingServicesImageInput] = useState(false);
    const [auditingServicesImageName, setAuditingServicesImageName] = useState('');
    const auditingServicesImageRef = useRef<HTMLInputElement>(null);
    const [showFinancialServicesImageInput, setShowFinancialServicesImageInput] = useState(false);
    const [financialServicesImageName, setFinancialServicesImageName] = useState('');
    const financialServicesImageRef = useRef<HTMLInputElement>(null);
    const [showHrServicesImageInput, setShowHrServicesImageInput] = useState(false);
    const [hrServicesImageName, setHrServicesImageName] = useState('');
    const hrServicesImageRef = useRef<HTMLInputElement>(null);
    const [showServicesPageImageInput, setShowServicesPageImageInput] = useState(false);
    const [servicesPageImageName, setServicesPageImageName] = useState('');
    const servicesPageImageRef = useRef<HTMLInputElement>(null);
    const [showAboutUsPageImageInput, setShowAboutUsPageImageInput] = useState(false);
    const [aboutUsPageImageName, setAboutUsPageImageName] = useState('');
    const aboutUsPageImageRef = useRef<HTMLInputElement>(null);

    const form = useForm<HeaderImagesType>({
        resolver: zodResolver(HeaderImagesSchema),
        defaultValues: {
            HR_Store: undefined,
            Financial_Store: undefined,
            storePage: undefined,
            loggingPage: undefined,
            blogsPage: undefined,
            businessServices: undefined,
            accountingServices: undefined,
            auditingServices: undefined,
            financialServices: undefined,
            HrServices: undefined,
            servicesPage: undefined,
            aboutUsPage: undefined,
        },
    });

    const {data:headerImages,isFetched}=useQuery({
        queryKey: ["headerImages"],
        queryFn: fetchHeaderImages,
        })


    const { mutateAsync,isPending} = useMutation({
        mutationFn:updateHeaderImages,
        onSuccess:() => {
            toast({
                description: "Header images updated successfully",
            })
            queryClient.invalidateQueries({ queryKey: ['headerImages'] });
            setShowHRstoreImageInput(false);
            setShowFinancialstoreImageInput(false);
            setShowStorePageImageInput(false);
            setShowLoggingPageImageInput(false);
            setShowBlogsPageImageInput(false);
            setShowBusinessServicesImageInput(false);
            setShowAccountingServicesImageInput(false);
            setShowAuditingServicesImageInput(false);
            setShowFinancialServicesImageInput(false);
            setShowHrServicesImageInput(false);
            setShowServicesPageImageInput(false);
            setShowAboutUsPageImageInput(false);
        },
      onError:(error:any)=>{
            toast({
                title: "Error",
                description:error.message, 
                variant: "destructive",
            })
          }
        })

    const handleHRstoreImageChange = (e: any ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setHRstoreImageName(file ? file.name : '');
        form.setValue('HR_Store', file);
      };

    const handleFinancialstoreImageChange = (e: any ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFinancialstoreImageName(file ? file.name : '');
        form.setValue('Financial_Store', file);
      };

    const handleStorePageImageChange = (e: any  ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setStorePageImageName(file ? file.name : '');
        form.setValue('storePage', file);
      };

    const handleLoggingPageImageChange = (e: any  ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setLoggingPageImageName(file ? file.name : '');
        form.setValue('loggingPage', file);
      };

    const handleBlogsPageImageChange = (e: any  ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setBlogsPageImageName(file ? file.name : '');
        form.setValue('blogsPage', file);
      };

    const handleBusinessServicesImageChange = (e: any  ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setBusinessServicesImageName(file ? file.name : '');
        form.setValue('businessServices', file);
      };

    const handleAccountingServicesImageChange = (e: any  ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setAccountingServicesImageName(file ? file.name : '');
        form.setValue('accountingServices', file);
      };

    const handleAuditingServicesImageChange = (e: any  ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setAuditingServicesImageName(file ? file.name : '');
        form.setValue('auditingServices', file);
      };

    const handleFinancialServicesImageChange = (e: any  ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFinancialServicesImageName(file ? file.name : '');
        form.setValue('financialServices', file);
      };

    const handleHrServicesImageChange = (e: any  ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setHrServicesImageName(file ? file.name : '');
        form.setValue('HrServices', file);
      };

    const handleServicesPageImageChange = (e: any  ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setServicesPageImageName(file ? file.name : '');
        form.setValue('servicesPage', file);
      };

    const handleAboutUsPageImageChange = (e: any  ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setAboutUsPageImageName(file ? file.name : '');
        form.setValue('aboutUsPage', file);
      };


    const onSubmit = async (data: HeaderImagesType) => {
        const formData = new FormData();
        if(data.HR_Store instanceof File)formData.append("HR_Store", data.HR_Store);
        if(data.Financial_Store instanceof File)formData.append("Financial_Store", data.Financial_Store);
        if(data.storePage instanceof File)formData.append("storePage", data.storePage);
        if(data.loggingPage instanceof File)formData.append("loggingPage", data.loggingPage);
        if(data.blogsPage instanceof File)formData.append("blogsPage", data.blogsPage);
        if(data.businessServices instanceof File)formData.append("businessServices", data.businessServices);
        if(data.accountingServices instanceof File)formData.append("accountingServices", data.accountingServices);
        if(data.auditingServices instanceof File)formData.append("auditingServices", data.auditingServices);
        if(data.financialServices instanceof File)formData.append("financialServices", data.financialServices);
        if(data.HrServices instanceof File)formData.append("HrServices", data.HrServices);
        if(data.servicesPage instanceof File)formData.append("servicesPage", data.servicesPage);
        if(data.aboutUsPage instanceof File)formData.append("aboutUsPage", data.aboutUsPage);
        await mutateAsync({id:headerImages._id,data:formData});
    }

    return (
        <div>
            <BackButton />
            <div className="flex flex-col items-center justify-center min-h-screen py-12">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 py-2 rounded-2xl">Website header images</h1>
                {isFetched && <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-6">
                            {showHRstoreImageInput ? (
                                <FormField control={form.control} name="HR_Store" render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className='font-semibold'>HR store image</FormLabel>
                                      <FormControl>
                                        <div className="flex items-center">
                                          <Button
                                            type="button"
                                            onClick={() => hrStoreImageRef.current?.click()}
                                            className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary/90 w-[200px]"
                                          >
                                            {hrStoreImageName ? 'Choose Another Image' : 'Upload header Image'}
                                          </Button>
                                          <input
                                            type="file"
                                            ref={hrStoreImageRef}
                                            onChange={handleHRstoreImageChange}
                                            className="hidden"
                                          />
                                          {hrStoreImageName && <p className="ml-2 font-medium">Selected Image: <b>{hrStoreImageName}</b></p>}
                                        </div>
                                      </FormControl>
                                      <Button onClick={() => setShowHRstoreImageInput(false)} className="mt-2">Cancel</Button>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                  />
                            ):(
                                headerImages.HR_Store && (
                                    <div className="mt-5">
                                        <h2 className="font-semibold">HR-store header image (Current)</h2>
                                        <Image 
                                            src={`/imgs/images/${headerImages.HR_Store}`} 
                                            alt="hr store header image" 
                                            width={550} 
                                            height={250} 
                                            className="object-cover cursor-pointer border w-[550px] h-[250px] border-sky-800 " 
                                            onClick={() => setShowHRstoreImageInput(true)}
                                        />
                                    </div>
                                )
                            )}
                            {showFinancialstoreImageInput ? (
                                <FormField control={form.control} name="Financial_Store" render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className='font-semibold'>Financial store image</FormLabel>
                                      <FormControl>
                                        <div className="flex items-center">
                                          <Button
                                            type="button"
                                            onClick={() => financialStoreImageRef.current?.click()}
                                            className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary/90 w-[200px]"
                                          >
                                            {financialStoreImageName ? 'Choose Another Image' : 'Upload header Image'}
                                          </Button>
                                          <input
                                            type="file"
                                            ref={financialStoreImageRef}
                                            onChange={handleFinancialstoreImageChange}
                                            className="hidden"
                                          />
                                          {financialStoreImageName && <p className="ml-2 font-medium">Selected Image: <b>{financialStoreImageName}</b></p>}
                                        </div>
                                      </FormControl>
                                      <Button onClick={() => setShowFinancialstoreImageInput(false)} className="mt-2">Cancel</Button>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                  />
                            ):(
                                headerImages.Financial_Store && (
                                    <div className="mt-5">
                                        <h2 className="font-semibold">Financial-store header image</h2>
                                        <Image 
                                            src={`/imgs/images/${headerImages.Financial_Store}`} 
                                            alt="financial store header image" 
                                            width={550} 
                                            height={250} 
                                            className="object-cover cursor-pointer border w-[550px] h-[250px] border-sky-800 " 
                                            onClick={() => setShowFinancialstoreImageInput(true)}
                                        />
                                    </div>
                                )
                            )}
                            {showLoggingPageImageInput ? (
                                <FormField control={form.control} name="loggingPage" render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className='font-semibold'>logging page image</FormLabel>
                                      <FormControl>
                                        <div className="flex items-center">
                                          <Button
                                            type="button"
                                            onClick={() => loggingPageImageRef.current?.click()}
                                            className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary/90 w-[200px]"
                                          >
                                            {loggingPageImageName ? 'Choose Another Image' : 'Upload header Image'}
                                          </Button>
                                          <input
                                            type="file"
                                            ref={loggingPageImageRef}
                                            onChange={handleLoggingPageImageChange}
                                            className="hidden"
                                          />
                                          {loggingPageImageName && <p className="ml-2 font-medium">Selected Image: <b>{loggingPageImageName}</b></p>}
                                        </div>
                                      </FormControl>
                                      <Button onClick={() => setShowLoggingPageImageInput(false)} className="mt-2">Cancel</Button>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                  />
                            ):(
                                headerImages.loggingPage && (
                                    <div className="mt-5">
                                        <h2 className="font-semibold">logging page header image</h2>
                                        <Image 
                                            src={`/imgs/images/${headerImages.loggingPage}`} 
                                            alt="logging page header image" 
                                            width={550} 
                                            height={250} 
                                            className="object-cover cursor-pointer border w-[550px] h-[250px] border-sky-800 " 
                                            onClick={() => setShowLoggingPageImageInput(true)}
                                        />
                                    </div>
                                )
                            )}
                            {showStorePageImageInput ? (
                                <FormField control={form.control} name="storePage" render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className='font-semibold'>store page image</FormLabel>
                                      <FormControl>
                                        <div className="flex items-center">
                                          <Button
                                            type="button"
                                            onClick={() => storePageImageRef.current?.click()}
                                            className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary/90 w-[200px]"
                                          >
                                            {storePageImageName ? 'Choose Another Image' : 'Upload header Image'}
                                          </Button>
                                          <input
                                            type="file"
                                            ref={storePageImageRef}
                                            onChange={handleStorePageImageChange}
                                            className="hidden"
                                          />
                                          {storePageImageName && <p className="ml-2 font-medium">Selected Image: <b>{storePageImageName}</b></p>}
                                        </div>
                                      </FormControl>
                                      <Button onClick={() => setShowStorePageImageInput(false)} className="mt-2">Cancel</Button>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                  />
                            ):(
                                headerImages.storePage && (
                                    <div className="mt-5">
                                        <h2 className="font-semibold">Store page header image</h2>
                                        <Image 
                                            src={`/imgs/images/${headerImages.storePage}`} 
                                            alt="store page header image" 
                                            width={550} 
                                            height={250} 
                                            className="object-cover cursor-pointer border w-[550px] h-[250px] border-sky-800 " 
                                            onClick={() => setShowStorePageImageInput(true)}
                                        />
                                    </div>
                                )
                            )}
                            {showBlogsPageImageInput ? (
                                <FormField control={form.control} name="blogsPage" render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className='font-semibold'>blogs page image</FormLabel>
                                      <FormControl>
                                        <div className="flex items-center">
                                          <Button
                                            type="button"
                                            onClick={() => blogsPageImageRef.current?.click()}
                                            className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary/90 w-[200px]"
                                          >
                                            {blogsPageImageName ? 'Choose Another Image' : 'Upload header Image'}
                                          </Button>
                                          <input
                                            type="file"
                                            ref={blogsPageImageRef}
                                            onChange={handleBlogsPageImageChange}
                                            className="hidden"
                                          />
                                          {blogsPageImageName && <p className="ml-2 font-medium">Selected Image: <b>{blogsPageImageName}</b></p>}
                                        </div>
                                      </FormControl>
                                      <Button onClick={() => setShowBlogsPageImageInput(false)} className="mt-2">Cancel</Button>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                  />
                            ):(
                                headerImages.blogsPage && (
                                    <div className="mt-5">
                                        <h2 className="font-semibold">Articles page header image</h2>
                                        <Image 
                                            src={`/imgs/images/${headerImages.blogsPage}`} 
                                            alt="blogs page header image" 
                                            width={550} 
                                            height={250} 
                                            className="object-cover cursor-pointer border w-[550px] h-[250px] border-sky-800 " 
                                            onClick={() => setShowBlogsPageImageInput(true)}
                                        />
                                    </div>
                                )
                            )}
                            {showBusinessServicesImageInput ? (
                                <FormField control={form.control} name="businessServices" render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className='font-semibold'>business services image</FormLabel>
                                      <FormControl>
                                        <div className="flex items-center">
                                          <Button
                                            type="button"
                                            onClick={() => businessServicesImageRef.current?.click()}
                                            className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary/90 w-[200px]"
                                          >
                                            {businessServicesImageName ? 'Choose Another Image' : 'Upload header Image'}
                                          </Button>
                                          <input
                                            type="file"
                                            ref={businessServicesImageRef}
                                            onChange={handleBusinessServicesImageChange}
                                            className="hidden"
                                          />
                                          {businessServicesImageName && <p className="ml-2 font-medium">Selected Image: <b>{businessServicesImageName}</b></p>}
                                        </div>
                                      </FormControl>
                                      <Button onClick={() => setShowBusinessServicesImageInput(false)} className="mt-2">Cancel</Button>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                  />
                            ):(
                                headerImages.businessServices && (
                                    <div className="mt-5">
                                        <h2 className="font-semibold">Business services header image</h2>
                                        <Image 
                                            src={`/imgs/images/${headerImages.businessServices}`} 
                                            alt="business services header image" 
                                            width={550} 
                                            height={250} 
                                            className="object-cover cursor-pointer border w-[550px] h-[250px] border-sky-800 " 
                                            onClick={() => setShowBusinessServicesImageInput(true)}
                                        />
                                    </div>
                                )
                            )}
                            {showAccountingServicesImageInput ? (
                                <FormField control={form.control} name="accountingServices" render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className='font-semibold'>accounting services image</FormLabel>
                                      <FormControl>
                                        <div className="flex items-center">
                                          <Button
                                            type="button"
                                            onClick={() => accountingServicesImageRef.current?.click()}
                                            className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary/90 w-[200px]"
                                          >
                                            {accountingServicesImageName ? 'Choose Another Image' : 'Upload header Image'}
                                          </Button>
                                          <input
                                            type="file"
                                            ref={accountingServicesImageRef}
                                            onChange={handleAccountingServicesImageChange}
                                            className="hidden"
                                          />
                                          {accountingServicesImageName && <p className="ml-2 font-medium">Selected Image: <b>{accountingServicesImageName}</b></p>}
                                        </div>
                                      </FormControl>
                                      <Button onClick={() => setShowAccountingServicesImageInput(false)} className="mt-2">Cancel</Button>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                  />
                            ):(
                                headerImages.accountingServices && (
                                    <div className="mt-5">
                                        <h2 className="font-semibold">Accounting services header image</h2>
                                        <Image
                                            src={`/imgs/images/${headerImages.accountingServices}`}
                                            alt="accounting services header image"
                                            width={550}
                                            height={250}
                                            className="object-cover cursor-pointer border w-[550px] h-[250px] border-sky-800 "
                                            onClick={() => setShowAccountingServicesImageInput(true)}
                                        />
                                    </div>
                                )
                            )}
                            {showAuditingServicesImageInput ? (
                                    <FormField control={form.control} name="auditingServices" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Auditing services image</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Button
                                                        type="button"
                                                        onClick={() => auditingServicesImageRef.current?.click()}
                                                        className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary/90 w-[200px]"
                                                    >
                                                        {auditingServicesImageName ? 'Choose Another Image' : 'Upload header Image'}
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        ref={auditingServicesImageRef}
                                                        onChange={handleAuditingServicesImageChange}
                                                        className="hidden"
                                                    />
                                                    {auditingServicesImageName && <p className="ml-2 font-medium">Selected Image: <b>{auditingServicesImageName}</b></p>}
                                                </div>
                                            </FormControl>
                                            <Button onClick={() => setShowAuditingServicesImageInput(false)} className="mt-2">Cancel</Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                ) : (
                                    headerImages.auditingServices && (
                                        <div className="mt-5">
                                            <h2 className="font-semibold">Audititng services header image</h2>
                                            <Image 
                                                src={`/imgs/images/${headerImages.auditingServices}`} 
                                                alt="auditing services header image" 
                                                width={550} 
                                                height={250} 
                                                className="object-cover cursor-pointer border w-[550px] h-[250px] border-sky-800 " 
                                                onClick={() => setShowAuditingServicesImageInput(true)}
                                            />
                                        </div>
                                    )
                                )}
                                {showFinancialServicesImageInput ? (
                                    <FormField control={form.control} name="financialServices" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Financial services image</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Button
                                                        type="button"
                                                        onClick={() => financialServicesImageRef.current?.click()}
                                                        className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary/90 w-[200px]"
                                                    >
                                                        {financialServicesImageName ? 'Choose Another Image' : 'Upload header Image'}
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        ref={financialServicesImageRef}
                                                        onChange={handleFinancialServicesImageChange}
                                                        className="hidden"
                                                    />
                                                    {financialServicesImageName && <p className="ml-2 font-medium">Selected Image: <b>{financialServicesImageName}</b></p>}
                                                </div>
                                            </FormControl>
                                            <Button onClick={() => setShowFinancialServicesImageInput(false)} className="mt-2">Cancel</Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                ) : (
                                    headerImages.financialServices && (
                                        <div className="mt-5">
                                            <h2 className="font-semibold">Financial services header image</h2>
                                            <Image 
                                                src={`/imgs/images/${headerImages.financialServices}`} 
                                                alt="financial services header image" 
                                                width={550} 
                                                height={250} 
                                                className="object-cover cursor-pointer border w-[550px] h-[250px] border-sky-800 " 
                                                onClick={() => setShowFinancialServicesImageInput(true)}
                                            />
                                        </div>
                                    )
                                )}
                                {showHrServicesImageInput ? (
                                    <FormField control={form.control} name="HrServices" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>HR services image</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Button
                                                        type="button"
                                                        onClick={() => hrServicesImageRef.current?.click()}
                                                        className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary/90 w-[200px]"
                                                    >
                                                        {hrServicesImageName ? 'Choose Another Image' : 'Upload header Image'}
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        ref={hrServicesImageRef}
                                                        onChange={handleHrServicesImageChange}
                                                        className="hidden"
                                                    />
                                                    {hrServicesImageName && <p className="ml-2 font-medium">Selected Image: <b>{hrServicesImageName}</b></p>}
                                                </div>
                                            </FormControl>
                                            <Button onClick={() => setShowHrServicesImageInput(false)} className="mt-2">Cancel</Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                ) : (
                                    headerImages.HrServices && (
                                        <div className="mt-5">
                                            <h2 className="font-semibold">Hr-services header image</h2>
                                            <Image 
                                                src={`/imgs/images/${headerImages.HrServices}`} 
                                                alt="HR services header image" 
                                                width={550} 
                                                height={250} 
                                                className="object-cover cursor-pointer border w-[550px] h-[250px] border-sky-800 " 
                                                onClick={() => setShowHrServicesImageInput(true)}
                                            />
                                        </div>
                                    )
                                )}
                                {showServicesPageImageInput ? (
                                    <FormField control={form.control} name="servicesPage" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Services page image</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Button
                                                        type="button"
                                                        onClick={() => servicesPageImageRef.current?.click()}
                                                        className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary/90 w-[200px]"
                                                    >
                                                        {servicesPageImageName ? 'Choose Another Image' : 'Upload header Image'}
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        ref={servicesPageImageRef}
                                                        onChange={handleServicesPageImageChange}
                                                        className="hidden"
                                                    />
                                                    {servicesPageImageName && <p className="ml-2 font-medium">Selected Image: <b>{servicesPageImageName}</b></p>}
                                                </div>
                                            </FormControl>
                                            <Button onClick={() => setShowServicesPageImageInput(false)} className="mt-2">Cancel</Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                ) : (
                                    headerImages.servicesPage && (
                                        <div className="mt-5">
                                            <h2 className="font-semibold">Services page header image</h2>
                                            <Image 
                                                src={`/imgs/images/${headerImages.servicesPage}`} 
                                                alt="services page header image" 
                                                width={550} 
                                                height={250} 
                                                className="object-cover cursor-pointer border w-[550px] h-[250px] border-sky-800 " 
                                                onClick={() => setShowServicesPageImageInput(true)}
                                            />
                                        </div>
                                    )
                                )}
                                {showAboutUsPageImageInput ? (
                                    <FormField control={form.control} name="aboutUsPage" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>About us page image</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <Button
                                                        type="button"
                                                        onClick={() => aboutUsPageImageRef.current?.click()}
                                                        className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary/90 w-[200px]"
                                                    >
                                                        {aboutUsPageImageName ? 'Choose Another Image' : 'Upload header Image'}
                                                    </Button>
                                                    <input
                                                        type="file"
                                                        ref={aboutUsPageImageRef}
                                                        onChange={handleAboutUsPageImageChange}
                                                        className="hidden"
                                                    />
                                                    {aboutUsPageImageName && <p className="ml-2 font-medium">Selected Image: <b>{aboutUsPageImageName}</b></p>}
                                                </div>
                                            </FormControl>
                                            <Button onClick={() => setShowAboutUsPageImageInput(false)} className="mt-2">Cancel</Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                ) : (
                                    headerImages.aboutUsPage && (
                                        <div className="mt-5">
                                            <h2 className="font-semibold">about us  page header image</h2>
                                            <Image 
                                                src={`/imgs/images/${headerImages.aboutUsPage}`} 
                                                alt="about us  header image" 
                                                width={550} 
                                                height={250} 
                                                className="object-cover cursor-pointer border w-[550px] h-[250px] border-sky-800 " 
                                                onClick={() => setShowAboutUsPageImageInput(true)}
                                            />
                                        </div>
                                    )
                                )}
                        </div>
                        <Button type="submit" disabled={isPending} className="mt-6 bg-unitedPrimary hover:bg-unitedPrimary/90 w-full">
                            Submit 
                        </Button>
                    </form>
                </Form>}
            </div>
        </div>
    )
}