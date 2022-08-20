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
import { confirmAlert } from "react-confirm-alert";

const RetroDetails = () => {
    const { getRetroById, getRetroDetailsById, deleteRetro } =
        useContext(RetroContext);
    const { user, reducerValue } = useContext(AuthContext);
    const { idRetrospective } = useParams();
    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [info, setInfo] = useState({});
    const [filter, setFilter] = useState("ALL");

    const handleDeleteModal = (id) => {
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
                            Certeza que deseja excluir?
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
                                    deleteRetro(id);
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

    const setup = async () => {
        const data = await getRetroById(idRetrospective);
        const details = await getRetroDetailsById(idRetrospective);
        setInfo(details);
        if (data) {
            setList(data);
        } else {
            setList([]);
        }
    };

    useEffect(() => {
        setup();
    }, [reducerValue]);

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
                padding="30px"
                gap="30px"
                flexDirection="column"
            >
                <Container justifyContent="space-between" alignItems="center" gap='30px'>
                    <Title textAlign='left'>{info.title}</Title>
                    {user.role === "ROLE_MEMBER" &&
                        info.status === "IN_PROGRESS" && (
                            <Button
                                id="createRetrocard"
                                backgroundColor="#fff"
                                color="black"
                                padding="8px 16px"
                                height="fit-content"
                                onClick={() =>
                                    navigate(
                                        `/item/cadastrar/${idRetrospective}`
                                    )
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
                                    {info.status === "IN_PROGRESS" && (
                                        <Button
                                            padding="none"
                                            backgroundColor="transparent"
                                            onClick={() =>
                                                handleDeleteModal(
                                                    retrocard.idItemRetrospective
                                                )
                                            }
                                        >
                                            <FaTrashAlt />
                                        </Button>
                                    )}
                                </Container>
                                <p> {retrocard.type}</p>
                                <p>
                                    <span>Descrição:</span>{" "}
                                    {retrocard.description}
                                </p>
                            </li>
                        ))}
                </Board>

                    {list.filter(FILTER_MAP[filter]).length === 0 && (
                        <Title textAlign="center">
                            Ainda não existe nenhum retrocard desse tipo
                        </Title>
                    )}
            </Container>
        </Container>
    );
};

export default RetroDetails;
