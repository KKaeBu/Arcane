import axios from "axios";
import { useState, useEffect } from "react";
import Riot_API from "../../network/riotAPI";
import style from "./most.module.css";

function Most(props) {
    const riot = new Riot_API();
    const [matchIdList, setMatchIdList] = useState([]);    
    const [matchChamp, setMatchChamp] = useState([]);
    const summData = props.summonerData;
    
    const getMostChamp = async () => {
        // setSummoner(async (summ) => {
        //     summ = summData;
        //     if (summ) {
        //         await getMatchIdList(summ);
        //     }
        //     return summ;
        // })

        if (summData){
            await getMatchIdList();
            await printchamp();
        }
    }

    // const getMatchIdList = async (summ) => {
    //     const puuid = summ.puuid;
    //     if (!puuid)
    //         return;
        
    //     const link = await riot.getMatchIdList(puuid, 0, 20);
    //     await axios
    //         .get("/summoners", {
    //             headers: { link: link },
    //         })
    //         .then((res) => {
    //             console.log(res.data);
    //             setMatchIdList(list => {
    //                 list = res.data;
    //                 printchamp(list, summ);
    //             });
    //         })
    //         .catch(err => console.log("most error: " + err));
    // }

    const getMatchIdList = async () => {
        const puuid = summData.puuid;
        if (!puuid)
            return;
        
        const link = await riot.getMatchIdList(puuid, 0, 20);
        await axios
            .get("/summoners", {
                headers: { link: link },
            })
            .then(async (res) => {
                await temp(res.data);
            })
            .catch(err => console.log("most error: " + err));
    }

    const temp = async (list) => {
        setMatchIdList(list);
    }

    // const printchamp = (list, summ) => {
    //     console.log("matchIdList: " + list);
    //     list.forEach(async (m) => {
    //         const link = await riot.getMatchInfo(m);
    //         console.log("most link: " + link);
    //         await axios
    //             .get("/summoners", {
    //                 headers: { link: link },
    //             })
    //             .then((res) => {
    //                 const participants = res.data.info.participants;
    //                 participants.forEach(p => {
    //                     if (p.summonerName === summ.name) {
    //                         console.log(p.championName);
    //                         return;
    //                     }
    //                 })
    //             })
    //             .catch(err => console.log("most print err: " + err));
    //     });
    // }

    const printchamp = async () => {
        let champList = [];
        if(matchIdList) {
            matchIdList.forEach(async (m) => {
                const link = await riot.getMatchInfo(m);
                axios
                .get("/summoners", {
                    headers: { link: link },
                })
                .then((res) => {
                    const participants = res.data.info.participants;
                    champList.push(getChampName(participants));
                })
                .catch(err => console.log("most print err: " + err));
            })
            setMatchChamp(champList);
        }
    }

    const getChampName = (participants) => {
        participants.forEach(p => {
            if (p.puuid === summData.puuid) {
                console.log(p.championName);
                return p.championName;
            }
        })
    }

    useEffect(() => {
        getMostChamp();
    }, [summData]);

    return (
        <div>
            {matchIdList}
            <br />
            {}
        </div>
    );
}

export default Most;