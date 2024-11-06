"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import {
  fetchContactUs,
  updateContactUsImage,
  updateContactUs,
} from "@/lib/api/settingsRequests";
import ChangeCoverImageForm from "@/components/shared/Dashboard/ChangeCoverImageForm";

const fromSchema = z.object({
  email: z.string().optional(),
  phone: z.string().optional(),
  facebook: z.string().optional(),
  whatsapp: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
});
export default function ContactUs() {
  const queryClient = useQueryClient();
  const { data: data, isFetched } = useQuery({
    queryKey: ["contact"],
    queryFn: fetchContactUs,
  });

  const {mutateAsync,isPending}=useMutation({
    mutationFn:updateContactUs,
    onSuccess: () => {
      toast({
        title: "success",
        description: "Contact us updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  })
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
  });

  useEffect(() => {
    if (isFetched) {
      form.reset(data);
    }
  }, [isFetched, data, form]);
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof fromSchema>) {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      await mutateAsync({ id: data._id, data: formData });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <BackButton />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-6 text-center text-unitedPrimary  py-2 rounded-2xl">
          Contact Us page info
        </h1>
        {isFetched && (
          <ChangeCoverImageForm
            imgLink={data.coverImage}
            uploadFunction={updateContactUsImage}
            contentId={data._id}
            contentType={"contact"}
          />
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[1200px] w-full grid grid-cols-1 gap-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Facebook" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Whatsapp</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Whatsapp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>X</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="x" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Linkedin</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="linkedin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-unitedPrimary hover:bg-unitedPrimary/85"
              type="submit"
            >
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
