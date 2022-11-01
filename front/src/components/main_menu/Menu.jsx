import {
    SmartToy,
    Category,
    EmojiEvents,
    Construction,
    Equalizer,
    Forum,
} from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TokenStorage from "../../db/token";
import style from "./menu.module.css";
import { io } from "socket.io-client";
// import { config } from "../../config.js";

function Menu() {
    const [isLogin, setLogin] = useState(false);
    const [userName, setuserName] = useState("");
    const socket = io("http://43.201.140.217:5000", {
        rejectUnauthorized: false
    }).connect();

    const onClick = (e) => {
        if (isLogin) {
            e.preventDefault();
            const token = new TokenStorage();
            token.clearToken();
            setLogin(false);
            window.location.reload();
        }
    };

    const isValidToken = async () => {
        const tokenStorage = new TokenStorage();
        const token = tokenStorage.getToken();

        await axios //
            .get("/auth", {
                headers: {
                    token: token,
                },
                withCredentials: true,
            })
            .then((res) => {
                setuserName(res.data.username);
                setLogin(true);
            })
            .catch((err) => console.log(err));
    };

    const warnning = () => {
        alert("아직 작업 중입니다. :)")
    }

    useEffect(() => {
        isValidToken();
    }, []);

    useEffect(() => {
        socket.emit("welcome", userName);
        socket.on("alert", (data) => {
            if (data !== userName && data !== "" && userName !== "") {
                console.log(`${data} is login`);
            }
        });
    }, [userName]);

    return (
        <div className={style.menuContainer}>
            <Link
                to="/login"
                className={style.menuMainButton}
                onClick={onClick}
            >
                <p>{isLogin ? userName : "Login"}</p>
            </Link>
            <div
                className={`${style.menuSubButtonItem} ${style.menuSubChampionBtn}`}
            >
                <Link to="/champions" className={style.menuSubItemContainer}>
                    <SmartToy className={style.icon} />
                    <p>챔피언 분석</p>
                </Link>
            </div>
            <div
                className={`${style.menuSubButtonItem} ${style.menuSubItemBtn}`}
            >
                <div onClick={warnning} className={style.menuSubItemContainer}>
                    <Category className={style.icon} />
                    <p>아이템 조합</p>
                </div>
            </div>
            <div
                className={`${style.menuSubButtonItem} ${style.menuSubRankingBtn}`}
            >
                <div onClick={warnning} className={style.menuSubItemContainer}>
                    <EmojiEvents className={style.icon} />
                    <p>랭킹</p>
                </div>
            </div>
            <div
                className={`${style.menuSubButtonItem} ${style.menuSubBuildBtn}`}
            >
                <div onClick={warnning} className={style.menuSubItemContainer}>
                    <Construction className={style.icon} />
                    <p>빌드</p>
                </div>
            </div>
            <div
                className={`${style.menuSubButtonItem} ${style.menuStatisticsBtn}`}
            >
                <div onClick={warnning} className={style.menuSubItemContainer}>
                    <Equalizer className={style.icon} />
                    <p>통계</p>
                </div>
            </div>
            <div
                className={`${style.menuSubButtonItem} ${style.menuComunnityBtn}`}
            >
                <div className={style.menuSubItemContainer}>
                    <Link
                        to="/community?page=1"
                        className={style.menuSubItemContainer}
                    >
                        <Forum className={style.icon} />
                        <p>커뮤니티</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Menu;
