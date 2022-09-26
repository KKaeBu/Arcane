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
                await getMatchIdList(summ);
            }
            return summ;
        })
    }

    const getMatchIdList = async (summ) => {
        const puuid = summ.puuid;
        if (!puuid)
            return;
        
        const link = await riot.getMatchIdList(puuid, 0, 20);
        // await axios
        //     .get(link)
        //     .then((res) => {
        //         console.log(res.data);
        //         setMatchIdList(res.data);
        //     })
        //     .catch(err => console.log("Most error: " + err));
        await axios
            .get("/summoners", {
                headers: { link: link },
            })
            .then((res) => {
                console.log(res.data);
                setMatchIdList(list => {
                    list = res.data;
                    printchamp(list, summ);
                });
            })
            .catch(err => console.log("most error: " + err));
    }

    const printchamp = (list, summ) => {
        console.log("matchIdList: " + list);
        list.forEach(async (m) => {
            const link = await riot.getMatchInfo(m);
            console.log("most link: " + link);
            // await axios
            //     .get(link)
            //     .then((res) => {
            //         const participants = res.data.info.participants;
            //         participants.forEach(p => {
            //             if (p.summonerName === summ.name) {
            //                 console.log(p.championName);
            //                 return;
            //             }
            //         });
            //     }).catch(err => console.log("Most print error: " + err));
            await axios
                .get("/summoners", {
                    headers: { link: link },
                })
                .then((res) => {
                    const participants = res.data.info.participants;
                    participants.forEach(p => {
                        if (p.summonerName === summ.name) {
                            console.log(p.championName);
                            return;
                        }
                    })
                })
                .catch(err => console.log("most print err: " + err));
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