import { useMutation } from "@apollo/client"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth"
import { CREATE_POST_MUTATION, REGISTER_USER } from "../../utils/graphql/graphql"
import { useForm } from "../../utils/hooks/hooks"


export default function PostForm() {
    let navigate = useNavigate()
    const { values, handleChange, handleSubmit } = useForm(createPostCallback, {
        title: '',
        content: '',

    })


    function createPostCallback() {
        createPost()
    }

    const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
        update(proxy: any, { data: { createPost: postInput } }) {
            console.log(postInput)
            navigate('/drafts')
        },
        variables: values,

    })

    return (

        <form className="post-form" onSubmit={handleSubmit}>
            <h2>Create a Post</h2>
            <label>Blog Post Title:</label>
            <input type='text'
                required
                name='title'
                placeholder="Post Title"
                autoFocus={true}
                value={values.title}
                onChange={handleChange}
            />
            <label>Blog Content:</label>
            <input
                type="text"
                placeholder="Write your post here"
                required
                name='content'
                autoFocus={true}
                value={values.content}
                onChange={handleChange}
            ></input>
            <button type='submit' >
                Create Draft
            </button>
        </form>
    )
}
