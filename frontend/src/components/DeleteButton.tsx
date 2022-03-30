import { useMutation } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DELETE_POST_MUTATION, FETCH_DRAFTS_QUERY } from '../utils/hooks/graphql'
import Button from './Button'

export interface DeleteButtonProps {
    postId: string
}


export default function DeleteButton({ postId }: DeleteButtonProps) {

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {


        variables: {
            postId
        }
    })

    return (
        <Button className='button' onClick={() => deletePost()}>Delete</Button>
    )
}
