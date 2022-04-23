import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DELETE_POST_MUTATION, DELETE_PROFILE_MUTATION, DELETE_COMMENT_MUTATION } from '../utils/hooks/graphql'
import Button from './common/Button'

export interface DeleteButtonProps {
    postId?: string
    commentId?: string
    profileId?: string

}


export default function DeleteButton ({ postId, profileId, commentId }: Partial<DeleteButtonProps>) {
    let navigate = useNavigate()
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION


    const [deletePostOrProfile] = useMutation(mutation, {
        variables: {
            postId, profileId, commentId
        },
        fetchPolicy: 'network-only',

    })

    return (
        <Button className='btn-icon' role="switch" aria-checked='true' onClick={ () => deletePostOrProfile() }>

            <span className='material-icons-outlined'>delete</span>
        </Button>
    )
}
