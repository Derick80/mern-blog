import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { UPLOAD_FILE_MUTATION } from "../utils/hooks/hooks";
import { useUpload } from "../utils/hooks/imageHooks";
import PostForm from "./post/PostForm";


export type imageUploadFormProps = {

  useUpload: Function
}
const ImageUploadButton = () => {
  const [imageUrl, setImageUrl] = useState('')


  const [mutate, { data, loading, error }] = useMutation(UPLOAD_FILE_MUTATION)

  const onChange = ({
    target: {
      validity,
      files: [file]
    }
  }: any) => validity.valid && mutate({ variables: { file } })


  useEffect(() => {
    if (data) {
      setImageUrl(data.uploadFile.imageUrl)
    }
  }, [data])
  // console.log(data.uploadFile.imageUrl);


  return (
    <>
      <input type="file" required onChange={onChange} />

    </>)
    ;
};

export default ImageUploadButton