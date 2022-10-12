import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Search, AccountCircle } from "@mui/icons-material";
import style from "./topbar.module.css";
import tokenStorage from "../../db/token";


function Topbar() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [isLogin, setisLogin] = useState(false);
    const tks = new tokenStorage();

    const onSubmit = async (event) => {
        event.preventDefault(); // 새로고침 방지
        console.log(inputValue);
        if (inputValue !== ""){
            // navigate(`/summoners/${inputValue}`);
            navigate(`/summoners/${inputValue}`, {
                state: {
                    summoner: inputValue,
                }
            })
        }else
            alert("소환사명을 입력해주세요!");
    };

    const onChange = (event) => {
        setInputValue(event.target.value);
    };

    const loginCheck = () => {
        // 로그인된 토큰이 있으면 토근 유무에 따라 로그인 여부를 확인
        // 로그인 여부에 따라 로그인 버튼과 사용자 프로필을 보여줌
        const token = tks.getToken();
        if (token) {
            setisLogin(true);
        } else {
            setisLogin(false);
        }
    }

    useEffect(() => {
        loginCheck();
    }, []);

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
                        <Search className={style.searchButton} onSubmit={onSubmit}/>
                    </form>
                </div>
                <div className={style.topbarRight}>
                    {isLogin ? 
                        <div className={style.userProfile}>
                            <AccountCircle
                                className={style.defaultProfile}
                            />
                        </div>
                        :
                        <div className={style.auth}>
                            <Link to="/login" className={style.login}>
                                <span>Login</span>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Topbar;