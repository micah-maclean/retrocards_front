import * as Yup from "yup";
import { ehDataAnterior, ehDataValida } from "./masks";

export const validationsTitle = Yup.string()
    .max(60, "Insira um título de no máximo 60 caracteres")
    .min(3, "Insira um título de no mínimo 3 caracteres")
    .required("Campo Obrigatório");

export const validationsLogin = Yup.object({
    email: Yup.string()
        .email("Insira um email válido")
        .required("Campo Obrigatório"),
    password: Yup.string()
        .min(3, "A senha precisa de pelo menos 3 caracteres")
        .required("Campo Obrigatório"),
});

export const validationsSprint = Yup.object({
    title: validationsTitle,
    startDate: Yup.string()
        .required("Campo Obrigatório")
        .test("Datavalida", "Data Inválida", (value) => ehDataValida(value))
        .test("Dataanterior", "Data não pode ser no passado", (value) =>
            ehDataAnterior(value)
        )
        .transform((value) => value.replace(/\D/g, ""))
        .min(8, 'Insira uma data no formato "DD/MM/YYYY"'),
    endDate: Yup.date().transform(() => {}),
    // endDate: Yup.string()
    //     .required("Campo Obrigatório")
    //     .transform((value) => value.replace(/\D/g, ""))
    //     .min(8, "Insira uma data válida"),
});

export const validationsRetrospective = Yup.object({
    title: validationsTitle,
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
    title: validationsTitle,
    type: Yup.string().required("Campo Obrigatório"),
    description: Yup.string()
        .max(60, "Insira um título de no máximo 60 caracteres")
        .min(3, "Insira um título de no mínimo 3 caracteres")
        .required("Campo Obrigatório"),
});

export const validationsKudoBox = Yup.object({
    title: validationsTitle,
    endDate: Yup.string()
        .required("Campo Obrigatório")
        .test("Datavalida", "Data Inválida", (value) => ehDataValida(value))
        .test("Dataanterior", "Data não pode ser no passado", (value) =>
            ehDataAnterior(value)
        )
        .transform((value) => value.replace(/\D/g, ""))
        .min(8, 'Insira uma data no formato "DD/MM/YYYY"'),
});
