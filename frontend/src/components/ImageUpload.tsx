import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useCallback, useState } from 'react'
import UploadButton from './UploadButton'
import { gql } from '@apollo/client'

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      uploadFile
    }
  }
`

const ImageUpload = () => {
  // const { data, loading } = useQuery(filesQuery)
  const [uploading, setUploading] = useState<boolean>(false)
  const [url, setUrl] = useState('')
  const [uploadFile, { data, loading, error }] = useMutation(
    uploadFileMutation,
    {
      variables: {
        file: null
      }
    }
  )

  function handleUpload() {
    uploadFile()
    setUploading(loading)
    setUrl(data)
  }
  return <UploadButton onUpload={handleUpload} loading={uploading} />

}
export default ImageUpload
// , {
//     refetchQueries: [{query: filesQuery}]
//     }
