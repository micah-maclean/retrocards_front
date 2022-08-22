//Import React
import { useContext } from "react";
//Import router
import { Link, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    return (
        <HeaderContainer>
            <Container
                maxWidth="var(--max-width)"
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
                    alignItems="center"
                    justifyContent="space-between"
                    gap="50px"
                >
                    <span id="header-text">Bem vindo {user.name && nomeFinal(user.name)}</span>
                    {user.role === "ROLE_ADMIN" && (
                        <Button
                            id="users"
                            backgroundColor="transparent"
                            border="1px solid #fff"
                            width="100px"
                            padding="10px 0"
                            onClick={() => navigate("/users")}
                        >
                            Usuários
                        </Button>
                    )}
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
