import { useParams } from "react-router-dom";
import "./champion_info_home.css";
import Riot from "../../network/riotAPI.js";
import { useEffect, useRef } from "react";

function ChampionInfo() {
    const riot = new Riot(); // riotAPI 클래스 객체 riot을 생성
    const { id } = useParams();

    const championNameDiv = useRef(null);
    const home = useRef(null);

    const showChampInfo = async () => {
        const json = await riot.getChampion(id);
        // 해당 페이지 챔피언의 id를 통해 챔피언 객체 저장
        const info = await riot.getInfo(json, id);
        // 챔피언 정보 객체와 id를 getSkill 함수에 인자로 넘겨 해당 챔피언의 정보를 가져옴

        const nameSpan = document.createElement("span");
        const nameSpanDiv = document.createElement("div");

        nameSpanDiv.setAttribute("class", "championNameSpan");
        nameSpan.innerHTML = info.name;
        nameSpanDiv.appendChild(nameSpan);
        championNameDiv.current.appendChild(nameSpanDiv);

        const titleSpan = document.createElement("span");
        const titleSpanDiv = document.createElement("div");
        titleSpanDiv.setAttribute("class", "titleSpan");
        titleSpan.innerHTML = '"' + info.title + '"';
        titleSpanDiv.appendChild(titleSpan);
        championNameDiv.current.appendChild(titleSpanDiv);

        // ********** champion, skill의 img 설정 부분
        const champion_icon = document.createElement("img");
        champion_icon.setAttribute("src", riot.getChampionIcon(id));
        champion_icon.setAttribute("class", "championIcon");
        home.current.prepend(champion_icon);
    };

    useEffect(() => {
        showChampInfo();
    }, []);

    return (
        <div className="home" ref={home}>
            <div className="championName" ref={championNameDiv}></div>
        </div>
    );
}

export default ChampionInfo;
