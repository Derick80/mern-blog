import { PostFeedProps } from "../../additional"
import ShowButton from "../ShowMore"
import ShowMore from "../ShowMore"

const Posts = ({ id, title, content, username, imageUrl }: PostFeedProps) => {
    return (

        <article className="card" style={{ backgroundImage: `url('${imageUrl}')` }} >

            <div className='card-body' >
                <h4 >{title}</h4>
                <div className="card-content">

                    <ShowButton content={content} />
                </div>


                <div className="card-footer">
                    <p>Put likes here</p>
                    <p>
                        Written by {username}
                    </p>
                </div>
            </div>
        </article >
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