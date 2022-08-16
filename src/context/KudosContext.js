import { createContext } from "react";
import { api } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const KudosContext = createContext();

const KudosProvider = ({children}) => {
    const navigate = useNavigate();

    const handleCreateKudoBox = async (values, idSprint) => {
        try {
            await api.post("/kudobox/create", values);
            toast.success("Kudo Box criada com sucesso");
            navigate(`/sprint/${idSprint}`);
        } catch (error) {
            console.log(error);
            toast.error("Erro ao cadastrar");
        }
    };
    return(
        <KudosContext.Provider value={{handleCreateKudoBox}}>
            {children}
        </KudosContext.Provider>
    )
}

export {KudosContext, KudosProvider}