//Import referente a dependência Formik
import { Formik } from "formik";
//Import referente a dependência de rotas
import { Link, Navigate, useNavigate } from "react-router-dom";
//Import referente ao react
import { useContext } from "react";
//Import referente ao context
import { AuthContext } from "../../context/AuthContext";
//Import referente aos componentes
import { CustomForm, Input, Label} from "../../components/customForm/CustomForm";
import { Container } from "../../components/container/Container";
import { Button } from "../../components/button/Button";
import CustomErrorMessage from "../../components/customForm/CustomErrorMessage";
//Import referente ao styled components
import { HalfCircle } from "./Login.styled";
//Import referente as validações
import { validationsLogin } from "../../utils/validations";
import { Title } from "../../components/title/Title";
import { Paragraph } from "../../components/paragraph/Paragraph";

const Login = () => {
    const { handleLogin } = useContext(AuthContext);

    return (
        <Container width="100%" height="100vh" position="relative">
            <Container
                backgroundColor="#12101a"
                width="50%"
                height="100%"
                color="#fff"
                displayQuery="none"
            >
                <Container
                    flexDirection="column"
                    margin="auto"
                    alignItems="center"
                    padding="0 32px"
                    justifyContent="center"
                    gap="96px"
                >
                    <Container maxWidth="500px" flexDirection="column">
                        <Title
                            marginBottom="56px"
                            textDecoration="underline 8px"
                            lineHeight="64px"
                        >
                            Bem Vindo ao Retrocard
                        </Title>
                        <Paragraph textAlign="justify">
                        Um software para equipes que desejam gerenciar seus projetos e atingir metas de maneira mais fácil, inteligente e rápida. É por isso que agências de criação, marketing, web design, empresas de software, departamentos e freelancers de todo o mundo confiam nele para melhorar seu desempenho.
                        </Paragraph>
                    </Container>
                </Container>
            </Container>
            <Container
                width="50%"
                alignItems="center"
                justifyContent="center"
                padding="0 30px"
                widthQuery="100%"
            >
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={validationsLogin}
                    onSubmit={(values) => {
                        handleLogin(values);
                    }}
                >
                    <CustomForm maxwidth="500px">
                        <Title
                            textAlign="left"
                            marginBottom="56px"
                            textDecoration="underline 8px"
                            lineHeight="64px"
                        >
                            Faça seu Login
                        </Title>

                        <Label htmlFor="email">Email</Label>
                        <Input
                            background="#fff"
                            color="#000"
                            border="1px solid #000"
                            outline="#000 solid 1px"
                            name="email"
                            placeholder="Email"
                            id="email"
                        />
                        <CustomErrorMessage name={"email"} id="email-error" />
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            background="#fff"
                            color="#000"
                            border="1px solid #000"
                            outline="#000 solid 1px"
                            name="password"
                            placeholder="Senha"
                            type="password"
                            id="password"
                        />
                        <CustomErrorMessage
                            name={"password"}
                            id="password-error"
                        />
                        <Button
                            id="login"
                            width="100%"
                            backgroundColor="#12101a"
                            border="1px solid #12101a"
                            color="#fff"
                            margin="12px 0 20px 0"
                            backgroundColorHover="#5454fb"
                            borderHover="1px solid #5454fb"
                            type="submit"
                        >
                            Login
                        </Button>

                        <Paragraph alignSelf="center">
                            Não possui login?{" "}
                            <Link to="/cadastrar" id="sign-up">
                                Cadastre-se aqui
                            </Link>
                        </Paragraph>
                    </CustomForm>
                </Formik>
            </Container>
            <HalfCircle
                position="absolute"
                backgroundColor="#fff"
                width="256px"
                height="156px"
                borderRadius="156px 156px 0 0"
                bottom="65px"
                left="calc(50% - 206px)"
            />
            <HalfCircle
                backgroundColor="#12101a"
                position="absolute"
                width="128px"
                height="78px"
                borderRadius="78px 78px 0 0"
                bottom="98px"
                left="calc(50% - 102px)"
            />
        </Container>
    );
};

export default Login;