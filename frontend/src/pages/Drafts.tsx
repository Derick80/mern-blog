import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import PostDraftForm from "../components/post/PostDraftForm";
import { EDIT_POST_MUTATION, FETCH_DRAFTS_QUERY } from "../utils/graphql/graphql";

export default function Drafts(): any {
    let navigate = useNavigate()

    const { loading, data, error } = useQuery(FETCH_DRAFTS_QUERY)

    const [editPost] = useMutation(EDIT_POST_MUTATION)



    if (loading) return <div>Loading ...</div>;
    if (error) return `Error! ${error}`;

    return (<div className="primary-content">
        {data.getDraftPosts.map((draft: any) => {
            return <PostDraftForm key={draft.id}
                disabled={draft.disabled}
                initialTitle={draft.title}
                initialPostId={draft.id}
                initialContent={draft.content}
                initialImageUrl={draft.imageUrl}
                onSubmit={(postUpdateInput: any) => {
                    editPost({
                        variables: {
                            ...postUpdateInput
                        }
                    })
                }}
            />
        })}
    </div>)







}

