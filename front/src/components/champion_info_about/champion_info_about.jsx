import style from "./champion_info_about.module.css";
import Riot from "../../network/riotAPI.js";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function ChampionInfoAbout() {
    const riot = new Riot(); // riotAPI 클래스 객체 riot을 생성
    const { id } = useParams();
    const [champion_class, setClass] = useState({});
    const [champion_lore, setLore] = useState({});

    const getChamp = async () => {
        const json = await riot.getChampion(id);
        // 해당 페이지 챔피언의 id를 통해 챔피언 객체 저장
        const info = await riot.getInfo(json, id);
        // 챔피언 정보 객체와 id를 getSkill 함수에 인자로 넘겨 해당 챔피언의 정보를 가져옴
        setClass(info.tags);
        setLore(info.lore);
    }; // 챔피언 API를 받아옴 비동기 처리함

    useEffect(() => {
        getChamp();
    }, []); // 컴포넌트가 마운트 되거나 렌더링,리렌더링 될때 getChamp함수 1회 실행함

    const translate = (champion_class) => {
        if (champion_class === "Tank") return "탱커";
        else if (champion_class === "Mage") return "메이지";
        else if (champion_class === "Support") return "서포터";
        else if (champion_class === "Assassin") return "암살자";
        else if (champion_class === "Marksman") return "원거리";
        else if (champion_class === "Fighter") return "전사";
    };

    const showChampAbout = async () => {
        const about_div = document.querySelector("." + style["about"]);
        const about_title = document.querySelector("." + style["aboutTitle"]);

        const lore = document.createElement("p");
        lore.setAttribute("class", style.lore);
        lore.innerText = champion_lore;
        about_div.firstChild.after(lore);

        const illustration = document.createElement("img");
        illustration.setAttribute("class", style.illustration);
        illustration.setAttribute(
            "src",
            await riot.getChampionIllustration(id)
        );
        about_title.after(illustration);

        const table = document.createElement("table");
        table.setAttribute("class", style.table);
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        const thead_tr = document.createElement("tr");
        const thead_td1 = document.createElement("td");
        const thead_td2 = document.createElement("td");
        const thead_td3 = document.createElement("td");
        const thead_td4 = document.createElement("td");
        const tbody_tr = document.createElement("tr");
        const tbody_td1 = document.createElement("td");
        const tbody_td2 = document.createElement("td");

        thead_td1.innerText = "주 역할군";
        thead_td2.innerText = "보조 역할군";
        thead_td3.innerText = "소속";
        thead_td4.innerText = "가격";

        const class_img1 = document.createElement("img");
        const class_name1 = document.createElement("p");
        class_img1.setAttribute("class", style.classImg);
        if (champion_class[0] !== undefined) {
            class_img1.src = `/img/${champion_class[0]}.jpg`;
            class_name1.setAttribute("class", style.className);
            class_name1.innerText = translate(champion_class[0]);
            tbody_td1.appendChild(class_img1);
            tbody_td1.appendChild(class_name1);
        } else {
            const no_class = document.createElement("p");
            no_class.innerText = "-";
            tbody_td1.appendChild(no_class);
        }

        const class_img2 = document.createElement("img");
        const class_name2 = document.createElement("p");
        class_img2.setAttribute("class", style.classImg);
        if (champion_class[1] !== undefined) {
            class_img2.src = `/img/${champion_class[1]}.jpg`;
            class_name2.setAttribute("class", style.className);
            class_name2.innerText = translate(champion_class[1]);
            tbody_td2.appendChild(class_img2);
            tbody_td2.appendChild(class_name2);
        } else {
            const no_class = document.createElement("p");
            no_class.innerText = "-";
            tbody_td2.appendChild(no_class);
        }

        tbody_tr.appendChild(tbody_td1);
        tbody_tr.appendChild(tbody_td2);
        tbody.appendChild(tbody_tr);

        thead_tr.appendChild(thead_td1);
        thead_tr.appendChild(thead_td2);
        thead_tr.appendChild(thead_td3);
        thead_tr.appendChild(thead_td4);
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
            <div className={style.about}>
                <p className={style.aboutTitle}>About Me</p>
            </div>
        </>
    );
}

export default ChampionInfoAbout;
