"use client";
import { useRef, useState } from "react";
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
import { Link } from "@/i18n/routing";
import { categories } from "@/components/types/Categories";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/shared/Dashboard/BackButton";

const formSchema = z.object({
  title_AR: z.string().min(1, "Arabic title is required"),
  title_EN: z.string().min(1, "English title is required"),
  description_AR: z.string().min(1, "Arabic description is required"),
  description_EN: z.string().min(1, "English description is required"),
  file: z.instanceof(File).optional(),
  category: z.string().min(1, "Category is required"),
  coverImage: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Cover image is required" }),
});

export default function AddBlog() {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [coverImageName, setCoverImageName] = useState("");
  const coverImageRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title_AR: "",
      title_EN: "",
      description_AR: "",
      description_EN: "",
      category: "",
    },
  });

  const handleFileChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileName(file ? file.name : "");
    form.setValue("file", file);
  };

  const handleCoverImageChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCoverImageName(file ? file.name : "");
    form.setValue("coverImage", file);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "file" && value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "string" || typeof value === "number") {
        formData.append(key, value.toString());
      } else if (key === "coverImage" && value instanceof File) {
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post(
        "https://acc-united.onrender.com/api/v1/blogs",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status === "success") {
        toast({
          description: "Blog added successfully",
        });
        form.reset();
        if (fileRef.current) fileRef.current.value = "";
        setSaveDialogOpen(true);
      }
    } catch (error) {
      toast({
        description: "Error adding blog",
        variant: "destructive",
      });
      console.error("Error adding blog", error);
    }
  };

  return (
    <div>
      <BackButton />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Add a new blog article</h1>
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
                        placeholder="Arabic title of the article"
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
                        placeholder="English title of the article"
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
                        placeholder="Arabic description of the article"
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
                        placeholder="English description of the article"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    * Open Document :
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="custom-file-input bg-sky-800 hover:bg-sky-700 w-[200px]"
                      >
                        {fileName
                          ? "Choose Another Document"
                          : "Upload Open Document"}
                      </Button>
                      <input
                        type="file"
                        ref={fileRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      {fileName && (
                        <p className="ml-2 font-medium">
                          Selected Document : <b>{fileName}</b>
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">* Category:</FormLabel>
                  <FormControl>
                    <Select
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
                          Selected Image : <b>{coverImageName}</b>
                        </p>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="my-1 w-50 bg-sky-800 hover:bg-sky-700"
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
              Do you want to add another blog?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Link href="/admin/dashboard/blogs">
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
