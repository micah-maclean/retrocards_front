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
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { filterListRetro, TypeRetro } from "../../utils/variables";
import { Modal } from "../../components/modal/Modal";
import { Loading } from "../../components/loading/Loading";

const RetroDetails = () => {
    const { getRetroById, getRetroDetailsById, deleteRetro } =
        useContext(RetroContext);
    const { user, reducerValue } = useContext(AuthContext);
    const { idRetrospective } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [info, setInfo] = useState({});
    const [filter, setFilter] = useState("ALL");

    const setup = async () => {
        setLoading(true);
        const data = await getRetroById(idRetrospective);
        const details = await getRetroDetailsById(idRetrospective);
        details ? setInfo(details) : navigate("/");
        data ? setList(data) : setList([]);
        setLoading(false);
    };

    const paramModal = {
        function: deleteRetro,
        message: "Certeza que deseja deletar o item da retrospectiva?",
        confirmText: "Deletar",
    };

    const handleModal = (idItemRetrospective) => {
        Modal({ ...paramModal, values: [idItemRetrospective] });
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

    if(loading){
        return (
        <Loading/>)
    }

    return (
            <Container
                maxWidth="var(--max-width)"
                width="100%"
                gap="30px"
                flexDirection="column"
            >
                <Container
                    justifyContent="space-between"
                    alignItems="center"
                    gap="30px"
                    flexDirectionQuery='column'
                >
                    <Title textAlign="left">{info.title}</Title>
                    {user.role === "ROLE_MEMBER" && info.status === "IN_PROGRESS" && (
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
                    filterList={filterListRetro}
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
                                    gap="16px"
                                >
                                    <h3>{retrocard.title}</h3>
                                    {info.status === "IN_PROGRESS" && user.role === "ROLE_MEMBER" &&(
                                        <>
                                            <Button
                                                padding="none"
                                                backgroundColor="transparent"
                                                color="#ffee51"
                                                onClick={() =>
                                                    navigate(
                                                        `/item/editar/${idRetrospective}/${retrocard.idItemRetrospective}`
                                                    )
                                                }
                                            >
                                                <FaEdit />
                                            </Button>
                                            <Button
                                                padding="none"
                                                backgroundColor="transparent"
                                                color="#ff3232"
                                                onClick={() =>
                                                    handleModal(
                                                        retrocard.idItemRetrospective
                                                    )
                                                }
                                            >
                                                <FaTrashAlt />
                                            </Button>
                                        </>
                                    )}
                                </Container>
                                <p>{TypeRetro[retrocard.type]}</p>
                                <h4>Descri????o:</h4>
                                <p>{retrocard.description}</p>
                            </li>
                        ))}
                </Board>

                {list.filter(FILTER_MAP[filter]).length === 0 && (
                    <Title textAlign="center">
                        Ainda n??o existe nenhum retrocard desse tipo
                    </Title>
                )}
            </Container>
    );
};

export default RetroDetails;
