import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

const Facilitator = () => {
    const {user} = useContext(AuthContext);
    return (
        <>
            {
                user.role === "ROLE_FACILITATOR" ? 
                 
                    <> 
                        <Outlet/>   
                    </>

                : <Navigate to='/not-found' replace/>
            }
        </>
        
    )
}

export default Facilitator;