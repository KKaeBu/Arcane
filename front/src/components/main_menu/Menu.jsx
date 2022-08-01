import {
  SmartToy,
  Category,
  EmojiEvents,
  Construction,
  Equalizer,
  Forum,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import style from './menu.module.css';


function Menu() {
    // const menuContainer = document.querySelector("menuContainer");
    // const mainMenuBtn = document.querySelector("menuMainButton");



    const onClick = (e) => {
        console.log(e.target);
        const dd = document.querySelector("." + style["menuContainer"]);
        console.log(dd);
        console.log(style);
        console.log(style["menuContainer"]);

        // const n = document.createElement("div");
        // n.setAttribute("class", style.newBox);
        // dd.appendChild(n);
    }

    const btnColor = () => {
        
    }

    return (
        <div className={style.menuContainer}>
            <div className={style.menuMainButton}  onClick={onClick}>
                <p>Menu</p>
            </div>
            <div className={`${style.menuSubButtonItem} ${style.menuSubChampionBtn}`}>
                <Link
                    to="/champions"
                    className={style.menuSubItemContainer}
                >
                    <SmartToy className={style.icon} />
                    <p>챔피언 분석</p>
                </Link>
            </div>
            <div className={`${style.menuSubButtonItem} ${style.menuSubItemBtn}`}>
                <div className={style.menuSubItemContainer}>
                    <Category className={style.icon} />
                    <p>아이템 조합</p>
                </div>
            </div>
            <div className={`${style.menuSubButtonItem} ${style.menuSubRankingBtn}`}>
                <div className={style.menuSubItemContainer}>
                    <EmojiEvents className={style.icon} />
                    <p>랭킹</p>
                </div>
            </div>
            <div className={`${style.menuSubButtonItem} ${style.menuSubBuildBtn}`}>
                <div className={style.menuSubItemContainer}>
                    <Construction className={style.icon} />
                    <p>빌드</p>
                </div>
            </div>
            <div className={`${style.menuSubButtonItem} ${style.menuStatisticsBtn}`}>
                <div className={style.menuSubItemContainer}>
                    <Equalizer className={style.icon} />
                    <p>통계</p>
                </div>
            </div>
            <div className={`${style.menuSubButtonItem} ${style.menuComunnityBtn}`}>
                <div className={style.menuSubItemContainer}>
                    <Forum className={style.icon} />
                    <p>커뮤니티</p>
                </div>
            </div>
        </div>
    )
}

export default Menu;