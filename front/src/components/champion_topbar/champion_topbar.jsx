import Champion from "../champions/champions.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./champion_topbar.module.css";
import axios from "axios";
import TokenStorage from "../../db/token.js";

function ChampionTopBar() {
    const info_button = document.querySelector("." + style["info_button"]);
    const [showContent, setContent] = useState(false);
    const [isLogin, setLogin] = useState(false);
    const [userName, setuserName] = useState("");

    const isValidToken = async () => {
        const tokenStorage = new TokenStorage();
        const token = tokenStorage.getToken();

        await axios //
            .get("/auth", {
                headers: {
                    token: token,
                },
            })
            .then((res) => {
                setuserName(res.data.username);
                setLogin(true);
            })
            .catch((err) => console.log(err));
    };
    const changeState = () => {
        setContent(!showContent);
        if (document.querySelector("." + style["selected"])) {
            info_button[0].removeAttribute("id");
            info_button[0].setAttribute("id", style.link);
        } else {
            info_button[0].setAttribute("id", style.selected);
        }
    };
    isValidToken();
    return (
        <>
            <div className={style.topbarContainer}>
                <Link to="/" id={style.link}>
                    홈
                </Link>
                <Link
                    to="/champions"
                    id={style.link}
                    className={style.info_button}
                    onClick={changeState}
                >
                    챔피언 정보
                </Link>
                {isLogin ? (
                    <a
                        className={style.profileButton}
                        href="http://localhost:3000"
                    >
                        {userName}
                    </a>
                ) : (
                    <a
                        className={style.loginButton}
                        href="http://localhost:3000/login"
                    >
                        로그인
                    </a>
                )}
            </div>
            {showContent && <Champion />}
        </>
    );
}

export default ChampionTopBar;
