import { useContext } from 'react'
import { PostFeedProps } from '../../additional'
import { AuthContext } from '../../utils/context/auth'
import Button from '../common/Button'
import LikeButton from '../LikeButton'
import ShowButton from '../ShowMore'
import CommentCard from './comment/CommentContent'
import CommentBox from './comment/LeaveCommentBox'

export type PostContentProps = {
    post: PostFeedProps[]

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
                    {/* <img src={ post.imageUrl } alt='bleh' /> */ }
                    { post.title }
                </div>
                <div className='card-body'>
                    <div className='card-content'>
                        <ShowButton content={ post.content } />
                    </div>
                </div>
                <div className="card-stats">
                    <Button className="btn" >
                        <span className="material-icons">forum</span>&nbsp;{ post.commentCount }

                    </Button>

                </div>
                <div className='card-actions'>
                    <LikeButton user={ user } post={ post }
                    />

                    <CommentCard comment={ post.comments } />
                    <CommentBox postId={ post.id } />
                </div>


            </div>
        </div>
    )
}

export default PostContent