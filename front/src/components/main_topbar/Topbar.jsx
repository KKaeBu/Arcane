import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    LightMode,
    DarkMode,
    Language,
    AccountCircle,
} from "@mui/icons-material";
import style from "./topbar.module.css";
import axios from "axios";
import TokenStorage from "../../db/token";

function Topbar() {
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [username, setuserName] = useState("");
    const [islogin, setLogin] = useState(false);

    const dropMenuDiv = useRef(null);
    const myPageDiv = useRef(null);
    const myPageIcon = useRef(null);

    const onSubmit = async (event) => {
        event.preventDefault(); // 새로고침 방지
        if (inputValue !== "") {
            navigate(`/summoners/${inputValue}`, {
                state: {
                    summoner: inputValue,
                },
            });
        } else alert("소환사명을 입력해주세요!");
    };

    const myPageClick = async () => {
        if (active) {
            setActive(false);
            dropMenuDiv.current.classList.remove(style.active);
            myPageIcon.current.classList.remove(style.myPageActive);
            setTimeout(() => {
                myPageDiv.current.classList.remove(style.move);
            }, 500);
        } else {
            setActive(true);
            setTimeout(() => {
                dropMenuDiv.current.classList.add(style.active);
            }, 500);
            myPageDiv.current.classList.add(style.move);
            myPageIcon.current.classList.add(style.myPageActive);
        }
    };

    const LoginClick = () => {
        if (username) {
            const token = new TokenStorage();
            token.clearToken();
            setLogin(false);
            window.location.reload();
        } else {
            navigate("/login");
        }
    };

    const ClickMyPage = () => {
        if (islogin) {
            navigate("/mypage", {
                state: username,
            });
        } else {
            window.alert("로그인이 필요한 서비스입니다.");
        }
    };

    const onChange = (event) => {
        setInputValue(event.target.value);
    };

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

    const logoClick = () => {
        navigate("/");
    };

    useEffect(() => {
        isValidToken();
    }, []);

    return (
        <div className={style.topbarContainer}>
            <div className={style.topbarLeft}>
                <img
                    src="/img/Arcane_Title.png"
                    alt="title logo"
                    className={style.logo}
                    onClick={logoClick}
                />
            </div>
            <div className={style.topbarCenter}>
                <form className={style.searchbar} onSubmit={onSubmit}>
                    {/* select box 커스텀해서 나중에 추가하기 (서버 선택용) */}
                    <input
                        placeholder="Search for Username"
                        className={style.searchInput}
                        onChange={onChange}
                    />
                    <Search className={style.searchButton} onClick={onSubmit} />
                </form>
            </div>
            <div className={style.topbarRight}>
                <div className={style.myPageDiv} ref={myPageDiv}>
                    <AccountCircle
                        className={style.myPage}
                        onClick={myPageClick}
                        ref={myPageIcon}
                    />
                    <div className={`${style.dropMenu}`} ref={dropMenuDiv}>
                        <div className={style.username}>
                            {username ? username : "로그인하세요"}
                        </div>
                        <div className={style.userInfo} onClick={ClickMyPage}>
                            내 정보
                        </div>
                        <div className={style.login} onClick={LoginClick}>
                            {username ? "로그아웃" : "로그인"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
