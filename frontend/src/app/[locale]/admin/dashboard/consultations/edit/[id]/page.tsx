"use client";
import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/components/types/Categories";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/shared/Dashboard/BackButton";
import Image from "next/image";
import {Link} from '@/i18n/routing';
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Consultation } from "@/components/types/ConsultationTableColumns";
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import {getOneConsult,updateOneConsult} from '@/lib/api/consultsApi';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const formSchema = z.object({
  title_AR: z.string().optional(),
  title_EN: z.string().optional(),
  body_AR: z.string().optional(),
  body_EN: z.string().optional(),
  description_AR: z.string().optional(),
  description_EN: z.string().optional(),
  category: z.string().optional(),
  coverImage: z.instanceof(File).optional(),
  images: z.array(z.instanceof(File)).optional(),
});

export default function EditConsult({ params }: { params: { id: string } }) {
  let id = params.id;
  const [showCoverImageInput, setShowCoverImageInput] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [coverImageName, setCoverImageName] = useState("");
  const queryClient = useQueryClient();

  const coverImageRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title_AR: "",
      title_EN: "",
      body_AR: "",
      body_EN: "",
      description_AR: "",
      description_EN: "",
      category: "",
      coverImage: undefined,
    },
  });

  const {data:service,isFetched}=useQuery({
    queryKey:['consult'],
    queryFn:()=>getOneConsult(id),
    staleTime:1000*60*60*30,
    gcTime:1000*60*60*24,
  })

  const handleCoverImageChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCoverImageName(file ? file.name : "");
    form.setValue("coverImage", file);
  };

  useEffect(() => {
    if (isFetched) {
          form.reset({
            title_AR: service.title_AR,
            title_EN: service.title_EN,
            body_AR: service.body_AR,
            body_EN: service.body_EN,
            description_AR: service.description_AR,
            description_EN: service.description_EN,
            category: service.category,
          });
        }
  }, [isFetched,service,form]);

  const {mutateAsync,isPending}=useMutation({
    mutationFn:updateOneConsult,
    onSuccess:()=>{
      toast({
        title:"success",
        description: "Service updated successfully",
      });
      queryClient.invalidateQueries({queryKey:['consult']});
      setSaveDialogOpen(true);
    },
    onError:(error)=>{
      toast({
        title:"Error",  
        description: error.message,
        variant: "destructive",
      });
    }
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (values.title_AR) formData.append("title_AR", values.title_AR);
    if (values.title_EN) formData.append("title_EN", values.title_EN);
    if (values.body_AR) formData.append("body_AR", values.body_AR);
    if (values.body_EN) formData.append("body_EN", values.body_EN);
    if (values.description_AR)
      formData.append("description_AR", values.description_AR);
    if (values.description_EN)
      formData.append("description_EN", values.description_EN);
    if (values.category) formData.append("category", values.category);
    if (values.coverImage) formData.append("coverImage", values.coverImage);
    try {
      await mutateAsync({ id, data: formData });
    } catch (error) {
      toast({
        description: "Error updating service",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <BackButton />
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-3">
          Edit {service?.title_EN}
        </h1>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-[1500px] grid grid-cols-1 gap-8 items-center"
            >
              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="title_AR"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Arabic Title
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title_EN"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        English Title
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Category:</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gird-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="description_AR"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Arabic Description:
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} />
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
                      <FormLabel className="font-semibold">
                        English Description:
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field}  />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-16 ">
                <FormField
                  control={form.control}
                  name="body_AR"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Arabic Body
                      </FormLabel>
                      <FormControl>
                        <Controller
                          control={form.control}
                          name="body_AR"
                          render={({ field }) => (
                            <ReactQuill
                              value={field.value}
                              onChange={field.onChange}
                              className="h-[150px] "
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="body_EN"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        English Body
                      </FormLabel>
                      <FormControl>
                        <Controller
                          control={form.control}
                          name="body_EN"
                          render={({ field }) => (
                            <ReactQuill
                              value={field.value}
                              onChange={field.onChange}
                              className="h-[150px]"
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {showCoverImageInput ? (
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem className="mt-8">
                      <FormLabel className="font-semibold">
                        Cover Image
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            onClick={() => coverImageRef.current?.click()}
                            className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[200px]"
                          >
                            {coverImageName
                              ? "Choose Another Image"
                              : "Upload Cover Image"}
                          </Button>
                          <input
                            type="file"
                            ref={coverImageRef}
                            onChange={handleCoverImageChange}
                            className="hidden"
                          />
                          {coverImageName && (
                            <p className="ml-2 font-medium">
                              Selected Image: <b>{coverImageName}</b>
                            </p>
                          )}
                        </div>
                      </FormControl>
                      <Button
                        onClick={() => setShowCoverImageInput(false)}
                        className="mt-2"
                      >
                        Cancel
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                service && (
                  <div className="mt-8">
                    <h2 className="font-semibold">Cover Image (Current)</h2>
                    <Image
                      src={`/imgs/${service.coverImage}`}
                      alt="Consult cover image"
                      width={550}
                      height={250}
                      className="object-cover cursor-pointer border border-sky-800 "
                      onClick={() => setShowCoverImageInput(true)}
                    />
                  </div>
                )
              )}

              <Button type="submit" className="m-1 w-full bg-unitedPrimary hover:bg-unitedPrimary/90">
                Save
              </Button>
            </form>
          </Form>
          <AlertDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Do You want to keep editing ?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Link href="/admin/dashboard/consultations">
                  <Button variant={"outline"}>No</Button>
                </Link>
                <AlertDialogCancel className="bg-unitedPrimary hover:bg-unitedPrimary/90 text-white">
                  Yes
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
