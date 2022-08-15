import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api";
import { Loading } from "../components/loading/Loading";

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
    const from = location.state?.from?.pathname || "/";
    try {
      const { data } = await api.post("/user/login", values);
      setUser(data);
      setToken(data.token);
      api.defaults.headers.common["Authorization"] = data.token;
      localStorage.setItem("token", data.token);
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleLogout = () => {
    setToken("");
    api.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getLogged = async () => {
    try {
      const { data } = await api.get("/user/get-logged");
      setUser(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ token, user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
