import { useQuery } from "@apollo/client";
import { useContext } from "react";
import Posts, { PostsFeed } from "../components/post/Posts";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../utils/graphql/graphql";



export default function Dashboard() {
    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY)
    const { user } = useContext(AuthContext);
    console.log(data)

    if (loading) return <div>loading</div>
    return (

        <>
            {data.getPosts.map((post: any) => {
                return <Posts key={post.id} {...post} />
            })}
        </>
    )
}

