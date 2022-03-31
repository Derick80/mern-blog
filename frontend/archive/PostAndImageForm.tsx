import { useMutation } from '@apollo/client'
import React, { BaseSyntheticEvent, ChangeEventHandler, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CREATE_IMAGE_POST } from '../src/utils/hooks/graphql'

type FormValues = {
    title: string
    content: string
    picture: null
    name: string
}


export interface FormInput {

}
export default function PostAndImageForm() {
    const { register, handleSubmit } = useForm<FormValues>()
    const [formData, setFormData] = useState({
        picture: null,
        title: '',
        content: '',
        name: ''
    })
    const [createPostAndImage, { loading, error }] = useMutation(
        CREATE_IMAGE_POST,
        {
            variables: { input: { picture: formData.picture, title: formData.title, content: formData.content, name: formData.name } }
        }
    )

    const onSubmit: SubmitHandler<FormValues> = (input: FormValues) => createPostAndImage();



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }



    const handlePictureChange = (event: BaseSyntheticEvent) => {
        setFormData({ ...formData, [event.target.name]: event.target.files[0] })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type='text'
                placeholder='Title'
                {...register('title')}

                value={formData.title}
                onChange={handleInputChange}
            />
            <input
                type='text'
                placeholder='Content'
                {...register('content', { required: true })}
                value={formData.content}
                onChange={handleInputChange}
            />
            <input
                type='text'
                placeholder='Name your Image'
                {...register('name', { required: true })}
                value={formData.name}
                onChange={handleInputChange}
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
