import { useQuery } from "@apollo/client";
import { useContext } from "react";
import Gallery from "../components/ImageGallery";
import Posts from "../components/post/Posts";
import { AuthContext } from "../utils/context/auth";
import { FETCH_POSTS_QUERY } from "../utils/hooks/graphql";



export default function Dashboard() {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)
    const { user } = useContext(AuthContext);
    console.log(data, user)

    if (loading) return <div>loading</div>
    return (
        <>
            <div className="primary-content">
                {data.getPosts.map((post: any) => {
                    return <Posts key={post.id} {...post} />
                })}
            </div>


        </>

    )
}

