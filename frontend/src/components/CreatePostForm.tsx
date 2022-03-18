// import { useMutation } from "@apollo/client";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CREATE_POST_MUTATION } from "../utils/graphql/graphql";
// import { UPLOAD_FILE_MUTATION, useForm } from "../utils/hooks/hooks";
// import { useUpload } from "../utils/hooks/imageHooks";
// import PostForm from "./post/PostForm";


// export type imageUploadFormProps = {

//   useUpload: Function
// }
// const CreatePostForm = () => {
//   const [imageUrl, setImageUrl] = useState('')
//   const [title, setTitle] = useState('')
//   const [content, setContent] = useState('')
//   const [postImageUrl, setPostImageUrl] = useState({ imageUrl })

//   const [mutate, { data, loading, error }] = useMutation(UPLOAD_FILE_MUTATION)

//   const onChange = ({
//     target: {
//       validity,
//       files: [file]
//     }
//   }: any) => validity.valid && mutate({ variables: { file } })


//   useEffect(() => {
//     if (data) {
//       setImageUrl(data.uploadFile.imageUrl.toString())
//     }
//   }, [data])
//   // console.log(data.uploadFile.imageUrl);
//   let navigate = useNavigate()



//   function createPostCallback() {
//     createPost()
//   }

//   const [createPost,] = useMutation(CREATE_POST_MUTATION, {
//     update(proxy: any, { data: { createPost: postInput } }, context: any) {
//       console.log(postInput)
//       navigate('/drafts')
//     },
//     variables: { title, content, imageUrl }

//   })
//   const onSubmit = async (e: React.SyntheticEvent) => {
//     e.preventDefault()
//     try {
//       createPost()
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   return (
//     <>
//       <input type="file" required onChange={onChange} />
//       <form className="post-form" onSubmit={onSubmit}>
//         <h2>Create a Post</h2>
//         <label>Blog Post Title:</label>
//         <input type='text'
//           required
//           name='title'
//           placeholder="Post Title"
//           autoFocus={true}
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <label>Blog Content:</label>
//         <input
//           type="text"
//           placeholder="Write your post here"
//           required
//           name='content'
//           autoFocus={true}
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         ></input>

//         <input
//           type="text"

//           required
//           name='imageUrl'
//           autoFocus={true}
//           value={imageUrl}
//           onChange={(e) => setPostImageUrl({ imageUrl })}

//         ></input>
//         <button type='submit' >
//           Create Draft
//         </button>
//       </form>
//     </>)
//     ;
// };

export { }