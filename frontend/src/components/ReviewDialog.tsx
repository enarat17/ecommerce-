import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";

const formSchema = z.object({
  review: z.string().optional(),
  rating: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(0)
      .max(5)
      .positive("review rating must be a positive number between 0 and 5")
  ),
});

interface ReviewDialogProps {
  Id: string;
  type: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewDialog({
  Id,
  type,
  isOpen,
  onClose,
}: ReviewDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (data.review) {
      formData.append("review", data.review);
    }
    formData.append("rating", data.rating.toString());
    try {
      const response = await axios.post(
        `https://acc-united.onrender.com/api/v1/products/${Id}/reviews`,

        {
          withCredentials: true,
        }
      );
      onClose();
      console.log(response.data);
    } catch (error) {
      console.log("Error saving review", error);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add your review</DialogTitle>
          <DialogDescription>
            Give your rating and optionally write a review for this {type}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>rating</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="rating" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Review" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
