'use client';
import React from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import BackButton from '@/components/shared/Dashboard/BackButton';
import { fetchAdminEmails, updateAdminEmails } from '@/lib/api/settingsRequests';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
    inquiryEmail: z.string().email().optional(),
    complaintEmail: z.string().email().optional(),
    storeEmail: z.string().email().optional(),
});

type EmailsData = z.infer<typeof formSchema>;

interface EmailInfo {
    _id: string;
    type: string;
    email: string;
}

export default function Emails() {
    const form = useForm<EmailsData>({
        resolver: zodResolver(formSchema),
    });
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { data: emailsData, isFetched } = useQuery<EmailInfo[]>({
        queryKey: ['emails'],
        queryFn: fetchAdminEmails,
        staleTime: 1000 * 60 * 60 * 5,
        gcTime: 1000 * 60 * 60 * 60,
    });

    const { mutateAsync } = useMutation({
        mutationFn: updateAdminEmails,
        onSuccess: () => {
            toast({
                title: 'Emails Updated Successfully',
                description: 'Emails have been updated successfully',
            });
            queryClient.invalidateQueries({ queryKey: ['emails'] });
        },
        onError: (error: Error) => {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        }
    });

    const onSubmit = async (data: EmailsData) => {
        const formData = new FormData();
        let hasChanges = false;
        
        if (emailsData) {
            emailsData.forEach(email => {
                const newEmail = data[`${email.type}Email` as keyof EmailsData];
                if (newEmail !== undefined && newEmail !== email.email) {
                    formData.append('_id', email._id);
                    formData.append('type', email.type);
                    formData.append('email', newEmail);
                    hasChanges = true;
                }
            });
        }

        if (hasChanges) {
            try {
                await mutateAsync(formData);
            } catch (error) {
                console.error(error);
            }
        } else {
            toast({
                title: 'No Changes',
                description: 'No email addresses were changed.',
            });
        }
    };

    useEffect(() => {
        if (isFetched && emailsData) {
            const formData = emailsData.reduce((acc, email) => {
                acc[`${email.type}Email` as keyof EmailsData] = email.email || '';
                return acc;
            }, {} as EmailsData);
            form.reset(formData);
        }
    }, [emailsData, form, isFetched]);

    return (
        <div>
            <BackButton />
            <div className="flex flex-col items-center justify-center min-h-screen py-12">
                <h1 className="text-4xl font-bold mb-6 text-center text-unitedPrimary py-2 rounded-2xl">Admin Emails</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1200px] w-full grid grid-cols-1 gap-6">
                        {['inquiry', 'complaint', 'store'].map((type) => (
                            <FormField
                                key={type}
                                control={form.control}
                                name={`${type}Email` as keyof EmailsData}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{type.charAt(0).toUpperCase() + type.slice(1)} Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder={`Email for ${type}`} {...field} type='email' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button type="submit" className="mt-6 bg-unitedPrimary hover:bg-unitedPrimary/85">Save</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}