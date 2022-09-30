import { useState, useEffect } from "react";
import style from "./history.module.css";
import Riot_API from "../../network/riotAPI";

function History(props) {
    const riot = new Riot_API();
    let queueTypeJson; // ddragon에서 가져온 모든 큐 타입 정보
    let spellJson; // ddragon에서 가져온 모든 스펠 정보
    let runesJson; // ddragon에서 가져온 모든 룬 정보
    const matchHistory = document.querySelector("." + style["matchHistory"]);

    const summData = props.summonerData;

    const getMatchHistory = async () => {
        const puuid = summData.puuid;
        if (!puuid)
            return;
        
        const matchIdListData = await riot.getMatchIdList(puuid, 0, 2);
        queueTypeJson = await riot.getQueueType();
        spellJson = await riot.getAllSpell();
        runesJson = await riot.getAllRunes();

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
        let champion; // 해당 게임에서 내가 플레이한 챔피언
        let champLevel; //해당 게임에서 내가 플레이한 챔피언의 최종 레벨
        let spells; //해당 게임에서 내가 사용한 소환사 스펠 정보 (2개: D, F), Array
        let runes; // 해당 게임에서 내가 사용한 룬 정보 (3개: 메인룬, 메인룬의 세부룬, 서브의메인룬), Array

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
                spells = checkSpell(participants[p].summoner1Id.toString(), participants[p].summoner2Id.toString());
                runes = checkRune(
                    participants[p].perks.styles[0].style,
                    participants[p].perks.styles[0].selections[0].perk,
                    participants[p].perks.styles[1].style
                );
                if (participants[p].win)
                    win = "승리";
                break;
            }
        }

        li.setAttribute("class", style.matchInfoBox);
        createBoxLeft(li, queueType, win, queueDate);
        createBoxLeftToMiddle(li, champion, champLevel, spells, runes);

        console.log(queueType);

        matchHistory.appendChild(li);
    }

    const checkSpell = (spell1, spell2) => {
        let spells = new Array(2);
        for (const s in spellJson.data) {
            switch (spellJson.data[s].key) {
                case spell1:
                    spells[0] = spellJson.data[s].image.full;
                    break;
                
                case spell2:
                    spells[1] = spellJson.data[s].image.full;
                    break;
            }
        }

        return spells;
    }

    const checkRune = (mainRuneId, mainRuneDetailId ,subRuneId) => {
        let runes = new Array(3);
        for (const r in runesJson) {
            switch (runesJson[r].id) {
                case mainRuneId:
                    runes[0] = runesJson[r].key;
                    for (const sr in runesJson[r].slots[0].runes) {
                        if (runesJson[r].slots[0].runes[sr].id === mainRuneDetailId) {
                            runes[1] = runesJson[r].slots[0].runes[sr].key;
                            break;
                        }
                    }
                    break;
                
                case subRuneId:
                    runes[2] = runesJson[r].key;
                    break;
            }
        }

        return runes;
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

    const createBoxLeftToMiddle = async (li, champion, champLevel, spells, runes) => {
        // 요소 생성
        const infoLeftToMiddle = document.createElement("div");
        const championIcon = document.createElement("div");
        const spellBox = document.createElement("div");
        const runeBox = document.createElement("div");
        const championImg = document.createElement("img");
        const levelWrapper = document.createElement("div");
        const championLevel = document.createElement("span");
        const spellD = document.createElement("img");
        const spellF = document.createElement("img");
        const mainRune = document.createElement("img");
        const subRune = document.createElement("img");

        // 필요한 이미지 링크 불러오기
        const championImgLink = await riot.getChampionSquareAssetsLink(champion);
        const spell1Link = await riot.getSpellImgLink(spells[0]);
        const spell2Link = await riot.getSpellImgLink(spells[1]);
        const mainRuneLink = await riot.getMainRuneImgLink(runes[0], runes[1]);
        const subRuneLink = await riot.getSubRuneImgLink(runes[2], runes[2]);

        // 요소에 속성 부여
        infoLeftToMiddle.setAttribute("class", style.infoLeftToMiddle);
        championIcon.setAttribute("class", style.championIcon);
        spellBox.setAttribute("class", style.spellBox);
        runeBox.setAttribute("class", style.runeBox);
        championImg.setAttribute("class", style.championImg);
        levelWrapper.setAttribute("class", style.levelWrapper);
        championLevel.setAttribute("class", style.championLevel);
        spellD.setAttribute("class", style.spellD);
        spellF.setAttribute("class", style.spellF);
        mainRune.setAttribute("class", style.mainRune);
        subRune.setAttribute("class", style.subRune);

        // 이미지 테그들에 src, alt 속성 부여
        championImg.setAttribute("src", championImgLink);
        championImg.setAttribute("alt", "champion square image");
        spellD.setAttribute("src", spell1Link);
        spellD.setAttribute("alt", "summoner spell1 image");
        spellF.setAttribute("src", spell2Link);
        spellF.setAttribute("alt", "summoner spell2 image");
        mainRune.setAttribute("src", mainRuneLink);
        mainRune.setAttribute("alt", "main rune image");
        subRune.setAttribute("src", subRuneLink);
        subRune.setAttribute("alt", "sub rune image");

        // 각 테그들의 부모자식 관계 설정
        levelWrapper.appendChild(championLevel);

        championIcon.appendChild(championImg);
        championIcon.appendChild(levelWrapper);

        spellBox.appendChild(spellD);
        spellBox.appendChild(spellF);

        runeBox.appendChild(mainRune);
        runeBox.appendChild(subRune);

        infoLeftToMiddle.appendChild(championIcon);
        infoLeftToMiddle.appendChild(spellBox);
        infoLeftToMiddle.appendChild(runeBox);

        li.appendChild(infoLeftToMiddle);
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
                    {/* left */}
                    <div className={style.infoLeft}>
                        <span>솔로랭크</span>
                        <span>WIN</span>
                        <span>2022/9/24</span>
                    </div>
                    {/* left to middle */}
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
                    {/* middle 1 */}
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
                    {/* middle 2 */}
                    <div className={style.infoMiddle2}>
                        <span>8 / 2 / 5</span>
                        <span>평점: 6.50</span>
                        <span>CS 213</span>
                    </div>
                    {/* middle to right */}
                    <div className={style.infoMiddleToRight}>
                        <span>38:28</span>
                    </div>
                    {/* right */}
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