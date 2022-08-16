import { createContext } from "react";
import { api } from "../api";
import { toast } from "react-toastify";

const KudosContext = createContext();

const KudosProvider = ({children}) => {

    const getKudoboxBySprintId = async (sprintId, currentPage, pageSize) => {
        try {
          const {data} = await api.get(`/kudobox/list/sprint/${sprintId}?pagina=${currentPage}&registros=${pageSize}`);
          return data;
        } catch (error) {
          toast.error(error.response.data.message)
        }
      }

    return(
        <KudosContext.Provider value={{getKudoboxBySprintId}}>
            {children}
        </KudosContext.Provider>
    )
}

export {KudosContext, KudosProvider}