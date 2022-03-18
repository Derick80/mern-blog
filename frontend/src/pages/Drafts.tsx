import { useMutation, useQuery } from "@apollo/client";
import { title } from "process";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DraftsDisplay from "../components/post/Drafts";
import PostDraftForm from "../components/post/PostDraftForm";
import { AuthContext } from "../context/auth";
import { EDIT_POST_MUTATION, FETCH_DRAFTS_QUERY, PUBLISH_POST } from "../utils/graphql/graphql";
import { UPLOAD_FILE_MUTATION, useForm } from "../utils/hooks/hooks";

export default function Drafts(): any {
    let navigate = useNavigate()

    const { loading, data, error } = useQuery(FETCH_DRAFTS_QUERY)

    const [editPost] = useMutation(EDIT_POST_MUTATION)



    if (loading) return <div>Loading ...</div>;
    if (error) return `Error! ${error}`;

    return (<>
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
    </>)







}

