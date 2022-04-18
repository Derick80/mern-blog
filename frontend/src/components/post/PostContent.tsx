import { useContext } from 'react'
import { CommentProps, PostFeedProps } from '../../additional'
import { AuthContext } from '../../utils/context/auth'
import LikeButton from '../LikeButton'
import ShowButton from '../ShowMore'
import Comment from '../common/Comment'
import CreateComment from './comment/CreateComment'
export type PostContentProps = {
    post: PostFeedProps
    comments: PostFeedProps
}

const PostContent = (post: PostFeedProps) => {

    return (
        <Card post={ post } />
    )
}


export type CardProps = {
    children?: React.ReactNode
    disabled?: boolean
    onClick?: () => void
    onChange?: () => void
    className?: string
    id?: string
    post: PostFeedProps
    user?: string

}

const Card = ({ post,
    onClick,
    className,
    children,


    ...props
}: CardProps) => {
    const { user } = useContext(AuthContext)
    return (
        <div className='card-container'>
            <div className='card'>

                <div className='card-header'>
                    { <img src={ post.imageUrl } alt='bleh' /> }
                    { post.title }
                </div>
                <div className='card-body'>
                    <div className='card-content'>
                        <ShowButton content={ post.content } />
                    </div>
                </div>
                <div className="card-stats">
                    <div className="card-stats-left">

                        <LikeButton user={ user } post={ post }
                        />
                    </div>

                    <div className="card-stats-right">
                        <span className="material-icons">forum</span>&nbsp;{ post.commentCount }

                    </div>



                </div>
                <div className="comment-container">
                    <div className="comment-info">

                        <p>View all { post.commentCount }</p>
                        <span className="material-icons">expand_more</span>
                    </div>
                    <div className="comment-accordian">

                        { post.comments.map((comment: any) => {

                            return (<>
                                <Comment key={ comment.id } comment={ comment } />
                            </>)
                        }) }

                    </div>


                </div>
                <CreateComment postId={ post.id } />
            </div>
        </div>
    )
}

export default PostContent