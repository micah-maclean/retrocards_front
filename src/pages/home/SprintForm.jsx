//Import referente a dependência Formik
import { Formik } from "formik";
//Import referente ao react
import { useContext, useEffect, useState } from "react";
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
import {
    dataMask,
    formatDateToDatabase,
    formatDateToRender,
} from "../../utils/masks";
//Import referente as validações
import { validationsSprint } from "../../utils/validations";
import { Title } from "../../components/title/Title";
import { useParams } from "react-router-dom";

const SprintForm = () => {
    const {
        handleCreateSprint,
        handleNavigateToSprint,
        handleUpdateSprint,
        getSprintById,
    } = useContext(SprintContext);
    const { idSprint } = useParams();
    const [isUpdate, setIsUpdate] = useState(false);
    const [info, setInfo] = useState();

    const setup = async () => {
        const data = await getSprintById(idSprint);
        setInfo(data);
    };

    console.log(info);
    useEffect(() => {
        if (idSprint) {
            setIsUpdate(true);
            setup();
        }
    }, []);
    return (
        <>
            <Container
                backgroundColor="#12101a"
                height="calc(100vh - 100px)"
                padding="30px"
                justifyContent="center"
                alignItems="center"
            >
                <Container
                    flexDirection="column"
                    maxWidth="1120px"
                    width="100%"
                    backgroundColor="#292730"
                    borderRadius="8px"
                    padding="24px 64px"
                    paddingQuery="24px 32px"
                >
                    <Formik
                        initialValues={{
                            title: info ? info.title : "",
                            startDate: info
                                ? formatDateToRender(info.startDate)
                                : "",
                            endDate: info
                                ? formatDateToRender(info.endDate)
                                : "",
                        }}
                        validationSchema={validationsSprint}
                        enableReinitialize
                        onSubmit={(values) => {
                            const newValues = {
                                title: values.title,
                                startDate: formatDateToDatabase(
                                    values.startDate
                                ),
                                endDate: formatDateToDatabase(values.endDate),
                            };
                            isUpdate
                                ? handleUpdateSprint(idSprint, newValues)
                                : handleCreateSprint(newValues);
                        }}
                    >
                        {(props) => (
                            <CustomForm color="#fff">
                                <Title marginBottom="30px">
                                    {isUpdate
                                        ? "Editar Sprint"
                                        : "Cadastrar Sprint"}
                                </Title>
                                <Label htmlFor="title">Título</Label>
                                <Input
                                    name="title"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.title}
                                    placeholder="Digite o título da Sprint"
                                    id="title"
                                />
                                <CustomErrorMessage name={"title"} />
                                <Container
                                    flexDirectionQuery="column"
                                    gap="0 30px"
                                >
                                    <Container
                                        flexDirection="column"
                                        position="relative"
                                        width="100%"
                                    >
                                        <Label htmlFor="initialDate">
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
                                        position="relative"
                                        width="100%"
                                    >
                                        <Label htmlFor="endDate">
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
                                        id="backSprint"
                                        backgroundColor="transparent"
                                        color="#fff"
                                        border="1px solid #fff"
                                        backgroundColorHover="#5454fb"
                                        borderHover="1px solid #5454fb"
                                        colorHover="#fff"
                                        onClick={handleNavigateToSprint}
                                    >
                                        Voltar
                                    </Button>
                                    <Button
                                        id="submitSprint"
                                        backgroundColor="#fff"
                                        color="#12101a"
                                        border="1px solid #fff"
                                        backgroundColorHover="#5454fb"
                                        borderHover="1px solid #5454fb"
                                        colorHover="#fff"
                                        type="submit"
                                    >
                                        {isUpdate ? "Editar" : "Cadastrar"}
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
