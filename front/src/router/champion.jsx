import { useState, useEffect } from "react";

function Champion() {
    const champion_url =
        "http://ddragon.leagueoflegends.com/cdn/12.11.1/data/ko_KR/champion.json";

    const [champions, setChampion] = useState([]);
    const [display, setDisplay] = useState([]);

    const getChamp = async () => {
        const json = await (await fetch(champion_url)).json();
        setChampion(json.data, null, "\t");
        setDisplay(json.data, null, "\t");
    };

    useEffect(() => {
        getChamp();
    }, []);

    const handleClick = () => {
        if (display === champions) {
            setDisplay(champions.Aatrox);
        } else if (display !== champions) {
            setDisplay(champions);
        }
    };
    return (
        <div className="mainDisplay">
            <h1>Riot API Practice</h1>
            <h3>champion data</h3>
            <button onClick={handleClick}>Click me</button>
            <div>{JSON.stringify(display, null, "\t")}</div>
        </div>
    );
}

export default Champion;
