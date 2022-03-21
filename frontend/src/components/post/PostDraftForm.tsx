import { useMutation } from '@apollo/client'
import { ChangeEventHandler, useEffect, useState } from 'react'
import { UPLOAD_FILE_MUTATION } from '../../utils/hooks/hooks'
import { ImageUploadButtonProps } from '../PostForm'


export type DraftFormProps = {
    initialTitle?: string
    initialContent?: string
    initialImageUrl?: string
    initialPostId?: string
    disabled: boolean
    onSubmit: Function
}
export default function PostDraftForm({ initialTitle, initialContent, initialImageUrl, initialPostId, disabled, onSubmit }: DraftFormProps) {
    const [imageUrl, setImageUrl] = useState(initialImageUrl || '')
    const [postId, setPostId] = useState(initialPostId || '')
    const [title, setTitle] = useState(initialTitle || "")
    const [content, setContent] = useState(initialContent || "")
    const [mutate, { data }] = useMutation(UPLOAD_FILE_MUTATION)

    const onChange = ({
        target: {
            validity,
            files: [file]
        }
    }: any) => validity.valid && mutate({ variables: { file } })


    useEffect(() => {
        if (data) {
            return setImageUrl(data.uploadFile.imageUrl.toString())
        }
    }, [data, imageUrl])

    return (<>
        <ImageUploadButton onChange={onChange} />
        <div key={postId}>
            <b>{initialTitle ? "Edit Item" : "Add Item"}</b>
            <div >
                <div >
                    <input
                        hidden
                        disabled={disabled}
                        type="text"
                        value={initialPostId}
                        onChange={e => setPostId(e.target.value)}
                    />
                </div>
                <div >
                    <span>Title</span>
                    <input
                        disabled={disabled}
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div >
                    <span>content</span>
                    <input
                        disabled={disabled}
                        type="text"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>
                <div >
                    <span>Image</span>
                    <img src={imageUrl} alt="add an " />
                    <input
                        hidden
                        disabled={disabled}
                        type="text"
                        value={initialImageUrl}
                        onChange={e => setImageUrl(imageUrl)}
                    />
                </div>
                <div>
                    <button
                        disabled={disabled}

                        onClick={() => {
                            if (!imageUrl || !postId) {
                                onSubmit({ title, content, imageUrl: initialImageUrl, initialPostId })
                            }
                            onSubmit({ title, content, imageUrl, postId });
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </>
    )
}

export type UploadButtonProps = {
    onChange: ChangeEventHandler<HTMLInputElement>
    ImageUpload: Function
}
function ImageUploadButton(onChange: ImageUploadButtonProps) {
    return (
        <>
            <div className="upload_button">
                <label htmlFor='contained-button-file'>
                </label>
                <input
                    type='file'
                    accept='image/*'
                    onChange={() => onChange}

                />
            </div>

        </>)
}