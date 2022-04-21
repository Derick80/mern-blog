import { useMutation, gql } from '@apollo/client';
import React, { BaseSyntheticEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateProfileFormValues, UpdateAccountFormValues } from '../additional';
import { UPDATE_USER_MUTATION } from '../utils/hooks/graphql';
import Button from './common/Button';
import Form from './common/form/Form';
import FormInput from './common/form/FormInput';

export default function UpdateAccount () {
    let navigate = useNavigate()
    let { userId } = useParams()

    const {
        formState: { errors }
    } = useForm()
    const [formData, setFormData] = useState({
        picture: null,

        name: ''
    })

    const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
        variables: {
            input: {
                userId,
                picture: formData.picture,
                name: formData.name,

            }
        }, update (cache, { data: { updateUser } }) {
            navigate('/account')
            cache.modify({
                fields: {
                    getCurrentUser (existingAccount = []) {
                        const newDraftRef = cache.writeFragment({
                            data: existingAccount,
                            fragment: gql`
                    fragment newDraft on Account {
                  id
                  type
                  aboutMe
                }
              `
                        });
                        return [...existingAccount, newDraftRef]
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
    const onSubmit: SubmitHandler<UpdateAccountFormValues> = (
        input: UpdateAccountFormValues
    ) => updateUser()

    console.log({ userId });
    return (
        <Form
            buttonLabel='Submit'

            onSubmit={ onSubmit }
            className='post-create-edit-form'
        >

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
            <Button  >Submit</Button>
        </Form>
    )
}
