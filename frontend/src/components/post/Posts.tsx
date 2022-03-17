

export type PostsFeed = {

    id: string
    title: string
    content: string
    username: string
    imageUrl: string

}
const Posts = (posts: PostsFeed) => {
    const { id,
        title,
        content,
        username,
        imageUrl } = posts



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

export default Posts