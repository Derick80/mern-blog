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
            <ul className='comment-item' key={ comment.id }>
                <li className="comment-content">
                    { comment.content }
                </li>
                <div className="comment-info">
                    <p>Posted by{ comment.username } </p>

                    <p>{ formatDistance(new Date(comment.createdAt), new Date(), { addSuffix: true }) }</p>
                </div>
            </ul>

        </>




    )
}
