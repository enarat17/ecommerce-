"use client";
import { useEffect, useState ,useRef } from "react";
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
import {useMutation,useQueryClient,useQuery} from '@tanstack/react-query';
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {getOneMember,updateTeamMember} from "@/lib/api/settingsRequests";


const formSchema = z.object({
    name_AR:z.string().optional(),
    name_EN:z.string().optional(),
    position_AR:z.string().optional(),
    position_EN:z.string().optional(),
    brief_AR:z.string().optional(),
    brief_EN:z.string().optional(),
    isFounder:z.boolean().optional(),
    memberImage: z.instanceof(File).optional(),
});

type editMemberData = z.infer<typeof formSchema>;
export default function EditMember({ params }:{params:{id:string}}) {
  const queryClient = useQueryClient();
  
  let id = params.id;
  const [imageName, setImageName] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberImage: undefined,
      name_AR: '',
      name_EN: '',
      position_AR: '',
      position_EN: '',
      brief_AR: '',
      brief_EN: '',
      isFounder: false
    },
  });

  const handleImageChange = (e:any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImageName(file ? file.name : '');
    form.setValue('memberImage', file);
  };

  // const removeImage = () => {
  //   form.setValue('memberImage', null);
  // };

  const {data:member,isLoading}=useQuery({
      queryKey:['member',id],
      queryFn:()=>getOneMember(id),     
  })

  const {mutateAsync,isPending} = useMutation({
    mutationFn:updateTeamMember,
    onSuccess: () => {
      toast({
        title: "success",
        description: "Member updated successfully",
      });
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

  useEffect(() => {
    if (!isLoading) {
      form.reset({
        name_AR: member?.name_AR,
        name_EN: member?.name_EN,
        position_AR: member?.position_AR,
        position_EN: member?.position_EN,
        brief_AR: member?.brief_AR,
        brief_EN: member?.brief_EN,
        isFounder: member?.isFounder,
        memberImage: undefined,
      });
    }
  }, [member,isLoading,form]);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if(values.name_AR) formData.append("name_AR", values.name_AR);
    if(values.name_EN) formData.append("name_EN", values.name_EN);
    if(values.position_AR) formData.append("position_AR", values.position_AR);
    if(values.position_EN) formData.append("position_EN", values.position_EN);
    if(values.brief_AR) formData.append("brief_AR", values.brief_AR);
    if(values.brief_EN) formData.append("brief_EN", values.brief_EN);
    if(values.isFounder !== undefined) formData.append("isFounder", values.isFounder.toString());
    if(values.memberImage) formData.append("memberImage", values.memberImage);
    try {
      mutateAsync({data:formData,id:id});
    } catch (error) {
    
    }
  };

  if (isLoading) {
    return <div>Loading member Data...</div>;
  }
  return (
    <div>
      <BackButton />
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-3">Edit {member.name_EN}</h1>
        <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-[1500px] grid grid-cols-1 gap-5 items-center">
            <FormField control={form.control} name="name_AR" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Member arabic name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="name_EN" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Member english name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="position_AR" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Position in arabic</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="position_EN" render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Position in english</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />

            
            <FormField control={form.control} name="isFounder" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Is Founder:</FormLabel>
                  <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value === 'true')}
                    defaultValue={field.value ? 'true' : 'false'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="true">
                          Yes
                        </SelectItem>
                        <SelectItem value="false">
                          No
                        </SelectItem>
                    </SelectContent>
                  </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
       
            <FormField control={form.control} name="brief_AR" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Member Description in arabic:</FormLabel>
                <FormControl>
                    <Textarea {...field}  />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
             <FormField control={form.control} name="brief_EN" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Member Description in english:</FormLabel>
                <FormControl>
                    <Textarea {...field}  />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="isFounder" render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Is Founder:</FormLabel>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className='w-6 h-6 m-5 block' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
              />
            
            {showImageInput ? (
                <FormField control={form.control} name="memberImage" render={({ field }) => (
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
                member && (
                  <div className="mt-5">
                      <h2 className="font-semibold">Image (Current)</h2>
                      <Image 
                        src={`/imgs/images/${member.memberImage}`} 
                        alt="member memberImage" 
                        width={550} 
                        height={250} 
                        className="object-cover cursor-pointer border border-unitedPrimary " 
                        onClick={() => setShowImageInput(true)}
                      />
                    </div>
                )
              )}
    
            <Button type="submit" className="my-1 w-full bg-unitedPrimary hover:bg-unitedPrimary/90">Save</Button>
          </form>
        </Form>
        <AlertDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do You want to keep editing ?</AlertDialogTitle>
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
      </div>
    </div>
  );
}
