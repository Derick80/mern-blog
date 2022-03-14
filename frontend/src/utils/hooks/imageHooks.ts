import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { UPLOAD_FILE_MUTATION } from './hooks'

export type UploadFileProps = {
  urls: string
}

export type UploadFileResponse = {
  urls: string
}

export const useUpload = () => {
  const [imageUrl, setImageUrl] = useState()
  const [isLoading, setIsLoading] = useState()
  function uploadFileCallback() {
    mutate()
  }

  const [mutate, { data, loading, error }] = useMutation(UPLOAD_FILE_MUTATION, {
    onCompleted({ mutate }) {
      if (mutate) {
        setImageUrl(data.uploadFile.imageUrl)
      }
      return imageUrl
    }
  })

  const onChange = ({
    target: {
      validity,
      files: [file]
    }
  }: any) => validity.valid && mutate({ variables: { file } })
  console.log(imageUrl)

  return {
    mutate,
    data,
    loading,
    uploadFileCallback,
    onChange,
    imageUrl
  }
}
