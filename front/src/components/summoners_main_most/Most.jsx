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
        if (summData){
            await getMatchIdList();
        }
    }

    const getMatchIdList = async () => {
        const puuid = summData.puuid;
        if (!puuid)
            return;
        
        const matchIdListData = await riot.getMatchIdList(puuid, 0, 5);
        await printchamp(matchIdListData);


        setMatchIdList(matchIdListData);
    }

    // const printchamp = async () => {
    //     let champList = [];
    //     if(matchIdList) {
    //         matchIdList.forEach(async (m) => {
    //             const matchData = await riot.getMatchInfo(m);
    //             console.log(matchData);
    //         })
    //         setMatchChamp(champList);
    //     }
    // }

    const printchamp = async () => {

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