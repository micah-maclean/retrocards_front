import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api";
import { Loading } from "../components/loading/Loading";
import { Container } from "../components/container/Container";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setToken(token);
            api.defaults.headers.common["Authorization"] = token;
            getLogged();
        }
        setLoading(false);
    }, []);

    const handleLogin = async (values) => {
        setLoading(true);
        const from = location.state?.from?.pathname || "/";
        try {
            const { data } = await api.post("/user/login", values);
            setUser(data);
            setToken(data.token);
            api.defaults.headers.common["Authorization"] = data.token;
            localStorage.setItem("token", data.token);
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.response.data.message);
        }
        setLoading(false);
    };

    const handleLogout = () => {
        setLoading(true);
        setToken("");
        delete api.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        navigate("/login");
        setLoading(false);
    };

    const handleSignup = async (values) => {
        try {
            await api.post("/user/create", values);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const getLogged = async () => {
        try {
            const { data } = await api.get("/user/get-logged");
            setUser(data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getUsersEmails = async () => {
        try {
            const { data } = await api.get("/user/list-name-email");
            return data;
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (loading) {
        return (
            <Container
                alignItems="center"
                justifyContent="center"
                backgroundColor="#12101a"
                height="100vh"
            >
                <Loading />
            </Container>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                handleLogin,
                handleLogout,
                handleSignup,
                getUsersEmails,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
