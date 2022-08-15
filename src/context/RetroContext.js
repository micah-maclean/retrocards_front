import { createContext } from "react";

const RetroContext = createContext();

const RetroProvider = ({children}) => {
    const teste='teste';
  return (
    <RetroContext.Provider value={teste}>
        {children}
    </RetroContext.Provider>
  )
}
export {RetroContext, RetroProvider}