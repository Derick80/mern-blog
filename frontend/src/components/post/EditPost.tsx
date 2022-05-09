import { gql, useMutation, useQuery } from '@apollo/client'
import React, { BaseSyntheticEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UpdatePostAndImageFormValues } from '../../additional'
import { EDIT_POST_MUTATION, GET_POST_TO_EDIT_BY_ID_QUERY } from '../../utils/hooks/graphql'
import Form from '../common/form/Form'
import FormInput from '../common/form/FormInput'

export default function EditPost ({ postId }: any) {
    let navigate = useNavigate()
    const { data, loading } = useQuery(GET_POST_TO_EDIT_BY_ID_QUERY, {
        variables: { postId }
    })



    const {

        formState: { errors }
    } = useForm()
    const { title, content, imageUrl, name, id } = data.getPostbyId

    const [formData, setFormData] = useState({
        picture: null,
        title: title,
        content: content,
        name: name,
    })


    const [postAndImageUpdate] = useMutation(
        EDIT_POST_MUTATION,
        {

            variables: {
                input: {
                    postId: id,
                    picture: formData.picture,
                    title: formData.title,
                    content: formData.content,
                    name: formData.name
                }
            },
            fetchPolicy: 'network-only',
            update (cache, { data: { postAndImageUpdate } }) {
                navigate('/')
                cache.modify({
                    fields: {
                        getPosts (allPosts = []) {
                            const newerPost = cache.writeFragment({
                                data: postAndImageUpdate,
                                fragment: gql`
                    fragment newerPost on Post {
                  id
                  type
                }
              `
                            });
                            return [...allPosts, newerPost]
                        }
                    }

                })
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
    if (loading) return <div>loading</div>
    return (
        <div className="create-edit-post-container">
            <Form
                buttonLabel='Submit'

                onSubmit={ onSubmit }
                className='post-create-edit-form'
            >
                <FormInput
                    name='title'
                    type='text'
                    placeholder='Enter a Title'
                    error={ errors.title?.message }
                    onChange={ handleInputChange }
                    autoFocus
                />
                <FormInput
                    name='content'
                    type='text'
                    placeholder='Enter some Content'
                    onChange={ handleInputChange }
                    error={ errors.content?.message }
                />

                <FormInput
                    name='name'
                    type='text'
                    placeholder='Enter a name for the image'
                    onChange={ handleInputChange }
                    error={ errors.content?.message }
                />
                <FormInput
                    accept='image/*'
                    type='file'
                    name='picture'
                    id='file-uploader'
                    onChange={ handlePictureChange }
                />
            </Form>
            <ul>

                <li>{ title }</li>
            </ul>
        </div>)
}
