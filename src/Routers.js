// Import referente a dependência de rotas
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import para privar o acesso as páginas sem login
import PrivateRoute from "./utils/PrivateRoute";
// Imports referentes a dependência do Toaster
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Imports referentes aos Providers utilizados
import { AuthProvider } from "./context/AuthContext";
import { SprintProvider } from "./context/SprintContext";
import { KudosProvider } from "./context/KudosContext";
import { RetroProvider } from "./context/RetroContext";
//Imports referentes as páginas
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import Signup from "./pages/signup/Signup";
import SprintForm from "./pages/home/SprintForm";
import SprintDetails from "./pages/sprintDetails/SprintDetails";
import RetroForm from "./pages/sprintDetails/RetroForm";
import KudoBoxForm from "./pages/sprintDetails/KudoBoxForm";
import KudoCardForm from "./pages/kudoboxes/KudoCardForm";
import ItemRetroForm from "./pages/retrospectives/ItemRetroForm";

const Routers = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <SprintProvider>
                  <RetroProvider>
                    <KudosProvider>
                      <ToastContainer />
                      <Routes>
                          <Route element={<PrivateRoute />}>
                              <Route path="/" element={<Home />} />
                              <Route path="/sprint/:idSprint" element={<SprintDetails />} />
                              <Route path="/sprint/cadastrar" element={<SprintForm />}/>
                              <Route path="/retrospectiva/cadastrar/:idSprint" element={<RetroForm />}/>
                              <Route path="/item/cadastrar/:idRetrospective" element={<ItemRetroForm />}/>
                              <Route path="/kudo-box/cadastrar/:idSprint" element={<KudoBoxForm />}/>
                              <Route path="/kudo-card/cadastrar/:idKudoBox" element={<KudoCardForm />}/>
                          </Route>
      
                          <Route path="/login" element={<Login />} />
                          <Route path="/cadastrar" element={<Signup />} />
                          <Route path="/*" element={<NotFound />} />
                      </Routes>
                    </KudosProvider>
                  </RetroProvider>
                </SprintProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default Routers;
