import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet, useLocation } from "react-router-dom";
const PrivateRoute = () => {
    const {token} = useContext(AuthContext);
    const location = useLocation();
    return (
        token ?  <Outlet/> : <Navigate to='/login' state={{ from: location }}  replace/>
    )
}

export default PrivateRoute;