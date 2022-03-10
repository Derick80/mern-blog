import { useMutation } from '@apollo/client'
import React from 'react'
import { SINGLE_UPLOAD_MUTATION } from '../utils/graphql/graphql'

export default function UploadForm() {

    const [singleUpload] = useMutation(SINGLE_UPLOAD_MUTATION)

    function onChange({
        // @ts-ignore
        target: {
            // @ts-ignore
            validity,
            // @ts-ignore
            files: [file]
        },
    }) {
        if (validity.valid) singleUpload({ variables: { file: File } })
    }
    return (
        <div><h1>Upload File
            <input type="file"
                accept='image/*'
                // @ts-ignore

                onChange={onChange} />
        </h1></div>
    )
}
