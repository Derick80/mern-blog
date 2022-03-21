import { PostFeedProps } from "../../additional"
import ShowButton from "../ShowMore"
import ShowMore from "../ShowMore"

const Posts = ({ id, title, content, username, imageUrl }: PostFeedProps) => {
    return (

        <div className="card-container">
            <div className="card" style={{ backgroundImage: `url('${imageUrl}')` }} >

                <div className='card-body' >
                    <div className="card-header" >

                        {title}</div>
                    <div className="card-content">

                        <ShowButton content={content} />
                    </div>



                </div>

            </div >
            <div className="card-footer">
                <p>Put likes here</p>
                <p>
                    Written by {username}
                </p>
            </div>
        </div >

    )
}

function PostList(posts: PostFeedProps) {
    const { id,
        title,
        content,
        username,
        imageUrl } = posts
    return (<>
        <Posts id={id} title={title} content={content} imageUrl={imageUrl} username={username} />
    </>
    )
}

export default PostList