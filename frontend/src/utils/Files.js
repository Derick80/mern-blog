import { useQuery } from "@apollo/client"
import {useCallback} from 'react'
import { gql } from '@apollo/client'


export const filesQuery = gql`
{
    files
}`

export const Files = () => {
    const { data, loading } = useQuery(filesQuery)

    if (loading) {
        return<div>loading</div>

    }
    return (
        <div>
            {data.files.map(x => (
                <img style={{ width: 200 }}
                    key={x}
                src={`https://storage.cloud.google.com/blog_bucket_dch/${x}`}
                alt={x} />
            ))}
        </div>
    )
}