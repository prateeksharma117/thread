"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { threadValidation } from "@/lib/validation/thread";
import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import axios from "axios";
import { createThread } from "@/lib/actions/thread.actions";
import { useOrganization } from "@clerk/nextjs";
/* import { updateUser } from "@/lib/actions/user.actions";
import { userValidation } from "@/lib/validation/validation "; */


interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

interface ImageAsset {
    url: string;
    name: string;
}

const PostThread = ({ userId }: { userId: string }) => {

    const router = useRouter()
    const pathname = usePathname()
    const {organization}=useOrganization()
    const [wrongImageType, setWrongImageType] = useState(false)
    const [imageAsset, setImageAsset] = useState<ImageAsset | null>(null);
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');

    const form = useForm({
        resolver: zodResolver(threadValidation),
        defaultValues: {
            thread: '',
            accountId: userId,
        },
    });


    const uploadImage = (e: any) => {
        const { type, name } = e.target.files[0];
        setFile(event.target.files[0]);
        setFilename(event.target.files[0].name);
    
        if (
            type === 'image/png' ||
            type === 'image/svg' ||
            type === 'image/jpeg' ||
            type === 'image/gif' ||
            type === 'image/tiff'
        ) {
            setWrongImageType(false);
    
            // Read the selected file and update the state
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    setImageAsset({
                        url: event.target.result as string,
                        name: name,
                    });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setWrongImageType(true);
        }
    };
    


    const onSubmit = async (values:z.infer<typeof threadValidation>) => {
        let imageLink:string=""

        const formData = new FormData();
        if (file) {
            formData.append('file', file);
            formData.append('upload_preset', 'test_upload');

            try {
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/dy5ucwypq/image/upload',
                    formData
                );
                imageLink= await response?.data?.secure_url
            } catch (error) {
                console.error(error);
            }
        }

       await createThread({
        text:values.thread,
        image:imageLink,
        author:userId,
        communityId:organization?organization.id:null,
        path:pathname
       })

       router.push("/")
    }

    return (
        <>
            <h1 className="text-white">Post Thread Form</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" mt-10 flex flex-col justify-start gap-10"
                >
                    <div className='flex flex-col justify-center items-center border-dark-4 bg-dark-3 lg:p-5 p-3 w-full'>
                        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
                            <div className='flex justify-center items-center flex-col border-2 border-dotted text-light-2 p-3 w-full h-420'>
                                {wrongImageType && <p>Wrong image type</p>}
                                {!imageAsset ? (
                                    <label htmlFor="" className='relative'>
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <div className='flex flex-col justify-center items-center'>
                                                <p className='font-bold text-2xl'>
                                                    <AiOutlineCloudUpload />
                                                </p>
                                                <p>Click to upload</p>
                                            </div>
                                            <p className='mt-32 text-light-2'>use high quality JPG, SVG, PNG or GIFless then 20MB</p>
                                        </div>
                                        <input type="file" name='upload-image' onChange={uploadImage} className='absolute opacity-0 top-0 left-0 bottom-0 right-0 w-full h-full' />
                                    </label>
                                ) : (
                                    <div className='relative h-full'>
                                        <img src={imageAsset?.url} alt="uploaded-pic" className=' h-96 w-full' />
                                        <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                                            onClick={() => setImageAsset(null)}
                                        ><MdDelete color="red" /></button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <FormField
                        control={form.control}
                        name="thread"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className=" text-base-semibold text-light-2">
                                    content
                                </FormLabel>
                                <FormControl className=" no-focus border border-dark-4 bg-dark-3 text-light-1">
                                    <Textarea
                                        rows={15}
                                        className=" account-form_input no-focus"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className=" bg-[#528ae2]">Post Thread</Button>
                </form>
            </Form>
        </>
    )
}

export default PostThread
