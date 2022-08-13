import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { api } from "../api";
import { Loading } from "../components/loading/Loading";

const AuthContext = createContext();

const AuthProvider =  ({children}) => {
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
        try {
            const {data} = await api.post('/user/login', values);
            setUser(data)
            setToken(data.token);
            api.defaults.headers.common['Authorization'] = data.token;
            localStorage.setItem('token', data.token);
            window.location.href = '/';
        } catch (error) {
            console.log(error)
            toast.error(error);
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