import { useQuery } from "@apollo/client";
import { useContext } from "react";
import PostContent from '../components/post/PostContent';
import { AuthContext } from "../utils/context/auth";
import { FETCH_POSTS_QUERY } from "../utils/hooks/graphql";



export default function Dashboard () {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY, {
        fetchPolicy: 'network-only',

    })

    if (loading) return <div>loading</div>
    return (
        <>
            <div className="primary-content">
                { data.getPosts.map((post: any) => {
                    return <PostContent key={ post.id } comments={ post.comments } { ...post } />
                }) }
            </div>


        </>

    )
}

