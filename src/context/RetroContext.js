import { createContext } from "react";
import { api } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RetroContext = createContext();

const RetroProvider = ({ children }) => {
    const navigate = useNavigate();

    const handleCreateRetrospective = async (values, idSprint) => {
        try {
            await api.post("/retrospective/create", values);
            toast.success("Retrospectiva criada com sucesso");
            navigate(`/sprint/${idSprint}`);
        } catch (error) {
            console.log(error);
            toast.error("Erro ao cadastrar");
        }
    };
    return (
        <RetroContext.Provider value={{handleCreateRetrospective}}>{children}</RetroContext.Provider>
    );
};
export { RetroContext, RetroProvider };
