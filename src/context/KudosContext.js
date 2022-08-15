import { createContext } from "react";

const KudosContext = createContext();

const KudosProvider = ({children}) => {
    const teste= 'teste';
    return(
        <KudosContext.Provider value={teste}>
            {children}
        </KudosContext.Provider>
    )
}

export {KudosContext, KudosProvider}