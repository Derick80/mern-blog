import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PUBLISH_POST } from '../utils/hooks/graphql'
import Button from './common/Button'


export interface PublishButtonProps {
    postId: string
}

export default function PublishButton ({ postId }: PublishButtonProps) {
    let navigate = useNavigate()


    const [publishPost] = useMutation(PUBLISH_POST, {
        variables: {
            postId
        },
        fetchPolicy: 'network-only',
        update (cache, { data: { publishPost } }) {
            navigate('/')
            cache.modify({
                fields: {
                    getPosts (existingPosts = []) {
                        const newPost = cache.writeFragment({
                            data: publishPost,
                            fragment: gql`
                    fragment newPost on Post {
                  id
                  type
                }
              `
                        });
                        return [...existingPosts, newPost]
                    }
                }

            })
        }
    }

    )
    return (
        <Button className='button' onClick={ () => publishPost() }>Publish</Button>

    )
}
