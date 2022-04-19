import { formatDistance } from 'date-fns';


export type CommentProps = {
    comment: {
        id: string;
        content: string;
        username: string;
        createdAt: string;
    }

}
export default function Comment ({ comment }: CommentProps) {
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
