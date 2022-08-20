import { createContext, useState } from "react";
//Import router
import { useNavigate } from "react-router-dom";
//Import da dependencia de toast
import { toast } from "react-toastify";
//Import da chamada da url da api
import { api } from "../api";

const SprintContext = createContext();

const SprintProvider = ({ children }) => {
    const navigate = useNavigate();

    const [filter, setFilter] = useState("Retrospectiva");

    const getSprintList = async (page, pageSize) => {
        try {
            const { data } = await api.get(
                `/sprint/list?page=${page}&quantityPerPage=${pageSize}`
            );
            return data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const getRetroListBySprintId = async (sprintId, currentPage, pageSize) => {
        try {
            const { data } = await api.get(
                `/retrospective/list/sprint/${sprintId}?page=${currentPage}&quantityPerPage=${pageSize}`
            );
            return data;
        } catch (error) {
            if (error.response.data.status === 400) {
                return;
            }
            toast.error(error.response.data.message);
        }
    };

    const handleCreateSprint = async (values) => {
        try {
            await api.post("/sprint/create", values);
            toast.success("Criado com sucesso");
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleNavigateToSprint = () => {
        navigate("/");
    };

    const handleNavigateToSprintById = (idSprint) => {
        navigate(`/sprint/${idSprint}`);
    };

    return (
        <SprintContext.Provider
            value={{
                handleCreateSprint,
                getSprintList,
                getRetroListBySprintId,
                handleNavigateToSprint,
                handleNavigateToSprintById,
                filter,
                setFilter,
            }}
        >
            {children}
        </SprintContext.Provider>
    );
};

export { SprintContext, SprintProvider };
