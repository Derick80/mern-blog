/* eslint-disable no-restricted-globals */
import { useMutation } from '@apollo/client'
import React, { FormEvent, useEffect, useState } from 'react'
import { CREATE_GALLERY_ENTRY, UPLOAD_SINGLE_FILE_MUTATION } from '../utils/hooks/graphql'
import BlogPost from './post/BlogPost'




interface FormValues {
    picture: null;
    name: string;

}

export default function GalleryUpload() {
    const [imageName, setImageName] = useState('')
    const [galleryPicture, setGalleryPicture] = useState();

    const [createGalleryEntry, { data, loading, error }] = useMutation(CREATE_GALLERY_ENTRY, {

        variables: { input: { picture: galleryPicture, name: imageName } }
    })


    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        createGalleryEntry()
    }

    const handlePictureChange = (e: any) => {
        setGalleryPicture(e.target.files[0]);
    }

    return (
        <>
            <form className="post-form" onSubmit={onSubmit} >
                <div className="upload_button">
                    <label htmlFor='contained-button-file'>
                    </label>
                    <input
                        type='file'
                        id="picture"
                        accept='image/*'
                        name="picture"
                        onChange={handlePictureChange}
                    />
                </div>
                <div >

                    <div >
                        <span>Name</span>
                        <input
                            type="text"
                            name="imageName"
                            value={imageName}
                            onChange={(e) => setImageName(e.target.value)}
                        />
                    </div>


                </div>


                <button className='post-submit-button'


                >
                    Submit
                </button>
            </form>
        </>
    )
}

export type ImageUploadButtonProps = {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    mutate?: Function
    imageName?: string
    onSubmit: React.FormEventHandler<HTMLFormElement>
}