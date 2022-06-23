import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Champ from "./router/champion.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <>
        <App />
        <Champ />
    </>
);
