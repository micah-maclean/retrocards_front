//Import react
import { useEffect, useState, useContext } from "react";
//Import context
import { AuthContext } from "../../context/AuthContext";
//Import component
import Table from "../../components/table/Table";
import { Container } from "../../components/container/Container";
import Pagination from "../../components/pagination/Pagination";
import { Title } from "../../components/title/Title";
import { paramsUsers } from "../../utils/variables";
import { Loading } from "../../components/loading/Loading";

const Users = () => {
    const { getUsersList } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize= 10;
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true)

    const setup = async () => {
        setLoading(true)
        const data = await getUsersList(currentPage, pageSize);
        if (data) {
            setTotalCount(data.totalElements);
            setTotalPages(data.totalPages);
            setList(data.content);
        } else {
            setList([]);
        }
        setLoading(false)
    };

    useEffect(() => {
        setup();
    }, [currentPage]);

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
            gap="32px"
            color="#fff"
        >
            <Container alignItems="center" justifyContent="space-between">
                <Title textAlign="left" id="user-text">
                    Usuários
                </Title>
            </Container>
            <Table
                list={list}
                params={paramsUsers}
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
);
};
export default Users;
