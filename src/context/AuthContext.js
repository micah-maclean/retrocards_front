//Import react
import { useEffect, useState, createContext, useReducer } from "react";
//Import router
import { useLocation, useNavigate } from "react-router-dom";
//Import da dependencia de toast
import { toast } from "react-toastify";
//Import da chamada da url da api
import { api } from "../api";
//Import dos components
import { Loading } from "../components/loading/Loading";
import { Container } from "../components/container/Container";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({});
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setToken(token);
            api.defaults.headers.common["Authorization"] = token;
            getLogged();
        } else{
            setLoading(false)
        }
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
        setToken("");
        delete api.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleSignup = async (values) => {
        setLoading(true);
        try {
            await api.post("/user/create", values);
            toast.success("Cadastro realizado com sucesso");
            navigate("/login");
        } catch (error) {
            toast.error(error.response.data.message);
        }
        setLoading(false);
    };

    const getLogged = async () => {
        try {
            const { data } = await api.get("/user/get-logged");
            setUser(data);
        } catch (error) {
            toast.error(error.response.data.message);
            handleLogout()
        }
        setLoading(false)
    };

    const getUsersEmails = async () => {
        try {
            const { data } = await api.get("/user/list-name-email");
            return data;
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getUsersList = async (page, pageSize) => {
        try {
            const { data } = await api.get(`/user/list?page=${page}&quantityPerPage=${pageSize}`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleUpdateRole = async (role, idUser) => {
        try {
            await api.put(`/user/change-role/${idUser}?userType=${role}`);
            toast.success("Cargo alterado com sucesso");
            navigate(`/users`);
        } catch (error) {
            toast.error(error.response.data.message);
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
                getUsersList,
                getUsersEmails,
                reducerValue,
                forceUpdate,
                handleUpdateRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
