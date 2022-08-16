import { Container } from "../container/Container";
import { HeaderContainer } from "./Header.styled";
import { Button } from "../button/Button";
import { BsMoon } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { nomeFinal } from "../../utils/masks";
import { Link } from "react-router-dom";
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
                padding="10px 0"
                alignItems="center"
                justifyContent="space-between"
            >
                <Link to="">
                    <img src={logo} alt="Logo Retrocards" />
                </Link>

                <Container color="#fff"
                    alignItems="baseline"
                    justifyContent="space-between"
                    width="30%"
                >
                    <span>Bem vindo {user.name && nomeFinal(user.name)}</span>
                    <BsMoon />
                    <Button
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
