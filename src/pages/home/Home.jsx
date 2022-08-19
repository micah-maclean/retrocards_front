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

const Home = () => {
    const { user } = useContext(AuthContext);
    const { getSprintList } = useContext(SprintContext);
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

    const params = [
        { heading: "Id", key: "idSprint" },
        { heading: "Titulo", key: "title" },
        { heading: "Data de Conclusão", key: "endDate" },
    ];

    return (
        <Container
            minHeight="calc(100vh - 100px)"
            backgroundColor="#12101A"
            flexDirection="column"
            alignItems="center"
            padding="30px 0"
        >
            <Container maxWidth='1120px' width='100%' flexDirection="column" gap="32px" color="white">
                <Container alignItems="center" justifyContent="space-between">
                    <Title textAlign="left" color="white">
                        Sprints
                    </Title>
                    {(user.role === "ROLE_FACILITATOR" ||
                        user.role === "ROLE_ADMIN") && (
                        <Button
                            id="createSprint"
                            backgroundColor="white"
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
                    params={params}
                    path="/sprint"
                    pathKey="idSprint"
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
