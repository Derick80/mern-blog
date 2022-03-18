import { useMutation } from '@apollo/client'
import { EDIT_POST_MUTATION, GET_DRAFTS } from '../../utils/graphql/graphql'
import PostDraftForm from './PostDraftForm'


export type DraftsProps = {
    drafts: {
        postId: string
        content: string
        title: string
        imageUrl: string
    }

}
export default function DraftsDisplay({ drafts: { title, content, imageUrl, postId } }: DraftsProps) {


    const [mutate, { loading }] = useMutation(EDIT_POST_MUTATION, {
        refetchQueries: [
            GET_DRAFTS,
            'getDraftPosts'
        ],

        variables: { title, content, imageUrl, postId }
    })



    return (
        <>

            <PostDraftForm
                disabled={loading}

                initialTitle={title}
                initialContent={content}
                initialImageUrl={imageUrl}
                onSubmit={(postUpdateInput: any) => {
                    mutate({
                        variables: {
                            postId,
                            ...postUpdateInput
                        }
                    })

                }}
            />
        </>
    )
}
