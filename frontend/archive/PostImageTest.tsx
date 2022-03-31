import { useMutation } from '@apollo/client'
import React, { BaseSyntheticEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreatePostFormValues, FormValues } from '../src/additional'
import { UsesForm } from '../src/utils/hooks/formUse'
import { CREATE_IMAGE_POST } from '../src/utils/hooks/graphql'
import PostForm from './PostForm'
import PostFormInput from './PostFormInput'


export default function PostImageTest(
    initialState: Partial<CreatePostFormValues>
) {
    const {

        formState: { errors }
    } = useForm()
    const [formData, setFormData] = useState({
        picture: null,
        title: '',
        content: '',
        name: ''
    })

    const [createPostAndImage, { loading, error }] = useMutation(
        CREATE_IMAGE_POST,
        {
            variables: {
                input: {
                    picture: formData.picture,
                    title: formData.title,
                    content: formData.content,
                    name: formData.name
                }
            }
        }
    )

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    const handlePictureChange = (event: BaseSyntheticEvent) => {
        setFormData({ ...formData, [event.target.name]: event.target.files[0] })
    }
    const onSubmit: SubmitHandler<CreatePostFormValues> = (
        input: CreatePostFormValues
    ) => createPostAndImage()

    return (
        <PostForm
            buttonLabel='Submit'

            onSubmit={onSubmit}
            className='change-form'
        >
            <PostFormInput
                name='title'
                type='text'
                placeholder='Enter a Title'
                error={errors.title?.message}
                onChange={handleInputChange}
                autoFocus
            />
            <PostFormInput
                name='content'
                type='text'
                placeholder='Enter some Content'
                onChange={handleInputChange}
                error={errors.content?.message}
            />
            <PostFormInput
                accept='image/*'
                type='file'
                name='picture'
                id='file-uploader'
                onChange={handlePictureChange}
            />
            <PostFormInput
                name='name'
                type='text'
                placeholder='Enter a name for the image'
                onChange={handleInputChange}
                error={errors.content?.message}
            />
        </PostForm>
    )
}
