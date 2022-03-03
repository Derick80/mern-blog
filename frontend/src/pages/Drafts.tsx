import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { FETCH_DRAFTS_QUERY } from "../utils/graphql/graphql";

export default function Drafts(): any {
    const { loading, data: posts, error } = useQuery(FETCH_DRAFTS_QUERY)
    const { user } = useContext(AuthContext);
    console.log(posts, user)

    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;

    return (<div>Post drafts</div>)







}

