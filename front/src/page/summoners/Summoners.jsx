import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./summoners.module.css";
import Topbar from "../../components/summoners_topbar/Topbar.jsx";
import User from "../../components/summoners_main_user/User.jsx";
import Rank from "../../components/summoners_main_rank/Rank.jsx";
import Most from "../../components/summoners_main_most/Most";
import History from "../../components/summoners_main_history/History.jsx";
import Footer from "../../components/summoners_footer/Footer.jsx";
import Riot_API from "../../network/riotAPI";
import DB from "../../db/db";


function Summoners() {
    const summoner = useLocation().state.summoner;
    localStorage.setItem("summoner", summoner);
    const [summonerData, setSummonerData] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [isDB, setIsDB] = useState(false);
    const [matchStart, setMatchStart] = useState(0);
    const [matchCount, setMatchCount] = useState(2);

    let queueTypeJson; // ddragon에서 가져온 모든 큐 타입 정보
    let spellJson; // ddragon에서 가져온 모든 스펠 정보
    let runesJson; // ddragon에서 가져온 모든 룬 정보

    const riot = new Riot_API();
    const db = new DB();

    const findSummoner = async () => {
        const user = localStorage.getItem("summoner");
        queueTypeJson = await riot.getQueueType();
        spellJson = await riot.getAllSpell();
        runesJson = await riot.getAllRunes();

        try{
            const summonerJson = await riot.getSummoner(user);
            
            if (summonerJson && await db.isSummoner(summonerJson.name)) {
                // 데베에 검색한 유저가 있다면 -> 해당 유저의 데이터를 가져옴
                const DB_summoner = await db.getSummonerInfo(summonerJson.name);
                console.log("유저가 있군요!: ", DB_summoner);
                setSummonerData(DB_summoner);
                setIsDB(true);
            } else {
                // 데베에 검색한 유저가 없다면 -> 해당 유저의 데이터를 디비에 저장함
                // 즉, 처음 검색해보는 유저일 경우
                const rankData = await riot.getSummonerLeague(summonerJson.id);
                console.log(rankData);
                const matchIdListData = await riot.getMatchIdList(summonerJson.puuid, matchStart, matchCount);                

                const matchHistoryList = await Promise.all(
                    matchIdListData.map(m => {
                        return getMatchInfo(m, summonerJson);
                    })
                )

                console.log(matchHistoryList);

                // const DB_saveHistory = db.saveMatchHistory(summonerJson.summonerName, await matchHistoryList);
                const DB_summoner = await db.saveSummonerInfo(summonerJson, await rankData, matchHistoryList);
                console.log("첨 검색했군요!: ", DB_summoner);
                setSummonerData(DB_summoner);
                setIsDB(false);
            }

            // setSummonerData(summonerJson);
        }catch(e){
            console.log("존재하지 않는 유저 입니다.");
            console.log("not found error: " + e);
        }

    }

    const getMatchInfo = async (m, summ) => {
        const data = {
            summonerName: summ.name,
            participants: [],
        };      

        const json = await riot.getMatchInfo(m);
        const queueId = json.info.queueId; // 해당게임의 큐 타입 아이디값
        const participants = json.info.participants; // 게임에 참여한 10명의 해당 게임내의 정보 배열
        data.queueDate = Unix_timestamp(json.info.gameCreation); // 해당 게임이 진행된 날짜
        data.time = calcPlayedTime(json.info.gameStartTimestamp, json.info.gameEndTimestamp); // 해당 게임의 플레이 시간

        let win = "패배"; // 해당 게임에서 승리 여부
        let spells; //해당 게임에서 내가 사용한 소환사 스펠 정보 (2개: D, F), Array
        let runes; // 해당 게임에서 내가 사용한 룬 정보 (3개: 메인룬, 메인룬의 세부룬, 서브의메인룬), Array

        // 게임 큐 타입 확인하기
        for (const k in queueTypeJson) {
            if (queueTypeJson[k].queueId === queueId) {
                data.queueType = queueTypeConverter(queueTypeJson[k].description);
                break;
            }
        }

        // 내가 속한 팀의 번호 확인
        // 내가 플레이한 챔프 확인
        // 내가 플레이한 챔프 레벨 확인
        // 내가 사용한 스펠 정보 확인
        // 내가 사용한 룬 정보 확인
        // 내가 기록한 K/D/A확인
        // 같이 플레이한 소환사들의 정보
        // 승리 여부 확인
        for (const p in participants) { 
            data.participants.push(summonersInfo(participants[p]));
            if (participants[p].summonerId === summ.id) {
                data.champion = await riot.getChampionSquareAssetsLink(participants[p].championName);
                data.championLevel = participants[p].champLevel;
                spells = checkSpell(participants[p].summoner1Id.toString(), participants[p].summoner2Id.toString());
                data.spell1 = await riot.getSpellImgLink(spells[0]);
                data.spell2 = await riot.getSpellImgLink(spells[1]);
                runes = checkRune(
                    participants[p].perks.styles[0].style,
                    participants[p].perks.styles[0].selections[0].perk,
                    participants[p].perks.styles[1].style
                );
                data.mainRune = await riot.getMainRuneImgLink(runes[0], runes[1]);
                data.subRune = await riot.getSubRuneImgLink(runes[2], runes[2]);
                data.item0 = await riot.getItemImgLink(participants[p].item0);
                data.item1 = await riot.getItemImgLink(participants[p].item1);
                data.item2 = await riot.getItemImgLink(participants[p].item2);
                data.item3 = await riot.getItemImgLink(participants[p].item3);
                data.item4 = await riot.getItemImgLink(participants[p].item4);
                data.item5 = await riot.getItemImgLink(participants[p].item5);
                data.item6 = await riot.getItemImgLink(participants[p].item6);
                data.kills = participants[p].kills;
                data.deaths = participants[p].deaths;
                data.assists = participants[p].assists;
                if (participants[p].challenges)
                    data.kda = participants[p].challenges.kda.toString();
                else
                    data.kda = ((participants[p].kills + participants[p].assists) / participants[p].deaths).toString();
                data.cs = participants[p].neutralMinionsKilled + participants[p].totalMinionsKilled;
                if (participants[p].win)
                    win = "승리";
            }
        }

        data.result = win;

        console.log("data: ", data);

        return data;
    }

    const summonersInfo = (participant) => {
        const championLink = riot.getChampionIcon(participant.championName)
        const pInfo = {
            "summonerName": participant.summonerName,
            "champion": championLink,
        };

        return pInfo
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

    const isRefresh = (r) => {
        setRefresh(!refresh);
    }

    const isMoreMatch = () => {
        setMatchStart(matchStart + matchCount);
        // 여기부터임
        // 더 불러오기 버튼 눌렀을때, 우선 디비에 데이터 있는지 확인후 있다면 디비에서 불러와서
        // 히스토리 컴포넌트를 현재 상태는 유지한채 불러온 데이터만 추가
        // 디비에 데이터가 없다면 새롭게 라이엇에서 불러와서
        // 디비에 저장 후 해당 데이터를 위와 동일하게 컴포넌트에 전달하여 추가

        // 이거 끝나면 전적 갱신도 해야댐
        // 전적 갱신 버튼은 클릭시 기존 전적은 그대로 두되
        // 새롭게 추가되는 데이터가 있다면 해당 데이터를 가장 위에다 추가
        // 단, 이때 데이터가 2개 이상이라면 역순으로 추가 해줘야함
        // 받아온 데이터는 [1, 2, 3] 순으로 되있으면 원래 1 넣고 -> 2넣고 -> 3넣고 하는 순선데
        // 이를 역순으로 3, 2, 1 순으로 집어 넣어줘야 가장 최근게 위로 가게됨
    }

    useEffect(() => {
        findSummoner();
    }, [summoner]);
    
    return (
        <div className={style.summonersContainer}>
            <div className={style.summonersWrapper}>
                <Topbar />
                <User summonerData={summonerData} isRefresh={isRefresh} isDB={isDB} />
                <Rank summonerData={summonerData} isDB={isDB} />
                {/* <Most summonerData={summonerData}/> */}
                <History summonerData={summonerData} isRefresh={refresh} isDB={isDB} isMoreMatch={isMoreMatch} />
            </div>
            <Footer className={style.summonerFooter} />
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

/**gStartTime: ms, gCreateTime: ms, gDurationTime: s */
function calcPlayedTime(gStartTime, gEndTime) {
    const gst = new Date(gStartTime);
    const get = new Date(gEndTime);

    // 플레이시간 중 초 구하기
    const pSeconds = get.getSeconds() - gst.getSeconds();
    // 플레이 시간중 분 구하기
    const pMinutes = get.getMinutes() - gst.getMinutes();
    // 플레이 시간중 시 구하기
    const pHours = get.getHours() - gst.getHours();
    // 게임 시작 날짜 중 일
    const gsDays = gst.getDay();
    // 게임 종료 날짜 중 일
    const geDays = get.getDay();

    let resultSeconds;
    let resultMinutes;
    let resultHours;

    resultHours = pHours;
    if (pHours < 0)
        resultHours = pHours + 12;
    resultMinutes = pMinutes;
    resultSeconds = pSeconds;

    if (pMinutes < 0) {
        resultHours -= 1;
        resultMinutes += 60;
    }

    if (pSeconds < 0) {
        resultMinutes -= 1;
        if (resultMinutes < 0) {
            resultHours -= 1;
            resultMinutes += 60;
        }
        resultSeconds += 60;
    }
    
    let resultTime = "";
    if (resultHours !== 0) {
        resultTime = resultHours.toString();
        if (resultHours < 10)
            resultTime = "0" + resultHours.toString() + "시간 ";
    }

    resultTime += resultMinutes.toString() + "분 " + resultSeconds.toString() + "초";

    return resultTime;
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
        
        case "Pick URF games":
            convertedQueue = "U.R.F.";
            break;
        
        default:
            convertedQueue = "일반";
            break;
    }
    
    return convertedQueue;
}

export default Summoners;