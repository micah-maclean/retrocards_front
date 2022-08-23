//Import do react
import { createContext, useContext } from "react";
//Import router
import { useNavigate } from "react-router-dom";
//Import da dependencia de toast
import { toast } from "react-toastify";
//Import da chamada da url da api
import { api } from "../api";
import { AuthContext } from "./AuthContext";

const KudosContext = createContext();

const KudosProvider = ({ children }) => {
    const navigate = useNavigate();
    const { forceUpdate } = useContext(AuthContext);

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
            const { data } = await api.get(`/kudobox/list/sprint/${sprintId}?page=${currentPage}&quantityPerPage=${pageSize}`);
            return data;
        } catch (error) {
            if (error.response.data.status === 400) return;

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
            const { data } = await api.get(`/kudocard/list/kudocards/${idKudobox}?page=${page}&quantityPerPage=${pageSize}`);
            return data;
        } catch (error) {
            if (error.response.data.status === 400) return;

            toast.error(error.response.data.message);
        }
    };

    const deleteKudoCard = async (idKudoCard) => {
        try {
            await api.delete(`/kudocard/delete/${idKudoCard}`);
            forceUpdate();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const getKudoBoxDetailsById = async (idKudoBox) => {
        try {
            const { data } = await api.get(`/kudobox/list/${idKudoBox}`);
            return data;
        } catch (error) {   
            toast.error(error.response.data.message);
        }
    };

    const deleteKudoBox = async (idKudoBox) => {
        try {
            await api.delete(`/kudobox/delete/${idKudoBox}`);
            toast.success("KudoBox deletado com sucesso");
            forceUpdate();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleUpdateKudoBox = async (idKudoBox, idSprint, values) => {
        try {
            await api.put(`/kudobox/update/${idKudoBox}`, values);
            toast.success("KudoBox atualizado com sucesso");
            navigate(`/sprint/${idSprint}`);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const getKudoCardById = async (idKudoCard) => {
        try {
            const { data } = await api.get(`/kudocard/list/${idKudoCard}`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const handleUpdateKudoCard = async (idKudoCard, idKudoBox, values) => {
        try {
            await api.put(`/kudocard/update/${idKudoCard}`, values);
            toast.success("KudoCard atualizado com sucesso");
            navigate(`/kudobox/${idKudoBox}`);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <KudosContext.Provider
            value={{handleCreateKudoBox,
                handleCreateKudoCard,
                getKudoboxById,
                getKudoboxBySprintId,
                deleteKudoCard,
                getKudoBoxDetailsById,
                deleteKudoBox,
                handleUpdateKudoBox,
                getKudoCardById,
                handleUpdateKudoCard
            }}
        >
            {children}
        </KudosContext.Provider>
    );
};

export { KudosContext, KudosProvider };