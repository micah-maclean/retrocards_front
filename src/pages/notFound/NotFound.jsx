//Import router
import { useNavigate } from "react-router-dom";
//Import component
import { Container } from "../../components/container/Container";
import { Button } from "../../components/button/Button";
//Import styled
import { ContainerText } from "./NotFount.styled";
//Import imagem
import Astronauta from "../../assets/img/astronauta.png";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Container
            maxWidth="var(--max-width)"
            height="100vh"
            alignItems="center"
            justifyContent="space-around"
            margin="auto"
        >
            <img src={Astronauta} alt="Astronauta" />
            <ContainerText
                width="515px"
                height="400px"
                flexDirection="column"
                justifyContent="space-around"
            >
                <h1>404</h1>
                <span>Oh não! Você está perdido.</span>
                <p>
                    A página que você tentou acessar não existe. Como você
                    chegou aqui é um mistério. Mas você pode clicar no botão
                    abaixo para retornar para a página principal.
                </p>
                <Button
                    id="backToHomeFromNotFound"
                    backgroundColor="#12101a"
                    onClick={() => navigate("/")}
                >
                    Home
                </Button>
            </ContainerText>
        </Container>
    );
};
export default NotFound;
