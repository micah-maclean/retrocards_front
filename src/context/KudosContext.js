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
            toast.error(error.response.data.message);
        }
    };

    const getKudoboxBySprintId = async (sprintId, currentPage, pageSize) => {
        try {
          const {data} = await api.get(`/kudobox/list/sprint/${sprintId}?pagina=${currentPage}&registros=${pageSize}`);
          return data;
        } catch (error) {
            if(error.response.data.status === 400){
                return;
            }

            toast.error(error.response.data.message)
        }
    };

    const getKudoboxById = async(idKudobox, page, pageSize) =>{
        try {
            const {data} = await api.get(`/kudocard/list/kudocards/${idKudobox}?pagina=${page}&registros=${pageSize}`);
            return data;
        } catch (error) {
            if(error.response.data.status === 400){
                return;
            }

            toast.error(error.response.data.message)
        }
    }

    return(
        <KudosContext.Provider value={{handleCreateKudoBox, getKudoboxById, getKudoboxBySprintId}}>
            {children}
        </KudosContext.Provider>
    )
}

export {KudosContext, KudosProvider}