import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { api } from "../api";
import { Loading } from "../components/loading/Loading";

const AuthContext = createContext();

const AuthProvider =  ({children}) => {
    const [ loading, setLoading] = useState(true);
    const [ token, setToken] = useState('');
    const [ user, setUser] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            api.defaults.headers.common['Authorization'] = token;
            setToken(token);
        }

        setLoading(false);
    }, [])

    if (loading) {
        return <Loading/>
    }
    
    return(
        <AuthContext.Provider value={{token, user}}>
            {children}
        </AuthContext.Provider>
    )
} 

export {AuthContext, AuthProvider};