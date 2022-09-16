import { useState, useEffect } from "react";
import Riot_API from "../../network/riotAPI";
import style from "./rank.module.css";

function Rank(props) {
    const riot = new Riot_API();
    const [leagueData, setLeagueData] = useState();

    const getLeague = async () => {
        try {
            const leagueJson = await riot.getSummonerLeague(props.encryptedSummonerId);
            console.log(leagueJson);
        } catch (error) {
            console.log("error rank");
        }
    }

    useEffect(() => {
        getLeague();
    }, [props]);
    return (
        <div className={style.rankContainer}>
            <div className={style.soloRankWrapper}>
                <div className={style.soloLeft}>

                </div>
                <div className={style.soloRight}>

                </div>
            </div>
            <div className={style.flexRankWrapper}>
                <div className={style.flexLeft}>

                </div>
                <div className={style.flexRight}>

                </div>
            </div>
        </div>
    );
}

export default Rank;