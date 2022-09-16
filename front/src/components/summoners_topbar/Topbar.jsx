import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import style from "./topbar.module.css";

function Topbar() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault(); // 새로고침 방지
        console.log(inputValue);
        if (inputValue !== ""){
            navigate(`/summoners/${inputValue}`);
        }else
            alert("소환사명을 입력해주세요!");
    };

    const onChange = (event) => {
        setInputValue(event.target.value);
    };

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
        </div>
    );
}

export default Topbar;