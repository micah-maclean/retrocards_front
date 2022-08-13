import { Field, Form, Formik } from "formik"

const Login = () => {
  return (
   <Formik
    initialValues={{
        login: '',
        password: ''
    }}
    onSubmit={ (values, {resetForm}) => {
        console.log(values)
        resetForm({values: {password: ''}})
    }}>
        <Form>
            <label htmlFor='login'>Login</label>
            <Field name='login' placeholder='login'/>

            <label htmlFor='password'>Senha</label>
            <Field name='password' placeholder='Senha' type='password'/>  

            <button type='submit'>Login</button>
        </Form>
   </Formik>
  )
}

export default Login