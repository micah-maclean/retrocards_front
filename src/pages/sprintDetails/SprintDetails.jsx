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
import { Loading } from "../../components/loading/Loading";

const SprintDetails = () => {
    const { idSprint } = useParams();
    const navigate = useNavigate();
    const {
        getRetrospectiveBySprintId,
        updateStatusRetrospective,
        deleteRetrospective,
    } = useContext(RetroContext);
    const { getKudoboxBySprintId, deleteKudoBox } = useContext(KudosContext);
    const { filter, setFilter, getSprintById } = useContext(SprintContext);
    const { user, reducerValue } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true)
    const [sprintDetail, setSprintDetail] = useState()

    const setup = async (filter) => {
        setLoading(true)
        const detail = await getSprintById(idSprint)
        setSprintDetail(detail)
        const data =
        filter === "RETROSPECTIVA"
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
        setLoading(false)
    };

    useEffect(() => {
        setup(filter);
    }, [filter, currentPage, reducerValue]);

    const paramModal = {
        RETROSPECTIVA: {
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
        KUDOBOX: {
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
        Modal({...paramModal.RETROSPECTIVA.edit, values: [idRetrospective, "IN_PROGRESS"]});
    };

    const updateStatusToFinished = (idRetrospective) => {
        Modal({...paramModal.RETROSPECTIVA.edit, values: [idRetrospective, "FINISHED"]});
    };

    const updateRetrospective = (idRetrospective) => {
        navigate(`/retrospectiva/editar/${idSprint}/${idRetrospective}`);
    };

    const deleteRetrospectiveModal = (idRetrospective) => {
        Modal({...paramModal.RETROSPECTIVA.delete, values: [idRetrospective]});
    };

    const deleteKudoBoxModal = (idKudoBox) => {
        Modal({ ...paramModal.KUDOBOX.delete, values: [idKudoBox]});
    };

    const navigateToUpdateKudoBox = (idKudoBox) => {
        navigate(`/kudo-box/editar/${idSprint}/${idKudoBox}`);
    };

    const paramSprint = {
        RETROSPECTIVA: {
            param: [
                { heading: "Id", key: "idRetrospective" },
                { heading: "Título", key: "title" },
                { heading: "Data da Reunião", key: "occurredDate" },
                { heading: "Status", key: "status" },
                { heading: "Quantidade de Itens", key: "numberOfItens" },
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
                    iconColor: "var(--dark-blue)",
                },
                {
                    function: updateStatusToInProgress,
                    param: "idRetrospective",
                    status: "CREATE",
                    icon: <FaPlayCircle />,
                    iconColor: "var(--green)",
                },
                {
                    function: navigateToSendEmail,
                    param: "idRetrospective",
                    status: "FINISHED",
                    icon: <FaEnvelope />,
                    iconColor: "var(--light-blue)",
                },
                {
                    function: updateRetrospective,
                    param: "idRetrospective",
                    status: "IN_PROGRESS",
                    icon: <FaEdit />,
                    iconColor: "var(--yellow)",
                },
                {
                    function: deleteRetrospectiveModal,
                    param: "idRetrospective",
                    status: "IN_PROGRESS",
                    icon: <FaTrashAlt />,
                    iconColor: "var(--red)",
                },
                {
                    function: updateRetrospective,
                    param: "idRetrospective",
                    status: "CREATE",
                    icon: <FaEdit />,
                    iconColor: "var(--yellow)",
                },
                {
                    function: deleteRetrospectiveModal,
                    param: "idRetrospective",
                    status: "CREATE",
                    icon: <FaTrashAlt />,
                    iconColor: "var(--red)",
                },
            ],
        },
        KUDOBOX: {
            param: [
                { heading: "Id", key: "idKudoBox" },
                { heading: "Título", key: "title" },
                { heading: "Data de encerramento", key: "endDate" },
                { heading: "Status", key: "status" },
                { heading: "Quantidade de Itens", key: "numberOfItens" },
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
                    iconColor: "var(--yellow)",
                },
                {
                    function: deleteKudoBoxModal,
                    param: "idKudoBox",
                    status: "IN_PROGRESS",
                    icon: <FaTrashAlt />,
                    iconColor: "var(--red)",
                },
            ],
        },
    };

    if (loading) {
        return (
            <Container
                alignItems="center"
                justifyContent="center"
                backgroundColor="#12101a"
                height="100vh"
            >
                <Loading />
            </Container>
        );
    }

    return (
            <Container
                maxWidth="var(--max-width)"
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
                    {user.role !== "ROLE_MEMBER" && sprintDetail.status === 'IN_PROGRESS' && (
                        <Button
                            id={filter === "RETROSPECTIVA" ? "createRetrospective": "createKudoBox"}
                            backgroundColor="#fff"
                            color="#12101a"
                            padding="8px 16px"
                            onClick={() => navigate(paramSprint[filter].create)}
                        >
                            {filter === "RETROSPECTIVA" ? "+ Criar Retrospectiva" : "+ Criar Kudos Box"}
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
                        {filter === "RETROSPECTIVA" ? "Nenhuma retrospectiva" : "Nenhum kudobox"}
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