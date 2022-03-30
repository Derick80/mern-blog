import { useMutation } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PUBLISH_POST } from '../utils/hooks/graphql'
import Button from './Button'


export interface PublishButtonProps {
    postId: string
}

export default function PublishButton({ postId }: PublishButtonProps) {

    const [publishPost] = useMutation(PUBLISH_POST, {
        variables: {
            postId
        }
    })
    return (
        <Button className='button' onClick={() => publishPost()}>Publish</Button>

    )
}
