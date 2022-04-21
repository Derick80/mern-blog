import { useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { GET_CURRENT_USER } from '../utils/hooks/graphql'

export default function Account () {
    const { data, loading } = useQuery(GET_CURRENT_USER)
    console.log("user data", data);
    if (loading) return <div>loading...</div>
    return (

        <div className="primary-content">

            <div className="card" key={ data.getCurrentUser.id }>
                { <img src={ data.getCurrentUser.userImage } alt='nothing here' /> }
                { data.getCurrentUser.name }
                <Button className='button'> UpdateAccount
                    < Link to={ `/updateAccount/${data.getCurrentUser.id}` }></Link>
                </Button>
            </div>


        </div>
    )
}
