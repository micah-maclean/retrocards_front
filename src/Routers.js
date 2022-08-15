import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import Signup from "./pages/signup/Signup";
import PrivateRoute from "./utils/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SprintForm from "./pages/home/SprintForm";
import { SprintProvider } from "./context/SprintContext";
import { KudosProvider } from "./context/KudosContext";
import { RetroProvider } from "./context/RetroContext";
import SprintDetails from "./pages/sprintDetails/SprintDetails";

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
