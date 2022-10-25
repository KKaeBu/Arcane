import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Search, AccountCircle } from "@mui/icons-material";
import style from "./topbar.module.css";
import tokenStorage from "../../db/token";

function Topbar(props) {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [isLogin, setisLogin] = useState(false);
    const [active, setActive] = useState(false);
    const [username, setUsername] = useState("");

    const myPageIcon = useRef(null);
    const dropMenuDiv = useRef(null);
    const myPageDiv = useRef(null);

    const name = props.userName;
    const login = props.isLogin;

    const setting = () => {
        if (name !== undefined && login === true) {
            setUsername(name);
            setisLogin(login);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault(); // 새로고침 방지
        console.log(inputValue);
        if (inputValue !== "") {
            // navigate(`/summoners/${inputValue}`);
            navigate(`/summoners/${inputValue}`, {
                state: {
                    summoner: inputValue,
                },
            });
            window.location.reload();
        } else alert("소환사명을 입력해주세요!");
    };

    const onChange = (event) => {
        setInputValue(event.target.value);
    };

    const myPageClick = async () => {
        if (active) {
            setActive(false);
            dropMenuDiv.current.classList.remove(style.active);
            myPageIcon.current.classList.remove(style.myPageActive);
            setTimeout(() => {
                myPageDiv.current.classList.remove(style.move);
                dropMenuDiv.current.style.display = "none";
            }, 500);
        } else {
            setActive(true);
            setTimeout(() => {
                dropMenuDiv.current.classList.add(style.active);
                dropMenuDiv.current.style.display = "flex";
            }, 500);
            myPageDiv.current.classList.add(style.move);
            myPageIcon.current.classList.add(style.myPageActive);
        }
    };

    const ClickMyPage = () => {
        if (isLogin) {
            navigate("/mypage", {
                state: username,
            });
        } else {
            window.alert("로그인이 필요한 서비스입니다.");
        }
    };

    const LoginClick = () => {
        if (username) {
            const token = new tokenStorage();
            token.clearToken();
            setisLogin(false);
            window.location.reload();
        } else {
            navigate("/login");
        }
    };

    useEffect(() => {
        setting();
    }, [login, name]);

    return (
        <div className={style.topbarContainer}>
            <div className={style.topbarWrapper}>
                {/* 로고 클릭시 홈으로 */}
                <div className={style.topbarLeft}>
                    <Link to="/">
                        <img
                            src="/img/Arcane_Title.png"
                            alt="title logo"
                            className={style.logo}
                        />
                    </Link>
                    <form className={style.searchbar} onSubmit={onSubmit}>
                        {/* select box 커스텀해서 나중에 추가하기 (서버 선택용) */}
                        <input
                            placeholder="Search for Username"
                            className={style.searchInput}
                            onChange={onChange}
                        />
                        <Search
                            className={style.searchButton}
                            onSubmit={onSubmit}
                        />
                    </form>
                </div>
                <div className={style.topbarRight}>
                    {isLogin ? (
                        <div className={style.userProfile} ref={myPageDiv}>
                            <AccountCircle
                                className={style.defaultProfile}
                                onClick={myPageClick}
                                ref={myPageIcon}
                            />
                            <div
                                className={`${style.dropMenu}`}
                                ref={dropMenuDiv}
                                style={{ display: "none" }}
                            >
                                <div className={style.username}>
                                    {username ? username : "로그인하세요"}
                                </div>
                                <div
                                    className={style.userInfo}
                                    onClick={ClickMyPage}
                                >
                                    내 정보
                                </div>
                                <div
                                    className={style.islogin}
                                    onClick={LoginClick}
                                >
                                    {username ? "로그아웃" : "로그인"}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={style.auth}>
                            <Link to="/login" className={style.login}>
                                <span>Login</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Topbar;
