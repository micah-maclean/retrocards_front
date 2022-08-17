//Import referente a dependência Formik
import { Formik } from "formik";
//Import referente ao context
import { useContext } from "react";
//Import referente as rotas
import { useParams } from "react-router-dom";
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
import Select from '../../components/customForm/Select'
//Import referente as validações
import { validationsItem } from "../../utils/validations";
//Import referente ao context
import { RetroContext } from "../../context/RetroContext";
import { Title } from "../../components/title/Title";

const ItemRetroForm = () => {
    const { handleCreateItemRetrospective } = useContext(RetroContext);
    const { idRetrospective } = useParams();
    const tipo = [{name: "O que pode melhorar", value: 'IMPROVE'}, {name: "O que funcionou bem", value: 'WORKED'}, {name: "O que faremos na próxima sprint para melhorar", value: 'NEXT'}]

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
                            type: '',
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
                            handleCreateItemRetrospective(newValues, idRetrospective, values.type);
                        }}
                    >
                        {(props) => (
                            <CustomForm color="#fff">
                                <Title marginBottom='30px'>Criar Item da Retrospectiva</Title>
                                <Label htmlFor="type">
                                    Tipo
                                </Label>
                                <Container position="relative" flexDirection='column'>
                                <Select label='Escolha um tipo' values={tipo} onChange={v => props.setFieldValue('type', v) }/>
                                    <Dropdown top="12px" right="25px" />
                                    <CustomErrorMessage name={"type"} />
                                </Container>
                                <Label htmlFor="title">
                                    Título
                                </Label>
                                <Input
                                    name="title"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.title}
                                    placeholder="Digite o título do Item da Retrospectiva"
                                    id="title"
                                />
                                <CustomErrorMessage name={"title"} />
                                <Label htmlFor="description">
                                    Descrição
                                </Label>
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
export default ItemRetroForm;
