import { useState, useEffect } from "react";
import style from "./history.module.css";
import Riot_API from "../../network/riotAPI";

function History(props) {
    const riot = new Riot_API();
    let queueTypeJson; // ddragon에서 가져온 모든 큐 타입 정보
    const matchHistory = document.querySelector("." + style["matchHistory"]);

    const summData = props.summonerData;

    const getMatchHistory = async () => {
        const puuid = summData.puuid;
        if (!puuid)
            return;
        
        const matchIdListData = await riot.getMatchIdList(puuid, 0, 2);
        queueTypeJson = await riot.getQueueType();

        if (matchIdListData) {
            matchIdListData.forEach(async (m) => {
                const matchInfo = await riot.getMatchInfo(m);
                createMatchBox(matchInfo);
            })
        }
            
    }
    
    const createMatchBox = async (data) => {
        const li = document.createElement("id");
        const participants = data.info.participants; // 게임에 참여한 10명의 해당 게임내의 정보 배열
        const queueId = data.info.queueId; // 해당게임의 큐 타입 아이디값
        const queueDate = Unix_timestamp(data.info.gameCreation); // 해당 게임이 진행된 날짜
        let myTeam; // 해당 게임에서 내가 속한 팀의 번호 (100: blue, 200: red)
        let win = "패배"; // 해당 게임에서 승리 여부
        let champion;
        let champLevel;

        let queueType; //해당 게임의 큐타입

        // 게임 큐 타입 확인하기
        for (const k in queueTypeJson) {
            if (queueTypeJson[k].queueId === queueId) {
                queueType = queueTypeConverter(queueTypeJson[k].description);
                break;
            }
        }

        // 내가 속한 팀의 번호 확인
        // 내가 플레이한 챔프 확인
        // 내가 플레이한 챔프 레벨 확인
        // 승리 여부 확인
        for (const p in participants) {
            if (participants[p].summonerId === summData.id) {
                myTeam = participants[p].teamId;
                champion = participants[p].championName;
                champLevel = participants[p].champLevel;
                if (participants[p].win)
                    win = "승리";
                break;
            }
        }

        li.setAttribute("class", style.matchInfoBox);
        createBoxLeft(li, queueType, win, queueDate);
        createBoxLeftToMiddle(li, champion, champLevel);

        console.log(queueType);
    }

    const createBoxLeft = (li, qType, win, qDate) => {
        const div = document.createElement("div");
        const spanQueue = document.createElement("span");
        const spanWin = document.createElement("span");
        const spanDate = document.createElement("span");

        div.setAttribute("class", style.infoLeft);
        spanQueue.innerText = qType;
        spanWin.innerText = win;
        spanDate.innerText = qDate;
        div.appendChild(spanQueue);
        div.appendChild(spanWin);
        div.appendChild(spanDate);

        li.appendChild(div);
    }

    const createBoxLeftToMiddle = async () => {

    }

    useEffect(() => {
        getMatchHistory();
    }, [summData]);
    
    return (
        <div className={style.historyContainer}>
            <div className={style.historyTopbar}>
                <div className={`${style.allHistory} ${style.sortBtn}`}><span>전체</span></div>
                <div className={`${style.soloHistory} ${style.sortBtn}`}><span>솔로랭크</span></div>
                <div className={`${style.flexHistory} ${style.sortBtn}`}><span>자유랭크</span></div>
            </div>
            <ul className={style.matchHistory}>
                <li className={style.matchInfoBox}>
                    <div className={style.infoLeft}>
                        <span>솔로랭크</span>
                        <span>WIN</span>
                        <span>2022/9/24</span>
                    </div>
                    <div className={style.infoLeftToMiddle}>
                        <div className={style.championIcon}>
                            {/* <img src={profileLink} alt="userProfile" className={style.profileIcon} /> */}
                            <div className={style.championImg}></div>
                            <div>
                                <span className={style.championLevel}>18</span>
                            </div>
                        </div>
                        <div className={style.spellBox}>
                            <div className={style.spellD}></div>
                            <div className={style.spellF}></div>
                        </div>
                        <div className={style.runeBox}>
                            <div className={style.mainRune}></div>
                            <div className={style.subRune}></div>
                        </div>
                    </div>
                    <div className={style.infoMiddle1}>
                        <ul className={style.itemBuild}>
                            <li className={style.item}></li>
                            <li className={style.item}></li>
                            <li className={style.item}></li>
                            <li className={style.item}></li>
                            <li className={style.item}></li>
                            <li className={style.item}></li>
                        </ul>
                        <div className={`${style.item} ${style.wardItem}`}></div>
                    </div>
                    <div className={style.infoMiddle2}>
                        <span>8 / 2 / 5</span>
                        <span>평점: 6.50</span>
                        <span>CS 213</span>
                    </div>
                    <div className={style.infoMiddleToRight}>
                        <span>38:28</span>
                    </div>
                    <div className={style.infoRight}>
                        <ul className={style.blueTeams}>
                            <li className={style.summoner}>
                                <div className={style.playedChampionImg}></div>
                                <span className={style.summonerName}>hide on bush</span>
                            </li>
                            <li className={style.summoner}>
                                <div className={style.playedChampionImg}></div>
                                <span className={style.summonerName}>hide on bush</span>
                            </li>
                            <li className={style.summoner}>
                                <div className={style.playedChampionImg}></div>
                                <span className={style.summonerName}>hide on bush</span>
                            </li>
                            <li className={style.summoner}>
                                <div className={style.playedChampionImg}></div>
                                <span className={style.summonerName}>hide on bush</span>
                            </li>
                            <li className={style.summoner}>
                                <div className={style.playedChampionImg}></div>
                                <span className={style.summonerName}>hide on bush</span>
                            </li>
                        </ul>
                        <ul className={style.redTeams}>
                            <li className={style.summoner}>
                                <div className={style.playedChampionImg}></div>
                                <span className={style.summonerName}>hide on bush</span>
                            </li>
                            <li className={style.summoner}>
                                <div className={style.playedChampionImg}></div>
                                <span className={style.summonerName}>hide on bush</span>
                            </li>
                            <li className={style.summoner}>
                                <div className={style.playedChampionImg}></div>
                                <span className={style.summonerName}>hide on bush</span>
                            </li>
                            <li className={style.summoner}>
                                <div className={style.playedChampionImg}></div>
                                <span className={style.summonerName}>hide on bush</span>
                            </li>
                            <li className={style.summoner}>
                                <div className={style.playedChampionImg}></div>
                                <span className={style.summonerName}>hide on bush</span>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
}

// 타임스탬프 값을 년월일로 변환
function Unix_timestamp(t) {
    const date = new Date(t);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return (year + "-" + month + "-" + day);
}

/**해당 유저의 큐 타입명을 한글로 변환해줌 */
function queueTypeConverter(queue) {
    let convertedQueue; 
    switch (queue) {
        case "5v5 Ranked Flex games":
            convertedQueue = "자유랭크";
            break;
        case "5v5 Ranked Solo games":
            convertedQueue = "솔로랭크";
            break;
        case "5v5 ARAM games":
            convertedQueue = "무작위 총력전";
            break;
        case "Ultimate Spellbook games":
            convertedQueue = "궁국기 주문서";
            break;
        
        default:
            convertedQueue = "일반";
            break;
    }
    
    return convertedQueue;
}

export default History;