import { useState, useEffect } from "react";
import axios from "axios";
import MainDisplay from "./page/main/Main";
import ChampionListPage from "./page/champion_list/champion_list.jsx";
import ChampionInfoPage from "./page/champion_info/champion_info.jsx";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Search from "./page/search/Search.jsx";
import Login from "./page/login/Login.jsx";
import Signup from "./page/signup/Signup.jsx";
import Community from "./page/community/Community.jsx";

function App() {
    const [loading, setLoading] = useState(false);
    const callMain = async () => {
        console.log("엑시오스 작동");
        setLoading(true);
    };

    useEffect(() => {
        callMain();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/community" element={<Community />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/champions/:id"
                    element={
                        loading ? (
                            <ChampionInfoPage />
                        ) : (
                            <h1>Front axios connecting...</h1>
                        )
                    }
                />
                <Route
                    path="/champions"
                    element={
                        loading ? (
                            <ChampionListPage />
                        ) : (
                            <h1>Front axios connecting...</h1>
                        )
                    }
                />
                <Route path="/search" element={<Search />} />
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
