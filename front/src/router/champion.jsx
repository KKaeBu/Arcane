import { useState, useEffect } from "react";

function Champion() {
    const mainDiv = document.getElementsByClassName("mainDisplay");
    const btnDiv = document.getElementsByClassName("button_div");
    const listBtn = document.getElementById("champList");
    const info = document.getElementById("champInfo");
    // mainDiv > 이 div 안에 champion컴포넌트 내용이 들어감
    // btnDiv > 버튼을 집어넣을 div
    // listBtn > 챔피언 목록을 불러오는 버튼
    // info > 챔피언 정보 표시할 span태그

    const champion_url =
        "http://ddragon.leagueoflegends.com/cdn/12.11.1/data/ko_KR/champion.json";
    // LOL 챔피언 정보 API
    const [style, setStyle] = useState({ display: "none" });
    const [champions, setChampion] = useState({});
    const [display, setDisplay] = useState({});
    const [champion_img, setImg] = useState({});

    const getChamp = async () => {
        const json = await (await fetch(champion_url)).json();

        setChampion(json.data, null, "\t");
        setDisplay(json.data, null, "\t");
    };

    useEffect(() => {
        getChamp();
    }, []);

    const showChampBtn = () => {
        const champ_img = document.createElement("img");

        btnDiv[0].style.display = "block"; // btn div보이게 설정
        if (btnDiv[0].childNodes.length === 0) {
            // btn div가 비었다면 실행
            for (const key in champions) {
                // 챔피언 목록 object의 key값들
                if (champions.hasOwnProperty(key)) {
                    champ_img.src =
                        "https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/" +
                        champions[key].id +
                        ".png";
                    const btn = document.createElement("button");
                    const btn_text = document.createTextNode(
                        JSON.stringify(champions[key].name, null, "\t").replace(
                            /['"]+/g,
                            ""
                        )
                    );
                    //btn.appendChild(champ_img);
                    btn.onclick = function () {
                        if (display === champions) {
                            info.style.display = "block";
                            setDisplay(champions[key]);
                            setImg(
                                "https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/" +
                                    champions[key].id +
                                    ".png"
                            );
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
                    <img src={champion_img} alt="" />
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
