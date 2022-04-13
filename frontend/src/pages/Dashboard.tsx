import { useQuery } from "@apollo/client";
import { useContext } from "react";
import Posts from "../components/post/Posts";
import { AuthContext } from "../utils/context/auth";
import { FETCH_POSTS_QUERY } from "../utils/hooks/graphql";



export default function Dashboard () {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY, {
        fetchPolicy: 'network-only',

    })
    const { user } = useContext(AuthContext);
    console.log(data, user)

    if (loading) return <div>loading</div>
    return (
        <>
            <div className="primary-content">
                { data.getPosts.map((post: any) => {
                    return <Posts key={ post.id } { ...post } />
                }) }
            </div>


        </>

    )
}

