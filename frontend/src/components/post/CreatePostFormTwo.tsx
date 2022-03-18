import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { ADD_POST_MUTATION } from '../../utils/graphql/graphql'
import PostDraftForm from './PostDraftForm'

export type CreatePostFormProps = {
    initialImageUrl: string
}
export default function CreatePostFormTwo({ initialImageUrl }: CreatePostFormProps) {
    let navigate = useNavigate()



    const [createPost, { loading }] = useMutation(ADD_POST_MUTATION)

    return (

        <>
            <PostDraftForm
                initialImageUrl={initialImageUrl}
                disabled={loading}
                onSubmit={(postInput: any) => {
                    createPost({
                        variables: {
                            ...postInput
                        },
                    });
                    navigate('/drafts')

                }}

            />
        </>

    )
}
