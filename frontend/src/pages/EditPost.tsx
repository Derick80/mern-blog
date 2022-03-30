import { useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { PostFeedProps, SinglePostProps } from '../additional';
import { AuthContext } from '../utils/context/auth';
import { GET_POST_TO_EDIT_BY_ID_QUERY } from '../utils/hooks/graphql';
import PublishButton from '../components/PublishButton';
import DeleteButton from '../components/DeleteButton';

export interface EditPostProps {
    postId: string
}
export default function EditPost() {
    const { user } = useContext(AuthContext);
    let { postId } = useParams()
    const { data, loading, error } = useQuery(GET_POST_TO_EDIT_BY_ID_QUERY, {
        variables: { postId }
    })

    if (loading) return <div>loading</div>
    return (
        <>
            <PostTest />

        </>
    )
}

type Props = {
    postId: string
}
function PostTest(): JSX.Element {
    return <div> { }</div>
}

function SinglePost({ postId }: EditPostProps) {





    // const { title, content, imageUrl, username } = data
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState<string>('')
    const { user } = useContext(AuthContext);

    return (

        <div className='post-create-edit-form'>
            <form className="post-form" onSubmit={() => { }} >

                <div >

                    <div >
                        <span>Title</span>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div >
                        <span>content</span>
                        <input
                            type="text"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <div >
                        <input
                            type="text"
                            name="imageUrl"
                            hidden
                            value={imageUrl}
                            onChange={(e) => setImageUrl(imageUrl.toString())}

                        />
                    </div>

                </div>


                <button className='post-submit-button'


                >
                    Submit
                </button>
            </form>


        </div>
    )
}


