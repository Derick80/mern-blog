import { useMutation, useQuery } from "@apollo/client";
import { title } from "process";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DraftsDisplay from "../components/post/Drafts";
import { AuthContext } from "../context/auth";
import { FETCH_DRAFTS_QUERY, PUBLISH_POST } from "../utils/graphql/graphql";
import { UPLOAD_FILE_MUTATION, useForm } from "../utils/hooks/hooks";

export default function Drafts(): any {
    const { loading, data, error } = useQuery(FETCH_DRAFTS_QUERY)



    if (loading) return <div>Loading ...</div>;
    if (error) return `Error! ${error}`;

    return (<>
        {data.getDraftPosts.map((draft: any) => {
            return <DraftsDisplay key={draft.id} {...draft} />
        })}
    </>)







}

