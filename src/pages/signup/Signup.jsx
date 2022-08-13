import { Formik, Field } from "formik";
import { Link } from "react-router-dom";
import { CustomForm } from "../../components/customForm/CustomForm";

const Signup = () => {
  return (
    <Formik
        initialValues={{
            name: '',
            type: '',
            email: '',
            password: '',
        }}
        onSubmit={ (values, {resetForm}) => {
            console.log(values)
        }}
    >
        <CustomForm>
            <label htmlFor='name'>Nome*:</label>
            <Field name='name' placeholder='Nome'/>

            <label htmlFor='type'>Tipo de usuário*:</label>
            <Field name='type' as='select'>
                <option value='facilitador'>Facilitador</option>
                <option value='membro'>Membro</option>
            </Field>

            <label htmlFor='email'>Email*:</label>
            <Field name='email' placeholder='Email'/>

            <label htmlFor='password'>Senha*:</label>
            <Field name='password' placeholder='Senha' type='password'/>

            <button type='submit'>Registrar</button>

            <p>já possui login? <Link to='/login'>Faça login aqui</Link></p>
        </CustomForm>
    </Formik>
  )
}

export default Signup