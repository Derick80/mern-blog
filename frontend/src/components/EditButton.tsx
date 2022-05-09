import { useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { GET_POST_TO_EDIT_BY_ID_QUERY, GET_USER_PROFILE_QUERY } from '../utils/hooks/graphql'
import Button from './common/Button'


export interface EditButtonProps {
    postId?: string
    profileId?: string
    props?: unknown
}

export default function EditButton ({ props, postId, profileId }: EditButtonProps) {


    if (postId) return <>
        <div className='btn-icon' role="switch" aria-checked='true' >
            < Link to={ `/edit/${postId.toString()}` }>
                <span className='material-icons-outlined'>edit </span>
            </Link>


        </div >
    </>
    return (<>
        <div className='btn-icon' role="switch" aria-checked='true' >
            <span className='material-icons-outlined'>edit
                < Link to={ `/editProfile/${profileId}` }>

                </Link>
            </span>
        </div >
    </>)




}
