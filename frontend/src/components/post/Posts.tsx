import { PostFeedProps } from "../../additional"

const Posts = ({ id, title, content, username, imageUrl }: PostFeedProps) => {
    return (

        <article className="card" >
            <div className="card-header card-image" >
                <img src={imageUrl} alt="blog post" />

            </div>

            <h2 >{title}</h2>
            <div className='card-content' >
                <p> {content}</p>
            </div>
            <footer>
                <p>Put likes here</p>
                <p>
                    Written by {username}
                </p>
            </footer>
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