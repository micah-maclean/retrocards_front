import * as Yup from "yup";
import { ehDataAnterior, ehDataFinalValida, ehDataValida } from "./masks";

export const validationsLogin = Yup.object({
    email: Yup.string()
        .email("Insira um email válido")
        .required("Campo Obrigatório"),
    password: Yup.string()
        .min(3, "A senha precisa de pelo menos 3 caracteres")
        .required("Campo Obrigatório"),
});

export const validationSignup = Yup.object({
    name: Yup.string()
        .required("Campo Obrigatório"),
    email: Yup.string()
        .email("Insira um email válido")
        .required("Campo Obrigatório"),
    password: Yup.string()
        .min(3, "A senha precisa de pelo menos 3 caracteres")
        .required("Campo Obrigatório"),

})

export const validationsSprint = Yup.object({
    title: Yup.string()
        .max(60, "Insira um título de no máximo 60 caracteres")
        .min(3, "Insira um título de no mínimo 3 caracteres")
        .required("Campo Obrigatório"),
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
        .test("Datafinalvalida", "Data final não pode ser antes que a inicial", function(){
            const {startDate, endDate} = this.parent;
            return ehDataFinalValida(startDate, endDate);
        })
        .transform((value) => value.replace(/\D/g, ""))
        .min(8, "Insira uma data válida"),
});

export const validationsRetrospective = Yup.object({
    title: Yup.string()
        .max(60, "Insira um título de no máximo 60 caracteres")
        .min(3, "Insira um título de no mínimo 3 caracteres")
        .required("Campo Obrigatório"),
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
    title: Yup.string()
        .max(60, "Insira um título de no máximo 60 caracteres")
        .min(3, "Insira um título de no mínimo 3 caracteres")
        .required("Campo Obrigatório"),
        type: Yup.string()
        .required("Campo Obrigatório"),
        description: Yup.string()
        .max(60, "Insira um título de no máximo 60 caracteres")
        .min(3, "Insira um título de no mínimo 3 caracteres")
        .required("Campo Obrigatório"),
});

export const validationsKudoBox = Yup.object({
    title: Yup.string()
        .max(60, "Insira um título de no máximo 60 caracteres")
        .min(3, "Insira um título de no mínimo 3 caracteres")
        .required("Campo Obrigatório"),
    endDate: Yup.string()
        .required("Campo Obrigatório")
        .test("Datavalida", "Data Inválida", (value) => ehDataValida(value))
        .test("Dataanterior", "Data não pode ser no passado", (value) =>
            ehDataAnterior(value)
        )
        .transform((value) => value.replace(/\D/g, ""))
        .min(8, 'Insira uma data no formato "DD/MM/YYYY"'),
});