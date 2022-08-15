import { createContext } from "react";
import { api } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SprintContext = createContext();

const SprintProvider = ({ children }) => {
    const navigate = useNavigate();
    const handleCreateSprint = async (values) => {
        try {
            await api.post("/sprint/create", values);
            toast.success("Criado com sucesso");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Erro ao cadastrar");
        }
    };
    return (
        <SprintContext.Provider value={{handleCreateSprint}}>
            {children}
        </SprintContext.Provider>
    );
};

export {SprintContext, SprintProvider}
