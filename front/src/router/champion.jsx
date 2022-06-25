import { useState, useEffect } from "react";

function Champion() {
    const [style, setStyle] = useState({ display: "none" });

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

    const handleAatroxClick = () => {
        if (display === champions) {
            setDisplay(champions.Aatrox);
            setStyle({ display: "block" });
        } else if (display !== champions) {
            setDisplay(champions);
            setStyle({ display: "none" });
        }
    };
    return (
        <div className="mainDisplay">
            <h1>Riot API Practice</h1>
            <h3>champion data</h3>
            <button onClick={handleAatroxClick}>아트록스</button>
            <div style={style}>
                <span> {JSON.stringify(display, null, "\t")}</span>
                <table>
                    <th>Column 1</th>
                    <th>Column 2</th>
                    <th>Column 3</th>
                    <tr>
                        <td>Row 1, Column 1</td>
                        <td>Row 1, Column 2</td>
                        <td>Row 1, Column 3</td>
                    </tr>
                    <tr>
                        <td>Row 2, Column 1</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default Champion;
