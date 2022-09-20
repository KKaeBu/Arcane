import axios from "axios";
import { useState, useEffect } from "react";
import Riot_API from "../../network/riotAPI";
import style from "./rank.module.css";

function Rank(props) {
    const riot = new Riot_API();
    const [apiKey, setApiKey] = useState("");
    const [summonerId, setSummonerId] = useState("");
    const sumId = props.encryptedSummonerId;

    const getLeague = () => {
        try {
            const key = riot.getApiKey();
            setApiKey(key);
            setSummonerId((id) => {
                id = sumId;
                leagueReq(id);
                return id;
            });
        } catch (error) {
            
        }
    }

    const leagueReq = async (id) => {
        await axios
            .get("/summoners", {
                headers: {
                    sid: id,
                    api_key: apiKey,
                },
            })
            .then((res) => {
                console.log("잘 도착", res);
            })
            .catch((err) => console.log("rank error"));
    }

    useEffect(() => {
        getLeague();
    }, [sumId]);
    return (
        <div className={style.rankContainer}>
            <div className={style.soloRankWrapper}>
                <div className={style.soloLeft}>
                    <span className={style.soloTierLabel}></span>
                </div>
                <div className={style.soloRight}>
                    {summonerId}
                </div>
            </div>
            <div className={style.flexRankWrapper}>
                <div className={style.flexLeft}>

                </div>
                <div className={style.flexRight}>

                </div>
            </div>
        </div>
    );
}

export default Rank;