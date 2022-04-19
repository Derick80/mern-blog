import { gql, useMutation } from '@apollo/client'
import React, { BaseSyntheticEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CreateProfileFormValues } from '../../additional'
import { CREATE_PROFILE_IMAGE_MUTATION } from '../../utils/hooks/graphql'
import Form from '../common/form/Form'
import FormInput from '../common/form/FormInput'
export default function CreateProfile (initialState: Partial<CreateProfileFormValues>
) {
    let navigate = useNavigate()
    const {
        handleSubmit,
        formState: { errors }
    } = useForm()
    const [formData, setFormData] = useState({
        picture: null,
        aboutMe: '',
        location: '',
        nickName: '',
        name: ''
    })

    const [createProfile, { loading, error }] = useMutation(CREATE_PROFILE_IMAGE_MUTATION, {
        variables: {
            input: {
                picture: formData.picture,
                name: formData.name,
                aboutMe: formData.aboutMe,
                location: formData.location,
                nickName: formData.nickName
            }
        }, update (cache, { data: { createProfile } }) {
            navigate('/profile')
            cache.modify({
                fields: {
                    getDraftPosts (existingProfile = []) {
                        const newDraftRef = cache.writeFragment({
                            data: createProfile,
                            fragment: gql`
                    fragment newDraft on Profile {
                  id
                  type
                  aboutMe
                }
              `
                        });
                        return [...existingProfile, newDraftRef]
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
    const onSubmit: SubmitHandler<CreateProfileFormValues> = (
        input: CreateProfileFormValues
    ) => createProfile()

    return (
        <Form
            buttonLabel='Submit'

            onSubmit={ onSubmit }
            className='post-create-edit-form'
        >
            <FormInput
                name='aboutMe'
                type='text'
                placeholder='Write something about yourself'
                error={ errors.aboutMe?.message }
                onChange={ handleInputChange }
                autoFocus
            />
            <FormInput
                name='location'
                type='text'
                placeholder='Enter your location'
                onChange={ handleInputChange }
                error={ errors.location?.message }
            />
            <FormInput
                name='nickName'
                type='text'
                placeholder='Enter your nickname'
                onChange={ handleInputChange }
                error={ errors.nickName?.message }
            />

            <FormInput
                accept='image/*'
                type='file'
                name='picture'
                id='file-uploader'
                onChange={ handlePictureChange }
            />
            <FormInput
                name='name'
                type='text'
                placeholder='Enter a name for the image'
                onChange={ handleInputChange }
                error={ errors.content?.message }
            />
        </Form>
    )
}
