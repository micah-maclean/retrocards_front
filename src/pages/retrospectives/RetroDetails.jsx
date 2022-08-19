//Import react
import { useContext, useState, useEffect } from "react";
//Import router
import { useNavigate, useParams } from "react-router-dom";
//Import context
import { RetroContext } from "../../context/RetroContext";
import { AuthContext } from "../../context/AuthContext";
//Import component
import { Title } from "../../components/title/Title";
import { Board } from "../../components/board/Board";
import { Container } from "../../components/container/Container";
import { Button } from "../../components/button/Button";
import Tab from "../../components/tab/Tab";
//Import icons
import { FaTrashAlt } from "react-icons/fa";

const RetroDetails = () => {
    const { getRetroById } = useContext(RetroContext);
    const { user } = useContext(AuthContext);
    const { idRetro } = useParams();
    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [filter, setFilter] = useState("ALL");

    const setup = async () => {
        const data = await getRetroById(idRetro);
        setList(data);
    };

    useEffect(() => {
        setup();
    }, []);

    const FILTER_MAP = {
        ALL: () => true,
        WORKED: (retrocard) => retrocard.type === "WORKED",
        NEXT: (retrocard) => retrocard.type === "NEXT",
        IMPROVE: (retrocard) => retrocard.type === "IMPROVE",
    };

    const filterList = [
        { name: "Todos", value: "ALL" },
        { name: "O que Funcionou", value: "WORKED" },
        { name: "Próxima Sprint", value: "NEXT" },
        { name: "Há Melhorar", value: "IMPROVE" },
    ];

    return (
        <Container
            minHeight="calc(100vh - 100px)"
            backgroundColor="#12101A"
            justifyContent="center"
            color="#fff"
        >
            <Container
                maxWidth="1120px"
                width="100%"
                padding="30px 0"
                gap="30px"
                flexDirection="column"
            >
                <Container justifyContent="space-between" alignItems="center">
                    <Title>Retrospective #{idRetro}</Title>
                    {user.role === "ROLE_MEMBER" && (
                        <Button
                            id="createRetrocard"
                            backgroundColor="#fff"
                            color="black"
                            padding="8px 16px"
                            height="fit-content"
                            onClick={() =>
                                navigate(`/item/cadastrar/${idRetro}`)
                            }
                        >
                            + Criar Retrocard
                        </Button>
                    )}
                </Container>
                <Tab
                    filterList={filterList}
                    activeFilter={filter}
                    setFilter={setFilter}
                />
                <Board>
                    {list.length > 0 &&
                        list.filter(FILTER_MAP[filter]).map((retrocard) => (
                            <li key={retrocard.idItemRetrospective}>
                                <Container
                                    alignItems="center"
                                    justifyContent="space-between"
                                    margin="0 0 24px 0"
                                >
                                    <h3>{retrocard.title}</h3>
                                    <Button
                                        padding="none"
                                        backgroundColor="transparent"
                                    >
                                        <FaTrashAlt />
                                    </Button>
                                </Container>
                                <p> {retrocard.type}</p>
                                <p>
                                    <span>Descrição:</span>{" "}
                                    {retrocard.description}
                                </p>
                            </li>
                        ))}
                </Board>

                {list.length === 0 &&
                    list.filter(FILTER_MAP[filter]).length === 0 && (
                        <Title textAlign="center">
                            Ainda não existe nenhum retrocard desse tipo
                        </Title>
                    )}
            </Container>
        </Container>
    );
};

export default RetroDetails;
