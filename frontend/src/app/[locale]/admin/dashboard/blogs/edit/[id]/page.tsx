"use client";
import { useEffect, useState, useRef } from "react";
import { FileDown } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import BackButton from "@/components/shared/Dashboard/BackButton";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/components/types/BlogTableColumns";

const formSchema = z.object({
  title_AR: z.string().optional(),
  title_EN: z.string().optional(),
  description_AR: z.string().optional(),
  description_EN: z.string().optional(),
  file: z.instanceof(File).optional(),
  category: z.string().optional(),
  coverImage: z.instanceof(File).optional(),
});

export default function EditBlog({ params }: { params: { id: string } }) {
  let id = params.id;
  const [blogData, setBlogData] = useState<Blog | null>(null);
  const [showCoverImageInput, setShowCoverImageInput] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [coverImageName, setCoverImageName] = useState("");
  const [fileName, setFileName] = useState("");

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
      coverImage: undefined,
      file: undefined,
    },
  });

  const handleCoverImageChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCoverImageName(file ? file.name : "");
    form.setValue("coverImage", file);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileName(file ? file.name : "");
    form.setValue("file", file);
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`https://acc-united.onrender.com/api/v1/blogs/${id}`)
        .then((response) => {
          const data = response.data.data.data;
          setBlogData(data);
          console.log(data);
          form.reset({
            title_AR: data.title_AR,
            title_EN: data.title_EN,
            description_AR: data.description_AR,
            description_EN: data.description_EN,
            category: data.category,
          });
        })
        .catch((error) => console.error("Error fetching blog data", error));
    }
  }, [id, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "coverImage" || key === "file") {
          if (value instanceof File) {
            formData.append(key, value);
          }
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    try {
      const response = await axios.patch(
        `https://acc-united.onrender.com/api/v1/blogs/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.data.status === "success") {
        toast({
          description: "Blog updated successfully",
        });
        setSaveDialogOpen(true);
      }
    } catch (error) {
      toast({
        description: "Error updating blog",
        variant: "destructive",
      });
      console.log("Error updating blog", error);
    }
  };

  return (
    <div>
      <BackButton />
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Edit Blog</h1>
        <div className="">
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
              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="description_AR"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Arabic Description:
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
                  name="description_EN"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        English Description:
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
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
                    <FormItem>
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
                blogData && (
                  <div className="mt-5">
                    <h2 className="font-semibold">Cover Image (Current)</h2>
                    <Image
                      src={`/imgs/images/${blogData.coverImage}`}
                      alt="blog cover image"
                      width={550}
                      height={250}
                      className="object-cover cursor-pointer border border-sky-800 "
                      onClick={() => setShowCoverImageInput(true)}
                    />
                  </div>
                )
              )}

              {showFileInput ? (
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Article file
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
                              : "Upload Document"}
                          </Button>
                          <input
                            type="file"
                            ref={fileRef}
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          {fileName && (
                            <p className="ml-2">
                              Selected Document: <b>{fileName}</b>
                            </p>
                          )}
                        </div>
                      </FormControl>
                      <Button
                        onClick={() => setShowFileInput(false)}
                        className="mt-2"
                      >
                        Cancel
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                blogData && (
                  <div className="mt-5 w-full flex flex-col ">
                    <h2 className="font-semibold">File article(Current)</h2>
                    <div className="flex flex-row justify-between mt-1">
                      <Link
                        href={`/documents/${blogData.file}`}
                        download
                        className="text-blue-500 underline"
                      >
                        <Button className="flex flex-row justify-between w-[800px]">
                          <p className="mr-2">{`${blogData.file}`}</p>{" "}
                          <FileDown size={18} />
                        </Button>
                      </Link>
                      <Button
                        onClick={() => setShowFileInput(true)}
                        className="ml-2"
                      >
                        Update Document
                      </Button>
                    </div>
                  </div>
                )
              )}

              <Button type="submit" className="mt-1 w-full">
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
      </div>
    </div>
  );
}
