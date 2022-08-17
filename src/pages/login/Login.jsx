//Import referente a dependência Formik
import { Formik } from "formik";
//Import referente a dependência de rotas
import { Link } from "react-router-dom";
//Import referente ao react
import { useContext } from "react";
//Import referente ao context
import { AuthContext } from "../../context/AuthContext";
//Import referente aos componentes
import {
    CustomForm,
    Input,
    Label,
} from "../../components/customForm/CustomForm";
import { Container } from "../../components/container/Container";
import { Button } from "../../components/button/Button";
import CustomErrorMessage from "../../components/customForm/CustomErrorMessage";
//Import referente ao styled components
import { Bar, Paragraph, Title, HalfCircle } from "./Login.styled";
//Import referente as validações
import { validationsLogin } from "../../utils/validations";

const Login = () => {
    const { handleLogin } = useContext(AuthContext);
    return (
        <Container width="100%" height="100vh" position="relative">
            <Container backgroundColor="#12101a" width="50%">
                <Container
                    flexDirection="column"
                    width="500px"
                    margin="auto"
                    alignItems="center"
                    height="400px"
                    gap="96px"
                    color="#fff"
                >
                    <Container
                        flexDirection="column"
                        alignItems="center"
                        color="#fff"
                    >
                        <Title>Bem Vindo ao Retrocard</Title>
                        <Bar
                            height="10px"
                            width="300px"
                            backgroundColor="#fff"
                        />
                    </Container>
                    <Paragraph textAlign="justify">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Eos esse repellat aperiam animi alias, provident
                        temporibus, deleniti consequatur ad, nisi mollitia vitae
                        eius omnis voluptas. At repudiandae vero fugit harum!
                        Sit quidem repudiandae dignissimos delectus, a iure
                        adipisci iste, repellendus minus ipsam illum ipsa,
                        doloremque cupiditate reiciendis tempore? Quo explicabo
                        reiciendis debitis a. Voluptates commodi praesentium,
                        hic consequuntur vitae culpa.
                    </Paragraph>
                </Container>
            </Container>
            <Container width="50%">
                <Container
                    flexDirection="column"
                    width="500px"
                    margin="auto"
                    height="400px"
                    gap="96px"
                >
                    <Container flexDirection="column">
                        <Title>Faça seu Login</Title>
                        <Bar
                            height="10px"
                            width="300px"
                            backgroundColor="#12101a"
                        />
                    </Container>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={validationsLogin}
                        onSubmit={(values, { resetForm }) => {
                            handleLogin(values);
                            resetForm({ values: "" });
                        }}
                    >
                        <CustomForm>
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
                            <CustomErrorMessage name={"email"} />
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
                            <CustomErrorMessage name={"password"} />
                            <Button
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
                                <Link to="/cadastrar">Cadastre-se aqui</Link>
                            </Paragraph>
                        </CustomForm>
                    </Formik>
                </Container>
            </Container>
            <HalfCircle
                position="absolute"
                backgroundColor="#fff"
                width="256px"
                height="156px"
                borderRadius='206px 206px 0 0'
                bottom="65px"
                left="calc(50% - 206px)"
            />
            <HalfCircle
                backgroundColor="#12101a"
                position="absolute"
                width="128px"
                height="78px"
                borderRadius='78px 78px 0 0'
                bottom="98px"
                left="calc(50% - 102px)"
            />
        </Container>
    );
};

export default Login;
