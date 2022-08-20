//Import referente a dependência Formik
import { Formik } from "formik";
//Import referente ao context
import { useContext, useEffect, useState } from "react";
//Import referente as rotas
import { useNavigate, useParams } from "react-router-dom";
//Import referente aos componentes
import { Container } from "../../components/container/Container";
import {
    CustomForm,
    Label,
    Input,
    Checkbox,
    Dropdown,
} from "../../components/customForm/CustomForm";
import CustomErrorMessage from "../../components/customForm/CustomErrorMessage";
import { Button } from "../../components/button/Button";
import Select from "../../components/customForm/Select";
import { Title } from "../../components/title/Title";
//Import referente as validações
import { validationsKudoCard } from "../../utils/validations";
//Import referente ao context
import { KudosContext } from "../../context/KudosContext";
import { AuthContext } from "../../context/AuthContext";

const KudoCardForm = () => {
    const { handleCreateKudoCard } = useContext(KudosContext);
    const { getUsersEmails } = useContext(AuthContext);
    const { idKudoBox } = useParams();
    const [userEmail, setUserEmail] = useState([]);
    const navigate = useNavigate();

    const setup = async () => {
        const data = await getUsersEmails();
        if (data) {
            setUserEmail(data);
        }
    };

    useEffect(() => {
        setup();
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
                            title: "",
                            description: "",
                            receiver: "",
                            anonymous: false,
                        }}
                        validationSchema={validationsKudoCard}
                        onSubmit={(values) => {
                            const newValues = {
                                idKudoBox: parseInt(idKudoBox),
                                title: values.title,
                                description: values.description,
                                anonymous: values.anonymous,
                                receiver: values.receiver,
                            };
                            handleCreateKudoCard(newValues, idKudoBox);
                        }}
                    >
                        {(props) => (
                            <CustomForm color="#fff">
                                <Title marginBottom="30px">
                                    Criar Kudo Card
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
                                <Label htmlFor="description">Descrição</Label>
                                <Input
                                    name="description"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.description}
                                    placeholder="Digite a descrição do Kudo Card"
                                    id="description"
                                />
                                <CustomErrorMessage name={"description"} />
                                <Label htmlFor="receiver">Para</Label>
                                <Container
                                    position="relative"
                                    flexDirection="column"
                                >
                                    <Select
                                        label="Escolha uma pessoa"
                                        setKey="name"
                                        values={userEmail}
                                        onChange={(v) =>
                                            props.setFieldValue("receiver", v)
                                        }
                                    />
                                    <Dropdown top="12px" right="25px" />
                                    <CustomErrorMessage name={"receiver"} />
                                </Container>
                                <Container
                                    margin="8px 0 40px 0 "
                                    alignItems="center"
                                >
                                    <Checkbox
                                        type="checkbox"
                                        name="anonymous"
                                        id="anonymous"
                                    />
                                    <Label
                                        htmlFor="anonymous"
                                        margin="8px 0 0 0"
                                    >
                                        Enviar Anônimo
                                    </Label>
                                </Container>
                                <Container justifyContent="space-around">
                                    <Button
                                        id="backToKudoBoxFromKudoCard"
                                        backgroundColor="transparent"
                                        color="#fff"
                                        margin="12px 0 20px 0"
                                        border="1px solid #fff"
                                        backgroundColorHover="#5454fb"
                                        borderHover="1px solid #5454fb"
                                        colorHover="#fff"
                                        onClick={() =>
                                            navigate(`/kudobox/${idKudoBox}`)
                                        }
                                    >
                                        Voltar
                                    </Button>
                                    <Button
                                        id="createKudoCard"
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
export default KudoCardForm;
