import { Field, Formik } from "formik"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { CustomForm } from "../../components/customForm/CustomForm"
import { Container } from "../../components/container/Container"

const Login = () => {
    const {handleLogin} = useContext(AuthContext);
  return (
    <Container>
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={ (values, {resetForm}) => {
                handleLogin(values)
                resetForm({values: {password: ''}})
            }}>
                <CustomForm>
                    <label htmlFor='email'>Email</label>
                    <Field name='email' placeholder='Email'/>

                    <label htmlFor='password'>Senha</label>
                    <Field name='password' placeholder='Senha' type='password'/>  

                    <button type='submit'>Login</button>

                    <p>Não possui login? <Link to='/cadastrar'>Cadastre-se aqui</Link></p>
                </CustomForm>
        </Formik>
    </Container>
   
  )
}

export default Login