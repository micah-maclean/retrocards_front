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
            toast.error(error.response.data.message);
        }
    };

    const getRetrospectiveBySprintId = async (idSprint, currentPage, pageSize) => {
      try {
        const {data} = await api.get(`/retrospective/list/sprint/${idSprint}?pagina=${currentPage}&registro=${pageSize}`);
        return data;
      } catch (error) {
        if(error.response.data.status === 400){
          return;
        }
        toast.error(error.response.data.message)
      }
    }

    const getRetroById = async (idRetro) => {
      try {
        const {data} = await api.get(`/itemretrospective/list/retrospective/${idRetro}`);
        return data;
      } catch (error) {
        if(error.response.data.status === 400){
          return;
        }
        toast.error(error.response.data.message)
      }
    }

    const handleCreateItemRetrospective = async(values, idRetrospective, type) => {
      try {
        await api.post(`/itemretrospective/create?itemType=${type}`, values)
        toast.success("Item de Retrospectiva criada com sucesso");
        // navigate(`/retrospective/${idRetrospective}`)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }

    return (
        <RetroContext.Provider value={{handleCreateRetrospective, getRetroById, getRetrospectiveBySprintId, handleCreateItemRetrospective}}>
          {children}
        </RetroContext.Provider>
    );
};
export { RetroContext, RetroProvider };
