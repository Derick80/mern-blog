import { useMutation } from '@apollo/client'
import { title } from 'process'
import React, { BaseSyntheticEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CreatePostFormValues, UpdatePostAndImageFormValues } from '../../additional'
import { EDIT_POST_MUTATION } from '../../utils/hooks/graphql'
import Form from '../common/form/Form'
import FormInput from '../common/form/FormInput'

export default function EditPost({ data }: any) {
    let navigate = useNavigate()
    const {
        handleSubmit,
        formState: { errors }
    } = useForm()
    const { title, content, imageUrl, name, id } = data.getPostbyId

    const [formData, setFormData] = useState({
        picture: null,
        title: title,
        content: content,
        name: name,
    })


    const [postAndImageUpdate, { loading, error }] = useMutation(
        EDIT_POST_MUTATION,
        {
            update() {
                navigate('/feed')
            },
            variables: {
                input: {
                    postId: id,
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
    const onSubmit: SubmitHandler<UpdatePostAndImageFormValues> = (
    ) => postAndImageUpdate()
    return (
        <>
            <Form
                buttonLabel='Submit'

                onSubmit={onSubmit}
                className='post-create-edit-form'
            >
                <FormInput
                    name='title'
                    type='text'
                    placeholder='Enter a Title'
                    error={errors.title?.message}
                    onChange={handleInputChange}
                    autoFocus
                />
                <FormInput
                    name='content'
                    type='text'
                    placeholder='Enter some Content'
                    onChange={handleInputChange}
                    error={errors.content?.message}
                />

                <FormInput
                    name='name'
                    type='text'
                    placeholder='Enter a name for the image'
                    onChange={handleInputChange}
                    error={errors.content?.message}
                />
                <FormInput
                    accept='image/*'
                    type='file'
                    name='picture'
                    id='file-uploader'
                    onChange={handlePictureChange}
                />
            </Form>
            <ul>

                <li>{title}</li>
            </ul>
        </>)
}
