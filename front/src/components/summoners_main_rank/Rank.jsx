import { useState, useEffect } from "react";
import Riot_API from "../../network/riotAPI";
import style from "./rank.module.css";

function Rank(props) {
    const riot = new Riot_API();
    const [soloRank, setSoloRank] = useState({});
    const [flexRank, setFlexRank] = useState({});

    const summData = props.summonerData;

    const getLeague = async () => {
        try {
            setSoloRank({});
            setFlexRank({});
            if(summData)
                await leagueReq();
        } catch (error) {
            
        }
    }

    /**라이엇 api로 부터 특정 유저의 랭크 정보를 불러와주고 이를 랭크별로 저장함 (axios 사용) */
    const leagueReq = async () => {
        const rankData = await riot.getSummonerLeague(summData.id);
        rankData.forEach(r => {
            if (r.queueType === "RANKED_SOLO_5x5") {
                setSoloRank(r);
            } else {
                setFlexRank(r);
            }
        });
    }

    useEffect(() => {
        getLeague();
    }, [summData]);

    return (
        <div className={style.rankContainer}>
            <div className={style.soloRankWrapper}>
                <div className={style.soloLeft}>
                    <img
                        src={findTierImg(tierCamelcase(soloRank.tier))}
                        className={style.TierImg}
                        alt="Tier img"
                    />
                    <span className={style.TierLabel}>
                        {soloRank.tier ?
                            tierCamelcase(soloRank.tier) + " " + rankConverter(soloRank.rank)
                            :
                            "Unranked"
                        }
                    </span>
                </div>
                <div className={style.soloRight}>
                    <span className={style.queueType}>{queueTypeConverter(soloRank.queueType)}</span>
                    <br />
                    <span className={style.leaguePoints}>
                        <b style={{ color: "gold" }}>
                            {soloRank.leaguePoints ? soloRank.leaguePoints : "0"}
                        </b> LP
                    </span>
                    <span className={style.winRate}>승률&nbsp;
                        <b style={{color: "blue"}}>{calcWinRate(soloRank.wins, soloRank.losses)}%</b>
                    </span>
                    <br />
                    <span className={style.totalMatch}>
                        {soloRank.wins ?
                            `(${soloRank.wins + soloRank.losses}전 ${soloRank.wins}승 ${soloRank.losses}패)`
                            :
                            "(0전 0승 패)"
                        }
                    </span>
                </div>
            </div>

            <div className={style.flexRankWrapper}>
                <div className={style.flexLeft}>
                    <img
                        src={findTierImg(tierCamelcase(flexRank.tier))}
                        className={style.TierImg}
                        alt="Tier img"
                    />
                    <span className={style.TierLabel}>
                        {flexRank.tier ?
                            tierCamelcase(flexRank.tier) + " " + rankConverter(flexRank.rank)
                            :
                            "Unranked"
                        }
                    </span>
                </div>
                <div className={style.flexRight}>
                    <span className={style.queueType}>{queueTypeConverter(flexRank.queueType)}</span>
                    <br />
                    <span className={style.leaguePoints}>
                        <b style={{ color: "gold" }}>
                            {flexRank.leaguePoints ? flexRank.leaguePoints : "0"}
                        </b> LP
                    </span>
                    <span className={style.winRate}>승률&nbsp;
                        <b style={{color: "blue"}}>{calcWinRate(flexRank.wins, flexRank.losses)}%</b>
                    </span>
                    <br />
                    <span className={style.totalMatch}>
                        {flexRank.wins ?
                            `(${flexRank.wins + flexRank.losses}전 ${flexRank.wins}승 ${flexRank.losses}패)`
                            :
                            "(0전 0승 패)"
                        }
                    </span>
                </div>
            </div>
        </div>
    );
}

/**해당 유저의 승률을 계산하여 반환해줌 */
function calcWinRate(wins, losses) {
    const total = wins + losses;
    let winRate = "0";
    if (total) {
        winRate = ((wins / total) * 100).toFixed(2);
        
    }
    return winRate;
}

/**해당 유저의 큐 타입명을 한글로 변환해줌 */
function queueTypeConverter(queue) {
    let convertedQueue;
    if (queue === "RANKED_SOLO_5x5")
        convertedQueue = "솔로랭크";
    else if (queue === "RANKED_FLEX_SR")
        convertedQueue = "자유랭크";
    else
        convertedQueue = "Unranked";
    
    return convertedQueue;
}

/**해당 유저의 티어를 받고 맞는 이미지를 찾아줌 */
function findTierImg(tier) {
    let imgloc;
    imgloc = "/img/ranked-emblems" + "/Emblem_" + tier + ".png";
    return imgloc;
}

/**해당 유저의 티어를 CamelCase 형태로 변환해줌 */
function tierCamelcase(tier) {
    let convertedTier = "Unranked";
    if (tier) {
        const first = tier.charAt(0);
        const remain = tier.substr(1).toLowerCase();
        convertedTier = first + remain;   
    }
    return convertedTier;
}

/**해당 유저의 랭크를 로마숫자에서 기본 숫자로 변환해줌 */
function rankConverter(rank) {
    let convertedRank;
    switch (rank) {
        case "I":
            convertedRank = "1";
            break;
        case "II":
            convertedRank = "2";
            break;
        case "III":
            convertedRank = "3";
            break;
        case "IV":
            convertedRank = "4";
            break;
    }

    return convertedRank;
}

export default Rank;