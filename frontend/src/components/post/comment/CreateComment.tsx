import { gql, useMutation } from '@apollo/client'
import React, { BaseSyntheticEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CreatePostFormValues } from '../../../additional'
import { CREATE_COMMENT_MUTATION } from '../../../utils/hooks/graphql'
import Button from '../../common/Button'
import Form from '../../common/form/Form'
import PostFormInput from '../../common/form/FormInput'


export interface CreateCommentProps {
    postId: string
}

export default function CreateComment ({ postId }: CreateCommentProps,

    initialState: Partial<CreatePostFormValues>
) {
    let navigate = useNavigate()
    const {

        formState: { errors }
    } = useForm()
    const [formData, setFormData] = useState({


        content: '',

    })

    const [createComment] = useMutation(
        CREATE_COMMENT_MUTATION,
        {
            variables: {

                postId,


                content: formData.content,


            }, update (cache, { data: { createComment } }) {

                cache.modify({
                    fields: {
                        getComments (existingComments = []) {
                            const newComments = cache.writeFragment({
                                data: createComment,
                                fragment: gql`
                    fragment newDraft on Post {
                  id
                  type
                }
              `
                            });
                            return [...existingComments, newComments]
                        }
                    }

                })
            }
        })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const onSubmit: SubmitHandler<CreatePostFormValues> = (
        input: CreatePostFormValues
    ) => createComment()

    return (
        <Form
            buttonLabel='Post a Comment'

            onSubmit={ onSubmit }

        >

            <PostFormInput

                name='content'
                type='text'

                placeholder='Leave a comment...'
                onChange={ handleInputChange }
                error={ errors.content?.message }
            />


            <Button className='button' >Submit</Button>
        </Form>
    )
}

