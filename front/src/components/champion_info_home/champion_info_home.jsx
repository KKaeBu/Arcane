import { useParams } from "react-router-dom";
import "./champion_info_home.css";
import Riot from "../../network/riotAPI.js";
import { useEffect } from "react";
import { useState } from "react";

function ChampionInfo() {
    const riot = new Riot(); // riotAPI 클래스 객체 riot을 생성
    const { id } = useParams();

    const [isLogin, setLogin] = useState(false);
    const [champion_name, setName] = useState({});
    const [champion_title, setTitle] = useState({});
    const [champion_img, setImg] = useState({});

    const getChamp = async () => {
        const json = await riot.getChampion(id);
        // 해당 페이지 챔피언의 id를 통해 챔피언 객체 저장
        const info = await riot.getInfo(json, id);
        // 챔피언 정보 객체와 id를 getSkill 함수에 인자로 넘겨 해당 챔피언의 정보를 가져옴

        setName(info.name);
        setTitle(info.title);
        setImg(riot.getChampionIcon(id)); // img도 display와 마찬가지로 해당key값의 이미지로
    }; // 챔피언 API를 받아옴 비동기 처리함

    const showChampInfo = async () => {
        const home = document.querySelector(".home");
        const championNameDiv = document.getElementsByClassName("championName");

        const nameSpan = document.createElement("span");
        const nameSpanDiv = document.createElement("div");
        nameSpanDiv.setAttribute("class", "championNameSpan");
        nameSpan.innerHTML = champion_name;
        nameSpanDiv.appendChild(nameSpan);
        championNameDiv[0].appendChild(nameSpanDiv);

        const titleSpan = document.createElement("span");
        const titleSpanDiv = document.createElement("div");
        titleSpanDiv.setAttribute("class", "titleSpan");
        titleSpan.innerHTML = '"' + champion_title + '"';
        titleSpanDiv.appendChild(titleSpan);
        championNameDiv[0].appendChild(titleSpanDiv);

        // ********** champion, skill의 img 설정 부분
        const champion_icon = document.createElement("img");
        champion_icon.setAttribute("src", champion_img);
        champion_icon.setAttribute("class", "championIcon");
        home.prepend(champion_icon);
    };
    useEffect(() => {
        getChamp();
    }, []); // 컴포넌트가 마운트 되거나 렌더링,리렌더링 될때 getChamp함수 1회 실행함
    showChampInfo();

    return (
        <div className="home">
            <div className="championName"></div>
        </div>
    );
}

export default ChampionInfo;
