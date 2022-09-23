import axios from "axios";
import { useState, useEffect } from "react";
import Riot_API from "../../network/riotAPI";
import style from "./most.module.css";

function Most(props) {
    const riot = new Riot_API();
    const [apiKey, setApiKey] = useState("");
    const [summoner, setSummoner] = useState({});
    const [matchIdList, setMatchIdList] = useState([]);

    const requestHeaders = riot.getRequestHeaders();
    
    const summData = props.summonerData;
    
    const getMostChamp = () => {
        setSummoner(async (summ) => {
            summ = summData;
            if (summ) {
                await getMatchIdList(summ.puuid);
                printchamp(summ);
            }
            return summ;
        })
    }

    const getMatchIdList = async (puuid) => {
        const link = await riot.getMatchIdList(puuid, 0, 20);
        await axios
            .get(link)
            .then((res) => {
                console.log(res.data);
                setMatchIdList(res.data);
            })
            .catch(err => console.log("Most error: " + err));
    }

    const printchamp = (summ) => {
        matchIdList.forEach(async (m) => {
            const link = riot.getMatchInfo(m);
            await axios
                .get(link)
                .then((res) => {
                    const participants = res.data.info.participants;
                    participants.forEach(p => {
                        if (p.summonerName === summ.name) {
                            console.log(p.championName);
                            return;
                        }
                    });
                }).catch(err => console.log("Most print error: " + err));
        });
    }

    useEffect(() => {
        getMostChamp();
    }, [summData]);

    return (
        <div>

        </div>
    );
}

export default Most;