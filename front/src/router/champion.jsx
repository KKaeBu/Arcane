import { useState, useEffect } from "react";

function Champion() {
    const mainDiv = document.getElementsByClassName("mainDisplay");
    const btnDiv = document.getElementsByClassName("button_div");
    const listBtn = document.getElementById("champList");
    const info = document.getElementById("champInfo");

    const champion_url =
        "http://ddragon.leagueoflegends.com/cdn/12.11.1/data/ko_KR/champion.json";

    const [style, setStyle] = useState({ display: "none" });
    const [champions, setChampion] = useState({});
    const [display, setDisplay] = useState({});

    const getChamp = async () => {
        const json = await (await fetch(champion_url)).json();

        setChampion(json.data, null, "\t");
        setDisplay(json.data, null, "\t");
    };

    useEffect(() => {
        getChamp();
    }, []);

    const showChampBtn = () => {
        btnDiv[0].style.display = "block";
        if (btnDiv[0].childNodes.length === 0) {
            for (const key in champions) {
                if (champions.hasOwnProperty(key)) {
                    const btn = document.createElement("button");
                    const btn_text = document.createTextNode(
                        JSON.stringify(champions[key].name, null, "\t")
                    );
                    btn.onclick = function () {
                        if (display === champions) {
                            info.style.display = "block";
                            setDisplay(champions[key]);
                            setStyle({ display: "block" });
                        } else if (display !== champions) {
                            setDisplay(champions);
                            setStyle({ display: "none" });
                        }
                    };
                    btn.appendChild(btn_text);
                    btnDiv[0].appendChild(btn);
                }
            }
        }

        const backBtn = document.createElement("button");
        const backBtn_text = document.createTextNode("뒤로가기");
        backBtn.onclick = function () {
            btnDiv[0].style.display = "none";
            info.style.display = "none";
            this.remove();
            listBtn.style.display = "inline";
        };
        backBtn.appendChild(backBtn_text);
        mainDiv[0].appendChild(backBtn);
        listBtn.style.display = "none";
    };

    return (
        <div className="mainDisplay">
            <h1>Riot API Practice</h1>
            <h3>champion data</h3>
            <div className="button_div"></div>
            <button id="champList" onClick={showChampBtn}>
                챔피언 목록
            </button>
            <div>
                <span id="champInfo" style={style}>
                    {JSON.stringify(display, null, "\t")}
                </span>
                {/* <table>
                    <th>name</th>
                    <th>title</th>
                    <th>difficulty</th>
                    <tr>
                        <td>{JSON.stringify(display.name, null, "\t")}</td>
                        <td>{JSON.stringify(display.title, null, "\t")}</td>
                        <td>{JSON.stringify(display.info, null, "\t")}</td>
                    </tr>
                </table> */}
            </div>
        </div>
    );
}

export default Champion;
