import style from "./champion_info_about.module.css";
import Riot from "../../network/riotAPI.js";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function ChampionInfoAbout() {
    const riot = new Riot(); // riotAPI 클래스 객체 riot을 생성
    const { id } = useParams();
    const [champion_class, setClass] = useState({});

    const getChamp = async () => {
        const json = await riot.getChampion(id);
        // 해당 페이지 챔피언의 id를 통해 챔피언 객체 저장
        const info = await riot.getInfo(json, id);
        // 챔피언 정보 객체와 id를 getSkill 함수에 인자로 넘겨 해당 챔피언의 정보를 가져옴
        setClass(info.tags);
    }; // 챔피언 API를 받아옴 비동기 처리함

    useEffect(() => {
        getChamp();
    }, []); // 컴포넌트가 마운트 되거나 렌더링,리렌더링 될때 getChamp함수 1회 실행함

    const showChampAbout = async () => {
        const about_div = document.querySelector("." + style["about"]);
        const info_table = document.querySelector("." + style["table"]);
        const first_role = document.querySelector("." + style["first_role"]);
        const second_role = document.querySelector("." + style["second_role"]);

        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        const thead_tr = document.createElement("tr");
        const thead_td1 = document.createElement("td");
        const thead_td2 = document.createElement("td");
        const tbody_tr = document.createElement("tr");
        const tbody_td1 = document.createElement("td");
        const tbody_td2 = document.createElement("td");

        thead_td1.innerText = "주 역할군";
        thead_td2.innerText = "보조 역할군";

        const class_img1 = document.createElement("img");
        class_img1.setAttribute("class", style.classImg);
        class_img1.src = `/img/${champion_class[0]}.jpg`;
        const class_img2 = document.createElement("img");
        class_img2.setAttribute("class", style.classImg);
        class_img2.src = `/img/${champion_class[1]}.jpg`;

        tbody_td1.appendChild(class_img1);
        tbody_td2.appendChild(class_img2);
        tbody_tr.appendChild(tbody_td1);
        tbody_tr.appendChild(tbody_td2);
        tbody.appendChild(tbody_tr);

        thead_tr.appendChild(thead_td1);
        thead_tr.appendChild(thead_td2);
        thead.appendChild(thead_tr);
        table.appendChild(thead);
        table.appendChild(tbody);
        about_div.appendChild(table);
    };

    // Support
    // Mage
    // Fighter
    // Tank
    // Marksman
    // Assassin
    showChampAbout();

    return (
        <>
            <div className={style.about}></div>
        </>
    );
}

export default ChampionInfoAbout;
