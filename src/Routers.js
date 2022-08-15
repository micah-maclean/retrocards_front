import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import Signup from "./pages/signup/Signup";
import PrivateRoute from "./utils/PrivateRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Routers = () => {
  return (
    <BrowserRouter>
        <AuthProvider>
           <ToastContainer/>
            <Routes>
                <Route element={<PrivateRoute/>}>
                  <Route path='/' element={<Home/>} />  
                </Route>
                
                <Route path='/login' element={<Login/>} />
                <Route path='/cadastrar' element={<Signup/>} />
                <Route path='/*' element={<NotFound/>} />
            </Routes> 
        </AuthProvider>
        
    </BrowserRouter>
  )
}

export default Routers;