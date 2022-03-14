import { ChangeEventHandler } from 'react'

export type UploadButtonProps = {
    onUpload: ChangeEventHandler<HTMLInputElement>

}

export default function UploadButton(props: UploadButtonProps) {
    return (
        <div className="upload_button">
            <label htmlFor='contained-button-file'>

            </label>
            <input

                type='file'
                id='single'
                accept='image/*'
                onChange={props.onUpload}

            />
        </div>
    )
}