import { useContext } from "react";
import { PostFeedProps, IAuth } from "../../additional"
import { AuthContext } from "../../utils/context/auth";
import Button from "../common/Button";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";
import LikeButton from "../LikeButton";
import PublishButton from "../PublishButton";
import ShowButton from "../ShowMore"

const Posts = ({ id, title, content, username, imageUrl, author, likes, likeCount, published }: PostFeedProps) =>
{
    const { user } = useContext(AuthContext) as IAuth;
    console.log("posts user", user.username);
    return (

        <div className="card-container">
            <div className="card" style={ { backgroundImage: `url('${imageUrl}')` } } >

                <div className='card-body' >
                    <div className="card-header" >

                        { title }</div>
                    <div className="card-content">

                        <ShowButton content={ content } />
                    </div>



                </div>

            </div >
            <div className="card-footer">
                <LikeButton user={ user } post={ { id, likes, likeCount } } />

                <p>
                    Written by { username }
                </p>
                {/* @ts-ignore */ }
                { user && user.username === username && <><DeleteButton postId={ id } /> <EditButton postId={ id } /></> }
                { (published !== true) && <PublishButton postId={ id } /> }
            </div>
        </div >

    )
}

function PostList (posts: PostFeedProps)
{
    const { id,
        title,
        content,
        username,
        imageUrl,
        author,
        likes,
        likeCount, published } = posts
    return (<>
        <Posts id={ id } title={ title } content={ content } imageUrl={ imageUrl } username={ username } author={ author } likes={ likes } likeCount={ likeCount } published={ published } />
    </>
    )
}

export default PostList