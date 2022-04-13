import { gql, useMutation } from '@apollo/client'
import React, { BaseSyntheticEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CreatePostFormValues } from '../../additional'
import { CREATE_IMAGE_POST } from '../../utils/hooks/graphql'
import Form from '../common/form/Form'
import PostFormInput from '../common/form/FormInput'



export default function CreatePost (

    initialState: Partial<CreatePostFormValues>
) {
    let navigate = useNavigate()
    const {
        handleSubmit,
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
            }, update (cache, { data: { createPostAndImage } }) {
                navigate('/drafts')
                cache.modify({
                    fields: {
                        getDraftPosts (existingDrafts = []) {
                            const newDraftRef = cache.writeFragment({
                                data: createPostAndImage,
                                fragment: gql`
                    fragment newDraft on Post {
                  id
                  type
                }
              `
                            });
                            return [...existingDrafts, newDraftRef]
                        }
                    }

                })
            }
        })

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
        <Form
            buttonLabel='Submit'

            onSubmit={ onSubmit }
            className='post-create-edit-form'
        >
            <PostFormInput
                name='title'
                type='text'
                placeholder='Enter a Title'
                error={ errors.title?.message }
                onChange={ handleInputChange }
                autoFocus
            />
            <PostFormInput
                name='content'
                type='text'
                placeholder='Enter some Content'
                onChange={ handleInputChange }
                error={ errors.content?.message }
            />
            <PostFormInput
                accept='image/*'
                type='file'
                name='picture'
                id='file-uploader'
                onChange={ handlePictureChange }
            />
            <PostFormInput
                name='name'
                type='text'
                placeholder='Enter a name for the image'
                onChange={ handleInputChange }
                error={ errors.content?.message }
            />
        </Form>
    )
}

