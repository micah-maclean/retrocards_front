import { Container } from "../container/Container";
import { HeaderContainer } from "./Header.styled";
import { Button } from "../button/Button";
import { BsMoon } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";

const Header = () => {
    return (
        <HeaderContainer>
            <Container
                maxWidth="1120px"
                width='100%'
                color="#fff"
                margin="auto"
                padding="10px 0"
                alignItems="center"
                justifyContent="space-between"
            >
                <span>Retrocard</span>
                <Container alignItems="baseline" justifyContent='space-between' width='30%'>
                    <span>Bem vindo usuário</span>
                    <BsMoon />
                    <Button backgroundColor='transparent' border='1px solid #fff' width='100px' padding='10px 0'>
                        <MdOutlineLogout /> Sair
                    </Button>
                </Container>
            </Container>
        </HeaderContainer>
    );
};
export default Header;
