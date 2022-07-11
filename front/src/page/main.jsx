import { useState, useEffect } from "react";
import Riot from "../network/riotAPI.js";

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
            <h1>This is Main</h1>
        </div>
    );
}

export default MainDisplay;
