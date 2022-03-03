import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { FETCH_DRAFTS_QUERY } from "../utils/graphql/graphql";

export default function Drafts() {
    const { loading, error, data } = useQuery(FETCH_DRAFTS_QUERY)
    const { user } = useContext(AuthContext);
    console.log(data)
    return <>
    </>
}

