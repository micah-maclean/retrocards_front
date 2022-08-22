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
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Modal } from "../../components/modal/Modal";
import { Loading } from "../../components/loading/Loading";

const Home = () => {
    const { user, reducerValue } = useContext(AuthContext);
    const { getSprintList, handleDeleteSprint } = useContext(SprintContext);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;
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
        window.scrollTo(0, 0)
    }, [currentPage, reducerValue]);

    const paramModal = {
        function: handleDeleteSprint,
        message: "Certeza que deseja deletar a sprint?",
        confirmText: "Deletar",
    };

    const updateSprint = (idSprint) => {
        navigate(`/sprint/editar/${idSprint}`);
    };

    const deleteSprint = (idSprint) => {
        Modal({...paramModal, values: [idSprint]});
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
                status: "IN_PROGRESS",
                icon: <FaEdit />,
                iconColor: "#ffee51",
            },
            {
                function: deleteSprint,
                param: "idSprint",
                status: "IN_PROGRESS",
                icon: <FaTrashAlt />,
                iconColor: "#ff3232",
            },
        ],
        path: "/sprint",
        pathKey: "idSprint",
    };

    return (
        <Container
            maxWidth="var(--max-width)"
            width="100%"
            flexDirection="column"
            gap="32px"
        >
            <Container alignItems="center" justifyContent="space-between">
                <Title textAlign="left">
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
    );
};

export default Home;
