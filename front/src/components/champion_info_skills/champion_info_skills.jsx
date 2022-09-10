import style from "./champion_info_skills.module.css";
import { useParams } from "react-router-dom";
import Riot from "../../network/riotAPI.js";
import { useEffect } from "react";
import { useState } from "react";
import TokenStorage from "./../../db/token";
import axios from "axios";

function ChampionSkills() {
    const riot = new Riot(); // riotAPI 클래스 객체 riot을 생성
    const { id } = useParams();

    const passiveIconDiv = document.querySelector("." + style["passiveIcon"]);

    const qIconDiv = document.querySelector("." + style["qIcon"]);
    const wIconDiv = document.querySelector("." + style["wIcon"]);
    const eIconDiv = document.querySelector("." + style["eIcon"]);
    const rIconDiv = document.querySelector("." + style["rIcon"]);

    const qInfoDiv = document.querySelector("." + style["qInfo"]);
    const wInfoDiv = document.querySelector("." + style["wInfo"]);
    const eInfoDiv = document.querySelector("." + style["eInfo"]);
    const rInfoDiv = document.querySelector("." + style["rInfo"]);
    const passiveInfoDiv = document.querySelector("." + style["passiveInfo"]);
    const [skill_passive, setPassive] = useState({});
    const [skill_q, setQ] = useState({});
    const [skill_w, setW] = useState({});
    const [skill_e, setE] = useState({});
    const [skill_r, setR] = useState({});
    const [champion_key, setKey] = useState({});

    const getChamp = async () => {
        const json = await riot.getChampion(id);
        // 해당 페이지 챔피언의 id를 통해 챔피언 객체 저장
        const info = await riot.getInfo(json, id);
        // 챔피언 정보 객체와 id를 getSkill 함수에 인자로 넘겨 해당 챔피언의 정보를 가져옴
        setPassive(info.passive);
        setQ(info.spells[0]);
        setW(info.spells[1]);
        setE(info.spells[2]);
        setR(info.spells[3]);
        if (info.key < 10) {
            setKey("000" + info.key);
        } else if (info.key < 100) {
            setKey("00" + info.key);
        } else if (info.key < 1000) {
            setKey("0" + info.key);
        }
        // 각 스킬의 정보를 저장
    };

    const showSkills = async () => {
        const passive_img = document.createElement("img");
        passive_img.setAttribute(
            "src",
            riot.getPassiveIcon(skill_passive["image"]["full"])
        );
        passive_img.setattribute("id", style.skillIcon);
        const q_img = document.createElement("img");
        q_img.setAttribute("src", riot.getSkillIcon(skill_q.id));
        q_img.setattribute("id", style.skillIcon);
        const w_img = document.createElement("img");
        w_img.setAttribute("src", riot.getSkillIcon(skill_w.id));
        w_img.setattribute("id", style.skillIcon);
        const e_img = document.createElement("img");
        e_img.setAttribute("src", riot.getSkillIcon(skill_e.id));
        e_img.setattribute("id", style.skillIcon);
        const r_img = document.createElement("img");
        r_img.setAttribute("src", riot.getSkillIcon(skill_r.id));
        r_img.setattribute("id", style.skillIcon);
        // 각 Div에 skill 이미지 append => 이미지들 개별적인 Div에 들어감
        passiveIconDiv.appendChild(passive_img);
        qIconDiv.appendChild(q_img);
        wIconDiv.appendChild(w_img);
        eIconDiv.appendChild(e_img);
        rIconDiv.appendChild(r_img);
        // ********** 까지 img 설정
        // ********** 부터 skill text 설정
        const passive_name = document.createElement("p");
        passive_name.setattribute("class", style.skill_name);
        passive_name.innerHTML = skill_passive.name;
        const passive_description = document.createElement("p");
        passive_description.setattribute("class", style.skill_description);
        passive_description.innerHTML = skill_passive.description;
        const q_name = document.createElement("p");
        q_name.setattribute("class", style.skill_name);
        q_name.innerHTML = skill_q.name;
        const q_description = document.createElement("p");
        q_description.setattribute("class", style.skill_description);
        q_description.innerHTML = skill_q.description;
        const q_tooltip = document.createElement("p");
        q_tooltip.innerHTML = skill_q.tooltip;
        q_tooltip.setattribute("class", style.skill_tooltip);
        const w_name = document.createElement("p");
        w_name.setattribute("class", style.skill_name);
        w_name.innerHTML = skill_w.name;
        const w_description = document.createElement("p");
        w_description.setattribute("class", style.skill_description);
        w_description.innerHTML = skill_w.description;
        const w_tooltip = document.createElement("p");
        w_tooltip.innerHTML = skill_w.tooltip;
        w_tooltip.setattribute("class", style.skill_tooltip);
        const e_name = document.createElement("p");
        e_name.setattribute("class", style.skill_name);
        e_name.innerHTML = skill_e.name;
        const e_description = document.createElement("p");
        e_description.setattribute("class", style.skill_description);
        e_description.innerHTML = skill_e.description;
        const e_tooltip = document.createElement("p");
        e_tooltip.innerHTML = skill_e.tooltip;
        e_tooltip.setattribute("class", style.skill_tooltip);
        const r_name = document.createElement("p");
        r_name.setattribute("class", style.skill_name);
        r_name.innerHTML = skill_r.name;
        const r_description = document.createElement("p");
        r_description.setattribute("class", style.skill_description);
        r_description.innerHTML = skill_r.description;
        const r_tooltip = document.createElement("p");
        r_tooltip.innerHTML = skill_r.tooltip;
        r_tooltip.setattribute("class", style.skill_tooltip);
        passiveInfoDiv.setattribute("id", style.invisible);
        qInfoDiv.setattribute("id", style.invisible);
        wInfoDiv.setattribute("id", style.invisible);
        eInfoDiv.setattribute("id", style.invisible);
        rInfoDiv.setattribute("id", style.invisible);
        // 마우스 hover 효과를 이벤트리스너를 통해 구현
        passiveIconDiv.addEventListener("mouseover", function () {
            passiveInfoDiv.removeAttribute("id", style.invisible);
        });
        passiveIconDiv.addEventListener("mouseout", function () {
            passiveInfoDiv.setattribute("id", style.invisible);
        });
        passiveIconDiv.addEventListener("click", function () {
            window.open(
                `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion_key}/ability_${champion_key}_P1.webm`,
                "",
                "_blank"
            );
        });
        qIconDiv.addEventListener("mouseover", function () {
            qInfoDiv.removeAttribute("id", style.invisible);
        });
        qIconDiv.addEventListener("mouseout", function () {
            qInfoDiv.setattribute("id", style.invisible);
        });
        qIconDiv.addEventListener("click", function () {
            window.open(
                `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion_key}/ability_${champion_key}_Q1.webm`,
                "",
                "_blank"
            );
        });
        wIconDiv.addEventListener("mouseover", function () {
            wInfoDiv.removeAttribute("id", style.invisible);
        });
        wIconDiv.addEventListener("mouseout", function () {
            wInfoDiv.setattribute("id", style.invisible);
        });
        wIconDiv.addEventListener("click", function () {
            window.open(
                `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion_key}/ability_${champion_key}_W1.webm`,
                "",
                "_blank"
            );
        });
        eIconDiv.addEventListener("mouseover", function () {
            eInfoDiv.removeAttribute("id", style.invisible);
        });
        eIconDiv.addEventListener("mouseout", function () {
            eInfoDiv.setattribute("id", style.invisible);
        });
        eIconDiv.addEventListener("click", function () {
            window.open(
                `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion_key}/ability_${champion_key}_E1.webm`,
                "",
                "_blank"
            );
        });
        rIconDiv.addEventListener("mouseover", function () {
            rInfoDiv.removeAttribute("id", style.invisible);
        });
        rIconDiv.addEventListener("mouseout", function () {
            rInfoDiv.setattribute("id", style.invisible);
        });
        rIconDiv.addEventListener("click", function () {
            window.open(
                `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion_key}/ability_${champion_key}_R1.webm`,
                "",
                "_blank"
            );
        });
        console.log(passiveInfoDiv);
        console.log(passive_name);
        console.log(qInfoDiv);
        passiveInfoDiv.appendChild(passive_name);
        passiveInfoDiv.appendChild(passive_description);
        qInfoDiv.appendChild(q_name);
        qInfoDiv.appendChild(q_description);
        qInfoDiv.appendChild(q_tooltip);
        wInfoDiv.appendChild(w_name);
        wInfoDiv.appendChild(w_description);
        wInfoDiv.appendChild(w_tooltip);
        eInfoDiv.appendChild(e_name);
        eInfoDiv.appendChild(e_description);
        eInfoDiv.appendChild(e_tooltip);
        rInfoDiv.appendChild(r_name);
        rInfoDiv.appendChild(r_description);
        rInfoDiv.appendChild(r_tooltip);
    };

    useEffect(() => {
        getChamp();
    }, []); // 컴포넌트가 마운트 되거나 렌더링,리렌더링 될때 getChamp함수 1회 실행함

    showSkills();

    return (
        <>
            <div className={style.skills}>
                <div className={style.skillsIcon}>
                    <div className={style.passiveIcon}>
                        <div className={style.passiveInfo}></div>
                    </div>
                    <div className={style.qIcon}>
                        <div className={style.qInfo}></div>
                    </div>
                    <div className={style.wIcon}>
                        <div className={style.wInfo}></div>
                    </div>
                    <div className={style.eIcon}>
                        <div className={style.eInfo}></div>
                    </div>
                    <div className={style.rIcon}>
                        <div className={style.rInfo}></div>
                    </div>
                </div>
            </div>
            {/* <button style={{ display: "none" }} onClick={showSkills()}></button> */}
        </>
    );
}

export default ChampionSkills;
