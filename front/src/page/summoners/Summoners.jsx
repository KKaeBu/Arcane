import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./summoners.module.css";
import Topbar from "../../components/summoners_topbar/Topbar.jsx";
import User from "../../components/summoners_main_user/User.jsx";
import Rank from "../../components/summoners_main_rank/Rank.jsx";
import Most from "../../components/summoners_main_most/Most";
import History from "../../components/summoners_main_history/History.jsx";
import Riot_API from "../../network/riotAPI";

function Summoners() {
    // const { summoner } = useParams();
    const summoner = useLocation().state.summoner;
    localStorage.setItem("summoner", summoner);
    const [summonerData, setSummonerData] = useState({});
    const [refresh, setRefresh] = useState(false);
    const riot = new Riot_API();

    const findSummoner = async () => {
        // try{
        //     const summonerJson = await riot.getSummoner(summoner);
        //     setSummonerData(summonerJson);
        // }catch(e){
        //     console.log("not found");
        //     console.log(e);
        // }


        const user = localStorage.getItem("summoner");

        try{
            const summonerJson = await riot.getSummoner(user);
            setSummonerData(summonerJson);
        }catch(e){
            console.log("not found");
            console.log(e);
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
                <User summonerData={summonerData} isRefresh={isRefresh} />
                <Rank summonerData={summonerData}/>
                {/* <Most summonerData={summonerData}/> */}
                {/* {refresh ? <History summonerData={summonerData} isRefresh={isRefresh} /> : <History summonerData={summonerData}/> } */}
                <History summonerData={summonerData} isRefresh={refresh}/>
            </div>
        </div>
    );
}

export default Summoners;