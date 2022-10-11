import { useState, useEffect } from "react";
import { Bookmark, Autorenew } from '@mui/icons-material';
import Riot_API from "../../network/riotAPI";
import style from "./user.module.css";


function User(props) {
    const [summoner, setSummoner] = useState({});
    const [bookToggle, setBookToggle] = useState(false);
    const [profileLink, setProfileLink] = useState();
    const riot = new Riot_API();

    const getSummonerInfo = async () => {
        const profile = await riot.getSummonerProfileIcon(props.summonerData.profileIconId);
        setProfileLink(profile);
        setSummoner(props.summonerData);
    }

    const refresh = () => {
        props.isRefresh(true);
    }

    const marking = (e) => {
        let bookMark = e.target;
        if (bookMark.childNodes.length === 0)
            bookMark = e.target.parentNode;
            
        if (bookToggle) {
            bookMark.classList.remove(style.active);
        } else {
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