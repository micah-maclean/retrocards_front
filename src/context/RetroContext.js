import { createContext } from "react";
import { toast } from "react-toastify";
import { api } from "../api";
const RetroContext = createContext();

const RetroProvider = ({children}) => {
    const getRetrospectiveBySprintId = async (sprintId, currentPage, pageSize) => {
      try {
        const {data} = await api.get(`/retrospective/list/sprint/${sprintId}?pagina=${currentPage}&registro=${pageSize}`);
        return data;
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }

  return (
    <RetroContext.Provider value={{getRetrospectiveBySprintId}}>
        {children}
    </RetroContext.Provider>
  )
}
export {RetroContext, RetroProvider}