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
import { HalfCircle } from "../login/Login.styled";

const Signup = () => {
    const { handleSignup } = useContext(AuthContext);

    return (
        <Container height="100vh">
            <Container
                backgroundColor="#fff"
                alignItems="center"
                color="#12101a"
                width="50%"
                justifyContent="center"
                padding="0 30px"
                displayQuery="none"
            >
                <Container flexDirection="column" maxWidth="500px">
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
                alignItems="center"
                widthQuery="100%"
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
                    <CustomForm maxwidth="500px">
                        <Title textAlign="left" marginBottom="56px" textDecoration="underline 8px">
                            Faça seu Cadastro
                        </Title>

                        <Label htmlFor="name">Nome*:</Label>
                        <Input name="name" placeholder="Nome" id="name" />
                        <CustomErrorMessage name="name" id="name-error" />

                        <Label htmlFor="email">Email*:</Label>
                        <Input name="email" placeholder="Email" id="email" />
                        <CustomErrorMessage name="email" id="email-error" />

                        <Label htmlFor="password">Senha*:</Label>
                        <Input name="password" placeholder="Senha" type="password" id="password"
                        />
                        <CustomErrorMessage name="password" id="password-error"/>

                        <Button
                            id="createLogin"
                            backgroundColor="#fff"
                            color="#12101a"
                            border="1px solid #fff"
                            backgroundColorHover="#5454fb"
                            borderHover="1px solid #5454fb"
                            colorHover="#fff"
                            width="100%"
                            type="submit"
                            margin="0 0 30px 0"
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
            <HalfCircle
                position="absolute"
                backgroundColor="#12101a"
                width="256px"
                height="156px"
                borderRadius="156px 156px 0 0"
                bottom="65px"
                left="calc(50% - 206px)"
            />
            <HalfCircle
                backgroundColor="#fff"
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

export default Signup;