import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import Signup from "./pages/signup/Signup";

const Routers = () => {
  const {token} = useContext(AuthContext);

  return (
    <BrowserRouter>
        <Routes>
          {
            token ? 
              <>
                <Route path='/' element={<Home/>} />
              </>
            :
              <>
                <Route path='/login' element={<Login/>} />
                <Route path='/cadastrar' element={<Signup/>} />
              </>
          }
          <Route path='/*' element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default Routers;