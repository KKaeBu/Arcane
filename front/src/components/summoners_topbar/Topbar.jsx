import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import style from "./topbar.module.css";

function Topbar() {
    return (
        <div className={style.topbarContainer}>
            <div className={style.topbarWrapper}>
                {/* 로고 클릭시 홈으로 */}
                <Link to="/">
                    <img
                        src="/img/Arcane_Title.png"
                        alt="title logo"
                        className={style.logo}
                    />
                </Link>
                <form className={style.searchbar}>
                    {/* select box 커스텀해서 나중에 추가하기 (서버 선택용) */}
                    <input
                        placeholder="Search for Username"
                        className={style.searchInput}
                    />
                    <Search className={style.searchButton}/>
                </form>
            </div>
        </div>
    );
}

export default Topbar;