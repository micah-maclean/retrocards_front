import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

const Admin = () => {
    const {user} = useContext(AuthContext);
    // console.log(user)
    return (
        <>
            {
                user.role === "ROLE_ADMIN" ? 
                 
                    <> 
                        <Outlet/>   
                    </>

                : <Navigate to='/not-found' replace/>
            }
        </>
        
    )
}

export default Admin;