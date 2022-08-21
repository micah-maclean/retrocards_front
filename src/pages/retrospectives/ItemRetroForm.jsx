//Import referente a dependência Formik
import { Formik } from "formik";
//Import referente ao context
import { useContext } from "react";
//Import referente as rotas
import { useNavigate, useParams } from "react-router-dom";
//Import referente aos componentes
import { Container } from "../../components/container/Container";
import {
    CustomForm,
    Label,
    Input,
    Dropdown,
} from "../../components/customForm/CustomForm";
import CustomErrorMessage from "../../components/customForm/CustomErrorMessage";
import { Button } from "../../components/button/Button";
import Select from "../../components/customForm/Select";
//Import referente as validações
import { validationsItem } from "../../utils/validations";
//Import referente ao context
import { RetroContext } from "../../context/RetroContext";
import { Title } from "../../components/title/Title";
import { Tipo } from "../../utils/variables";

const ItemRetroForm = () => {
    const { handleCreateItemRetrospective } = useContext(RetroContext);
    const { idRetrospective } = useParams();
    const navigate = useNavigate();

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
                            type: "",
                            title: "",
                            description: "",
                        }}
                        validationSchema={validationsItem}
                        onSubmit={(values) => {
                            const newValues = {
                                idRetrospective: parseInt(idRetrospective),
                                title: values.title,
                                description: values.description,
                            };
                            handleCreateItemRetrospective(
                                newValues,
                                idRetrospective,
                                values.type
                            );
                        }}
                    >
                        {(props) => (
                            <CustomForm color="#fff">
                                <Title marginBottom="30px">
                                    Criar Item da Retrospectiva
                                </Title>
                                <Label htmlFor="type">Tipo</Label>
                                <Container
                                    position="relative"
                                    flexDirection="column"
                                >
                                    <Select
                                        label="Escolha um tipo"
                                        setKey="value"
                                        values={Tipo}
                                        onChange={(v) =>
                                            props.setFieldValue("type", v)
                                        }
                                    />
                                    <Dropdown top="12px" right="25px" />
                                    <CustomErrorMessage name={"type"} />
                                </Container>
                                <Label htmlFor="title">Título</Label>
                                <Input
                                    name="title"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.title}
                                    placeholder="Digite o título do Item da Retrospectiva"
                                    id="title"
                                />
                                <CustomErrorMessage name={"title"} />
                                <Label htmlFor="description">Descrição</Label>
                                <Input
                                    name="description"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.description}
                                    placeholder="Digite a descrição do Item da Retrospectiva"
                                    id="description"
                                />
                                <CustomErrorMessage name={"description"} />
                                <Container justifyContent="space-around">
                                    <Button
                                        id="backToRetrospectiveFromItem"
                                        backgroundColor="transparent"
                                        color="#fff"
                                        border="1px solid #fff"
                                        backgroundColorHover="#5454fb"
                                        borderHover="1px solid #5454fb"
                                        colorHover="#fff"
                                        onClick={() =>
                                            navigate(
                                                `/retrospectiva/${idRetrospective}`
                                            )
                                        }
                                    >
                                        Voltar
                                    </Button>
                                    <Button
                                        id="createItemRetrospective"
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
        </>
    );
};
export default ItemRetroForm;
