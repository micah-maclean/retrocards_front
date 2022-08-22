import React from "react";
import ReactDOM from "react-dom/client";
import Routers from "./Routers";
// Imports referentes a dependência do Toaster
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<>
    <ToastContainer />
    <Routers />
</>
);
