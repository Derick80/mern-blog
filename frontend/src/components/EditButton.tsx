import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { EDIT_POST_MUTATION, GET_POST_TO_EDIT_BY_ID_QUERY } from '../utils/hooks/graphql'
import Button from './common/Button'


export interface EditButtonProps {
    postId?: string
    profileId?: string
}

export default function EditButton ({ postId }: EditButtonProps) {

    const { data, loading, error } = useQuery(GET_POST_TO_EDIT_BY_ID_QUERY, {
        variables: { postId }
    })

    if (loading) return <div>loading</div>
    return (
        <Button className='button'> Edit
            < Link to={ `/editpost/${postId}` }>

            </Link>
        </Button >

    )
}
