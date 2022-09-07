import style from "./topbar.module.css";
import { Link } from "react-router-dom";
import { AccountCircle } from '@mui/icons-material';
import { useState, useEffect } from "react";
import tokenStorage from "../../db/token";

function Topbar() {
    const [isLogin, setisLogin] = useState(false);
    const tks = new tokenStorage();

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
            <div className={style.topbarLeft}>
                {/* 로고 클릭시 홈으로 */}
                <Link to="/">
                    <img
                        src="/img/Arcane_Title.png"
                        alt="title logo"
                        className={style.logo}
                    />
                </Link>
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
    );
}

export default Topbar;