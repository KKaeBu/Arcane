import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./summoners.module.css";
import Topbar from "../../components/summoners_topbar/Topbar.jsx";
import User from "../../components/summoners_main_user/User.jsx";
import Rank from "../../components/summoners_main_rank/Rank.jsx";
import Most from "../../components/summoners_main_most/Most";
import History from "../../components/summoners_main_history/History.jsx";
import Riot_API from "../../network/riotAPI";

function Summoners()  {
    const { summoner } = useParams();
    const [summonerData, setSummonerData] = useState({});
    const riot = new Riot_API();
    console.log(summoner);

    const findSummoner = async () => {
        try{
            const summonerJson = await riot.getSummoner(summoner);
            setSummonerData(summonerJson);
        }catch(e){
            console.log("not found");
            console.log(e);
        }

    }

    useEffect(() => {
        findSummoner();
    }, [summoner]);
    
    return (
        <div className={style.summonersContainer}>
            <div className={style.summonersWrapper}>
                <Topbar />
                <User summonerData={summonerData} />
                <Rank summonerData={summonerData}/>
                {/* <Most summonerData={summonerData}/> */}
                <History summonerData={summonerData}/>
            </div>
        </div>
    );
}

export default Summoners;