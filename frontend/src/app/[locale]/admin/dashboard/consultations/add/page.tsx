"use client";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {Link} from '@/i18n/routing';
import { useToast } from "@/components/ui/use-toast";
import { categories } from "@/components/types/Categories";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/shared/Dashboard/BackButton";
import {useMutation} from "@tanstack/react-query";
import { postConsult } from "@/lib/api/consultsApi";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const formSchema = z.object({
  title_AR: z.string().min(1, "Consultation title is required"),
  title_EN: z.string().min(1, "Consultation title is required"),
  body_AR: z.string(),
  body_EN: z.string(),
  description_AR: z.string(),
  description_EN: z.string(),
  category: z.string().min(1, "Category is required"),
  coverImage: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Cover image is required",
  }),
});

export default function AddConsultation() {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [coverImageName, setCoverImageName] = useState("");
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
  const coverImageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const {mutateAsync,isPending}=useMutation({
      mutationFn:postConsult,
      onSuccess:()=>{
        toast({
              description: "Consultation added successfully",
          })
          form.reset({
              title_AR: "",
              title_EN: "",
              body_AR: "",
              body_EN: "",
              description_AR: "",
              description_EN: "",
              category: "",
              coverImage: undefined,
          })
          if (coverImageRef.current) coverImageRef.current.value = "";
          setCoverImageName("");
          setSaveDialogOpen(true);
      },
      onError:()=>{
        toast({
              description: "Error saving Consultation",
              variant: "destructive",
          })
      }
  })

  const handleCoverImageChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCoverImageName(file ? file.name : "");
    form.setValue("coverImage", file);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("title_AR", values.title_AR);
    formData.append("title_EN", values.title_EN);
    formData.append("body_AR", values.body_AR);
    formData.append("body_EN", values.body_EN);
    formData.append("description_AR", values.description_AR);
    formData.append("description_EN", values.description_EN);
    formData.append("coverImage", values.coverImage);
    formData.append("category", values.category);
    try {
      await mutateAsync(formData);
    } catch (error) {
      toast({
        description: "Error saving Service",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <BackButton />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Add a new service</h1>
        <p className="text-gray-500 text-xs mb-2">
          Elements marked with * are <b>required</b>
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[1200px] w-full grid grid-cols-1 gap-3"
          >
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="title_AR"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      * Arabic Title:
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="arabic title of the consultation"
                      />
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
                      * English Title:
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="english title of the consultation"
                      />
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
                  <FormLabel className="font-semibold">* Category:</FormLabel>
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
                      * Arabic Description:
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="arabic description of the consultation"
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
                    <FormLabel className="font-semibold">
                      * English Description:
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="english description of the consultation"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-11">
              <FormField
                control={form.control}
                name="body_AR"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      * Arabic Body:
                    </FormLabel>
                    <FormControl>
                      <Controller
                        control={form.control}
                        name="body_AR"
                        render={({ field }) => (
                          <ReactQuill
                            value={field.value}
                            onChange={field.onChange}
                            theme="snow"
                            className="h-[150px]"
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
                      * English Body:
                    </FormLabel>
                    <FormControl>
                      <Controller
                        control={form.control}
                        name="body_EN"
                        render={({ field }) => (
                          <ReactQuill
                            value={field.value}
                            onChange={field.onChange}
                            theme="snow"
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

            <div className="grid grid-cols-1 gap-5 mt-8">
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      * Cover Image:
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          onClick={() => coverImageRef.current?.click()}
                          className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary/90 w-[200px]"
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
                            Selected Image : <b>{coverImageName}</b>
                          </p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="my-1 w-50 bg-unitedPrimary hover:bg-unitedPrimary/90 text-white"
            >
              Save
            </Button>
          </form>
        </Form>
      </div>
      <AlertDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do You want to add another service ?
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
  );
}
