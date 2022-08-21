//Import react
import { useState, useEffect, useContext } from "react";
//Import context
import { AuthContext } from "../../context/AuthContext";
//Import components
import { Container } from "../../components/container/Container";
import * as Yup from "yup";
import {
    CustomForm,
    Label,
    Dropdown,
    Plus,
} from "../../components/customForm/CustomForm";
import { Title } from "../../components/title/Title";
import { Button } from "../../components/button/Button";
import CustomErrorMessage from "../../components/customForm/CustomErrorMessage";
import Select from "../../components/customForm/Select";
import { Formik } from "formik";
import Table from "../../components/table/Table";
import { RetroContext } from "../../context/RetroContext";
import { useNavigate, useParams } from "react-router-dom";

const SendEmailForm = () => {
    const { getUsersEmails } = useContext(AuthContext);
    const { sendEmail } = useContext(RetroContext);
    const { idRetrospective, idSprint } = useParams();
    const [userEmail, setUserEmail] = useState([]);
    const [receivers, setReceivers] = useState([]);
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
        <Container
            backgroundColor="#12101a"
            minHeight="calc(100vh - 100px)"
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
                        receiver: "",
                    }}
                    validationSchema={Yup.object({
                        receiver: Yup.mixed().test(
                            "Arrayvazio",
                            "Escolha ao menos uma pessoa",
                            () => receivers.length > 0
                        ),
                    })}
                    onSubmit={() => {
                        const newValues = {
                            receiver: receivers.map((value) => value.email),
                        };
                        sendEmail(newValues, idRetrospective, idSprint);
                    }}
                >
                    {(props) => (
                        <CustomForm color="#fff">
                            <Title marginBottom="30px">Enviar Email</Title>
                            <Label htmlFor="receiver">Para</Label>
                            <Container gap="32px" margin="0 0 30px 0">
                                <Container
                                    position="relative"
                                    flexDirection="column"
                                    width="90%"
                                >
                                    <Select
                                        label="Escolha uma pessoa"
                                        values={userEmail.filter(
                                            (user) =>
                                                !receivers.includes(user) &&
                                                user.email !== "admin@gmail.com"
                                        )}
                                        onChange={(v) =>
                                            props.setFieldValue("receiver", v)
                                        }
                                    />
                                    <Dropdown top="12px" right="25px" />
                                    <CustomErrorMessage name="receiver" />
                                </Container>
                                <Button
                                    type="button"
                                    width="55px"
                                    height="55px"
                                    padding="0"
                                    onClick={() => {
                                        if (
                                            props.getFieldProps("receiver")
                                                .value !== ""
                                        ) {
                                            setReceivers([
                                                ...receivers,
                                                props.getFieldProps("receiver")
                                                    .value,
                                            ]);
                                            props.setFieldValue("receiver", "");
                                        }
                                    }}
                                >
                                    <Plus />
                                </Button>
                            </Container>
                            <Table
                                list={receivers}
                                params={[
                                    { heading: "Nome", key: "name" },
                                    { heading: "Email", key: "email" },
                                ]}
                            />
                            <Container
                                justifyContent="space-around"
                                margin="32px 0 0 0 "
                            >
                                <Button
                                    id="backToKudoBoxFromKudoCard"
                                    backgroundColor="transparent"
                                    color="#fff"
                                    border="1px solid #fff"
                                    backgroundColorHover="#5454fb"
                                    borderHover="1px solid #5454fb"
                                    colorHover="#fff"
                                    onClick={() =>
                                        navigate(`/sprint/${idSprint}`)
                                    }
                                >
                                    Voltar
                                </Button>
                                <Button
                                    id="createKudoCard"
                                    backgroundColor="#fff"
                                    color="#12101a"
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
    );
};
export default SendEmailForm;
