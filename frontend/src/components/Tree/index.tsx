import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../../utils/context/auth";
import { GET_USER_GALLERY } from "../../utils/hooks/graphql";
import Base from "./Base";
import List from "./Branch";


export default function Tree() {
    const { user, logout } = useContext(AuthContext)
    const { loading, data } = useQuery(GET_USER_GALLERY)
    if (loading) return <div>loading</div>
    return (

        <>
            {data.getUserImageGallery.map((item: any) =>
                <List key={item.id} {...item} />
            )}
        </>
    )
}