import { useState, useEffect } from "react";
import axios from "axios";
import MainDisplay from "./page/main/Main";
import Champion from "./page/champion/champion.jsx";
import ChampionInfo from "./page/champion_info/championInfo";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
    const [loading, setLoading] = useState(false);
    const callMain = async () => {
        console.log("엑시오스 작동");
        axios
            .get("/champion") // mainDisplay
            .then((res) => {
                console.log(JSON.stringify(res.data.hi));
                setLoading(true);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        callMain();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/champions/:id"
                    element={
                        loading ? (
                            <ChampionInfo />
                        ) : (
                            <h1>Front axios connecting...</h1>
                        )
                    }
                />
                <Route
                    path="/champions"
                    element={
                        loading ? (
                            <Champion />
                        ) : (
                            <h1>Front axios connecting...</h1>
                        )
                    }
                />
                <Route
                    path="/"
                    element={
                        loading ? (
                            <MainDisplay />
                        ) : (
                            <h1>Front axios connecting...</h1>
                        )
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
