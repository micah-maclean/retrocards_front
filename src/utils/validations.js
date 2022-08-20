import * as Yup from "yup";
import { ehDataAnterior, ehDataFinalValida, ehDataValida } from "./masks";

export const validationsText = (qtdMax, qtdMin, type) => {
    return Yup.string()
        .max(qtdMax, `Insira um ${type} de no máximo ${qtdMax} caracteres`)
        .min(qtdMin, `Insira um ${type} de no mínimo ${qtdMin} caracteres`)
        .required("Campo Obrigatório");
};

export const validationsDate = () => {
    return Yup.string()
        .required("Campo Obrigatório")
        .test("Datavalida", "Data Inválida", (value) => ehDataValida(value))
        .test("Dataanterior", "Data não pode ser no passado", (value) =>
            ehDataAnterior(value)
        )
        .transform((value) => value.replace(/\D/g, ""))
        .min(8, 'Insira uma data no formato "DD/MM/YYYY"');
};

export const validationsLogin = Yup.object({
    email: Yup.string()
        .email("Insira um email válido")
        .required("Campo Obrigatório"),
    password: Yup.string()
        .min(3, "A senha precisa de pelo menos 3 caracteres")
        .required("Campo Obrigatório"),
});

export const validationSignup = Yup.object({
    name: Yup.string().required("Campo Obrigatório"),
    email: Yup.string()
        .email("Insira um email válido")
        .required("Campo Obrigatório"),
    password: Yup.string()
        .min(3, "A senha precisa de pelo menos 3 caracteres")
        .required("Campo Obrigatório"),
});

export const validationsSprint = Yup.object({
    title: validationsText(60, 3, "título"),
    startDate: validationsDate(),
    endDate: validationsDate().test(
        "Datafinalvalida",
        "Data final não pode ser antes que a inicial",
        function () {
            const { startDate, endDate } = this.parent;
            return ehDataFinalValida(startDate, endDate);
        }
    ),
});

export const validationsRetrospective = Yup.object({
    title: validationsText(60, 3, "título"),
    occurredDate: validationsDate(),
});

export const validationsItem = Yup.object({
    title: validationsText(60, 3, "título"),
    type: Yup.string().required("Campo Obrigatório"),
    description: validationsText(144, 3, "descrição"),
});

export const validationsKudoBox = Yup.object({
    title: validationsText(60, 3, "título"),
    endDate: validationsDate(),
});

export const validationsKudoCard = Yup.object({
    title: validationsText(60, 3, "título"),
    description: validationsText(144, 3, "descrição"),
    receiver: Yup.string().required("Campo Obrigatório"),
});

export const validationsRole = Yup.object({
    role: Yup.string().required("Campo Obrigatório"),
});
