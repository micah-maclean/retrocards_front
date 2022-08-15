import { Container } from "../../components/container/Container";
import { Formik } from "formik";
import {
    CustomForm,
    Label,
    Input,
    InputMask,
} from "../../components/customForm/CustomForm";
import CustomErrorMessage from "../../components/customForm/CustomErrorMessage";
import { Button } from "../../components/button/Button";
import * as Yup from "yup";
import { Calendar, Span } from "./SprintForm.styled";
import {
    dataMask,
    formatDateToDatabase,
    ehDataValida,
    ehDataAnterior,
} from "../../utils/masks";
import { useContext } from "react";
import { SprintContext } from "../../context/SprintContext";

const validations = Yup.object({
    title: Yup.string()
        .max(60, "Insira um título de no máximo 60 caracteres")
        .min(3, "Insira um título de no mínimo 3 caracteres")
        .required("Campo Obrigatório"),
    startDate: Yup.string()
        .required("Campo Obrigatório")
        .test("Datavalida", "Data Inválida", (value) => ehDataValida(value))
        .test("Dataanterior", "Data não pode ser no passado", (value) =>
            ehDataAnterior(value)
        )
        .transform((value) => value.replace(/\D/g, ""))
        .min(8, 'Insira uma data no formato "DD/MM/YYYY"'),
    endDate: Yup.string()
        .required("Campo Obrigatório")
        .transform((value) => value.replace(/\D/g, ""))
        .min(8, "Insira uma data válida"),
});

const SprintForm = () => {
    const {handleCreateSprint} = useContext(SprintContext);
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
                    <Span>Criar Sprint</Span>
                    <Formik
                        initialValues={{
                            title: "",
                            startDate: "",
                            endDate: "",
                        }}
                        validationSchema={validations}
                        onSubmit={(values, { resetForm }) => {
                            console.log(values)
                            const newValues = {
                                title: values.title,
                                startDate: formatDateToDatabase(
                                    values.startDate
                                ),
                                endDate: formatDateToDatabase(values.endDate),
                            };
                            console.log(newValues)
                            handleCreateSprint(newValues);
                            // resetForm({
                            //     values: { startDate: "", endDate: "" },
                            // });
                        }}
                    >
                        {(props) => (
                            <CustomForm>
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
