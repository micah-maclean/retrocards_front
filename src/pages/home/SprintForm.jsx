//Import referente a dependência Formik
import { Formik } from "formik";
//Import referente ao react
import { useContext } from "react";
//Import referente ao context
import { SprintContext } from "../../context/SprintContext";
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
import { validationsSprint } from "../../utils/validations";

const SprintForm = () => {
    const { handleCreateSprint, handleNavigateToSprint } = useContext(SprintContext);
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
                            startDate: "",
                            endDate: "",
                        }}
                        validationSchema={validationsSprint}
                        onSubmit={(values, { resetForm }) => {
                            console.log(values);
                            const newValues = {
                                title: values.title,
                                startDate: formatDateToDatabase(
                                    values.startDate
                                ),
                                endDate: formatDateToDatabase(values.endDate),
                            };
                            console.log(newValues);
                            handleCreateSprint(newValues);
                            // resetForm({
                            //     values: { startDate: "", endDate: "" },
                            // });
                        }}
                    >
                        {(props) => (
                            <CustomForm>
                                <h1>Criar Sprint</h1>
                                <Label color="#fff" htmlFor="title">
                                    Título
                                </Label>
                                <Input
                                    name="title"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.title}
                                    placeholder="Digite o título da Sprint"
                                    id="title"
                                />
                                <CustomErrorMessage name={"title"} />
                                <Container justifyContent="space-between">
                                    <Container
                                        flexDirection="column"
                                        width="45%"
                                        position="relative"
                                    >
                                        <Label
                                            color="#fff"
                                            htmlFor="initialDate"
                                        >
                                            Data de Início
                                        </Label>
                                        <InputMask
                                            mask={dataMask}
                                            name="startDate"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.startDate}
                                            type="text"
                                            id="startDate"
                                            placeholder="Insira a data inicial"
                                        />
                                        <Calendar top="50px" right="15px" />
                                        <CustomErrorMessage
                                            name={"startDate"}
                                        />
                                    </Container>
                                    <Container
                                        flexDirection="column"
                                        width="45%"
                                        position="relative"
                                    >
                                        <Label color="#fff" htmlFor="endDate">
                                            Data de Final
                                        </Label>
                                        <InputMask
                                            mask={dataMask}
                                            name="endDate"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.endDate}
                                            type="text"
                                            id="endDate"
                                            placeholder="Insira a data final"
                                        />
                                        <Calendar top="50px" right="15px" />
                                        <CustomErrorMessage name={"endDate"} />
                                    </Container>
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
                                        onClick={handleNavigateToSprint}
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
export default SprintForm;
