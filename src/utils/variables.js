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
    { name: "Retrospectiva", value: "Retrospectiva" },
    { name: "Kudo Box", value: "Kudo Box" },
];
