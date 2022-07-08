import "./champion_topbar.css";
import Champion from "../champion_content/champion.jsx";
import { useState } from "react";

function ChampionTopBar() {
    const [showContent, setContent] = useState(false);
    const changeState = () => {
        setContent(!showContent);
    };
    return (
        <>
            <div className="topbarContainer">
                <button>홈</button>
                <button onClick={changeState}>챔피언 정보</button>
                <button></button>
            </div>
            {showContent && <Champion />}
        </>
    );
}

export default ChampionTopBar;
