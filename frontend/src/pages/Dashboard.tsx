import { useQuery } from "@apollo/client";
import { useContext } from "react";
import Posts from "../components/post/Posts";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../utils/graphql/graphql";



export default function Dashboard() {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)
    const { user } = useContext(AuthContext);
    console.log(data, user)

    if (loading) return <div>loading</div>
    return (
        <>

            {/* <div className="cards"> */}
            {data.getPosts.map((post: any) => {
                return <Posts key={post.id} {...post} />
            })}
            {/* </div> */}


        </>

    )
}

