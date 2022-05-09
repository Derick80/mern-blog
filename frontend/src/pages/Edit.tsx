import { useQuery } from '@apollo/client';
import { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../utils/context/auth';
import { GET_POST_TO_EDIT_BY_ID_QUERY } from '../utils/hooks/graphql';
import EditPost from '../components/post/EditPost';

export interface EditPostProps {
    postId: string
}
export default function Edit () {
    const { user } = useContext(AuthContext);
    let { postId } = useParams()
    const { data, loading, error } = useQuery(GET_POST_TO_EDIT_BY_ID_QUERY, {
        variables: { postId },
    })

    return data ? <EditPost data={ data } /> : <div>loading...</div>


}


