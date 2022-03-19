import { useMutation } from '@apollo/client'
import { ChangeEventHandler, useEffect, useState } from 'react'
import { UPLOAD_FILE_MUTATION } from '../utils/hooks/hooks'
import CreatePostFormTwo from './post/CreatePostFormTwo'

export type UploadButtonProps = {
    onChange: ChangeEventHandler<HTMLInputElement>
    ImageUpload: Function
}

function WritePost() {
    const [imageUrl, setImageUrl] = useState('')
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
    }, [data])

    return (
        <>

            <CreatePostFormTwo initialImageUrl={imageUrl} />
        </>

    )
}

export type ImageUploadButtonProps = {
    onChange?: React.FormEventHandler<HTMLInputElement>;
}

function ImageUploadButton(onChange: ImageUploadButtonProps) {
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

    </>
}
function PostForm() {

    return (<>
        <WritePost />
    </>)
}

export default PostForm