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
  import { Button } from "./ui/button";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { useQueryClient,useMutation } from "@tanstack/react-query";
  import { postInquiry } from "@/lib/api/generalRequests";
  import { useToast } from "@/components/ui/use-toast";
  import { useLocale } from "next-intl";
  import {motion} from 'framer-motion';


const formSchema = z.object({
    subject: z.string().min(1, { message: "Please enter the job title" }),
    email: z.string().min(1, { message: "Please enter your email" }),
    phone: z.string().min(1, { message: "Please enter your number" }),
    message: z.string().min(1, { message: "Please enter your message" }),
    file: z.custom<FileList>()
    .refine((files) => files?.length === 0 || files?.length === 1, "Please upload one file")
    .transform(files => files?.[0]),
    category: z.string().min(1, { message: "Please select a category" }),
});

export default function JoinForm() {
    const {toast} = useToast();
    const locale = useLocale();
    const isRtl = locale === "ar";
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
                description: "your application has been submitted",
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
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
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
            console.error("Error submitting form:", error);
        }
    };

    return (
        <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`bg-white w-[500px] flex flex-col gap-4 border border-unitedPrimary text-unitedPrimary p-6 rounded-md shadow-md ${
            isRtl ? "text-right" : "text-left"
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FormItem>
                  <FormLabel>{isRtl ? "الموضوع" : "Subject"}</FormLabel>
                  <Input
                    placeholder={
                      isRtl
                        ? "الموضوع"
                        : "subject"
                    }
                    className={`${isRtl && 'text-right'}`}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              </motion.div>
            )}
          />
          <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">{isRtl ? 'تسجيل ك:':'join as :'}</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      dir="rtl"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isRtl ? '-':'-'} />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="client">
                            {isRtl ? 'عميل':'Client'}
                          </SelectItem>
                          <SelectItem value="partner">
                            {isRtl ? 'شريك':'Partner'}
                          </SelectItem>
                          <SelectItem value="employee">
                            {isRtl ? 'موظف':'Employee'}
                            </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FormItem>
                  <FormLabel>{isRtl ? "البريد الإلكتروني" : "Email"}</FormLabel>
                  <Input
                    placeholder={isRtl ? "البريد الإلكتروني" : "Email"}
                    className={`${isRtl && 'text-right'}`}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              </motion.div>
            )}
          />
  
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <FormItem>
                  <FormLabel>
                    {isRtl ? "رقم الهاتف" : "Phone Number"}
                  </FormLabel>
                  <Input
                    className={`${isRtl && 'text-right'}`}
                    placeholder={isRtl ? "رقم الهاتف" : "Phone Number"}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              </motion.div>
            )}
          />
  
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <FormItem>
                  <FormLabel>{isRtl ? "استفسار" : "Inquiry"}</FormLabel>
                  <Input
                    placeholder={
                      isRtl
                        ? "اكتب تجربتك السابقة هنا"
                        : "Type your past experience here"
                    }
                    {...field}
                    className={`${isRtl && 'text-right'} h-[150px]`}
                    type="textarea"
                  />
                  <FormMessage />
                </FormItem>
              </motion.div>
            )}
          />
  
          <FormField
            control={form.control}
            name="file"
            render={({ field: { onChange, value, ...rest } }) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <FormItem>
                  <FormLabel>{isRtl ? "تحميل ملف" : "Upload File"}</FormLabel>
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
              </motion.div>
            )}
          />
  
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button className="w-full bg-unitedPrimary hover:bg-unitedPrimary/85" type="submit">
              {isRtl ? "إرسال" : "Send"}
            </Button>
          </motion.div>
        </motion.form>
      </Form>
    );
}
