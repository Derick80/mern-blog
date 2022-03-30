import { useQuery } from "@apollo/client";
import { useContext } from "react";
import Posts from "../components/post/Posts";
import { AuthContext } from "../utils/context/auth";
import { FETCH_DRAFTS_QUERY } from "../utils/hooks/graphql";


export default function Drafts(): any {
    const { loading, data } = useQuery(FETCH_DRAFTS_QUERY)
    console.log(data)

    if (loading) return <div>loading</div>



    return (<div className="create-edit-post-container">
        {data.getDraftPosts.map((post: any) => {
            return <Posts key={post.id} {...post} />
        })}
    </div>)







}

