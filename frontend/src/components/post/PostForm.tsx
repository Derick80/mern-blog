import { REGISTER_USER } from "../../utils/graphql/graphql"


export default function PostForm() {

    return (
        <>
            <div className="post-form" >
                <h2>Create a Post</h2>
                <label>Blog Post Title:</label>
                <input type='text'
                    required
                    placeholder="Post Title"
                    autoFocus={true}
                // value={title}
                // onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog Content:</label>
                <textarea
                    placeholder="Write your post here"
                    required

                // onChange={(e) => setContent(e.target.value)}
                // value={content}
                ></textarea>
            </div>
        </>
    )
}