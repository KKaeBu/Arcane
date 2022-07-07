import { useState } from "react";
import { Search, LightMode, DarkMode, Language } from "@mui/icons-material";
import "./topbar.css";


function Topbar() {
    const [toggle, setToggle] = useState(true);

    const onclick = () => {
        setToggle(!toggle);
    }

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <img src="/img/Arcane_Title.png" alt="title logo" className="logo"/>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    {/* select box 커스텀해서 나중에 추가하기 (서버 선택용) */}
                    <input placeholder="Search for Username" className="searchInput" />
                    <Search className="searchButton"/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="modeToggle">
                    {/* 아이콘 클릭시마다 변경됨 */}
                    <DarkMode className={toggle ? "toggleIcon active" : "toggleIcon"} onClick={onclick} />
                    <LightMode className={toggle ? "toggleIcon" : "toggleIcon active"} onClick={onclick} />   
                </div>
                <div className="seperate">/</div>
                <div className="languageSelect">
                    <Language className="language"/>
                </div>
            </div>
        </div>
    )
}

export default Topbar;