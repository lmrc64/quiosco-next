"use client"
import { getImagePath } from '@/src/utils'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

export default function ImageUpload({image} : {image: string | undefined}) {
    const [imageUrl, setImageUrl] = useState('')

    return (
        <CldUploadWidget
            onSuccess={(result, { widget }) => {
                if(result.event === 'success') {
                    widget.close()
                    // @ts-ignore
                    setImageUrl(result.info?.secure_url)
                }
            }}
            uploadPreset='wgnjr37z'
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => (
                <>
                    {image && !imageUrl && (
                        <div className='space-y-2'>
                            <label>Imagen Producto:</label>
                            <div className='relative w-64 h-64'>
                                <Image
                                    fill
                                    src={getImagePath(image)}
                                    alt="Imagen Producto"
                                    style={{objectFit: 'contain'}}
                                />
                            </div>
                        </div>
                    )}

                    <input
                        type='hidden'
                        name='image'
                        defaultValue={imageUrl ? imageUrl : image }
                    />
                </>
            )}
        </CldUploadWidget>
    )
}
