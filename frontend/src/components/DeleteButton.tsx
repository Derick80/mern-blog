import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DELETE_POST_MUTATION, FETCH_DRAFTS_QUERY } from '../utils/hooks/graphql'
import Button from './common/Button'

export interface DeleteButtonProps {
    postId?: string
    commentId?: string
}


export default function DeleteButton ({ postId }: DeleteButtonProps) {
    let navigate = useNavigate()

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        variables: {
            postId
        },
        refetchQueries: [
            FETCH_DRAFTS_QUERY,

        ],
        fetchPolicy: 'network-only',

    })

    return (
        <Button className='button' onClick={ () => deletePost() }>Delete</Button>
    )
}
