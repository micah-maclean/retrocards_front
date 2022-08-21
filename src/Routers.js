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
import SendEmailForm from "./pages/retrospectives/SendEmailForm";
import KudoboxDetails from "./pages/kudoboxes/KudoboxDetails";
import RetroDetails from "./pages/retrospectives/RetroDetails";
import Users from "./pages/user/Users";
import UsersForm from "./pages/user/UsersForm";
import GlobalStyles from "./styles/global";

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
                                    <Route
                                        path="/sprint/:idSprint"
                                        element={<SprintDetails />}
                                    />
                                    <Route
                                        path="/sprint/cadastrar"
                                        element={<SprintForm />}
                                    />
                                    <Route
                                        path="/sprint/editar/:idSprint"
                                        element={<SprintForm />}
                                    />
                                    <Route
                                        path="/retrospectiva/cadastrar/:idSprint"
                                        element={<RetroForm />}
                                    />
                                    <Route
                                        path="/retrospectiva/editar/:idSprint/:idRetrospective"
                                        element={<RetroForm />}
                                    />
                                    <Route
                                        path="/item/cadastrar/:idRetrospective"
                                        element={<ItemRetroForm />}
                                    />
                                    <Route
                                        path="/item/editar/:idRetrospective/:idItemRetrospective"
                                        element={<ItemRetroForm />}
                                    />
                                    <Route
                                        path="/kudo-box/cadastrar/:idSprint"
                                        element={<KudoBoxForm />}
                                    />
                                    <Route
                                        path="/kudo-box/editar/:idSprint/:idKudoBox"
                                        element={<KudoBoxForm />}
                                    />
                                    <Route
                                        path="/kudo-card/cadastrar/:idKudoBox"
                                        element={<KudoCardForm />}
                                    />
                                    <Route
                                        path="/kudobox/:idKudobox"
                                        element={<KudoboxDetails />}
                                    />
                                    <Route
                                        path="/retrospectiva/:idRetrospective"
                                        element={<RetroDetails />}
                                    />
                                    <Route
                                        path="/enviar-email/:idRetrospective/:idSprint"
                                        element={<SendEmailForm />}
                                    />
                                    <Route path="/users" element={<Users />} />
                                    <Route
                                        path="/users/:idUser"
                                        element={<UsersForm />}
                                    />
                                </Route>

                                <Route path="/login" element={<Login />} />
                                <Route path="/cadastrar" element={<Signup />} />
                                <Route path="/*" element={<NotFound />} />
                            </Routes>
                        </KudosProvider>
                    </RetroProvider>
                </SprintProvider>
            </AuthProvider>
            <GlobalStyles />
        </BrowserRouter>
    );
};

export default Routers;
