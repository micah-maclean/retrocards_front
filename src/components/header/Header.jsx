//Import React
import { useContext } from "react";
//Import router
import { Link } from "react-router-dom";
//Import context
import { AuthContext } from "../../context/AuthContext";
//Import component
import { Container } from "../container/Container";
import { Button } from "../button/Button";
//Import styled
import { HeaderContainer } from "./Header.styled";
//Import referente aos icones
import { MdOutlineLogout } from "react-icons/md";
//Import de máscara
import { nomeFinal } from "../../utils/masks";
//Import da imagem do logo
import logo from "../../assets/img/logo.png";

const Header = () => {
    const { handleLogout, user } = useContext(AuthContext);
    return (
        <HeaderContainer>
            <Container
                maxWidth="1120px"
                width="100%"
                color="#fff"
                margin="auto"
                alignItems="center"
                justifyContent="space-between"
            >
                <Link to="">
                    <img src={logo} alt="Logo Retrocards" />
                </Link>

                <Container
                    color="#fff"
                    alignItems="baseline"
                    justifyContent="space-between"
                    gap="50px"
                >
                    <span>Bem vindo {user.name && nomeFinal(user.name)}</span>
                    <Button
                        id="logout"
                        backgroundColor="transparent"
                        border="1px solid #fff"
                        width="100px"
                        padding="10px 0"
                        onClick={handleLogout}
                    >
                        <MdOutlineLogout /> Sair
                    </Button>
                </Container>
            </Container>
        </HeaderContainer>
    );
};
export default Header;
