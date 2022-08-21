import { createContext, useContext, useState } from "react";
//Import router
import { useNavigate } from "react-router-dom";
//Import da dependencia de toast
import { toast } from "react-toastify";
//Import da chamada da url da api
import { api } from "../api";
import { AuthContext } from "./AuthContext";

const RetroContext = createContext();

const RetroProvider = ({ children }) => {
    const navigate = useNavigate();
    const { forceUpdate } = useContext(AuthContext);

    const handleCreateRetrospective = async (values, idSprint) => {
        try {
            await api.post("/retrospective/create", values);
            toast.success("Retrospectiva criada com sucesso");
            navigate(`/sprint/${idSprint}`);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const getRetrospectiveBySprintId = async (
        idSprint,
        currentPage,
        pageSize
    ) => {
        try {
            const { data } = await api.get(
                `/retrospective/list/sprint/${idSprint}?page=${currentPage}&quantityPerPage=${pageSize}`
            );
            return data;
        } catch (error) {
            if (error.response.data.status === 400) {
                return;
            }
            toast.error(error.response.data.message);
        }
    };

    const getRetroById = async (idRetrospective) => {
        try {
            const { data } = await api.get(
                `/itemretrospective/list/retrospective/${idRetrospective}`
            );
            return data;
        } catch (error) {
            if (error.response.data.status === 400) {
                return;
            }
            toast.error(error.response.data.message);
        }
    };

    const handleCreateItemRetrospective = async (
        values,
        idRetrospective,
        type
    ) => {
        try {
            await api.post(
                `/itemretrospective/create?itemType=${type}`,
                values
            );
            toast.success("Item de Retrospectiva criada com sucesso");
            navigate(`/retrospectiva/${idRetrospective}`);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const sendEmail = async (values, idRetrospective, idSprint) => {
        try {
            await api.post(
                `/email/send?idRetrospective=${idRetrospective}`,
                values
            );
            toast.success("Email enviado com sucesso");
            navigate(`/sprint/${idSprint}`);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const getRetroDetailsById = async (idRetrospective) => {
        try {
            const { data } = await api.get(
                `/retrospective/list/${idRetrospective}`
            );
            return data;
        } catch (error) {
            if (error.response.data.status === 400) {
                return;
            }
            toast.error(error.response.data.message);
        }
    };

    const deleteRetro = async (idRetro) => {
        try {
            await api.delete(`/itemretrospective/delete/${idRetro}`);
            forceUpdate();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const updateStatusRetrospective = async (idRetrospective, status) => {
        try {
            await api.put(
                `/retrospective/update-status/${idRetrospective}?status=${status}`
            );
            toast.success("Status alterado com sucesso!");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleUpdateRetrospective = async (
        idRetrospective,
        idSprint,
        values
    ) => {
        try {
            await api.put(`/retrospective/update/${idRetrospective}`, values);
            toast.success("Retrospectiva alterada com sucesso");
            navigate(`/sprint/${idSprint}`);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const deleteRetrospective = async (idRetrospective) => {
        try {
            await api.delete(`/retrospective/delete/${idRetrospective}`);
            toast.success("Retrospectiva deletada com sucesso");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <RetroContext.Provider
            value={{
                handleCreateRetrospective,
                getRetroById,
                getRetrospectiveBySprintId,
                handleCreateItemRetrospective,
                sendEmail,
                getRetroDetailsById,
                deleteRetro,
                updateStatusRetrospective,
                deleteRetrospective,
                handleUpdateRetrospective,
            }}
        >
            {children}
        </RetroContext.Provider>
    );
};
export { RetroContext, RetroProvider };
