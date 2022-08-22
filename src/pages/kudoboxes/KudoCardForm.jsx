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
import { Loading } from "../../components/loading/Loading";

const KudoCardForm = () => {
    const { handleCreateKudoCard, getKudoCardById, handleUpdateKudoCard } = useContext(KudosContext);
    const { getUsersEmails, user } = useContext(AuthContext);
    const { idKudoBox, idKudoCard } = useParams();
    const [userEmail, setUserEmail] = useState([]);
    const [infoCard, setInfoCard] = useState()
    const [isUpdate, setIsUpdate] = useState(false)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    const setup = async () => {
        setLoading(true)
        const data = await getUsersEmails();
        if (data) {
            setUserEmail(data);
        }
        if(idKudoCard){
            const info = await getKudoCardById(idKudoCard)
            setInfoCard(info)
            setIsUpdate(true)
        }
        setLoading(false)
    };

    useEffect(() => {
        setup();
    }, []);

    if (loading) {
        return <Loading/>
    }

    return (
        <Container
            flexDirection="column"
            maxWidth="var(--max-width)"
            width="100%"
            backgroundColor="var(--dark-grey)"
            borderRadius="var(--border-radius)"
            padding="24px 64px"
            paddingQuery="24px 32px"
            margin='auto 0'
        >
            <Formik
                initialValues={{
                    title: infoCard && infoCard.title ? infoCard.title : '',
                    description: infoCard && infoCard.description ? infoCard.description : '',
                    receiver: "",
                    anonymous: false,
                }}
                validationSchema={validationsKudoCard}
                        enableReinitialize
                onSubmit={(values) => {
                    const newValues = {
                        idKudoBox: parseInt(idKudoBox),
                        title: values.title,
                        description: values.description,
                        anonymous: values.anonymous,
                        receiver: values.receiver,
                    };
                    isUpdate ? handleUpdateKudoCard(idKudoCard, idKudoBox, newValues) : handleCreateKudoCard(newValues, idKudoBox);
                }}
            >
                {(props) => (
                    <CustomForm color="#fff">
                        <Title marginBottom="30px">
                            {isUpdate ? 'Atualizar Kudo Card' : 'Criar Kudo Card'}
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
                        <CustomErrorMessage name={"title"} id="title-error"/>
                        <Label htmlFor="description">Descrição</Label>
                        <Input
                            name="description"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.description}
                            placeholder="Digite a descrição do Kudo Card"
                            id="description"
                        />
                        <CustomErrorMessage name={"description"} id="description-error"/>
                        <Label htmlFor="receiver">Para</Label>
                        <Container position="relative" flexDirection="column" >
                            <Select
                                label="Escolha uma pessoa"
                                setKey="name"
                                values={userEmail.filter(
                                    (receiver) =>
                                        receiver.email !== user.email 
                                    )}
                                onChange={(v) =>
                                    props.setFieldValue("receiver", v)
                                }
                            />
                            <Dropdown top="12px" right="25px" />
                            <CustomErrorMessage name={"receiver"} id="receiver-error"/>
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
                                {isUpdate ? 'Atualizar' : 'Cadastrar'}
                            </Button>
                        </Container>
                    </CustomForm>
                )}
            </Formik>
        </Container>
    );
};
export default KudoCardForm;
