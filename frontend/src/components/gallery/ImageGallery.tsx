import { useQuery } from '@apollo/client';
import React, { useContext } from 'react'
import { AuthContext } from '../../utils/context/auth';
import { GET_USER_GALLERY } from '../../utils/hooks/graphql';

export default function ImageGallery() {
    const { loading, data } = useQuery(GET_USER_GALLERY)
    const { user } = useContext(AuthContext);
    console.log(data, user)
    if (loading) return <div>loading</div>

    return (

        <>
            {data.getUserImageGallery.map((userImage: any) => {
                return (
                    <div key={userImage.id}>
                        <img src={userImage.imageUrl} alt='something here' />
                        <p>Owner: {userImage.imageUserName}</p>
                    </div>
                )
            })}
        </>)
}
