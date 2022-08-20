//Import react
import { useContext, useState, useEffect } from "react";
//Import router
import { useNavigate, useParams } from "react-router-dom";
//Import context
import { KudosContext } from "../../context/KudosContext";
import { AuthContext } from "../../context/AuthContext";
//Import component
import { Title } from "../../components/title/Title";
import { Board } from "../../components/board/Board";
import { Container } from "../../components/container/Container";
import { Button } from "../../components/button/Button";
import Pagination from "../../components/pagination/Pagination";
//Import icons
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../components/modal/Modal.css";

const KudoboxDetails = () => {
    const { getKudoboxById, deleteKudoCard, getKudoBoxDetailsById } =
        useContext(KudosContext);
    const { user, reducerValue } = useContext(AuthContext);
    const { idKudobox } = useParams();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [list, setList] = useState([]);
    const [infoKudoBox, setInfoKudoBox] = useState({});
    const pageSize = 10;

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
                                    deleteKudoCard(id);
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
        const data = await getKudoboxById(idKudobox, currentPage, pageSize);
        const info = await getKudoBoxDetailsById(idKudobox);
        setInfoKudoBox(info);
        if (data) {
            setTotalCount(data.totalElements);
            setTotalPages(data.totalPages);
            setList(data.content);
        } else {
            setTotalCount(0);
            setTotalPages(0);
            setList([]);
        }
    };

    useEffect(() => {
        setup();
    }, [currentPage, reducerValue]);

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
                flexDirection="column"
                padding="30px 0"
            >
                <Container
                    justifyContent="space-between"
                    alignItems="center"
                    margin="0px 0px 30px 0"
                >
                    <Title>{infoKudoBox.title}</Title>
                    {user.role === "ROLE_MEMBER" &&
                        infoKudoBox.status === "IN_PROGRESS" && (
                            <Button
                                id="createKudocard"
                                backgroundColor="#fff"
                                color="black"
                                padding="8px 16px"
                                height="fit-content"
                                onClick={() =>
                                    navigate(
                                        `/kudo-card/cadastrar/${idKudobox}`
                                    )
                                }
                            >
                                + Criar Kudocard
                            </Button>
                        )}
                </Container>
                <Board>
                    {list.length > 0 &&
                        list.map((kudocard) => (
                            <li key={kudocard.idKudoCard}>
                                <Container
                                    alignItems="center"
                                    justifyContent="space-between"
                                    margin="0 0 24px 0"
                                >
                                    <h3>{kudocard.title}</h3>
                                    {user.idUser === kudocard.idCreator &&
                                        infoKudoBox.status ===
                                            "IN_PROGRESS" && (
                                            <Button
                                                padding="none"
                                                backgroundColor="transparent"
                                                onClick={() =>
                                                    handleDeleteModal(
                                                        kudocard.idKudoCard
                                                    )
                                                }
                                            >
                                                <FaTrashAlt />
                                            </Button>
                                        )}
                                </Container>
                                <p>{kudocard.createDate}</p>
                                <p>
                                    <span>De:</span> {kudocard.sender}
                                </p>
                                <p>
                                    <span>Para:</span> {kudocard.receiver}
                                </p>
                                <p>
                                    <span>Descrição:</span>
                                    {kudocard.description}
                                </p>
                            </li>
                        ))}
                </Board>

                {list.length === 0 && (
                    <Title textAlign="center">
                        Ainda não existe nenhum kudocard
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

export default KudoboxDetails;
