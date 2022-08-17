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

    const getRetrospectiveBySprintId = async (sprintId, currentPage, pageSize) => {
      try {
        const {data} = await api.get(`/retrospective/list/sprint/${sprintId}?pagina=${currentPage}&registro=${pageSize}`);
        return data;
      } catch (error) {
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
        <RetroContext.Provider value={{handleCreateRetrospective, getRetrospectiveBySprintId, handleCreateItemRetrospective}}>
          {children}
        </RetroContext.Provider>
    );
};
export { RetroContext, RetroProvider };
