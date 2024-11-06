"use client";

import { useState } from 'react';
import Image from "next/image";
import clsx from 'clsx';

interface ImageGalleryProps {
    coverImage: string;
    images: string[];
}

export default function ImageGallery({ coverImage, images }: ImageGalleryProps) {
    const [activeImage, setActiveImage] = useState(coverImage);

    return (
        <div className='flex flex-col justify-center items-center bg-slate-200/50 p-4 rounded-lg w-[600px] h-[520px]'>
            {/* <div className="flex flex-col items-center justify-around mx-3 gap-2">
                <Image
                    src={`/imgs/${coverImage}`}
                    alt="cover image"
                    width={125}
                    height={125}
                    className={clsx(
                        'object-cover w-[125px] h-[125px] cursor-pointer hover:opacity-80 rounded-xl',
                        { 'border-2 border-zinc-700': activeImage === coverImage }
                    )}
                    onClick={() => setActiveImage(coverImage)}
                />
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={`/imgs/${image}`}
                        alt={`image ${index}`}
                        width={125}
                        height={125}
                        className={clsx(
                            'object-cover w-[125px] h-[125px] cursor-pointer hover:opacity-80 rounded-xl',
                            { 'border-2 border-zinc-700': activeImage === image }
                        )}
                        onClick={() => setActiveImage(image)}
                    />
                ))}
            </div>
            <Image
                src={`/imgs/${activeImage}`}
                alt="active image"
                width={400}
                height={520}
                className='object-fit w-[400px] h-[520px] rounded-lg hover:opacity-80'
            /> */}
            <h1 className="text-3xl font-bold text-center w-full">Video Placeholder</h1>
        </div>
    );
}
