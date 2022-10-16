import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./summoners.module.css";
import Topbar from "../../components/summoners_topbar/Topbar.jsx";
import User from "../../components/summoners_main_user/User.jsx";
import Rank from "../../components/summoners_main_rank/Rank.jsx";
import Most from "../../components/summoners_main_most/Most";
import History from "../../components/summoners_main_history/History.jsx";
import Riot_API from "../../network/riotAPI";
import DB from "../../db/db";


function Summoners() {
    const summoner = useLocation().state.summoner;
    localStorage.setItem("summoner", summoner);
    const [summonerData, setSummonerData] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [isDB, setIsDB] = useState(false);
    const riot = new Riot_API();
    const db = new DB();

    const findSummoner = async () => {
        const user = localStorage.getItem("summoner");

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
                const DB_summoner = await db.saveSummonerInfo(summonerJson, await rankData);
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

    const isRefresh = (r) => {
        setRefresh(!refresh);
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
                {/* {refresh ? <History summonerData={summonerData} isRefresh={isRefresh} /> : <History summonerData={summonerData}/> } */}
                {/* <History summonerData={summonerData} isRefresh={refresh}/> */}
            </div>
        </div>
    );
}

export default Summoners;