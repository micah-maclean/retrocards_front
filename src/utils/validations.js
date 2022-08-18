import * as Yup from "yup";
import { ehDataAnterior, ehDataFinalValida, ehDataValida } from "./masks";

export const validationsText = (qtdMax, qtdMin) => {
    return Yup.string()
        .max(qtdMax, `Insira um título de no máximo ${qtdMax} caracteres`)
        .min(qtdMin, `Insira um título de no mínimo ${qtdMin} caracteres`)
        .required("Campo Obrigatório");
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
    title: validationsText(60, 3),
    startDate: Yup.string()
        .required("Campo Obrigatório")
        .test("Datavalida", "Data Inválida", (value) => ehDataValida(value))
        .test("Dataanterior", "Data não pode ser no passado", (value) =>
            ehDataAnterior(value)
        )
        .transform((value) => value.replace(/\D/g, ""))
        .min(8, 'Insira uma data no formato "DD/MM/YYYY"'),
    endDate: Yup.string()
        .required("Campo Obrigatório")
        .test("Datavalida", "Data Inválida", (value) => ehDataValida(value))
        .test(
            "Datafinalvalida",
            "Data final não pode ser antes que a inicial",
            function () {
                const { startDate, endDate } = this.parent;
                return ehDataFinalValida(startDate, endDate);
            }
        )
        .transform((value) => value.replace(/\D/g, ""))
        .min(8, "Insira uma data válida"),
});

export const validationsRetrospective = Yup.object({
    title: validationsText(60, 3),
    occurredDate: Yup.string()
        .required("Campo Obrigatório")
        .test("Datavalida", "Data Inválida", (value) => ehDataValida(value))
        .test("Dataanterior", "Data não pode ser no passado", (value) =>
            ehDataAnterior(value)
        )
        .transform((value) => value.replace(/\D/g, ""))
        .min(8, 'Insira uma data no formato "DD/MM/YYYY"'),
});

export const validationsItem = Yup.object({
    title: validationsText(60, 3),
    type: Yup.string().required("Campo Obrigatório"),
    description: validationsText(144, 3),
});

export const validationsKudoBox = Yup.object({
    title: validationsText(60, 3),
    endDate: Yup.string()
        .required("Campo Obrigatório")
        .test("Datavalida", "Data Inválida", (value) => ehDataValida(value))
        .test("Dataanterior", "Data não pode ser no passado", (value) =>
            ehDataAnterior(value)
        )
        .transform((value) => value.replace(/\D/g, ""))
        .min(8, 'Insira uma data no formato "DD/MM/YYYY"'),
});

export const validationsKudoCard = Yup.object({
    title: validationsText(60, 3),
    description: validationsText(144, 3),
    receiver: Yup.string().required("Campo Obrigatório"),
});
