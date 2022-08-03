import Champion from "../champions/champions.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./champion_topbar.module.css";

function ChampionTopBar() {
    const info_button = document.querySelector("." + style["info_button"]);
    const [showContent, setContent] = useState(false);

    const changeState = () => {
        setContent(!showContent);
        if (document.querySelector("." + style["selected"])) {
            info_button[0].removeAttribute("id");
            info_button[0].setAttribute("id", style.link);
        } else {
            info_button[0].setAttribute("id", style.selected);
        }
    };

    return (
        <>
            <div className={style.topbarContainer}>
                <Link to="/" id={style.link}>
                    홈
                </Link>
                <Link
                    to="/champions"
                    id={style.link}
                    className={style.info_button}
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
