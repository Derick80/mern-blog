import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EDIT_POST_MUTATION, PUBLISH_POST } from '../../utils/graphql/graphql'
import PostDraftForm from './PostDraftForm'


export type DraftsProps = {
    drafts: {
        postId: string
        content: string
        title: string
        imageUrl: string
    }

}
export default function DraftsDisplay({ drafts: { title, content, imageUrl, postId } }: DraftsProps) {

    let navigate = useNavigate()

    const [mutate, { loading }] = useMutation(EDIT_POST_MUTATION, {
        update(proxy: any, { data }, context: any) {
            console.log(data)
            navigate('/drafts')
        },
        variables: { title, content, imageUrl, postId }
    })


    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            mutate()
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>

            <PostDraftForm
                disabled={loading}

                initialTitle={title}
                initialContent={content}
                initialImageUrl={imageUrl}
                onSubmit={(postUpdateInput: any) => {
                    mutate({
                        variables: {
                            postId,
                            ...postUpdateInput
                        }
                    })

                }}
            />
        </>
    )
}
