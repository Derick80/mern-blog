import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ADD_POST_MUTATION, FETCH_DRAFTS_QUERY, GET_DRAFTS } from '../../utils/graphql/graphql'
import { UPLOAD_FILE_MUTATION } from '../../utils/hooks/hooks'
import UploadButton from '../UploadButton'
import PostDraftForm from './PostDraftForm'

export type CreatePostFormProps = {
    initialImageUrl: string
}
export default function CreatePostFormTwo({ initialImageUrl }: CreatePostFormProps) {
    let navigate = useNavigate()



    const [createPost, { loading }] = useMutation(ADD_POST_MUTATION)

    return (

        <>
            <PostDraftForm
                initialImageUrl={initialImageUrl}
                disabled={loading}
                onSubmit={(postInput: any) => {
                    createPost({
                        variables: {
                            ...postInput
                        },
                    });
                    navigate('/drafts')

                }}

            />
        </>

    )
}
