//Import referente a dependência Formik
import { Formik } from "formik";
//Import referente ao react
import { useContext, useEffect, useState } from "react";
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
import {
    dataMask,
    formatDateToDatabase,
    formatDateToRender,
} from "../../utils/masks";
//Import referente as validações
import { validationsRetrospective } from "../../utils/validations";
import { SprintContext } from "../../context/SprintContext";
import { Title } from "../../components/title/Title";
import { Loading } from "../../components/loading/Loading";

const RetroForm = () => {
    const {
        handleCreateRetrospective,
        getRetroDetailsById,
        handleUpdateRetrospective,
    } = useContext(RetroContext);
    const { handleNavigateToSprintById, getSprintById } =
        useContext(SprintContext);
    const { idSprint, idRetrospective } = useParams();
    const [isUpdate, setIsUpdate] = useState(false);
    const [info, setInfo] = useState();
    const [sprintDetail, setSprintDetail] = useState();
    const [loading, setLoading] = useState(true)

    const setup = async () => {
        setLoading(true)
        const detail = await getSprintById(idSprint);
        setSprintDetail(detail);
        if (idRetrospective) {
            const data = await getRetroDetailsById(idRetrospective);
            setInfo(data);
            setIsUpdate(true);
        }
        setLoading(false)
    };
    useEffect(() => {
        setup();
    }, []);

    if (loading) {
        return (
            <Container
                alignItems="center"
                justifyContent="center"
                backgroundColor="#12101a"
                height="100vh"
            >
                <Loading />
            </Container>
        );
    }

    return (
        <Container
            flexDirection="column"
            maxWidth="var(--max-width)"
            width="100%"
            backgroundColor="var(--dark-grey)"
            borderRadius="8px"
            padding="24px 64px"
            paddingQuery="24px 32px"
        >
            <Formik
                initialValues={{
                    title: info ? info.title : "",
                    occurredDate: info
                        ? formatDateToRender(info.occurredDate)
                        : "",
                    startDateSprint: sprintDetail && sprintDetail.startDate,
                    endDateSprint: sprintDetail && sprintDetail.endDate,
                }}
                enableReinitialize
                validationSchema={validationsRetrospective}
                onSubmit={(values) => {
                    const newValues = {
                        idSprint: idSprint,
                        title: values.title,
                        occurredDate: formatDateToDatabase(values.occurredDate),
                    };

                    isUpdate ? handleUpdateRetrospective( idRetrospective, idSprint, newValues)
                        : handleCreateRetrospective( newValues, idSprint);
                }}
            >
                {(props) => (
                    <CustomForm color="#fff">
                        <Title marginBottom="30px">
                            {isUpdate
                                ? "Editar Retrospectiva"
                                : "Criar Retrospectiva"}
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
                        <CustomErrorMessage name={"title"} id='title-error'/>
                        <Container position="relative" flexDirection="column">
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
                            <CustomErrorMessage name={"occurredDate"} id="occurredDate-error" />
                        </Container>
                        <Container justifyContent="space-around">
                            <Button
                                id="backToSprintFromRetropective"
                                backgroundColor="transparent"
                                color="#fff"
                                border="1px solid #fff"
                                backgroundColorHover="#5454fb"
                                borderHover="1px solid #5454fb"
                                colorHover="#fff"
                                onClick={() => handleNavigateToSprintById(idSprint)}
                            >
                                Voltar
                            </Button>
                            <Button
                                id="submitRetrospective"
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
    );
};
export default RetroForm;
