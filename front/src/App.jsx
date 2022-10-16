import { useState, useEffect } from "react";
import axios from "axios";
import MainDisplay from "./page/main/Main";
import ChampionListPage from "./page/champion_list/champion_list.jsx";
import ChampionInfoPage from "./page/champion_info/champion_info.jsx";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import Search from "./page/search/Search.jsx";
import Login from "./page/login/Login.jsx";
import Signup from "./page/signup/Signup.jsx";
import Community from "./page/community/Community.jsx";
import Summoners from "./page/summoners/Summoners.jsx";
import MyPage from "./page/mypage/Mypage";
import ChangePassword from "./components/Mypage_changePW/Mypage_changePW";

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
                <Route path="/summoners/:summoner" element={<Summoners />} />

                <Route
                    path="/community/*"
                    element={
                        <Community main={true} write={false} correct={false} />
                    }
                />
                <Route
                    path="/community/write"
                    element={
                        <Community main={false} write={true} correct={false} />
                    }
                />
                <Route
                    path="/community/read/:id"
                    element={
                        <Community main={false} write={false} correct={false} />
                    }
                />
                <Route
                    path="/community/correct/:id"
                    element={
                        <Community main={false} write={false} correct={true} />
                    }
                />
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
                <Route path="/summoners" element={<Search />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route
                    path="/mypage/changePassword"
                    element={<ChangePassword />}
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
