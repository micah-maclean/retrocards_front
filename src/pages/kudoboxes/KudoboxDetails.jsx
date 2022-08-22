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
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { formatDateToRenderWithHour } from "../../utils/masks";
import { Modal } from "../../components/modal/Modal";
import { Loading } from "../../components/loading/Loading";

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
    const [loading, setLoading] = useState(true)

    const paramModal = {
        delete: {
            function: deleteKudoCard,
            message: "Certeza que deseja deletar o Kudo Card?",
            confirmText: "Deletar",
        },
    };

    const deleteKudoCardModal = (idKudoCard) => {
        Modal({
            ...paramModal.delete,
            values: [idKudoCard],
        });
    };

    const setup = async () => {
        setLoading(true)
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
        setLoading(false)
    };

    useEffect(() => {
        setup();
    }, [currentPage, reducerValue]);

    if (loading) {
        return (
            <Loading/>
        );
    }

    return (
        <Container
            maxWidth="var(--max-width)"
            width="100%"
            flexDirection="column"
            gap="30px"
        >
            <Container justifyContent="space-between" alignItems="center">
                <Title textAlign="left">{infoKudoBox.title}</Title>
                {user.role === "ROLE_MEMBER" &&
                    infoKudoBox.status === "IN_PROGRESS" && (
                        <Button
                            id="createKudocard"
                            backgroundColor="#fff"
                            color="#12101a"
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
                                        <>
                                            <Button
                                                padding="none"
                                                backgroundColor="transparent"
                                                onClick={() =>
                                                        navigate(`/kudo-card/editar/${idKudobox}/${kudocard.idKudoCard}`)
                                                        }
                                            >
                                                <FaEdit />
                                            </Button>
                                            <Button
                                                padding="none"
                                                backgroundColor="transparent"
                                                onClick={() =>
                                                    deleteKudoCardModal(
                                                        kudocard.idKudoCard
                                                    )
                                                }
                                            >
                                                <FaTrashAlt />
                                            </Button>
                                        </>
                                    )}
                            </Container>
                            <p>
                                {formatDateToRenderWithHour(
                                    kudocard.createDate
                                )}
                            </p>
                            <p>
                                <span>De:</span> {kudocard.sender}
                            </p>
                            <p>
                                <span>Para:</span> {kudocard.receiver}
                            </p>
                            <h4>Descrição:</h4>
                            <p>                                
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
    );
};

export default KudoboxDetails;
