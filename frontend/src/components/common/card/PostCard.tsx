import { formatDistance } from 'date-fns'
import { useContext } from 'react'
import { PostFeedProps } from '../../../additional'
import { AuthContext } from '../../../utils/context/auth'
import DeleteButton from '../../DeleteButton'
import EditButton from '../../EditButton'
import LikeButton from '../../LikeButton'
import CreateComment from '../../post/comment/CreateComment'
import PublishButton from '../../PublishButton'
import ShowButton from '../../ShowMore'
import CardUserActions from '../CardUserActions'
import CommentBox from '../CommentBox'

export interface PostCardProps {
    post: PostFeedProps
}

const Posts = (post: PostFeedProps) => {
    return <PostCard post={ post } />
}
const PostCard = ({ post }: PostCardProps): JSX.Element => {
    const { user }: any = useContext(AuthContext)

    return (
        <div className='card'>
            <div className='card-header'>
                { <img className='card-image' src={ post.imageUrl } alt='bleh' /> }
                <div className='card-title'> { post.title }</div>
            </div>

            <div className='card-body'>
                <div className='card-user-avatar-holder'>
                    {
                        <img
                            className='user-avatar'
                            src={ post.userImage }
                            alt={ post.username }
                        />
                    }
                </div>

                <div className='card-content'>
                    <ShowButton className='btn-show' content={ post.content } />
                </div>

                <div className='card-stats'>
                    <div className='card-stats-left'>
                        <LikeButton user={ user } post={ post } />
                        <span className='material-icons'>forum</span>&nbsp;
                        { post.commentCount }
                    </div>
                    <div className='card-stats-right'>
                        <p>
                            Posted by&nbsp;
                            { post.username }&nbsp;
                            { formatDistance(new Date(post.createdAt), new Date(), {
                                addSuffix: true
                            }) }
                        </p>
                        { user && user.username === post.username && (
                            <CardUserActions id={ post.id } />
                        ) }
                    </div>
                </div>
            </div>
            <div className='card-info'></div>
            <div className='card-comment-container'>
                <CommentBox
                    key={ post.comments.id }
                    comment={ post.comments }
                    commentCount={ post.commentCount }
                />
                <CreateComment postId={ post.id } />
            </div>

            <div className='card-footer'></div>
        </div>
    )
}

export default Posts
