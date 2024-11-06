"use client";
import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import BackButton from "@/components/shared/Dashboard/BackButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  fetchLandingPageData,
  updateLandingPageData,
} from "@/lib/api/settingsRequests";
import { Textarea } from "@/components/ui/textarea";



const formSchema = z.object({
  _id: z.string(),
  intro_AR: z.string().min(1, { message: "Please enter your Arabic intro" }),
  intro_EN: z.string().min(1, { message: "Please enter your English intro" }),
  image: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Please upload a cover image",
  }),
});

type LandingPageData = z.infer<typeof formSchema>;



export default function LandingPageSettings() {
  const [showCoverImageInput, setShowCoverImageInput] = useState(false);
  const [coverImageName, setCoverImageName] = useState("");
  const coverImageRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: landingPageData, isFetched } = useQuery<LandingPageData>({
    queryKey: ["landingPageData"],
    queryFn: fetchLandingPageData,
    staleTime: 60 * 60 * 5,
  });

  const handleCoverImageChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCoverImageName(file ? file.name : "");
    form.setValue("image", file);
  };

  const form = useForm<LandingPageData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: "",
      intro_AR: "",
      intro_EN: "",
      image: undefined,
    },
  });



  useEffect(() => {
    if (isFetched && landingPageData) {
      form.reset(landingPageData);
    }
  }, [isFetched, landingPageData, form]);

  const { mutateAsync } = useMutation({
    mutationFn: updateLandingPageData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landingPageData"] });
      toast({
        title: "Settings updated",
        description:
          "Your landing page settings have been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          "There was an error updating your settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: LandingPageData) => {
    const formData = new FormData();
    formData.append("intro_AR", data.intro_AR);
    formData.append("intro_EN", data.intro_EN);
    formData.append("image", data.image);
    try {
      if (landingPageData && landingPageData._id) {
        await mutateAsync({ id: landingPageData._id, data: formData });
      } else {
        console.error("Landing page data or ID is undefined");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!isFetched) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BackButton />
      <div className="flex flex-col items-center justify-center min-h-screen py-12">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 py-2 rounded-2xl">
          Landing Page Content
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[1200px] w-full grid grid-cols-1 gap-6"
          >
            <input type="hidden" {...form.register("_id")} />
            <FormField
              control={form.control}
              name="intro_AR"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arabic introduction</FormLabel>
                  <FormControl>
                    <Textarea
                      className="text-right direction-rtl"
                      placeholder="Arabic introduction"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="intro_EN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>English introduction</FormLabel>
                  <FormControl>
                    <Textarea placeholder="English introduction" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {showCoverImageInput ? (
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Header image
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
                            : "Upload header Image"}
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
              landingPageData && (
                <div className="mt-5">
                  <h2 className="font-semibold">Cover Image (Current)</h2>
                  <Image
                    src={`/imgs/images/${landingPageData.image}`}
                    alt="Landing Page cover image"
                    width={550}
                    height={250}
                    className="object-cover cursor-pointer border border-sky-800 "
                    onClick={() => setShowCoverImageInput(true)}
                  />
                </div>
              )
            )}
            
            <Button
              type="submit"
              className="mt-6 bg-unitedPrimary hover:bg-unitedPrimary/90"
            >
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
