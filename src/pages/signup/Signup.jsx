import { Formik } from "formik";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Container } from "../../components/container/Container";
import CustomErrorMessage from "../../components/customForm/CustomErrorMessage";
import { CustomForm, Input, Label } from "../../components/customForm/CustomForm";
import { Paragraph } from "../../components/paragraph/Paragraph";
import { Title } from "../../components/title/Title";
import { AuthContext } from "../../context/AuthContext";
import { validationSignup } from "../../utils/validations";

const Signup = () => {
    const {handleSignup} = useContext(AuthContext);

  return (
    <Formik
        initialValues={{
            name: '',
            email: '',
            password: '',
        }}
        validationSchema={validationSignup}
        onSubmit={ (values) => {
            handleSignup(values);
        }}
    >
        <Container> 
            <Container backgroundColor='black' alignItems='center' color='white' width='50%' height='100vh' padding='0 144px'>
                
                <CustomForm >
                    <Title textAlign='left' textDecoration='underline 8px' marginBottom='70px'>Faça seu Cadastro</Title>                        

                    <Label htmlFor='name'>Nome*:</Label>
                    <Input  name='name' placeholder='Nome'/>
                    <CustomErrorMessage name='name'/>

                    <Label htmlFor='email'>Email*:</Label>
                    <Input name='email' placeholder='Email'/>
                    <CustomErrorMessage name='email'/>

                    <Label htmlFor='password'>Senha*:</Label>
                    <Input name='password' placeholder='Senha' type='password'/>
                    <CustomErrorMessage name='password'/>

                    <Button backgroundColor='white' color='black' width='100%'type='submit'>Registrar</Button>

                    <Paragraph textAlign='center'>Já possui login? <Link to='/login'>Faça login aqui</Link></Paragraph>
                </CustomForm>
            </Container>
            <Container backgroundColor='white' color='black' width='50%' height='100vh' padding='0 144px'  flexDirection='column' justifyContent='center'>
                    <Title textDecoration='underline 8px' marginBottom='96px'>Bem Vindo a Retrocard</Title>
                    <Paragraph textAlign='justify'>
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
        
    </Formik>
  )
}

export default Signup