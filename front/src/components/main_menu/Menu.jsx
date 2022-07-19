import {
  SmartToy,
  Category,
  EmojiEvents,
  Construction,
  Equalizer,
  Forum,
} from "@mui/icons-material";
import style from './menu.module.css';


function Menu() {
    // const menuContainer = document.querySelector("menuContainer");
    // const mainMenuBtn = document.querySelector("menuMainButton");



    const onClick = (e) => {
        console.log(e.target);

    }

    const btnColor = () => {
        
    }

    return (
        <div className={style.menuContainer}>
            <div className={style.menuMainButton}  onClick={onClick}>
                <p>Menu</p>
            </div>
            <div className={`${style.menuSubButtonItem} ${style.menuSubChampionBtn}`}>
                <div className={style.menuSubItemContainer}>
                    <SmartToy />
                    <p>챔피언 분석</p>
                </div>
            </div>
            <div className={`${style.menuSubButtonItem} ${style.menuSubItemBtn}`}>
                <div className={style.menuSubItemContainer}>
                    <Category />
                    <p>아이템 조합</p>
                </div>
            </div>
            <div className={`${style.menuSubButtonItem} ${style.menuSubRankingBtn}`}>
                <div className={style.menuSubItemContainer}>
                    <EmojiEvents />
                    <p>랭킹</p>
                </div>
            </div>
            <div className={`${style.menuSubButtonItem} ${style.menuSubBuildBtn}`}>
                <div className={style.menuSubItemContainer}>
                    <Construction />
                    <p>빌드</p>
                </div>
            </div>
            <div className={`${style.menuSubButtonItem} ${style.menuStatisticsBtn}`}>
                <div className={style.menuSubItemContainer}>
                    <Equalizer />
                    <p>통계</p>
                </div>
            </div>
            <div className={`${style.menuSubButtonItem} ${style.menuComunnityBtn}`}>
                <div className={style.menuSubItemContainer}>
                    <Forum />
                    <p>커뮤니티</p>
                </div>
            </div>
        </div>
    )
}

export default Menu;