//Import react
import { useEffect, useState, useContext } from "react";
//Import router
import { useNavigate } from "react-router-dom";
//Import context
import { AuthContext } from "../../context/AuthContext";
//Import component
import Table from "../../components/table/Table";
import { Container } from "../../components/container/Container";
import Pagination from "../../components/pagination/Pagination";
import { Title } from "../../components/title/Title";

const Users = () => {
    const { getUsersList } = useContext(AuthContext);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [list, setList] = useState([]);

    const setup = async () => {
        const data = await getUsersList(currentPage, pageSize);
        if (data) {
            setTotalCount(data.totalElements);
            setTotalPages(data.totalPages);
            setList(data.content);
        } else {
            setList([]);
        }
    };

    const params = [
        { heading: "Id", key: "idUser" },
        { heading: "Nome", key: "name" },
        { heading: "Cargo", key: "role" },
    ];

    useEffect(() => {
        setup();
    }, [currentPage]);

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
                        Usuários
                    </Title>
                </Container>
                <Table
                    list={list}
                    params={params}
                    path="/users"
                    pathKey="idUser"
                />

                {list.length === 0 && <Title>Nenhum usuário criado</Title>}

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
export default Users;
