export const Status = {
    CREATE: "Criado",
    IN_PROGRESS: "Em Andamento",
    FINISHED: "Concluido",
};

export const Role = {
    ROLE_ADMIN: "Admin",
    ROLE_FACILITATOR: "Facilitador",
    ROLE_MEMBER: "Membro",
};

export const Tipo = [
    { name: "O que pode melhorar", value: "IMPROVE" },
    { name: "O que funcionou bem", value: "WORKED" },
    {
        name: "O que faremos na próxima sprint para melhorar",
        value: "NEXT",
    },
];

export const paramsUsers = [
    { heading: "Id", key: "idUser" },
    { heading: "Nome", key: "name" },
    { heading: "Cargo", key: "role" },
];

export const sprintFilter = [
    { name: "Retrospectiva", value: "RETROSPECTIVA" },
    { name: "Kudo Box", value: "KUDOBOX" },
];

export const rolesSelect = [
    { name: "Facilitador", value: "FACILITATOR" },
    { name: "Membro", value: "MEMBER" },
];

export const filterListRetro = [
    { name: "Todos", value: "ALL" },
    { name: "O que Funcionou", value: "WORKED" },
    { name: "Próxima Sprint", value: "NEXT" },
    { name: "À Melhorar", value: "IMPROVE" },
];

export const TypeRetro = {
    WORKED: "Funcionou",
    NEXT: "Próxima Sprint",
    IMPROVE: "À melhorar",
};
