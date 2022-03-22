import { useMutation } from '@apollo/client'
import { title } from 'process'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ADD_POST_MUTATION } from '../../utils/graphql/graphql'
import { UPLOAD_FILE_MUTATION } from '../../utils/hooks/hooks'
import { FormInputs, useForm } from '../../utils/hooks/useForm'
import ImageUpload from '../ImageUpload'



export type PostProps = {
    onSubmit: Function

}
export default function BlogPost(initialState: Partial<FormInputs>) {
    let navigate = useNavigate()

    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [postImageUrl, setPostImageUrl] = useState<string>('')

    const [mutate, { data, loading }] = useMutation(UPLOAD_FILE_MUTATION)


    const onFileChange = ({
        target: {
            validity,
            files: [file]
        }
    }: any) => validity.valid && mutate({ variables: { file } });



    useEffect(() => {
        if (data) {
            setPostImageUrl(data.uploadFile.imageUrl)
        }
    }, [data])
    console.log(data);


    const [createPost] = useMutation(ADD_POST_MUTATION, {
        update(proxy: any, { data: { createPost: postInput } }, context: any) {
            console.log(postInput)
            navigate('/drafts')
        },
        variables: { content, title, imageUrl }

    })
    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        createPost()
    }


    return (<div className='post-create-edit-form'>
        <form className="post-form" onSubmit={onSubmit} >

            <div >

                <div >
                    <span>Title</span>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div >
                    <span>content</span>
                    <input
                        type="text"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div >
                    <span>content</span>
                    <input
                        type="text"
                        name="imageUrl"
                        value={postImageUrl}
                        onChange={(e) => setImageUrl(postImageUrl.toString())}

                    />
                </div>


            </div>

            <div className="upload_button">
                <label htmlFor='contained-button-file'>
                </label>
                <input
                    type='file'
                    accept='image/*'
                    onChange={onFileChange}

                />
            </div>
            <button className='post-submit-button'


            >
                Submit
            </button>
        </form>
    </div>
    )
}
