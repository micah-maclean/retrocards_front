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
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../components/modal/Modal.css";

const SprintDetails = () => {
    const { idSprint } = useParams();
    const navigate = useNavigate();
    const {
        getRetrospectiveBySprintId,
        updateStatusRetrospective,
        getDetailsById,
    } = useContext(RetroContext);
    const { getKudoboxBySprintId } = useContext(KudosContext);
    const { filter, setFilter } = useContext(SprintContext);
    const { user } = useContext(AuthContext);
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

    const handleChangeStatusModal = (id, status) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Container
                        width="450px"
                        height="180px"
                        flexDirection="column"
                        justifyContent="space-between"
                        backgroundColor="#2a2831"
                        color="#fff"
                        padding="32px"
                        borderRadius="8px"
                    >
                        <Title fontSize="1.25rem">
                            Certeza que deseja alterar o status?
                        </Title>
                        <Container justifyContent="space-between">
                            <Button
                                width="30%"
                                backgroundColor="transparent"
                                border="1px solid #fff"
                                backgroundColorHover="#5454fb"
                                borderHover="1px solid #5454fb"
                                onClick={onClose}
                            >
                                Cancelar
                            </Button>
                            <Button
                                width="30%"
                                backgroundColor="#fff"
                                border="1px solid #fff"
                                color="#12101a"
                                backgroundColorHover="#5454fb"
                                colorHover="#fff"
                                borderHover="1px solid #5454fb"
                                onClick={() => {
                                    updateStatusRetrospective(id, status);
                                    onClose();
                                }}
                            >
                                Alterar
                            </Button>
                        </Container>
                    </Container>
                );
            },
        });
    };

    useEffect(() => {
        setup(filter);
    }, [filter, currentPage]);


    const navigateToSendEmail = (idRetrospective) => {
        navigate(`/enviar-email/${idRetrospective}/${idSprint}`);
    };

    const updateStatusToInProgress = (idRetrospective) => {
        handleChangeStatusModal(idRetrospective, "IN_PROGRESS");
        console.log("In progress => ", idRetrospective)
    }

    const  updateStatusToFinished= (idRetrospective) => {
        handleChangeStatusModal(idRetrospective, "FINISHED");
        console.log("Finished => ", idRetrospective)
    }

    const filterList = [
        { name: "Retrospectiva", value: "Retrospectiva" },
        { name: "Kudo Box", value: "Kudo Box" },
    ];

    const paramSprint = {
        Retrospectiva: {
            param : [
                { heading: "Id", key: "idRetrospective" },
                { heading: "Titulo", key: "title" },
                { heading: "Data da Reunião", key: "occurredDate" },
                { heading: "Status", key: "status" },
                { heading: "Quantidade de Items", key: "numberOfItens" },
            ],
            path: "/retrospectiva",
            pathKey: "idRetrospective",
            create : `/retrospectiva/cadastrar/${idSprint}`,
            actions: [
                { function: updateStatusToFinished, param: 'idRetrospective', status: 'IN_PROGRESS', icon: '||'},
                { function: updateStatusToInProgress, param: 'idRetrospective', status: 'CREATE', icon: 'Play'},
                { function: navigateToSendEmail, param: 'idRetrospective', status: 'FINISHED', icon: 'X'},
            ]
        },

        'Kudo Box': {
            param: [
                { heading: "Id", key: "idKudoBox" },
                { heading: "Titulo", key: "title" },
                { heading: "Data de encerramento", key: "endDate" },
                { heading: "Status", key: "status" },
                { heading: "Quantidade de Items", key: "numberOfItens" },
            ],
            path: "/kudobox",
            pathKey: "idKudobox",
            create: `/kudo-box/cadastrar/${idSprint}`
        }
    }

    return (
        <Container
            minHeight="calc(100vh - 100px)"
            backgroundColor="#12101A"
            color="#fff"
            flexDirection="column"
            alignItems="center"
            padding="30px"
        >
            <Container
                maxWidth="1120px"
                width="100%"
                flexDirection="column"
                gap="30px"
            >
                <Container justifyContent="space-between" gap="30px">
                    <Tab
                        filterList={filterList}
                        setFilter={setFilter}
                        activeFilter={filter}
                    />
                    {(user.role !== "ROLE_MEMBER") && (
                        <Button
                            id={
                                filter === "Retrospectiva"
                                    ? "createRetrospective"
                                    : "createKudoBox"
                            }
                            backgroundColor="#fff"
                            color="#12101a"
                            padding="8px 16px"
                            onClick={() =>
                                navigate(
                                    paramSprint[filter].create
                                )
                            }
                        >
                            {filter === "Retrospectiva"
                                ? "+ Criar Retrospectiva"
                                : "+ Criar Kudos Box"}
                        </Button>
                    )}
                </Container>

                <Table
                    params={
                       paramSprint[filter].param
                    }
                    actions={paramSprint[filter].actions}
                    list={list}
                    path={
                        paramSprint[filter].path
                    }
                    pathKey={
                        paramSprint[filter].pathKey
                    }
                />

                {list.length === 0 && (
                    <Title textAlign="center">
                        {filter === "Retrospectiva"
                            ? "Nenhuma retrospectiva"
                            : "Nenhum kudobox"}
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
        </Container>
    );
};

export default SprintDetails;