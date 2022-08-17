//Import referente a dependência Formik
import { Formik } from "formik";
//Import referente ao context
import { useContext, useState } from "react";
//Import referente as rotas
import { useParams } from "react-router-dom";
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
// Import referente as máscaras
import { formatDateToDatabase } from "../../utils/masks";
//Import referente as validações
import { validationsKudoBox } from "../../utils/validations";
//Import referente ao context
import { KudosContext } from "../../context/KudosContext";
import { Title } from "../../components/title/Title";

const KudoCardForm = () => {
    const { handleCreateKudoBox } = useContext(KudosContext);
    const { idKudoBox } = useParams();

    const [checked, setChecked] = useState(false);

    function handleCheckboxChange() {
        setChecked(!checked);
    }
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
                    <Formik
                        initialValues={{
                            title: "",
                            endDate: "",
                        }}
                        validationSchema={validationsKudoBox}
                        onSubmit={(values) => {
                            const newValues = {
                                idKudoBox: idKudoBox,
                                title: values.title,
                                endDate: formatDateToDatabase(values.endDate),
                            };
                            handleCreateKudoBox(newValues, idKudoBox);
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
                                    <Input
                                        as="select"
                                        name="receiver"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.receiver}
                                        placeholder="Digite para quem é o Kudo Card"
                                        id="receiver"
                                        width="100%"
                                    >
                                        <option value="">Qualquer coisa</option>
                                    </Input>
                                    <Dropdown top="12px" right="25px" />
                                    <CustomErrorMessage name={"receiver"} />
                                </Container>
                                <Container
                                    margin="8px 0 40px 0 "
                                    alignItems="center"
                                    checked={checked}
                                    onClick={handleCheckboxChange}
                                >
                                    <Checkbox
                                        name="anonymous"
                                        id="anonymous"
                                        checked={checked}
                                        onClick={handleCheckboxChange}
                                    />
                                    <Label margin="8px 0 0 0" checked={checked}>
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
