import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
const PrivateRoute = () => {
    const {token} = useContext(AuthContext);
    const location = useLocation();
    return (
        <>
            {
                token ? 
                 
                    <> 
                        <Header/>   
                        <Outlet/> 
                    </>

                : <Navigate to='/login' state={{ from: location }}  replace/>
            }
        </>
        
    )
}

export default PrivateRoute;