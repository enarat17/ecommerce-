"use client";
import {useRef,useState} from 'react';
import { useForm,Controller } from "react-hook-form";
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
import { Textarea } from '@/components/ui/textarea';
import {Link} from '@/i18n/routing';
import { X ,Plus} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/shared/Dashboard/BackButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {useMutation,useQueryClient} from '@tanstack/react-query';
import { addNewTeamMember } from "@/lib/api/settingsRequests";
import { Checkbox } from "@/components/ui/checkbox"




const formSchema = z.object({
  name_AR:z.string().min(1, { message: "Please enter member name" }),
  name_EN:z.string().min(1, { message: "Please enter member name" }),
  position_AR:z.string().min(1, { message: "Please enter member position" }),
  position_EN:z.string().min(1, { message: "Please enter member position" }),
  brief_AR:z.string().optional(),
  brief_EN:z.string().optional(),
  isFounder:z.boolean().default(false),
  memberImage: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Please upload an memberImage of the member" }),
});

export default function AddMember() {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [memberImage, setImage] = useState<File | null>(null); 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      memberImage: undefined,
      name_AR: '',
      name_EN: '',
      position_AR: '',
      position_EN: '',
      brief_AR: '',
      brief_EN: '',
      isFounder: false
    }
  });
  const memberImageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {mutateAsync,isPending} = useMutation({
    mutationFn: addNewTeamMember,
    onSuccess: () => {
      toast({
        title: "success",
        description: "Member added successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["members"] });
      if (memberImageRef.current) memberImageRef.current.value = "";
      setImage(null);
      setSaveDialogOpen(true);
    },
    onError: (error) => {
      toast({
        title: "error",
        description: error.message,
        variant: "destructive",
      });
    },
  });


  const handleImageChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      form.setValue('memberImage', file);
    }
  };
  const removeImage = () => {
    setImage(null);
    // form.setValue('memberImage', null);
    if (memberImageRef.current) memberImageRef.current.value = "";
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name_AR", values.name_AR);
    formData.append("name_EN", values.name_EN);
    formData.append("position_AR", values.position_AR);
    formData.append("position_EN", values.position_EN);
    if(values.brief_AR)formData.append("brief_AR", values.brief_AR);
    if(values.brief_EN)formData.append("brief_EN", values.brief_EN);
    formData.append("isFounder", values.isFounder.toString());
    formData.append("memberImage", values.memberImage); 
    try {
        await mutateAsync(formData);
    } catch (error) {
    }
  };

  return (
    <div>
      <BackButton />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Add a new member</h1>
        <p className="text-gray-500 text-xs mb-2">Elements marked with * are <b>required</b></p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[1200px] w-full grid grid-cols-1 gap-3">
            <FormField control={form.control} name="name_AR" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Member name arabic:</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder='the name of the member in arabic' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField control={form.control} name="name_EN" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Member name english:</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder='the name of the member in english' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <FormField control={form.control} name="position_AR" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">* Position in arabic:</FormLabel>
                <FormControl>
                    <Input {...field} type="text" placeholder='position of the member in arabic' />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="position_EN" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">* Position in arabic:</FormLabel>
                <FormControl>
                    <Input {...field} type="text" placeholder='position of the member in english' />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="isFounder" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>* Is Founder:</FormLabel>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className='w-6 h-6 m-5 block' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />

            
            <FormField control={form.control} name="brief_AR" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">* Brief in arabic:</FormLabel>
                <FormControl>
                    <Textarea {...field}  placeholder='brief words about the member' />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="brief_EN" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">* Brief in english:</FormLabel>
                <FormControl>
                    <Textarea {...field}  placeholder='brief words about the member' />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="memberImage" render={({ field }) => (
                <FormItem>
                    <FormLabel className='font-semibold'>Image:</FormLabel>
                    <FormControl>
                    <div>
                        <div className="flex items-center">
                        {!memberImage && (
                            <Button
                            type="button"
                            onClick={() => memberImageRef.current?.click()}
                            className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary w-[80px]"
                            >
                            <Plus className="mr-2 h-4 w-4" />
                            Add
                            </Button>
                        )}
                        <input
                            type="file"
                            ref={memberImageRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        </div>
                        {memberImage && (
                        <div className="mt-2 flex items-center justify-between text-sm font-medium">
                            <p className="truncate font-semibold">{memberImage.name}</p>
                            <Button
                            type="button"
                            onClick={removeImage}
                            className="ml-2 p-2 rounded-full bg-red-600 hover:bg-red-700"
                            >
                            <X className="h-3 w-4 text-white" />
                            </Button>
                        </div>
                        )}
                    </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
                />
            <Button type="submit" className="my-1 w-50 bg-unitedPrimary hover:bg-unitedPrimary/90 ">Save</Button>
          </form>
        </Form>
      </div>
      <AlertDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do You want to add another member ?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Link href='/admin/dashboard/settings/team'>
                <Button variant={"outline"}>No</Button>
              </Link>
              <AlertDialogCancel className='bg-unitedPrimary hover:bg-unitedPrimary/90 text-white'>Yes</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
