import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import { Container } from "../components/container/Container";

const PrivateRoute = () => {
    const {token} = useContext(AuthContext);
    const location = useLocation();
    return (
        <>
            {
                token ? 
                 
                    <> 
                        <Header/>
                        <Container
                            minHeight="var(--screen-size)"
                            backgroundColor="var(--primary-color)"
                            color="var(--secondary-color)"
                            flexDirection="column"
                            alignItems="center"
                            padding="30px"
                        >
                            <Outlet/> 
                        </Container>  
                        
                    </>

                : <Navigate to='/login' state={{ from: location }}  replace/>
            }
        </>
        
    )
}

export default PrivateRoute;