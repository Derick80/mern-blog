import { CommentProps, PostFeedProps } from '../../../additional'

export type CommentContentProps = {
    post?: PostFeedProps
    comment: {
        id: string
        username: string
        createdAt: string
        content: string
    }
}


const CommentCard = ({ comment }: CommentContentProps) => {
    return (
        <div className="card" key={ comment.id }>
            <div className="card-header">
                { comment.username }
                { comment.createdAt }
            </div>
            <div className="card-content">
                { comment.content }
            </div>


        </div>
    )
}

export default CommentCard