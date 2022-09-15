import { useParams } from "react-router-dom";
import style from "./summoners.module.css";
import Topbar from "../../components/summoners_topbar/Topbar.jsx";
import User from "../../components/summoners_main_user/User.jsx";
import Rank from "../../components/summoners_main_rank/Rank.jsx";
import Most from "../../components/summoners_main_most/Most";
import History from "../../components/summoners_main_history/History.jsx";

function Summoners() {
    const { summoner } = useParams();
    console.log(summoner);
    
    // console.log(match);
    // console.dir(match);
    return (
        <div className={style.summonersContainer}>
            <div className={style.summonersWrapper}>
                <Topbar />
                <User />
                <Rank />
                <Most />
                <History />
            </div>
        </div>
    );
}

export default Summoners;