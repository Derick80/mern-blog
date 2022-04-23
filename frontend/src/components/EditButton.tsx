import { useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { GET_POST_TO_EDIT_BY_ID_QUERY, GET_USER_PROFILE_QUERY } from '../utils/hooks/graphql'
import Button from './common/Button'


export interface EditButtonProps {
    postId?: string
    profileId?: string
}

export default function EditButton ({ postId, profileId }: EditButtonProps) {

    const query = profileId ? GET_USER_PROFILE_QUERY : GET_POST_TO_EDIT_BY_ID_QUERY
    const { data, loading } = useQuery(query, {
        variables: { postId, profileId }
    })

    if (loading) return <div>loading</div>
    if (postId && data) return <>
        <Button className='btn-icon' role="switch" aria-checked='true' >
            <span className='material-icons orange600'>edit

                < Link to={ `/editpost/${postId}` }>

                </Link>
            </span>

        </Button >
    </>
    return (<>
        <Button className='btn-icon' role="switch" aria-checked='true' >
            <span className='material-icons orange600'>edit
                < Link to={ `/editProfile/${profileId}` }>

                </Link>
            </span>
        </Button >
    </>)




}
