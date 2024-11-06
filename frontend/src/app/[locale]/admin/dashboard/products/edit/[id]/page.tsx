"use client";
import React, { useEffect, useState, useRef } from "react";
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
import { useMutation ,useQuery,useQueryClient} from '@tanstack/react-query';
import { updateProduct } from "@/lib/api/productsApi";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { X, Plus, FileDown } from "lucide-react";
import Image from "next/image";
import { getOneProduct } from "@/lib/api/productsApi";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const formSchema = z.object({
  title_AR: z.string().optional(),
  title_EN: z.string().optional(),
  description_AR: z.string().optional(),
  description_EN: z.string().optional(),
  body_AR: z.string().optional(),
  body_EN: z.string().optional(),
  category: z.string().optional(),
  video: z.string().optional(),
  coverImage: z.instanceof(File).optional(),
  price: z.preprocess(
    (val) => Number(val),
    z.number().positive("Price must be a positive number")
  ).optional(),
  document: z.instanceof(File).optional(),
  images: z.array(z.instanceof(File)).optional(),
});

export default function EditProduct({ params }: { params: { id: string } }) {
  const [productData, setProductData] = useState<any | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [coverImageName, setCoverImageName] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [showCoverImageInput, setShowCoverImageInput] = useState(false);
  const [showDocumentInput, setShowDocumentInput] = useState(false);
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title_AR: "",
      title_EN: "",
      description_AR: "",
      description_EN: "",
      body_AR: "",
      body_EN: "",
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

  const queryClient = useQueryClient();
  const {data:product ,isFetched} = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => getOneProduct(params.id),
    enabled: !!params.id,
    staleTime: 1000 * 60* 15,
    gcTime: 1000 * 60 *60* 24,
  });

  useEffect(() => {
    if (params.id && isFetched) {
        form.reset({
          title_AR: product.title_AR,
          title_EN: product.title_EN,
          description_AR: product.description_AR,
          description_EN: product.description_EN,
          body_AR: product.body_AR,
          body_EN: product.body_EN,
          category: product.category,
          video: product.video,
          price: product.price,
        });
          // Set existing images if any
          if (product.images && product.images.length > 0) {
            setImages(product.images);
          }
        }
  }, [params.id, form, isFetched, product]);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImages((prev) => [...prev, file]);
      form.setValue("images", [...images, file]);
    }
    if (imagesRef.current) imagesRef.current.value = "";
  };

  const handleCoverImageChange = (e: { target: { files: any[]; }; }) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      form.setValue("coverImage", file);
      setShowCoverImageInput(false);
    }
  };

  const handleDocumentChange = (e: { target: { files: any[]; }; }) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      form.setValue("document", file);
      setShowDocumentInput(false);
    }
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues("images") || [];
    const updatedImages = [...currentImages];
    updatedImages.splice(index, 1);
    form.setValue("images", updatedImages);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      setSaveDialogOpen(true);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if(values.title_AR)formData.append("title_AR", values.title_AR);
    if(values.title_EN)formData.append("title_EN", values.title_EN);
    if(values.description_AR)formData.append("description_AR", values.description_AR);
    if(values.description_EN)formData.append("description_EN", values.description_EN);
    if(values.body_EN)formData.append("body_EN", values.body_EN);
    if(values.body_AR)formData.append("body_AR", values.body_AR);
    if(values.category)formData.append("category", values.category);
    if (values.video) formData.append("video", values.video);
    if (values.coverImage) formData.append("coverImage", values.coverImage);
    if(values.price)formData.append("price", values.price.toString());
    if (values.document) formData.append("document", values.document);
    values.images?.forEach((image, index) => {
      formData.append("images", image);
    });

    try {
      await mutateAsync({ id: params.id, formData });
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return (
    <div>
      <BackButton />
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-3">
          Edit {productData?.title_EN}
        </h1>
        <div>
        <Form {...form}>
  <form
    onSubmit={form.handleSubmit(onSubmit)}
    className="w-[1500px] grid grid-cols-1 gap-5 items-center"
  >
    <div className="grid grid-cols-2 gap-5">
      <FormField
        control={form.control}
        name="title_AR"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">
              Arabic Title:
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
              English Title:
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
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">
              Price:
            </FormLabel>
            <FormControl>
              <Input {...field} type="number" placeholder="0" />
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
              Arabic Description:
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
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
              English Description:
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
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
              Arabic body:
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
              English body:
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

    <FormField
      control={form.control}
      name="video"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold mt-[300px]">
            video link
          </FormLabel>
          <FormControl>
            <Input {...field} type="text" placeholder="video link" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

<div className="grid grid-cols-1 gap-5 mt-5">
      {/* Cover Image Section */}
      <div>
        <h2 className="font-semibold mb-2">Cover Image</h2>
        {showCoverImageInput ? (
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      onClick={() => coverImageRef.current?.click()}
                      className="bg-sky-800 hover:bg-sky-700 w-[200px]"
                    >
                      Choose New Cover Image
                    </Button>
                    <input
                      type="file"
                      ref={coverImageRef}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleCoverImageChange({ target: { files: [e.target.files[0]] } })
                        }
                      }}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                </FormControl>
                <Button
                  onClick={() => setShowCoverImageInput(false)}
                  className="mt-2"
                  variant="outline"
                >
                  Cancel
                </Button>
                <FormMessage />
              </FormItem>
            )}          />
        ) : (
          product?.coverImage && (
            <div className="relative inline-block">
              <Image
                src={`/imgs/images/${product.coverImage}`}
                alt="Product cover image"
                width={300}
                height={200}
                className="object-cover cursor-pointer border border-sky-800"
                onClick={() => setShowCoverImageInput(true)}
              />
              <Button
                className="absolute top-2 right-2 p-1"
                variant="destructive"
                onClick={() => setShowCoverImageInput(true)}
              >
                <X size={16} />
              </Button>
            </div>
          )
        )}
      </div>

      {/* Document Section */}
      <div>
        <h2 className="font-semibold mb-2">Document</h2>
        {showDocumentInput ? (
          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      onClick={() => documentRef.current?.click()}
                      className="bg-sky-800 hover:bg-sky-700 w-[200px]"
                    >
                      Choose New Document
                    </Button>
                    <input
                      type="file"
                      ref={documentRef}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleDocumentChange({ target: { files: [e.target.files[0]] } })
                        }
                      }}
                      className="hidden"
                    />
                  </div>
                </FormControl>
                <Button
                  onClick={() => setShowDocumentInput(false)}
                  className="mt-2"
                  variant="outline"
                >
                  Cancel
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          product?.document && (
            <div className="flex items-center">
              <FileDown className="mr-2" />
              <span>{product.document}</span>
              <Button
                className="ml-2 p-1"
                variant="outline"
                onClick={() => setShowDocumentInput(true)}
              >
                Change
              </Button>
            </div>
          )
        )}
      </div>

      {/* Video Link Section */}
      <FormField
        control={form.control}
        name="video"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">Video Link</FormLabel>
            <FormControl>
              <Input {...field} type="text" placeholder="Enter video link" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Images Section */}
      <div>
        <h2 className="font-semibold mb-2">Additional Images</h2>
        <div className="grid grid-cols-3 gap-4">
          {form.getValues("images")?.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={typeof image === 'string' ? `/imgs/images/${image}` : URL.createObjectURL(image)}
                alt={`Product image ${index + 1}`}
                width={150}
                height={150}
                className="object-cover border border-sky-800"
              />
              <Button
                className="absolute top-2 right-2 p-1"
                variant="destructive"
                onClick={() => removeImage(index)}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
          <Button
            onClick={() => imagesRef.current?.click()}
            className="h-[150px] flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300"
          >
            <Plus size={24} />
            <span>Add Image</span>
          </Button>
          <input
            type="file"
            ref={imagesRef}
            onChange={handleImagesChange}
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>
    </div>
    <Button type="submit" className="my-3 w-full">
      Save
    </Button>
  </form>
</Form>
        </div>
      </div>
      <AlertDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Do You want to keep editing ?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Link href="/admin/dashboard/products">
              <Button variant={"outline"}>No</Button>
            </Link>
            <AlertDialogCancel className="bg-sky-800 hover:bg-sky-700 text-white">
              Yes
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
