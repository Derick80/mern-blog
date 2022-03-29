import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { UPLOAD_SINGLE_FILE_MUTATION } from '../utils/hooks/graphql'
import BlogPost from './post/BlogPost'

export default function ImageUpload() {
    const [imageUrl, setImageUrl] = useState('')

    const [mutate, { data: ImageUpload, loading, error }] = useMutation(UPLOAD_SINGLE_FILE_MUTATION)

    function onChange({
        target: {
            validity,
            files: [file]
        }
    }: any) {
        validity.valid && mutate({ variables: { file } })


        if (loading)
            console.log("image uploading");
        if (ImageUpload)
            console.log("logging image upload", ImageUpload.imageUrl)
        if (error)
            console.log("image errors", error);

    }



    return (
        <>
            <ImageUploadButton onChange={onChange} />
            <BlogPost imageUrl={imageUrl} />
        </>
    )
}

export type ImageUploadButtonProps = {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    mutate?: Function
}

function ImageUploadButton(props: ImageUploadButtonProps) {
    return (
        <>
            <div className="upload_button">
                <label htmlFor='contained-button-file'>
                </label>
                <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => props.onChange(e)}

                />
            </div>

        </>)
}

