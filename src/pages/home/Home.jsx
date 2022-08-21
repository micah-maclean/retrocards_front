//Import react
import { useEffect, useState, useContext } from "react";
//Import router
import { useNavigate } from "react-router-dom";
//Import context
import { SprintContext } from "../../context/SprintContext";
import { AuthContext } from "../../context/AuthContext";
//Import component
import Table from "../../components/table/Table";
import { Container } from "../../components/container/Container";
import Pagination from "../../components/pagination/Pagination";
import { Button } from "../../components/button/Button";
import { Title } from "../../components/title/Title";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../components/modal/Modal.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Home = () => {
    const { user } = useContext(AuthContext);
    const { getSprintList, handleDeleteSprint } = useContext(SprintContext);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [list, setList] = useState([]);

    const setup = async () => {
        const data = await getSprintList(currentPage, pageSize);
        if (data) {
            setTotalCount(data.totalElements);
            setTotalPages(data.totalPages);
            setList(data.content);
        } else {
            setList([]);
        }
    };

    useEffect(() => {
        setup();
    }, [currentPage]);

    const handleDeleteSprintModal = (id) => {
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
                            Certeza que deseja deletar a sprint?
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
                                    handleDeleteSprint(id);
                                    onClose();
                                }}
                            >
                                Deletar
                            </Button>
                        </Container>
                    </Container>
                );
            },
        });
    };

    const updateSprint = (idSprint) => {
        navigate(`/sprint/editar/${idSprint}`);
    };

    const deleteSprint = (idSprint) => {
        handleDeleteSprintModal(idSprint);
    };

    const paramsTables = {
        params: [
            { heading: "Id", key: "idSprint" },
            { heading: "Titulo", key: "title" },
            { heading: "Data de Conclusão", key: "endDate" },
        ],
        actions: [
            {
                function: updateSprint,
                param: "idSprint",
                icon: <FaEdit />,
                iconColor: "#ffee51",
            },
            {
                function: deleteSprint,
                param: "idSprint",
                icon: <FaTrashAlt />,
                iconColor: "#ff3232",
            },
        ],
        path: "/sprint",
        pathKey: "idSprint",
    };

    return (
        <Container
            minHeight="calc(100vh - 100px)"
            backgroundColor="#12101A"
            flexDirection="column"
            alignItems="center"
            padding="30px"
        >
            <Container
                maxWidth="1120px"
                width="100%"
                flexDirection="column"
                gap="32px"
                color="#fff"
            >
                <Container alignItems="center" justifyContent="space-between">
                    <Title textAlign="left" color="#fff">
                        Sprints
                    </Title>
                    {(user.role === "ROLE_FACILITATOR" ||
                        user.role === "ROLE_ADMIN") && (
                        <Button
                            id="createSprint"
                            backgroundColor="#fff"
                            color="black"
                            onClick={() => navigate("/sprint/cadastrar")}
                        >
                            {" "}
                            + Criar
                        </Button>
                    )}
                </Container>

                <Table
                    list={list}
                    params={paramsTables.params}
                    path={paramsTables.path}
                    pathKey={paramsTables.pathKey}
                    actions={paramsTables.actions}
                />

                {list.length === 0 && (
                    <Title>Nenhuma sprint criada ainda</Title>
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

export default Home;
