import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

const Routers = () => {
  return (
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/login' element={<Login/>} />
            </Routes>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default Routers;