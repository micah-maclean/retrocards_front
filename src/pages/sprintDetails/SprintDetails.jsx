import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "../../components/button/Button";
import { Container } from "../../components/container/Container";
import Tab from "../../components/tab/Tab";
import Table from "../../components/table/Table";
import { KudosContext } from "../../context/KudosContext";
import { RetroContext } from "../../context/RetroContext";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { Title } from "../../components/title/Title";
import { SprintContext } from "../../context/SprintContext";
import { AuthContext } from "../../context/AuthContext";
import { Modal } from "../../components/modal/Modal";
import {
    FaEdit,
    FaTrashAlt,
    FaEnvelope,
    FaPlayCircle,
    FaStopCircle,
} from "react-icons/fa";
import { sprintFilter } from "../../utils/variables";

const SprintDetails = () => {
    const { idSprint } = useParams();
    const navigate = useNavigate();
    const {
        getRetrospectiveBySprintId,
        updateStatusRetrospective,
        deleteRetrospective,
    } = useContext(RetroContext);
    const { getKudoboxBySprintId, deleteKudoBox } = useContext(KudosContext);
    const { filter, setFilter } = useContext(SprintContext);
    const { user, reducerValue } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [list, setList] = useState([]);

    const setup = async (filter) => {
        const data =
            filter === "Retrospectiva"
                ? await getRetrospectiveBySprintId(
                      idSprint,
                      currentPage,
                      pageSize
                  )
                : await getKudoboxBySprintId(idSprint, currentPage, pageSize);

        if (data) {
            setTotalCount(data.totalElements);
            setTotalPages(data.totalPages);
            setList(data.content);
        } else {
            setList([]);
            setTotalCount(0);
            setTotalPages(0);
        }
    };

    useEffect(() => {
        setup(filter);
    }, [filter, currentPage, reducerValue]);

    const paramModal = {
        Retrospectiva: {
            edit: {
                function: updateStatusRetrospective,
                message: "Certeza que deseja alterar o status?",
                confirmText: "Alterar",
            },
            delete: {
                function: deleteRetrospective,
                message: "Certeza que deseja deletar a retrospectiva?",
                confirmText: "Deletar",
            },
        },
        "Kudo Box": {
            delete: {
                function: deleteKudoBox,
                message: "Certeza que deseja deletar o KudoBox?",
                confirmText: "Deletar",
            },
        },
    };

    const navigateToSendEmail = (idRetrospective) => {
        navigate(`/enviar-email/${idRetrospective}/${idSprint}`);
    };

    const updateStatusToInProgress = (idRetrospective) => {
        Modal({...paramModal.Retrospectiva.edit, values: [idRetrospective, "IN_PROGRESS"]});
    };

    const updateStatusToFinished = (idRetrospective) => {
        Modal({...paramModal.Retrospectiva.edit, values: [idRetrospective, "FINISHED"]});
    };

    const updateRetrospective = (idRetrospective) => {
        navigate(`/retrospectiva/editar/${idSprint}/${idRetrospective}`);
    };

    const deleteRetrospectiveModal = (idRetrospective) => {
        Modal({...paramModal.Retrospectiva.delete, values: [idRetrospective]});
    };

    const deleteKudoBoxModal = (idKudoBox) => {
        Modal({ ...paramModal["Kudo Box"].delete, values: [idKudoBox]});
    };

    const navigateToUpdateKudoBox = (idKudoBox) => {
        navigate(`/kudo-box/editar/${idSprint}/${idKudoBox}`);
    };

    const paramSprint = {
        Retrospectiva: {
            param: [
                { heading: "Id", key: "idRetrospective" },
                { heading: "Titulo", key: "title" },
                { heading: "Data da Reunião", key: "occurredDate" },
                { heading: "Status", key: "status" },
                { heading: "Quantidade de Items", key: "numberOfItens" },
            ],
            path: "/retrospectiva",
            pathKey: "idRetrospective",
            create: `/retrospectiva/cadastrar/${idSprint}`,
            actions: [
                {
                    function: updateStatusToFinished,
                    param: "idRetrospective",
                    status: "IN_PROGRESS",
                    icon: <FaStopCircle />,
                    iconColor: "#0B69F5",
                },
                {
                    function: updateStatusToInProgress,
                    param: "idRetrospective",
                    status: "CREATE",
                    icon: <FaPlayCircle />,
                    iconColor: "#51be51",
                },
                {
                    function: navigateToSendEmail,
                    param: "idRetrospective",
                    status: "FINISHED",
                    icon: <FaEnvelope />,
                    iconColor: "#4faaff",
                },
                {
                    function: updateRetrospective,
                    param: "idRetrospective",
                    status: "IN_PROGRESS",
                    icon: <FaEdit />,
                    iconColor: "#ffee51",
                },
                {
                    function: deleteRetrospectiveModal,
                    param: "idRetrospective",
                    status: "IN_PROGRESS",
                    icon: <FaTrashAlt />,
                    iconColor: "#ff3232",
                },
                {
                    function: updateRetrospective,
                    param: "idRetrospective",
                    status: "CREATE",
                    icon: <FaEdit />,
                    iconColor: "#ffee51",
                },
                {
                    function: deleteRetrospectiveModal,
                    param: "idRetrospective",
                    status: "CREATE",
                    icon: <FaTrashAlt />,
                    iconColor: "#ff3232",
                },
            ],
        },

        "Kudo Box": {
            param: [
                { heading: "Id", key: "idKudoBox" },
                { heading: "Titulo", key: "title" },
                { heading: "Data de encerramento", key: "endDate" },
                { heading: "Status", key: "status" },
                { heading: "Quantidade de Items", key: "numberOfItens" },
            ],
            path: "/kudobox",
            pathKey: "idKudoBox",
            create: `/kudo-box/cadastrar/${idSprint}`,
            actions: [
                {
                    function: navigateToUpdateKudoBox,
                    param: "idKudoBox",
                    status: "IN_PROGRESS",
                    icon: <FaEdit />,
                    iconColor: "#ffee51",
                },
                {
                    function: deleteKudoBoxModal,
                    param: "idKudoBox",
                    status: "IN_PROGRESS",
                    icon: <FaTrashAlt />,
                    iconColor: "#ff3232",
                },
            ],
        },
    };

    return (
            <Container
                maxWidth="1120px"
                width="100%"
                flexDirection="column"
                gap="30px"
            >
                <Container justifyContent="space-between" gap="30px" flexDirectionQuery="column">
                    <Tab
                        filterList={sprintFilter}
                        setFilter={setFilter}
                        activeFilter={filter}
                    />
                    {user.role !== "ROLE_MEMBER" && (
                        <Button
                            id={filter === "Retrospectiva" ? "createRetrospective": "createKudoBox"}
                            backgroundColor="#fff"
                            color="#12101a"
                            padding="8px 16px"
                            onClick={() => navigate(paramSprint[filter].create)}
                        >
                            {filter === "Retrospectiva" ? "+ Criar Retrospectiva" : "+ Criar Kudos Box"}
                        </Button>
                    )}
                </Container>

                <Table
                    params={paramSprint[filter].param}
                    actions={paramSprint[filter].actions}
                    list={list}
                    path={paramSprint[filter].path}
                    pathKey={paramSprint[filter].pathKey}
                />

                {list.length === 0 && (
                    <Title textAlign="center">
                        {filter === "Retrospectiva" ? "Nenhuma retrospectiva" : "Nenhum kudobox"}
                    </Title>
                )}

                <Pagination
                    totalCount={totalCount}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                />
            </Container>
    );
};

export default SprintDetails;
