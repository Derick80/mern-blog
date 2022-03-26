import { useQuery } from "@apollo/client";
import { useContext } from "react";
import Posts from "../components/post/Posts";
import { AuthContext } from "../context/auth";
import { FETCH_DRAFTS_QUERY } from "../utils/graphql/graphql";


export default function Drafts(): any {
    const { loading, data } = useQuery(FETCH_DRAFTS_QUERY)
    const { user } = useContext(AuthContext);
    console.log(data, user)

    if (loading) return <div>loading</div>



    return (<div className="create-edit-post-container">
        {data.getDraftPosts.map((post: any) => {
            return <Posts key={post.id} {...post} />
        })}
    </div>)







}

