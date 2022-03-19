import { PostFeedProps } from "../../additional"

const Posts = ({ id, title, content, username, imageUrl }: PostFeedProps) => {
    return (
        <div className="card" >
            <h2 className="card-title">{title}</h2>
            <img className="card-image" src={imageUrl} alt="blog post" />
            <div className='card_body' >
                <p> {content}</p>
                <p>
                    <br />
                    Written by {username}
                </p>
            </div>

            <div className='card_footer'>
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
    return (
        <Posts id={id} title={title} content={content} imageUrl={imageUrl} username={username} />
    )
}

export default PostList