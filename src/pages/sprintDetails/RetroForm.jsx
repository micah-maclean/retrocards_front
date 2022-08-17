//Import referente a dependência Formik
import { Formik } from "formik";
//Import referente ao react
import { useContext } from "react";
//Import referente as rotas
import { useParams } from "react-router-dom";
//Import referente ao context
import { RetroContext } from "../../context/RetroContext";
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
import { validationsRetrospective } from "../../utils/validations";
import { SprintContext } from "../../context/SprintContext";
import { Title } from "../../components/title/Title";

const RetroForm = () => {
    const { handleCreateRetrospective } = useContext(RetroContext);
    const { handleNavigateToSprintById } = useContext(SprintContext);
    const { idSprint } = useParams();
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
                            occurredDate: "",
                        }}
                        validationSchema={validationsRetrospective}
                        onSubmit={(values) => {
                            const newValues = {
                                idSprint: idSprint,
                                title: values.title,
                                occurredDate: formatDateToDatabase(
                                    values.occurredDate
                                ),
                            };
                            handleCreateRetrospective(newValues, idSprint);
                        }}
                    >
                        {(props) => (
                            <CustomForm color="#fff">
                                <Title marginBottom="30px">
                                    Criar Retrospectiva
                                </Title>
                                <Label htmlFor="title">Título</Label>
                                <Input
                                    name="title"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.title}
                                    placeholder="Digite o título da Retrospectiva"
                                    id="title"
                                />
                                <CustomErrorMessage name={"title"} />
                                <Container
                                    position="relative"
                                    flexDirection="column"
                                >
                                    <Label htmlFor="initialDate">
                                        Data da Retrospectiva
                                    </Label>
                                    <InputMask
                                        mask={dataMask}
                                        name="occurredDate"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.occurredDate}
                                        type="text"
                                        id="occurredDate"
                                        placeholder="Insira a data da retrospectiva"
                                        width="100%"
                                    />
                                    <Calendar top="50px" right="35px" />
                                    <CustomErrorMessage name={"occurredDate"} />
                                </Container>
                                <Container justifyContent="space-around">
                                    <Button
                                        id="backToSprintFromRetropective"
                                        backgroundColor="transparent"
                                        color="#fff"
                                        margin="12px 0 20px 0"
                                        border="1px solid #fff"
                                        backgroundColorHover="#5454fb"
                                        borderHover="1px solid #5454fb"
                                        colorHover="#fff"
                                        onClick={() =>
                                            handleNavigateToSprintById(idSprint)
                                        }
                                    >
                                        Voltar
                                    </Button>
                                    <Button
                                        id="submitRetrospective"
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
export default RetroForm;
