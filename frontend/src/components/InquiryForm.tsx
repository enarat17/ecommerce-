"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
  } from "./ui/form";
  import { Input } from "./ui/input";
  import {Button} from "./ui/button";
  import { useQueryClient,useMutation } from "@tanstack/react-query";
  import { postInquiry } from "@/lib/api/generalRequests";
  import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
    subject: z.string().min(1, { message: "Please enter your name" }),
    email: z.string().min(1, { message: "Please enter your email" }),
    phone: z.string().min(1, { message: "Please enter your number" }),
    message: z.string().min(1, { message: "Please enter your message" }),
    file: z.custom<FileList>()
    .refine((files) => files?.length === 0 || files?.length === 1, "Please upload one file")
    .transform(files => files?.[0])
    .optional(),
})


export default function InquiryForm({locale}:{locale:string}) {
    const isRtl = locale === "ar";
    const { toast } = useToast();
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues: {
            subject: "",
            email: "",
            phone: "",
            message: "",
            file:undefined,
        },
    })

    const {mutateAsync,isPending,isError} = useMutation({
        mutationFn:postInquiry,
        onSuccess:()=>{
            toast({
                description: "inquiry sent successfully",
              });
              form.reset();
        },
        onError:()=>{
            toast({
                description: "something went wrong",
                variant: "destructive",
              });
        }
    });
    const onSubmit = async( data: z.infer<typeof formSchema> )=>{
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'file' && value instanceof File) {
                  formData.append(key, value);
                } else if (value !== undefined && value !== null) {
                  formData.append(key, value as string);
                }
              });
            await mutateAsync(formData);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
                    className={`w-[500px] flex flex-col gap-4 border-2 border-unitedPrimary text-unitedPrimary p-6 rounded-md shadow-md ${isRtl && 'text-right rtl-text'}`}>
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold text-base">{isRtl ?"الموضوع":"Subject"}</FormLabel>
                                <Input
                                    placeholder={isRtl ?'موضع استفسارك':'type your subject here'}
                                    className={`${isRtl && 'text-right'}`}
                                    {...field}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold text-base">{isRtl ?"البريد الإلكتروني":"Email"}</FormLabel>
                                <Input       
                                    placeholder={isRtl ?'ادخل بريد الإلكتروني':'type your email here'}
                                    className={`${isRtl && 'text-right'}`}
                                    {...field}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold text-base">{isRtl ?"رقم الهاتف":"Phone"}</FormLabel>
                                <Input
                                    placeholder={isRtl ?'ادخل رقم الهاتف':'type your phone here'}
                                    className={`${isRtl && 'text-right'}`}
                                    {...field}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold text-base">{isRtl ?"الرسالة":"Message"}</FormLabel>
                                <Input
                                    placeholder={isRtl ?'ادخل رسالتك':'type your message here'}
                                    className={`h-[150px] ${isRtl && 'text-right'}`}
                                    {...field} 
                                    type="textarea"
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field: { onChange, value, ...rest } }) => (
                            <FormItem>
                            <FormLabel className="font-bold text-base">{isRtl ?"الملف":"File"}</FormLabel>
                            <FormControl>
                                <Input
                                type="file"
                                onChange={(e) => {
                                    onChange(e.target.files);
                                }}
                                {...rest}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-unitedPrimary hover:bg-unitedPrimary/85">{isRtl ?"ارسال":"Submit"}</Button>
                </form>
            </Form>
        </>
    );

}