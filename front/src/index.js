import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import Socket from './network/socket';
import TokenStorage from "./db/token";


const root = ReactDOM.createRoot(document.getElementById("root"));
const baseURL = process.env.BASE_URL;
const tokenStorage = new TokenStorage();
const socketClient = new Socket(baseURL, () => tokenStorage.getToken());

root.render(<App />);
