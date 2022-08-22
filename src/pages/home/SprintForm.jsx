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
import { Loading } from "../../components/loading/Loading";

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
    const [loading, setLoading] = useState(true);

    const setup = async () => {
        // setLoading(true);
        if (idSprint) {
            const data = await getSprintById(idSprint);
            setInfo(data);
            setIsUpdate(true);
        }
        // setLoading(false);
    };

    useEffect(() => {
            setup();        
    }, []);

    if(loading){
        return <Loading/>
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
            margin='auto 0'
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
                        <CustomErrorMessage name={"title"} id="title-error"/>
                        <Container flexDirectionQuery="column" gap="0 30px" >
                            <Container flexDirection="column" position="relative" width="100%" >
                                <Label htmlFor="initialDate">
                                    Data de Início
                                </Label>
                                <InputMask
                                    mask={dataMask}
                                    name="startDate"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.startDate}
                                    id="startDate"
                                    placeholder="Insira a data inicial"
                                />
                                <Calendar top="50px" right="15px" />
                                <CustomErrorMessage name={"startDate"} id="startDate-error"/>
                            </Container>
                            <Container flexDirection="column" position="relative" width="100%" >
                                <Label htmlFor="endDate">
                                    Data de Final
                                </Label>
                                <InputMask
                                    mask={dataMask}
                                    name="endDate"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.endDate}
                                    id="endDate"
                                    placeholder="Insira a data final"
                                />
                                <Calendar top="50px" right="15px" />
                                <CustomErrorMessage name={"endDate"} id="endDate-error"/>
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
    );
};

export default SprintForm;