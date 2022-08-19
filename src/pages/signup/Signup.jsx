import { Formik } from "formik";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Container } from "../../components/container/Container";
import CustomErrorMessage from "../../components/customForm/CustomErrorMessage";
import {
    CustomForm,
    Input,
    Label,
} from "../../components/customForm/CustomForm";
import { Paragraph } from "../../components/paragraph/Paragraph";
import { Title } from "../../components/title/Title";
import { AuthContext } from "../../context/AuthContext";
import { validationSignup } from "../../utils/validations";
import { Bar } from "../login/Login.styled";

const Signup = () => {
    const { handleSignup } = useContext(AuthContext);

    return (
        <Container height="100vh">
            <Container
                backgroundColor="#fff"
                alignItems="center"
                color="#12101a"
                width="50%"
                justifyContent='center'
                padding='0 30px'
            >
                <Container flexDirection='column' maxWidth='500px'>
                    <Title textDecoration="underline 8px" marginBottom="96px">
                        Bem Vindo a Retrocard
                    </Title>
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
            <Container
                backgroundColor="#12101a"
                color="#fff"
                width="50%"
                padding="0 32px"
                flexDirection="column"
                justifyContent="center"
                alignItems='center'
            >
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                    }}
                    validationSchema={validationSignup}
                    onSubmit={(values) => {
                        handleSignup(values);
                    }}
                >
                    <CustomForm maxWidth='500px'>
                        <Title textAlign='left' marginBottom="56px" textDecoration="underline 8px">Faça seu Cadastro</Title>

                        <Label htmlFor="name">Nome*:</Label>
                        <Input name="name" placeholder="Nome" />
                        <CustomErrorMessage name="name" />

                        <Label htmlFor="email">Email*:</Label>
                        <Input name="email" placeholder="Email" />
                        <CustomErrorMessage name="email" />

                        <Label htmlFor="password">Senha*:</Label>
                        <Input
                            name="password"
                            placeholder="Senha"
                            type="password"
                        />
                        <CustomErrorMessage name="password" />

                        <Button
                            id="createLogin"
                            backgroundColor="white"
                            color="black"
                            width="100%"
                            type="submit"
                            margin='0 0 30px 0'
                        >
                            Registrar
                        </Button>

                        <Paragraph textAlign="center">
                            Já possui login?{" "}
                            <Link to="/login">Faça login aqui</Link>
                        </Paragraph>
                    </CustomForm>
                </Formik>
            </Container>
        </Container>
    );
};

export default Signup;
