import { useMutation } from "@apollo/client"
import { useCallback } from 'react'
import { useDropzone } from "react-dropzone";

import { gql } from '@apollo/client'
import { filesQuery } from '../utils/Files'


const uploadFileMutation = gql`
mutation UploadFile($file: Upload!){
    uploadFile(file:$file)

}`

export const Upload = () => {
    const [uploadFile] = useMutation(uploadFileMutation, {
    refetchQueries: [{query: filesQuery}]
    })
    const onDrop = useCallback(
        ([file]) => {
            uploadFile({variables: {file}})

        },
        [uploadFile]
    )
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop files here</p>
            ) : (
                    <p>drag and drop or click to select files</p>
            )}
        </div>
    )
}
