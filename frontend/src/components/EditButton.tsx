import { useMutation } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { EDIT_POST_MUTATION } from '../utils/hooks/graphql'
import Button from './Button'


export interface EditButtonProps {
    postId: string
}

export default function EditButton({ postId }: EditButtonProps) {


    return (
        <Button className='button'> Edit
            < Link to={`/${postId}`}></Link>
        </Button >

    )
}
