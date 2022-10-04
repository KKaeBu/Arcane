import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./summoners.module.css";
import Topbar from "../../components/summoners_topbar/Topbar.jsx";
import User from "../../components/summoners_main_user/User.jsx";
import Rank from "../../components/summoners_main_rank/Rank.jsx";
import Most from "../../components/summoners_main_most/Most";
import History from "../../components/summoners_main_history/History.jsx";
import Riot_API from "../../network/riotAPI";

function Summoners() {
    const location = useLocation();
    const navigate = useNavigate();
    // const { summoner } = useParams();
    // const [summoner, setSummoner] = useState(useParams().summoner);
    const [summonerData, setSummonerData] = useState({});
    const riot = new Riot_API();

    const [summoner, setSummoner] = useState(location.state.summoner);
    console.log(location.state);

    const findSummoner = async () => {
        try{
            const summonerJson = await riot.getSummoner(summoner);
            // const s = useParams().summoner;
            setSummonerData(summonerJson);
            setSummoner(location.state.summoner);
        }catch(e){
            console.log("not found");
            console.log(e);
        }

    }

    useEffect(() => {
        findSummoner();

    window.addEventListener("beforeunload", alertUser);
    return () => {
        window.removeEventListener("beforeunload", alertUser);
    };
    }, [summoner]);

    const alertUser = (e) => {
        e.preventDefault();
        e.returnValue = "";
        console.log("zz");
        console.log(e);
        if (!e.cancelLabel) {
            navigate("/summoners", {
                state: {
                    sumoner: summoner,
                }
            });   
        }
    }
    
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