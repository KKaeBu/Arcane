import { useState, useEffect } from "react";
import style from "./rank.module.css";

function Rank(props) {
    const [summoner, setSummoner] = useState({});

    const summData = props.summonerData;

    const getLeague = async () => {
        setSummoner(summData);
    }

    useEffect(() => {
        getLeague();
    }, [summData]);

    return (
        <div className={style.rankContainer}>
            <div className={style.soloRankWrapper}>
                <div className={style.soloLeft}>
                    <img
                        src={findTierImg(tierCamelcase(summoner.soloRankTier))}
                        className={style.TierImg}
                        alt="Tier img"
                    />
                    <span className={style.TierLabel}>
                        {summoner.soloRankTier ?
                            tierCamelcase(summoner.soloRankTier) + " " + rankConverter(summoner.soloRankRank)
                            :
                            "Unranked"
                        }
                    </span>
                </div>
                <div className={style.soloRight}>
                    <span className={style.queueType}>{queueTypeConverter(summoner.soloRankQueueType)}</span>
                    <br />
                    <span className={style.leaguePoints}>
                        <b style={{ color: "gold" }}>
                            {summoner.soloRankLP ? summoner.soloRankLP : "0"}
                        </b> LP
                    </span>
                    <span className={style.winRate}>승률&nbsp;
                        <b style={{color: "blue"}}>{calcWinRate(summoner.soloRankWinNum, summoner.soloRankLoseNum)}%</b>
                    </span>
                    <br />
                    <span className={style.totalMatch}>
                        {summoner.soloRankWinNum ?
                            `(${summoner.soloRankWinNum + summoner.soloRankLoseNum}전 ${summoner.soloRankWinNum}승 ${summoner.soloRankLoseNum}패)`
                            :
                            "(0전 0승 패)"
                        }
                    </span>
                </div>
            </div>

            <div className={style.flexRankWrapper}>
                <div className={style.flexLeft}>
                    <img
                        src={findTierImg(tierCamelcase(summoner.flexRankTier))}
                        className={style.TierImg}
                        alt="Tier img"
                    />
                    <span className={style.TierLabel}>
                        {summoner.flexRankTier ?
                            tierCamelcase(summoner.flexRankTier) + " " + rankConverter(summoner.flexRankRank)
                            :
                            "Unranked"
                        }
                    </span>
                </div>
                <div className={style.flexRight}>
                    <span className={style.queueType}>{queueTypeConverter(summoner.flexRankQueueType)}</span>
                    <br />
                    <span className={style.leaguePoints}>
                        <b style={{ color: "gold" }}>
                            {summoner.flexRankLP ? summoner.flexRankLP : "0"}
                        </b> LP
                    </span>
                    <span className={style.winRate}>승률&nbsp;
                        <b style={{color: "blue"}}>{calcWinRate(summoner.flexRankWinNum, summoner.flexRankLoseNum)}%</b>
                    </span>
                    <br />
                    <span className={style.totalMatch}>
                        {summoner.flexRankWinNum ?
                            `(${summoner.flexRankWinNum + summoner.flexRankLoseNum}전 ${summoner.flexRankWinNum}승 ${summoner.flexRankLoseNum}패)`
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
    let convertedRank = "";
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