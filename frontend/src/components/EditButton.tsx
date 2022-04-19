import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { EDIT_POST_MUTATION, GET_POST_TO_EDIT_BY_ID_QUERY, GET_USER_PROFILE_QUERY } from '../utils/hooks/graphql'
import Button from './common/Button'


export interface EditButtonProps {
    postId?: string
    profileId?: string
}

export default function EditButton ({ postId, profileId }: EditButtonProps) {

    const query = profileId ? GET_USER_PROFILE_QUERY : GET_POST_TO_EDIT_BY_ID_QUERY
    const { data, loading, error } = useQuery(query, {
        variables: { postId, profileId }
    })

    if (loading) return <div>loading</div>
    if (postId) return <>
        <Button className='button'> Edit
            < Link to={ `/editpost/${postId}` }>

            </Link>
        </Button >
    </>
    return (<>
        <Button className='button'> Edit
            < Link to={ `/editProfile/${profileId}` }>

            </Link>
        </Button >
    </>)




}
