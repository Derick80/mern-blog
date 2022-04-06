import { useMutation } from '@apollo/client';
import React, { Children, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { LIKE_POST_MUTATION } from '../utils/hooks/graphql';
import Button from './common/Button';

export default function LikeButton ({ user, post: { id, likeCount, likes } }: { user: any, post: { id: string, likeCount: number, likes: any } })
{
    const [liked, setLiked] = useState(false);

    useEffect(() =>
    {
        if (user && likes.find((like: any) => like.username === user.username))
        {
            setLiked(true);
        } else setLiked(false);
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    });
    const likeButton = user ? (
        liked ? (
            <Button >

            </Button>
        ) : (
            <Button  >

            </Button>
        ))
        : (
            <Button
            >
                <Link to={ "/login" }></Link>
            </Button>
        );

    return (
        <Button onClick={ likePost }>
            { likeButton }
            { likeCount }
        </Button>
    )
}
