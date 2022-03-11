import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Upload } from "../components/Upload";
import { AuthContext } from "../context/auth";
import { Files } from "../utils/Files";
import { FETCH_POSTS_QUERY } from "../utils/graphql/graphql";



export default function Dashboard() {
    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY)
    const { user } = useContext(AuthContext);
    console.log(data)


    return (

        <>
            <Upload />
            <Files />       </>
    )
}

