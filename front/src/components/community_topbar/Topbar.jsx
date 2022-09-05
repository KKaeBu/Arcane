import style from "./topbar.module.css";
import { Link } from "react-router-dom";
import { AccountCircle } from '@mui/icons-material';

function Topbar() {
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
                {/* 로그인 클릭시 로그인 화면으로 */}
                {/* 로그인이 완료 되면 다시 커뮤니티 화면으로 */}
                <div className={style.auth}>
                    <div className={style.login}>
                        <span>Login</span>
                    </div>
                </div>
                {/* 로그인시에만 보이도록 & 로그인시 유저의 프로필사진이 아무것도 없다면 이것을 사용 */}
                {/* 로그인 여부는 토큰을 활용하여 확인 */}
                {/* <div className={style.userProfile}>
                    <AccountCircle
                        className={style.defaultProfile}
                    />
                </div> */}
            </div>
        </div>
    );
}

export default Topbar;