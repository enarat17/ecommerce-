"use client";
import React, { useState, useRef } from "react";
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
import { Textarea } from "@/components/ui/textarea";
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

import Link from "next/link";
import { ProductCategories as categories } from "@/components/types/Categories";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/shared/Dashboard/BackButton";
import {useMutation} from '@tanstack/react-query';
import { addProduct } from "@/lib/api/productsApi";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { X ,Plus} from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const formSchema = z.object({
  title_AR: z.string().min(1, "Product title is required"),
  title_EN: z.string().min(1, "Product title is required"),
  description_AR: z.string().min(1, "Product description is required"),
  description_EN: z.string().min(1, "Product description is required"),
  body_AR: z.string().min(1, "Product body is required"),
  body_EN: z.string().min(1, "Product body is required"),
  category: z.string().min(1, "Category is required"),
  video: z.string().optional(),
  coverImage: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Cover image is required" }),
  price: z.preprocess(
      (val) => Number(val),
      z.number().positive("Price must be a positive number")
    ),
  document : z.instanceof(File).refine((file) => file.size > 0, { message: "Document is required" }),
  images: z.array(z.instanceof(File)).optional(),
});

export default function AddProduct() {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [coverImageName, setCoverImageName] = useState("");
  const  [documentName, setDocumentName] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title_AR: "",
      title_EN: "",
      description_AR: "",
      description_EN: "",
      category: "",
      video: "",
      coverImage: undefined,
      price: 0,
      document: undefined,
      images: [],
    },
  });

  const coverImageRef = useRef<HTMLInputElement>(null);
  const documentRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const handleImagesChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImages((prev) => [...prev, file]);
      form.setValue("images", [...images, file]);
    }
    if (imagesRef.current) imagesRef.current.value = "";
  };


  const handleCoverImageChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCoverImageName(file ? file.name : "");
    form.setValue("coverImage", file);
  };

  const handleDocumentChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setDocumentName(file ? file.name : "");
    form.setValue("document", file);
  };

  const removeImages = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    form.setValue("images", images.filter((_, i) => i !== index));
  };

  const {mutateAsync,isPending}=useMutation({
    mutationFn:addProduct,
    onSuccess:()=>{
      toast({
        title:"success",
        description: "Product added successfully",
      });
      form.reset({
        title_AR: "",
        title_EN: "",
        description_AR: "",
        description_EN: "",
        category: "",
        video: "",
        coverImage: undefined,
        price: 0,
        document: undefined,
        images:[],
      });
      if (coverImageRef.current) coverImageRef.current.value = "";
      if (documentRef.current) documentRef.current.value = "";
      if(imagesRef.current) imagesRef.current.value = "";
      setCoverImageName("");
      setDocumentName("");
      setImages([]);
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
    formData.append("title_AR", values.title_AR);
    formData.append("title_EN", values.title_EN);
    formData.append("description_AR", values.description_AR);
    formData.append("description_EN", values.description_EN);
    formData.append("body_EN", values.body_EN);
    formData.append("body_AR", values.body_AR);
    formData.append("category", values.category);
    if(values.video)formData.append("video", values.video);
    formData.append("coverImage", values.coverImage);
    formData.append("price", values.price.toString());
    formData.append("document", values.document);
    values.images?.forEach((image,index)=>{
      formData.append("images", image);
    });
    try {
      await mutateAsync(formData);
    } catch (error) {
      toast({
        description: "Error adding product",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <BackButton />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Add a new product</h1>
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
                        placeholder="Title of the product"
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
                        placeholder="Title of the product"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

           
            <div className="grid grid-cols-2 gap-5">
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
              <FormField control={form.control} name="price" render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-semibold'>* Price:</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder='0' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
            </div>

            <div className="grid grid-cols-1 gap-5">
              <FormField
                control={form.control}
                name="description_AR"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      * Arabic Description:
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Description of the product"
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
                      <Textarea
                        {...field}
                        placeholder="Description of the product"
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
                      * Arabic body:
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
                      * English body:
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
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Video link:
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="paste your video link here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Images:</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            onClick={() => imagesRef.current?.click()}
                            className="bg-unitedPrimary hover:bg-unitedPrimary/90"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <input
                            type="file"
                            ref={imagesRef}
                            onChange={handleImagesChange}
                            className="hidden"
                            accept="image/*"
                          />
                        </div>
                        {images.map((image, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span className="font-medium">{image.name}</span>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => removeImages(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField control={form.control} name="document" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Document :</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        onClick={() => documentRef.current?.click()}
                        className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary/90 w-[200px]"
                      >
                        {documentName ? 'Choose Another Document' : 'Upload Editable Document'}
                      </Button>
                      <input
                        type="file"
                        ref={documentRef}
                        onChange={handleDocumentChange}
                        className="hidden"
                      />
                      {documentName && <p className="ml-2 font-medium">Selected Document : <b>{documentName}</b></p>}
                  </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            <Button
              type="submit"
              className="my-1 w-50 bg-unitedPrimary hover:bg-unitedPrimary/90"
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
              Do You want to add another product ?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Link href="/admin/dashboard/products">
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
