import { useState, useEffect } from "react";
import Riot from "../network/riotAPI.js";
import ChampionTopBar from "./../components/champion_topbar/champion_topbar";

function MainDisplay() {
    // const userName = "승수몬";
    const riot = new Riot();

    const [champ, setChamp] = useState([]);

    const getChampion = async () => {
        const json = await riot.getAllChampions();
        console.log(json);
        setChamp(json.data.Aatrox);
    };

    useEffect(() => {
        getChampion();
    }, []);

    return (
        <div className="mainDisplayContainer">
            <ChampionTopBar />
            <h1 id="title">This is Main</h1>
        </div>
    );
}

export default MainDisplay;
