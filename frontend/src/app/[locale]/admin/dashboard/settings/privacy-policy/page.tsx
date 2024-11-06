"use client";
import { useEffect, useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import Image from 'next/image';
import BackButton from '@/components/shared/Dashboard/BackButton';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { fetchPrivacyPolicyInfo, updatePrivacyPolicyInfo } from '@/lib/api/settingsRequests';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const formSchema = z.object({
    _id: z.string().optional(),
    description_AR: z.string().min(1, { message: "Please enter your Arabic description" }),
    description_EN: z.string().min(1, { message: "Please enter your English description" }),
    coverImage: z.union([z.instanceof(File), z.string()]).optional(),
});

type PrivacyPolicyData = z.infer<typeof formSchema>;

export default function PrivacyPolicySettings() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [showCoverImageInput, setShowCoverImageInput] = useState(false);
    const [coverImageName, setCoverImageName] = useState('');
    const coverImageRef = useRef<HTMLInputElement>(null);

    const { data: privacyPolicyData, isFetched } = useQuery<PrivacyPolicyData>({
        queryKey: ['privacy-policy'],
        queryFn: fetchPrivacyPolicyInfo,
        staleTime: 60 * 60 * 5,
    });

    const form = useForm<PrivacyPolicyData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description_AR: '',
            description_EN: '',
            coverImage: undefined,
        },
    });

    useEffect(() => {
        if (isFetched && privacyPolicyData) {
            form.reset(privacyPolicyData);
        }
    }, [isFetched, privacyPolicyData, form]);

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setCoverImageName(file ? file.name : '');
        form.setValue('coverImage', file || undefined, { shouldDirty: true, shouldValidate: true });
    };

    const { mutateAsync } = useMutation({
        mutationFn: updatePrivacyPolicyInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['privacy-policy'] });
            toast({
                title: "Settings updated",
                description: "Your privacy policy settings have been successfully updated.",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: "There was an error updating your settings. Please try again.",
                variant: "destructive",
            });
        },
    });

    const onSubmit = async (data: PrivacyPolicyData) => {
        try {
            const formData = new FormData();
            formData.append("description_AR", data.description_AR);
            formData.append("description_EN", data.description_EN);
            if (data.coverImage instanceof File) {
                formData.append("coverImage", data.coverImage);
            }
            await mutateAsync({ id: privacyPolicyData?._id || '', data: formData });
        } catch (error) {
            console.error('Error in onSubmit:', error);
        }
    };

    if (!isFetched) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <BackButton />
            <div className="flex flex-col items-center justify-center min-h-screen py-12">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 py-2 rounded-2xl">Privacy Policy Content</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1200px] w-full grid grid-cols-1 gap-6">
                        <FormField
                            control={form.control}
                            name="description_AR"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Privacy policy Arabic</FormLabel>
                                    <FormControl>
                                        <ReactQuill 
                                            placeholder="Privacy policy in Arabic" {...field} 
                                            modules={{
                                                toolbar:[[{'direction':'rtl'}],]
                                            }}
                                            className='ql-editor-rtl'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description_EN"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Privacy policy English</FormLabel>
                                    <FormControl>
                                        <ReactQuill
                                            
                                            placeholder="Privacy policy in English" {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        {showCoverImageInput ? (
                            <FormField control={form.control} name="coverImage" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-semibold'>Cover Image</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center">
                                            <Button
                                                type="button"
                                                onClick={() => coverImageRef.current?.click()}
                                                className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[200px]"
                                            >
                                                {coverImageName ? 'Choose Another Image' : 'Upload Cover Image'}
                                            </Button>
                                            <input
                                                type="file"
                                                ref={coverImageRef}
                                                onChange={handleCoverImageChange}
                                                className="hidden"
                                            />
                                            {coverImageName && <p className="ml-2 font-medium">Selected Image: <b>{coverImageName}</b></p>}
                                        </div>
                                    </FormControl>
                                    <Button onClick={() => setShowCoverImageInput(false)} className="mt-2">Cancel</Button>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        ) : (
                            privacyPolicyData && privacyPolicyData.coverImage && (
                                <div className="mt-5">
                                    <h2 className="font-semibold">Cover Image (Current)</h2>
                                    <Image 
                                        src={`/imgs/${privacyPolicyData.coverImage}`} 
                                        alt="Product cover image" 
                                        width={550} 
                                        height={250} 
                                        className="object-cover cursor-pointer border border-sky-800 " 
                                        onClick={() => setShowCoverImageInput(true)}
                                    />
                                </div>
                            )
                        )}
                        <Button type="submit" className="mt-6">Save</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}