import { useQuery } from "@apollo/client";
import Posts from '../components/common/card/PostCard';
import { FETCH_DRAFTS_QUERY } from "../utils/hooks/graphql";


export default function Drafts (): any {
    const { loading, data } = useQuery(FETCH_DRAFTS_QUERY, {
        fetchPolicy: 'network-only',

    })

    if (loading) return <div>loading</div>



    return (<div className="create-edit-post-container">
        { data.getDraftPosts.map((post: any) => {
            return <Posts key={ post.id } { ...post } />
        }) }
    </div>)







}

