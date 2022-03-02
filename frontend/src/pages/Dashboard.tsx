import { useContext } from "react";
import { AuthContext } from "../context/auth";



export default function Dashboard() {
    const { user } = useContext(AuthContext);

    return (

        <>
            DASHBOARD        </>
    )
}

