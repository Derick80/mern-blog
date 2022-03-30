import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CREATE_IMAGE_POST } from '../utils/hooks/graphql'

type FormValues = {
    title: string
    content: string
    picture: null
}

export default function PostAndImageForm() {
    const { register, handleSubmit } = useForm<FormValues>()
    const [formData, setFormData] = useState({
        picture: null,
        title: '',
        content: ''
    })
    const [createPostAndImage, { loading, error }] = useMutation(
        CREATE_IMAGE_POST,
        {
            variables: { input: { picture: formData.picture, title: formData.title, content: formData.content } }
        }
    )

    const onSubmit: SubmitHandler<FormValues> = (input: FormValues) => createPostAndImage();


    function onChange({ target }: any) {
        const value = target.type
        setFormData((prevState) => ({
            ...prevState,
            [target.name]: value
        }))
    }

    const handlePictureChange = (e: any) => {
        const picture = e.target.files[0]
        setFormData((prevState) => ({
            ...prevState,
            picture: picture
        }))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type='text'
                placeholder='Title'
                {...register('title', { min: 10 })}

                value={formData.title}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='Content'
                {...register('content', { required: true })}
                value={formData.content}
                onChange={onChange}
            />

            <input
                {...register('picture')}
                accept='image/*'
                type='file'
                name='picture'
                id='file-uploader'
                onChange={handlePictureChange}
            />
            <input type='submit' />
        </form>
    )
}
