"use client";
import { useEffect } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/shared/Dashboard/BackButton";
import Image from "next/image";
import {Link} from '@/i18n/routing';
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { fetchOneClient ,updateClient} from '@/lib/api/settingsRequests';
import { useState ,useRef} from "react";

const formSchema = z.object({
  name_AR:z.string().min(1, { message: "Please enter client name in arabic" }),
  name_EN:z.string().min(1, { message: "Please enter client name in english" }),
  clientImage: z.instanceof(File).optional(),
});

type editClientData = z.infer<typeof formSchema>;
export default function EditClient({ params }:{params:{id:string}}) {
  const queryClient = useQueryClient();
  let id = params.id;
  const {data:client,isFetched}=useQuery({
    queryKey: ['client',id],
    queryFn: () => fetchOneClient(id),
    staleTime: 1000*60*60,
    gcTime: 1000*60*60*24
  })
  const [imageName, setImageName] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<editClientData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_AR: client?.name_AR,
      name_EN: client?.name_EN,
      clientImage:undefined,
    },
  });


  const handleImageChange = (e:any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImageName(file ? file.name : '');
    form.setValue('clientImage', file);
  };

  // const removeImage = () => {
  //   form.setValue('clientImage', null);
  // };

  const {mutateAsync}=useMutation({
    mutationFn:updateClient,
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey: ['client',id]})
      toast({
        title: "Success",
        description: "Client updated successfully",
      }),
      setSaveDialogOpen(false)
    },
    onError : () => {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    },
    })
  const onSubmit = async (values: editClientData) => {
    const formData = new FormData();

    if(values.name_AR)formData.append("name_AR", values.name_AR);
    if(values.name_EN)formData.append("name_EN", values.name_EN);
    if(values.clientImage)formData.append("clientImage", values.clientImage);

    try {
      await mutateAsync({id:id,data:formData});
      toast({
        title: "Success",
        description: "Client updated successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFetched) {
      form.reset({
        name_AR: client?.name_AR,
        name_EN: client?.name_EN,
      });
    }
  }, [client,isFetched,form]);

  return (
    <div>
      <BackButton />
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-3">Edit {client?.name_EN}</h1>
        <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-[1500px] grid grid-cols-1 gap-5 items-center">

            <FormField control={form.control} name="name_AR" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Client name in arabic</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
             <FormField control={form.control} name="name_EN" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Client name in english</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            {showImageInput ? (
                <FormField control={form.control} name="clientImage" render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Image</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          onClick={() => imageRef.current?.click()}
                          className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary/90 w-[200px]"
                        >
                          {imageName ? 'Choose Another Image' : 'Upload Image'}
                        </Button>
                        <input
                          type="file"
                          ref={imageRef}
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        {imageName && <p className="ml-2 font-medium">Selected Image: <b>{imageName}</b></p>}
                      </div>
                    </FormControl>
                    <Button onClick={() => setShowImageInput(false)} className="mt-2">Cancel</Button>
                    <FormMessage />
                  </FormItem>
                )}
                />
              ) : (
                (isFetched) && (
                  <div className="mt-5">
                      <h2 className="font-semibold">Image (Current)</h2>
                      <Image 
                        src={`/imgs/images/${client.clientImage}`} 
                        alt="member image" 
                        width={550} 
                        height={250} 
                        className="object-cover cursor-pointer border border-unitedPrimary " 
                        onClick={() => setShowImageInput(true)}
                      />
                    </div>
                )
              )}
            <Button type="submit" className="my-1 w-full">Save</Button>
          </form>
        </Form>
        <AlertDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do You want to keep editing ?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Link href='/admin/dashboard/settings/about-us'>
                <Button variant={"outline"}>No</Button>
              </Link>
              <AlertDialogCancel className='bg-sky-800 hover:bg-sky-700 text-white'>Yes</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </div>
      </div>
    </div>
  );
}
