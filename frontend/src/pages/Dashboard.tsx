import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../utils/graphql/graphql";



export default function Dashboard() {
    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY)
    const { user } = useContext(AuthContext);
    console.log(data)


    return (

        <>
            DASHBOARD        </>
    )
}

