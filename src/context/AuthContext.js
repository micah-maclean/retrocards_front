import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api";
import { Loading } from "../components/loading/Loading";

const AuthContext = createContext();

const AuthProvider =  ({children}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [ loading, setLoading] = useState(true);
    const [ token, setToken] = useState(null);
    const [ user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setToken(token)
            api.defaults.headers.common['Authorization'] = token;
            isLogged();
        } 

        setLoading(false);
    }, [])

    const handleLogin = async (values) => {
        const from = location.state?.from?.pathname || "/";
        try {
            const {data} = await api.post('/user/login', values);
            setToken(data);
            api.defaults.headers.common['Authorization'] = data;
            localStorage.setItem('token', data);
            navigate(from, {replace: true})
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleLogout = () => {
        setToken('');
        api.defaults.headers.common['Authorization'] = undefined;
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    const isLogged = async () => {
        try {
            const {data} = await api.get('/user/logged');
            setUser(data);
        } catch (error) {
            toast.error(error.message);
        }
    }

    if (loading) {
        return <Loading/>
    }
    
    return(
        <AuthContext.Provider value={{token, user, handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
} 

export {AuthContext, AuthProvider};