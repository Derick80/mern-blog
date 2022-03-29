import { useMutation } from '@apollo/client'
import { title } from 'process'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ADD_POST_MUTATION, UPLOAD_FILE_MUTATION } from '../../utils/hooks/graphql'
import { FormInputs, useForm } from '../../utils/hooks/useForm'
import ImageUpload from '../ImageUpload'



export type Props = {
    imageUrl: string

}
export default function BlogPost(props: Props) {
    let navigate = useNavigate()

    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState<string>(props.imageUrl)




    const [createPost] = useMutation(ADD_POST_MUTATION, {
        update(proxy: any, { title, content, imageUrl }: any, context: any) {
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
                    <input
                        type="text"
                        name="imageUrl"
                        hidden
                        value={imageUrl}
                        onChange={(e) => setImageUrl(imageUrl.toString())}

                    />
                </div>

            </div>


            <button className='post-submit-button'


            >
                Submit
            </button>
        </form>
    </div>
    )
}
