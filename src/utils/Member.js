import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

const Member = () => {
    const {user} = useContext(AuthContext);
    return (
        <>
            {
                user.role === "ROLE_MEMBER" ? 
                 
                    <> 
                        <Outlet/>   
                    </>

                : <Navigate to='/not-found' replace/>
            }
        </>
        
    )
}

export default Member;