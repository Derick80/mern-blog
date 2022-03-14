import ImageUploadButton from "../components/ImageUpload";
import PostForm from "../components/post/PostForm";
import { useUpload } from "../utils/hooks/imageHooks";

export default function Create() {
    const { onChange, imageUrl, mutate, data, loading } = useUpload()

    return <div>
        <PostForm />
    </div>

}
