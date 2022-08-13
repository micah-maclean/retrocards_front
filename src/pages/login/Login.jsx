import { Field, Formik, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CustomForm } from "../../components/customForm/CustomForm";
import { Container } from "../../components/container/Container";
import { Bar, Paragraph, Title } from "./Login.styled";
import { Button } from "../../components/button/Button";
import * as Yup from "yup";

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
    <Container width="100%" height="100vh">
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
            <Bar height="10px" width="300px" backgroundColor="#fff"></Bar>
          </Container>
          <Paragraph textAlign="justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos esse
            repellat aperiam animi alias, provident temporibus, deleniti
            consequatur ad, nisi mollitia vitae eius omnis voluptas. At
            repudiandae vero fugit harum! Sit quidem repudiandae dignissimos
            delectus, a iure adipisci iste, repellendus minus ipsam illum ipsa,
            doloremque cupiditate reiciendis tempore? Quo explicabo reiciendis
            debitis a. Voluptates commodi praesentium, hic consequuntur vitae
            culpa.
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
            <Bar height="10px" width="300px" backgroundColor="#000"></Bar>
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
              <label htmlFor="email">Email</label>
              <Field name="email" placeholder="Email" />
              <div style={{height:'32px'}}>
              <ErrorMessage name="email" component="span" />
              </div>
              <label htmlFor="password">Senha</label>
              <Field name="password" placeholder="Senha" type="password" />
              <div style={{height:'32px'}}>
              <ErrorMessage name="password" component="span" />
              </div>
              <Button
                width="100%"
                backgroundColor="#12101a"
                margin="12px 0 20px 0"
                type="submit"
              >
                Login
              </Button>

              <Paragraph alignSelf="center">
                Não possui login? <Link to="/cadastrar">Cadastre-se aqui</Link>
              </Paragraph>
            </CustomForm>
          </Formik>
        </Container>
      </Container>
    </Container>
  );
};

export default Login;
