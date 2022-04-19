import { formatDistance } from 'date-fns';
import React, { useState } from 'react'
import { CommentProps } from '../../additional';
import Button from './Button';
import Comment from './Comment';

export type CommentBoxProps = {
    comment: [CommentProps]
    commentCount: number
}
export default function CommentBox ({ comment, commentCount }: CommentBoxProps) {
    const [allComments, setAllComments] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const n = 1

    const handleComments = () => {
        setAllComments(!allComments)
        setExpanded(!expanded)
    }

    const myButton = expanded ? (
        <Button className='btn-icon' onClick={ handleComments } >
            <span className="material-icons">expand_less</span>

        </Button>

    ) : (
        <Button className='btn-icon' onClick={ handleComments } >
            <span className="material-icons">expand_more</span>

        </Button>
    )
    return (
        <div className="comment-accordian">

            <>
                <div className="comment-info">
                    <p>View all { commentCount }&nbsp;coments</p>
                    { myButton }
                </div>



                { allComments === true &&

                    comment.map((item) => {
                        return (
                            <CommentComponent key={ item.id } item={ item } />
                        )
                    })
                }
                { comment.slice(0, n).map((item: CommentProps) => {
                    return (
                        <CommentComponent key={ item.id } item={ item } />
                    )
                }) }
            </>

        </div>
    )
}


function CommentComponent ({ item }: any) {
    return (
        <div className='comment-item' key={ item.id }>
            <div className="comment-content">
                { item.content }
            </div>
            <div className="comment-info">
                <p>Posted by &nbsp;{ item.username } </p>

                <p>{ formatDistance(new Date(item.createdAt), new Date(), { addSuffix: true }) }</p>
            </div>



        </div>
    )
}

