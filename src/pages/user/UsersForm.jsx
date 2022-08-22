import { useContext } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { validationsRole } from "../../utils/validations";
import { rolesSelect } from "../../utils/variables";

const UsersForm = () => {
    const { idUser } = useParams();
    const { handleUpdateRole } = useContext(AuthContext);
    const navigate = useNavigate();

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
                    role: "",
                }}
                validationSchema={validationsRole}
                onSubmit={(values) => {
                    handleUpdateRole(values.role, idUser);
                }}
            >
                {(props) => (
                    <CustomForm color="#fff">
                        <Title marginBottom="30px">Alterar Cargo</Title>
                        <Label htmlFor="role">Cargo</Label>
                        <Container gap="32px" margin="0 0 30px 0">
                            <Container
                                position="relative"
                                flexDirection="column"
                                width="100%"
                            >
                                <Select
                                    label="Escolha um cargo"
                                    setKey="value"
                                    values={rolesSelect}
                                    onChange={(v) =>
                                        props.setFieldValue("role", v)
                                    }
                                />
                                <Dropdown top="12px" right="25px" />
                                <CustomErrorMessage name="role" id="role-error"/>
                            </Container>
                        </Container>
                        <Container justifyContent="space-around" margin="32px 0 0 0">
                            <Button
                                id="backToKudoBoxFromKudoCard"
                                backgroundColor="transparent"
                                color="#fff"
                                border="1px solid #fff"
                                backgroundColorHover="#5454fb"
                                borderHover="1px solid #5454fb"
                                colorHover="#fff"
                                onClick={() => navigate("/users")}
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
                                Alterar
                            </Button>
                        </Container>
                    </CustomForm>
                )}
            </Formik>
        </Container>
    );
};

export default UsersForm;