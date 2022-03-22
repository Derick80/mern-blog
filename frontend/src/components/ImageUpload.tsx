import { useMutation } from '@apollo/client'
import React from 'react'
import { UPLOAD_FILE_MUTATION } from '../utils/hooks/hooks'

export default function ImageUpload() {
    const [mutate,] = useMutation(UPLOAD_FILE_MUTATION)

    const onChange = ({
        target: {
            validity,
            files: [file]
        }
    }: any) => validity.valid && mutate({ variables: { file } })


    return (
        <>
            <ImageUploadButton onChange={onChange} />
        </>
    )
}

export type ImageUploadButtonProps = {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function ImageUploadButton(props: ImageUploadButtonProps) {
    return (
        <>
            <div className="upload_button">
                <label htmlFor='contained-button-file'>
                </label>
                <input
                    type='file'
                    accept='image/*'
                    onChange={props.onChange}

                />
            </div>

        </>)
}