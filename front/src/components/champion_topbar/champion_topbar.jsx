import "./champion_topbar.css";
import Champion from "../champion_content/champion.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

function ChampionTopBar() {
    const info_button = document.getElementsByClassName("info_button");
    const [showContent, setContent] = useState(false);

    const changeState = () => {
        setContent(!showContent);
        if (document.getElementById("selected")) {
            info_button[0].removeAttribute("id");
            info_button[0].setAttribute("id", "link");
        } else {
            info_button[0].setAttribute("id", "selected");
        }
    };

    return (
        <>
            <div className="topbarContainer">
                <Link to="/" id="link">
                    홈
                </Link>
                <Link
                    to="/champions"
                    id="link"
                    className="info_button"
                    onClick={changeState}
                >
                    챔피언 정보
                </Link>
            </div>
            {showContent && <Champion />}
        </>
    );
}

export default ChampionTopBar;
