import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PUBLISH_POST } from '../../utils/graphql/graphql'
import PostDraftForm from './PostDraftForm'


export type DraftsProps = {
    drafts: {
        id: string
        content: string
        title: string
        imageUrl: string
    }

}
export default function DraftsDisplay({ drafts: { title, content, imageUrl, id } }: DraftsProps) {

    let navigate = useNavigate()

    const [mutate, { loading }] = useMutation(PUBLISH_POST, {
        update(proxy: any, { data }, context: any) {
            console.log(data)
            navigate('/drafts')
        },
        variables: { title, content, imageUrl, id }
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
                onSubmit={function (drafts: any) {
                    mutate({
                        variables: {
                            id,
                            ...drafts
                        }
                    })

                }}
            />
        </>
    )
}
