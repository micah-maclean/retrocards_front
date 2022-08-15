import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
    CustomForm,
    Input,
    Label,
} from "../../components/customForm/CustomForm";
import { Container } from "../../components/container/Container";
import { Bar, Paragraph, Title, HalfCircle } from "./Login.styled";
import { Button } from "../../components/button/Button";
import * as Yup from "yup";
import CustomErrorMessage from "../../components/customForm/CustomErrorMessage";

const validations = Yup.object({
    email: Yup.string()
        .email("Insira um email válido")
        .required("Campo Obrigatório"),
    password: Yup.string()
        .min(3, "A senha precisa de pelo menos 3 caracteres")
        .required("Campo Obrigatório"),
});

const Login = () => {
    const { handleLogin } = useContext(AuthContext);
    return (
        <Container width="100%" height="100vh" position="relative">
            <Container backgroundColor="#12101a" width="50%" color="#fff">
                <Container
                    flexDirection="column"
                    width="500px"
                    margin="auto"
                    alignItems="center"
                    height="400px"
                    gap="96px"
                >
                    <Container flexDirection="column" alignItems="center">
                        <Title color="#fff">Bem Vindo ao Retrocard</Title>
                        <Bar
                            height="10px"
                            width="300px"
                            backgroundColor="#fff"
                        ></Bar>
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
                            backgroundColor="#000"
                        ></Bar>
                    </Container>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={validations}
                        onSubmit={(values, { resetForm }) => {
                            handleLogin(values);
                            resetForm({ values: { password: "" } });
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
                height="256px"
                bottom="20px"
                left="calc(50% - 256px)"
            />
            <HalfCircle
                backgroundColor="#12101a"
                position="absolute"
                width="128px"
                height="128px"
                bottom="84px"
                left="calc(50% - 128px)"
            />
        </Container>
    );
};

export default Login;
