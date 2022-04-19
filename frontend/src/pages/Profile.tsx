import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import Card from '../components/common/Card';
import CreateProfile from '../components/profile/CreateProfile';
import { GET_USER_PROFILE_QUERY } from '../utils/hooks/graphql'

export default function Profile () {
    const { loading, data } = useQuery(GET_USER_PROFILE_QUERY, {
        fetchPolicy: 'network-only',
    })
    console.log(data);

    if (loading) return <div>loading</div>
    if (data.getUserProfile.length > 0) {
        return <div className="primary-content">
            { data.getUserProfile.map((item: any) => {
                return < Card key={ item.id } { ...item } />

            })
            }
        </div>
    }
    else {
        return <div className="primary-content"><CreateProfile />
        </div>




    }
}
