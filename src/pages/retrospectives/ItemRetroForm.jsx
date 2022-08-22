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
import { Loading } from "../../components/loading/Loading";

const ItemRetroForm = () => {
    const { handleCreateItemRetrospective, getItemRetrospectiveById, handleUpdateItemRetrospective } = useContext(RetroContext);
    const { idRetrospective, idItemRetrospective } = useParams();
    const [infoItem, setInfoItem] = useState()
    const [isUpdate, setIsUpdate] = useState(false)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const setup = async () => {
        setLoading(true);
        if(idItemRetrospective){
            const data = await getItemRetrospectiveById(idItemRetrospective)
            setIsUpdate(true)
            setInfoItem(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        setup()
    },[])

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
                    type: '',
                    title: infoItem && infoItem.title ? infoItem.title : '',
                    description: infoItem && infoItem.description ? infoItem.description : '',
                }}
                validationSchema={validationsItem}
                enableReinitialize
                onSubmit={(values) => {
                    const newValues = {
                        idRetrospective: parseInt(idRetrospective),
                        title: values.title,
                        description: values.description,
                    };

                    isUpdate ? handleUpdateItemRetrospective(idItemRetrospective, idRetrospective, newValues, values.type) 
                        : handleCreateItemRetrospective( newValues, idRetrospective, values.type);
                }}
            >
                {(props) => (
                    <CustomForm color="#fff">
                        <Title marginBottom="30px">
                            {isUpdate ? 'Atualizar Retrocard' : 'Cadastrar Retrocard'}
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
                            <CustomErrorMessage name={"type"} id=""type-error/>
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
                        <CustomErrorMessage name={"title"} id="title-error" />
                        <Label htmlFor="description">Descrição</Label>
                        <Input
                            name="description"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.description}
                            placeholder="Digite a descrição do Item da Retrospectiva"
                            id="description"
                        />
                        <CustomErrorMessage name={"description"} id="description-error"/>
                        <Container justifyContent="space-around">
                            <Button
                                id="backToRetrospectiveFromItem"
                                backgroundColor="transparent"
                                color="#fff"
                                border="1px solid #fff"
                                backgroundColorHover="#5454fb"
                                borderHover="1px solid #5454fb"
                                colorHover="#fff"
                                onClick={() => navigate(`/retrospectiva/${idRetrospective}`)}
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
                                {isUpdate ? 'Atualizar' : 'Cadastrar'}
                            </Button>
                        </Container>
                    </CustomForm>
                )}
            </Formik>
        </Container>
    );
};

export default ItemRetroForm;