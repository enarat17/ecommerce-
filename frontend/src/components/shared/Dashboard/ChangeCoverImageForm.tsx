import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {useState,useRef, useEffect} from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
interface ChangeCoverImageFormProps {
    imgLink: string;
    uploadFunction: ({id,data}:{id:string,data:FormData}) => Promise<any>;
    contentId: string;
    contentType: string;
}

const coverImageSchema = z.object({
    coverImage: z.instanceof(File).optional(),
});


type coverImage = z.infer<typeof coverImageSchema>;

export default function ChangeCoverImageForm({imgLink,uploadFunction, contentId,contentType}: ChangeCoverImageFormProps) {
    const [showCoverImageInput, setShowCoverImageInput] = useState(false);
    const [coverImageName, setCoverImageName] = useState('');
    const coverImageRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();
    const form = useForm<coverImage>({
        resolver: zodResolver(coverImageSchema),
        defaultValues: {
            coverImage: undefined,
        },
    });
    const { toast } = useToast();
    const { mutateAsync,isPending} = useMutation({
        mutationFn:uploadFunction,
        onSuccess:() => {
            toast({
                description: "Cover image updated successfully",
            })
            queryClient.invalidateQueries({queryKey:[`${contentType}`]});
            setShowCoverImageInput(false);
        },
        onError: (error) => {
            toast({
                title: "Error",
                description:error.message, 
                variant: "destructive",
            })
        }
    })
    const handleCoverImageChange = (e: any ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setCoverImageName(file ? file.name : '');
        form.setValue('coverImage', file);
      };
    
    const onSubmit = async (data: coverImage) => {
        if (!data.coverImage || !(data.coverImage instanceof File)) {
            toast({
                title: "Error",
                description: "Please select a valid image file.",
                variant: "destructive",
            });
            return;
        }
        const formData = new FormData();
        formData.append("coverImage", data.coverImage);
        await mutateAsync({ id: contentId, data: formData });
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            {showCoverImageInput ? (
                <FormField control={form.control} name="coverImage" render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Header image</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          onClick={() => coverImageRef.current?.click()}
                          className="custom-file-input bg-unitedPrimary hover:bg-unitedPrimary/90 w-[200px]"
                        >
                          {coverImageName ? 'Choose Another Image' : 'Upload header Image'}
                        </Button>
                        <input
                          type="file"
                          ref={coverImageRef}
                          onChange={handleCoverImageChange}
                          className="hidden"
                        />
                        {coverImageName && <p className="ml-2 font-medium">Selected Image: <b>{coverImageName}</b></p>}
                      </div>
                    </FormControl>
                    <Button type="submit" disabled={isPending} className="mt-2 mr-2 bg-unitedPrimary hover:bg-unitedPrimary/90">Submit</Button>
                    <Button onClick={() => setShowCoverImageInput(false)} className="mt-2">Cancel</Button>
                    <FormMessage />
                  </FormItem>
                )}
                />
              ) : (
                imgLink && (
                  <div className="mt-5">
                      <h2 className="font-semibold">Cover Image (Current)</h2>
                      <Image 
                        src={`/imgs/images/${imgLink}`} 
                        alt="members header image" 
                        width={550} 
                        height={250} 
                        className="object-cover cursor-pointer border border-sky-800 " 
                        onClick={() => setShowCoverImageInput(true)}
                      />
                    </div>
                )
              )}
            </form>
        </Form>
    )}