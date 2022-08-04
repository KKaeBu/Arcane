import { useState } from "react";
import { Search, LightMode, DarkMode, Language } from "@mui/icons-material";
import style from "./topbar.module.css";
import axios from "axios";


function Topbar() {
    const [toggle, setToggle] = useState(true);
    const [inputValue, setInputValue] = useState("");

    const onSubmit = (event) => {
        event.preventDefault(); // 새로고침 방지
        
        axios//
            .post("/search", {
                searchValue: inputValue,
            })
            .then((res) => {
                console.log(res);
            })
            .catch(console.log("오류남 ㅋ"));
    }

    const onChange = (event) => {
        setInputValue(event.target.value);
    }

    const onclick = () => {
        setToggle(!toggle);
    }

    return (
        <div className={style.topbarContainer}>
            <div className={style.topbarLeft}>
                <img src="/img/Arcane_Title.png" alt="title logo" className={style.logo}/>
            </div>
            <div className={style.topbarCenter}>
                <form className={style.searchbar} onSubmit={onSubmit}>
                    {/* select box 커스텀해서 나중에 추가하기 (서버 선택용) */}
                    <input placeholder="Search for Username" className={style.searchInput} onChange={onChange} />
                    <Search className={style.searchButton}/>
                </form>
            </div>
            <div className={style.topbarRight}>
                <div className={style.modeToggle}>
                    {/* 아이콘 클릭시마다 변경됨 */}
                    <DarkMode className={toggle ? `${style.toggleIcon} ${style.active}` : style.toggleIcon} onClick={onclick} />
                    <LightMode className={toggle ? style.toggleIcon : `${style.toggleIcon} ${style.active}`} onClick={onclick} />   
                </div>
                <div className={style.seperate}>/</div>
                <div className={style.languageSelect}>
                    <Language className={style.language}/>
                </div>
            </div>
        </div>
    )
}

export default Topbar;