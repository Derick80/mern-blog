import { useMutation } from "@apollo/client";
import { UPLOAD_FILE_MUTATION } from "../utils/hooks/hooks";

const ImageUpload = () => {
  const [mutate, { loading, error }] = useMutation(UPLOAD_FILE_MUTATION);
  const onChange = ({
    target: {
      validity,
      files: [file]
    }
  }: any) => validity.valid && mutate({ variables: { file } });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <>
      <input type="file" required onChange={onChange} />
    </>
  );
};

export default ImageUpload