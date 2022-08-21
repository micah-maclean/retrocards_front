//Import referente a dependência Formik
import { Formik } from "formik";
//Import referente ao context
import { useContext, useEffect, useState } from "react";
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
import {
    dataMask,
    formatDateToDatabase,
    formatDateToRender,
} from "../../utils/masks";
//Import referente as validações
import { validationsKudoBox } from "../../utils/validations";
import { KudosContext } from "../../context/KudosContext";
import { SprintContext } from "../../context/SprintContext";
import { Title } from "../../components/title/Title";

const KudoBoxForm = () => {
    const { handleCreateKudoBox, getKudoBoxDetailsById, handleUpdateKudoBox } =
        useContext(KudosContext);
    const { handleNavigateToSprintById } = useContext(SprintContext);
    const { idSprint, idKudoBox } = useParams();
    const [isUpdate, setIsUpdate] = useState(false);
    const [info, setInfo] = useState();

    const setup = async () => {
        const data = await getKudoBoxDetailsById(idKudoBox);
        setInfo(data);
    };

    useEffect(() => {
        if (idKudoBox) {
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
                            endDate: info
                                ? formatDateToRender(info.endDate)
                                : "",
                        }}
                        validationSchema={validationsKudoBox}
                        enableReinitialize
                        onSubmit={(values) => {
                            const newValues = {
                                idSprint: idSprint,
                                title: values.title,
                                endDate: formatDateToDatabase(values.endDate),
                            };

                            isUpdate
                                ? handleUpdateKudoBox(
                                      idKudoBox,
                                      idSprint,
                                      newValues
                                  )
                                : handleCreateKudoBox(newValues, idSprint);
                        }}
                    >
                        {(props) => (
                            <CustomForm color="#fff">
                                <Title marginBottom="30px">
                                    {isUpdate
                                        ? "Editar Kudo Box"
                                        : "Criar Kudo Box"}
                                </Title>
                                <Label htmlFor="title">Título</Label>
                                <Input
                                    name="title"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.title}
                                    placeholder="Digite o título do Kudo Box"
                                    id="title"
                                />
                                <CustomErrorMessage name={"title"} />
                                <Container
                                    position="relative"
                                    flexDirection="column"
                                >
                                    <Label htmlFor="initialDate">
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
                                        id="backToSprintFromKudoBox"
                                        backgroundColor="transparent"
                                        color="#fff"
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
                                        id="submitKudoBox"
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
export default KudoBoxForm;
