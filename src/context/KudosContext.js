//Import do react
import { createContext } from "react";
//Import router
import { useNavigate } from "react-router-dom";
//Import da dependencia de toast
import { toast } from "react-toastify";
//Import da chamada da url da api
import { api } from "../api";

const KudosContext = createContext();

const KudosProvider = ({ children }) => {
    const navigate = useNavigate();

    const handleCreateKudoBox = async (values, idSprint) => {
        try {
            await api.post("/kudobox/create", values);
            toast.success("Kudo Box criado com sucesso");
            navigate(`/sprint/${idSprint}`);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const getKudoboxBySprintId = async (sprintId, currentPage, pageSize) => {
        try {
            const { data } = await api.get(
                `/kudobox/list/sprint/${sprintId}?pagina=${currentPage}&registros=${pageSize}`
            );
            return data;
        } catch (error) {
            if (error.response.data.status === 400) {
                return;
            }

            toast.error(error.response.data.message);
        }
    };

    const handleCreateKudoCard = async (values, idKudoBox) => {
        try {
            await api.post("/kudocard/create", values);
            toast.success("Kudo Card criado com sucesso");
            navigate(`/kudobox/${idKudoBox}`);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const getKudoboxById = async (idKudobox, page, pageSize) => {
        try {
            const { data } = await api.get(
                `/kudocard/list/kudocards/${idKudobox}?pagina=${page}&registros=${pageSize}`
            );
            return data;
        } catch (error) {
            if (error.response.data.status === 400) {
                return;
            }

            toast.error(error.response.data.message);
        }
    };

    const deleteKudoCard = async (idKudoCard) => {
        try {
            await api.delete(`/kudocard/delete/${idKudoCard}`);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <KudosContext.Provider
            value={{
                handleCreateKudoBox,
                handleCreateKudoCard,
                getKudoboxById,
                getKudoboxBySprintId,
                deleteKudoCard,
            }}
        >
            {children}
        </KudosContext.Provider>
    );
};

export { KudosContext, KudosProvider };
