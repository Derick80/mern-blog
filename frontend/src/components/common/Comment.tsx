import { formatDistance } from 'date-fns';
import React, { useState } from 'react'


export type CommentProps = {
    comment: {
        id: string;
        content: string;
        username: string;
        createdAt: string;
    }

}
export default function Comment ({ comment }: CommentProps) {
    const [allComments, setAllComment] = useState(false)
    return (
        <>
            <div className='comment-item' key={ comment.id }>
                <div className="comment-content">
                    { comment.content }
                </div>
                <div className="comment-info">
                    <p>Posted by{ comment.username } </p>

                    <p>{ formatDistance(new Date(comment.createdAt), new Date(), { addSuffix: true }) }</p>
                </div>
            </div>

        </>




    )
}
