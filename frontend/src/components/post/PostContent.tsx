import { useContext } from 'react'
import { CommentProps, PostFeedProps } from '../../additional'
import { AuthContext } from '../../utils/context/auth'
import LikeButton from '../LikeButton'
import ShowButton from '../ShowMore'
import DeleteButton from '../DeleteButton'
import EditButton from '../EditButton'
import Comment from '../common/Comment'
import CreateComment from './comment/CreateComment'
import { formatDistance } from 'date-fns'
import CommentBox from '../common/CommentBox'
import PublishButton from '../PublishButton'
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


}

const Card = ({ post,
    onClick,
    className,
    children,


}: CardProps) => {
    const { user }: any = useContext(AuthContext)
    console.log(post.userImage);

    return (
        <div className='card-container'>
            <div className='card'>

                <div className='card-header'>
                    { <img src={ post.imageUrl } alt='bleh' /> }
                    { <img className="user-avatar" src={ post.userImage } alt='bleh' /> }
                </div>
                <div className="card-info">
                    <h5> { post.title }</h5>
                    <p>{ formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true }) }</p>
                </div>
                <div className='card-body'>
                    <div className='card-content'>
                        <ShowButton className="btn-show" content={ post.content } />
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

                    <CommentBox key={ post.comments.id } comment={ post.comments } commentCount={ post.commentCount } />
                    <CreateComment postId={ post.id } />

                </div>

                <div className="card-footer">

                    { user && user.username === post.username && <>
                        <DeleteButton postId={ post.id } />
                        <EditButton postId={ post.id } />
                        { (post.published !== true) && <PublishButton postId={ post.id } /> }
                    </> }
                </div>
            </div>
        </div>
    )
}

export default PostContent