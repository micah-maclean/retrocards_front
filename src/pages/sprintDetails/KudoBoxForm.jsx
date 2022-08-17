//Import referente a dependência Formik
import { Formik } from "formik";
//Import referente ao context
import { useContext } from "react";
//Import referente as rotas
import { useParams } from "react-router-dom";
//Import referente aos componentes
import { Container } from "../../components/container/Container";
import {
    CustomForm,
    Label,
    Input,
    InputMask,
    Calendar,
} from "../../components/customForm/CustomForm";
import CustomErrorMessage from "../../components/customForm/CustomErrorMessage";
import { Button } from "../../components/button/Button";
// Import referente as máscaras
import { dataMask, formatDateToDatabase } from "../../utils/masks";
//Import referente as validações
import { validationsKudoBox } from "../../utils/validations";
import { KudosContext } from "../../context/KudosContext";
import { SprintContext } from "../../context/SprintContext";



const KudoBoxForm = () => {
    const {handleCreateKudoBox} = useContext(KudosContext)
    const {handleNavigateToSprintById} = useContext(SprintContext)
    const {idSprint} = useParams()


    return (
        <>
            <Container backgroundColor="#12101a" height="calc(100vh - 100px)">
                <Container
                    flexDirection="column"
                    maxWidth="1120px"
                    width="100%"
                    margin="auto"
                    backgroundColor="#292730"
                    borderRadius="5px"
                    padding="24px 64px"
                >
                    <Formik
                        initialValues={{
                            title: "",
                            endDate: "",
                        }}
                        validationSchema={validationsKudoBox}
                        onSubmit={(values, { resetForm }) => {

                            const newValues = {
                                idSprint: idSprint,
                                title: values.title,
                                endDate: formatDateToDatabase(values.endDate),
                            };
                            console.log(newValues)
                            handleCreateKudoBox(newValues, idSprint);
                        }}
                    >
                        {(props) => (
                            <CustomForm>
                                <h1>Criar Kudo Box</h1>
                                <Label color="#fff" htmlFor="title">
                                    Título
                                </Label>
                                <Input
                                    name="title"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.title}
                                    placeholder="Digite o título do Kudo Box"
                                    id="title"
                                />
                                <CustomErrorMessage name={"title"} />
                                <Container position="relative" flexDirection='column'>
                                    <Label color="#fff" htmlFor="initialDate">
                                        Data de Encerramento do Kudo Box
                                    </Label>
                                    <InputMask
                                        mask={dataMask}
                                        name="endDate"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.endDate}
                                        type="text"
                                        id="endDate"
                                        placeholder="Insira a data de encerramento do Kudo Box"
                                        width="100%"
                                    />
                                    <Calendar top="50px" right="35px" />
                                    <CustomErrorMessage name={"endDate"} />
                                </Container>                                
                                <Container justifyContent="space-around">
                                    <Button
                                        backgroundColor="transparent"
                                        color="#fff"
                                        margin="12px 0 20px 0"
                                        border="1px solid #fff"
                                        backgroundColorHover="#5454fb"
                                        borderHover="1px solid #5454fb"
                                        colorHover="#fff"
                                        onClick={() => handleNavigateToSprintById(idSprint)}
                                    >
                                        Voltar
                                    </Button>
                                    <Button
                                        backgroundColor="#fff"
                                        color="#12101a"
                                        margin="12px 0 20px 0"
                                        border="1px solid #fff"
                                        backgroundColorHover="#5454fb"
                                        borderHover="1px solid #5454fb"
                                        colorHover="#fff"
                                        type="submit"
                                    >
                                        Cadastrar
                                    </Button>
                                </Container>
                            </CustomForm>
                        )}
                    </Formik>
                </Container>
            </Container>
        </>
    );
};
export default KudoBoxForm;
