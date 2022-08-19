//Import react
import { useState, useEffect, useContext } from "react";
//Import context
import { AuthContext } from "../../context/AuthContext";
//Import components
import { Container } from "../../components/container/Container";
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

const SendEmailForm = () => {
    const { getUsersEmails } = useContext(AuthContext);
    const [userEmail, setUserEmail] = useState([]);
    const [receivers, setReceivers] = useState([]);

    const setup = async () => {
        const data = await getUsersEmails();
        if (data) {
            setUserEmail(data);
        }
    };

    console.log(receivers);
    useEffect(() => {
        setup();
    }, []);
    return (
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
                        receiver: "",
                    }}
                    // validationSchema={}
                    onSubmit={() => {
                        const newValues = {
                            receiver: [receivers.map((value) => value.email)],
                        };
                        console.log(newValues);
                        // handleCreateKudoCard(newValues, idKudoBox);
                    }}
                >
                    {(props) => (
                        <CustomForm color="#fff">
                            <Title marginBottom="30px">Enviar Email</Title>
                            <Label htmlFor="receiver">Para</Label>
                            <Container justifyContent="space-between">
                                <Container
                                    position="relative"
                                    flexDirection="column"
                                    width="90%"
                                >
                                    <Select
                                        label="Escolha uma pessoa"
                                        values={userEmail}
                                        onChange={(v) =>
                                            props.setFieldValue("receiver", v)
                                        }
                                    />
                                    <Dropdown top="12px" right="25px" />
                                    <CustomErrorMessage name={"receiver"} />
                                </Container>
                                <Button
                                    type="button"
                                    width="55px"
                                    height="55px"
                                    padding="0"
                                    onClick={() => {
                                        setReceivers([
                                            ...receivers,
                                            props.getFieldProps("receiver")
                                                .value,
                                        ]);
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
