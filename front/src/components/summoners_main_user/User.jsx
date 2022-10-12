import { useState, useEffect } from "react";
import { Bookmark, Autorenew, Dvr } from '@mui/icons-material';
import Riot_API from "../../network/riotAPI";
import style from "./user.module.css";
import TokenStorage from "../../db/token";
import DB from "../../db/db";


function User(props) {
    const [summoner, setSummoner] = useState({});
    const [bookToggle, setBookToggle] = useState(false);
    const [profileLink, setProfileLink] = useState();
    const [isLogin, setLogin] = useState(false);
    const [userName, setuserNmae] = useState();
    const riot = new Riot_API();
    const token = new TokenStorage();
    const db = new DB();

    const getSummonerInfo = async () => {
        const profile = await riot.getSummonerProfileIcon(props.summonerData.profileIconId);

        if (props.isLogin && props.summonerData.name && props.userName) {
            const sn = props.summonerData.name;
            const un = props.userName;
            console.log(await db.checkMarking(sn, un)); 
            if (await db.checkMarking(sn, un)) {
                console.log("오긴하냐?");
                const bookMark = document.querySelector("." + style["bookMark"]);
                bookMark.classList.add(style.active);   
            }
        }

        setProfileLink(profile);
        setSummoner(props.summonerData);
        setLogin(props.isLogin);
        setuserNmae(props.userName);
    }

    const refresh = () => {
        props.isRefresh(true);
    }

    const marking = (e) => {
        if (!isLogin) {
            alert("로그인이 필요한 기능입니다!");
            return;
        }

        let bookMark = e.target;
        if (bookMark.childNodes.length === 0)
            bookMark = e.target.parentNode;
            
        
        if (bookToggle) {
            // 북마크 해제시
            bookMark.classList.remove(style.active);
        } else {
            // 북마크 설정시
            db.bookMarkingDB(summoner.name, userName);
            bookMark.classList.add(style.active);
        }

        setBookToggle(!bookToggle);
    }

    useEffect(() => {
        getSummonerInfo();
    }, [props]);

    return (
        <div className={style.userContainer}>
            <div className={style.userProfile}>
                <div className={style.icon}>
                    <img src={profileLink} alt="userProfile" className={style.profileIcon} />
                    <div>
                        <span className={style.level}>{props.summonerData.summonerLevel}</span>
                    </div>
                </div>
            </div>
            <div className={style.userInfo}>
                <div className={style.nameAndBook}>
                    <span className={style.userName}>{props.summonerData.name}</span>
                    <Bookmark className={style.bookMark} onClick={marking} />
                </div>
                <div className={style.refreshHistory} onClick={refresh}>
                    <Autorenew className={style.refreshIcon}/>
                    <span className={style.refreshLabel}>전적 갱신</span>
                </div>
            </div>
        </div>
    );
}

export default User;