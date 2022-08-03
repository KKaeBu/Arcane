import { useParams } from "react-router-dom";
import "./champion_info_home.css";
import Riot from "../../network/riotAPI.js";
import { useEffect } from "react";
import { useState } from "react";

function ChampionInfo() {
    const riot = new Riot(); // riotAPI 클래스 객체 riot을 생성
    const { id } = useParams();

    // const passiveIconDiv = document.getElementsByClassName("passiveIcon");
    // const qIconDiv = document.getElementsByClassName("qIcon");
    // const wIconDiv = document.getElementsByClassName("wIcon");
    // const eIconDiv = document.getElementsByClassName("eIcon");
    // const rIconDiv = document.getElementsByClassName("rIcon");

    // const qInfoDiv = document.getElementsByClassName("qInfo");
    // const wInfoDiv = document.getElementsByClassName("wInfo");
    // const eInfoDiv = document.getElementsByClassName("eInfo");
    // const rInfoDiv = document.getElementsByClassName("rInfo");
    // const passiveInfoDiv = document.getElementsByClassName("passiveInfo");
    const home = document.getElementsByClassName("home");
    const championNameDiv = document.getElementsByClassName("championName");

    const [champion_name, setName] = useState({});
    const [champion_title, setTitle] = useState({});
    // const [skill_passive, setPassive] = useState({});
    // const [skill_q, setQ] = useState({});
    // const [skill_w, setW] = useState({});
    // const [skill_e, setE] = useState({});
    // const [skill_r, setR] = useState({});
    const [champion_img, setImg] = useState({});
    // const [champion_key, setKey] = useState({});

    const getChamp = async () => {
        const json = await riot.getChampion(id);
        // 해당 페이지 챔피언의 id를 통해 챔피언 객체 저장
        const info = await riot.getInfo(json, id);
        // 챔피언 정보 객체와 id를 getSkill 함수에 인자로 넘겨 해당 챔피언의 정보를 가져옴

        setName(info.name);
        setTitle(info.title);
        // setPassive(info.passive);
        // setQ(info.spells[0]);
        // setW(info.spells[1]);
        // setE(info.spells[2]);
        // setR(info.spells[3]);
        // if (info.key < 10) {
        //     setKey("000" + info.key);
        // } else if (info.key < 100) {
        //     setKey("00" + info.key);
        // } else if (info.key < 1000) {
        //     setKey("0" + info.key);
        // }
        // 각 스킬의 정보를 저장
        setImg(riot.getChampionIcon(id)); // img도 display와 마찬가지로 해당key값의 이미지로
    }; // 챔피언 API를 받아옴 비동기 처리함

    useEffect(() => {
        getChamp();
    }, []); // 컴포넌트가 마운트 되거나 렌더링,리렌더링 될때 getChamp함수 1회 실행함

    const showChampInfo = async () => {
        const nameSpan = document.createElement("span");
        const nameSpanDiv = document.createElement("div");
        nameSpanDiv.setAttribute("class", "championNameSpan");
        nameSpan.innerHTML = champion_name;
        nameSpanDiv.appendChild(nameSpan);
        championNameDiv[0].appendChild(nameSpanDiv);

        const titleSpan = document.createElement("span");
        const titleSpanDiv = document.createElement("div");
        titleSpanDiv.setAttribute("class", "titleSpan");
        titleSpan.innerHTML = champion_title;
        titleSpanDiv.appendChild(titleSpan);
        championNameDiv[0].appendChild(titleSpanDiv);

        // ********** champion, skill의 img 설정 부분
        const champion_icon = document.createElement("img");
        champion_icon.setAttribute("src", champion_img);
        champion_icon.setAttribute("class", "championIcon");
        home[0].prepend(champion_icon);

        // const passive_img = document.createElement("img");
        // passive_img.setAttribute(
        //     "src",
        //     riot.getPassiveIcon(skill_passive.image.full)
        // );
        // passive_img.setAttribute("id", "skillIcon");

        // const q_img = document.createElement("img");
        // q_img.setAttribute("src", riot.getSkillIcon(skill_q.id));
        // q_img.setAttribute("id", "skillIcon");

        // const w_img = document.createElement("img");
        // w_img.setAttribute("src", riot.getSkillIcon(skill_w.id));
        // w_img.setAttribute("id", "skillIcon");

        // const e_img = document.createElement("img");
        // e_img.setAttribute("src", riot.getSkillIcon(skill_e.id));
        // e_img.setAttribute("id", "skillIcon");

        // const r_img = document.createElement("img");
        // r_img.setAttribute("src", riot.getSkillIcon(skill_r.id));
        // r_img.setAttribute("id", "skillIcon");

        // 각 Div에 skill 이미지 append => 이미지들 개별적인 Div에 들어감
        // passiveIconDiv[0].appendChild(passive_img);
        // qIconDiv[0].appendChild(q_img);
        // wIconDiv[0].appendChild(w_img);
        // eIconDiv[0].appendChild(e_img);
        // rIconDiv[0].appendChild(r_img);
        // ********** 까지 img 설정

        // ********** 부터 skill text 설정
        // const passive_name = document.createElement("p");
        // passive_name.setAttribute("class", "skill_name");
        // passive_name.innerHTML = skill_passive.name;
        // const passive_description = document.createElement("p");
        // passive_description.setAttribute("class", "skill_description");
        // passive_description.innerHTML = skill_passive.description;

        // const q_name = document.createElement("p");
        // q_name.setAttribute("class", "skill_name");
        // q_name.innerHTML = skill_q.name;
        // const q_description = document.createElement("p");
        // q_description.setAttribute("class", "skill_description");
        // q_description.innerHTML = skill_q.description;
        // const q_tooltip = document.createElement("p");
        // q_tooltip.innerHTML = skill_q.tooltip;
        // q_tooltip.setAttribute("class", "skill_tooltip");

        // const w_name = document.createElement("p");
        // w_name.setAttribute("class", "skill_name");
        // w_name.innerHTML = skill_w.name;
        // const w_description = document.createElement("p");
        // w_description.setAttribute("class", "skill_description");
        // w_description.innerHTML = skill_w.description;
        // const w_tooltip = document.createElement("p");
        // w_tooltip.innerHTML = skill_w.tooltip;
        // w_tooltip.setAttribute("class", "skill_tooltip");

        // const e_name = document.createElement("p");
        // e_name.setAttribute("class", "skill_name");
        // e_name.innerHTML = skill_e.name;
        // const e_description = document.createElement("p");
        // e_description.setAttribute("class", "skill_description");
        // e_description.innerHTML = skill_e.description;
        // const e_tooltip = document.createElement("p");
        // e_tooltip.innerHTML = skill_e.tooltip;
        // e_tooltip.setAttribute("class", "skill_tooltip");

        // const r_name = document.createElement("p");
        // r_name.setAttribute("class", "skill_name");
        // r_name.innerHTML = skill_r.name;
        // const r_description = document.createElement("p");
        // r_description.setAttribute("class", "skill_description");
        // r_description.innerHTML = skill_r.description;
        // const r_tooltip = document.createElement("p");
        // r_tooltip.innerHTML = skill_r.tooltip;
        // r_tooltip.setAttribute("class", "skill_tooltip");

        // passiveInfoDiv[0].setAttribute("id", "invisible");
        // qInfoDiv[0].setAttribute("id", "invisible");
        // wInfoDiv[0].setAttribute("id", "invisible");
        // eInfoDiv[0].setAttribute("id", "invisible");
        // rInfoDiv[0].setAttribute("id", "invisible");

        // // 마우스 hover 효과를 이벤트리스너를 통해 구현
        // passiveIconDiv[0].addEventListener("mouseover", function () {
        //     passiveInfoDiv[0].removeAttribute("id", "invisible");
        // });
        // passiveIconDiv[0].addEventListener("mouseout", function () {
        //     passiveInfoDiv[0].setAttribute("id", "invisible");
        // });
        // passiveIconDiv[0].addEventListener("click", function () {
        //     window.open(
        //         `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion_key}/ability_${champion_key}_P1.webm`,
        //         "",
        //         "_blank"
        //     );
        // });
        // qIconDiv[0].addEventListener("mouseover", function () {
        //     qInfoDiv[0].removeAttribute("id", "invisible");
        // });
        // qIconDiv[0].addEventListener("mouseout", function () {
        //     qInfoDiv[0].setAttribute("id", "invisible");
        // });
        // qIconDiv[0].addEventListener("click", function () {
        //     window.open(
        //         `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion_key}/ability_${champion_key}_Q1.webm`,
        //         "",
        //         "_blank"
        //     );
        // });
        // wIconDiv[0].addEventListener("mouseover", function () {
        //     wInfoDiv[0].removeAttribute("id", "invisible");
        // });
        // wIconDiv[0].addEventListener("mouseout", function () {
        //     wInfoDiv[0].setAttribute("id", "invisible");
        // });
        // wIconDiv[0].addEventListener("click", function () {
        //     window.open(
        //         `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion_key}/ability_${champion_key}_W1.webm`,
        //         "",
        //         "_blank"
        //     );
        // });
        // eIconDiv[0].addEventListener("mouseover", function () {
        //     eInfoDiv[0].removeAttribute("id", "invisible");
        // });
        // eIconDiv[0].addEventListener("mouseout", function () {
        //     eInfoDiv[0].setAttribute("id", "invisible");
        // });
        // eIconDiv[0].addEventListener("click", function () {
        //     window.open(
        //         `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion_key}/ability_${champion_key}_E1.webm`,
        //         "",
        //         "_blank"
        //     );
        // });
        // rIconDiv[0].addEventListener("mouseover", function () {
        //     rInfoDiv[0].removeAttribute("id", "invisible");
        // });
        // rIconDiv[0].addEventListener("mouseout", function () {
        //     rInfoDiv[0].setAttribute("id", "invisible");
        // });
        // rIconDiv[0].addEventListener("click", function () {
        //     window.open(
        //         `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion_key}/ability_${champion_key}_R1.webm`,
        //         "",
        //         "_blank"
        //     );
        // });

        // passiveInfoDiv[0].appendChild(passive_name);
        // passiveInfoDiv[0].appendChild(passive_description);

        // qInfoDiv[0].appendChild(q_name);
        // qInfoDiv[0].appendChild(q_description);
        // qInfoDiv[0].appendChild(q_tooltip);

        // wInfoDiv[0].appendChild(w_name);
        // wInfoDiv[0].appendChild(w_description);
        // wInfoDiv[0].appendChild(w_tooltip);

        // eInfoDiv[0].appendChild(e_name);
        // eInfoDiv[0].appendChild(e_description);
        // eInfoDiv[0].appendChild(e_tooltip);

        // rInfoDiv[0].appendChild(r_name);
        // rInfoDiv[0].appendChild(r_description);
        // rInfoDiv[0].appendChild(r_tooltip);
    };

    return (
        <div className="home">
            <div className="championName"></div>
            {/* <div className="skillsIcon">
                        <div className="passiveIcon">
                            <div className="passiveInfo"></div>
                        </div>
                        <div className="qIcon">
                            <div className="qInfo"></div>
                        </div>
                        <div className="wIcon">
                            <div className="wInfo"></div>
                        </div>
                        <div className="eIcon">
                            <div className="eInfo"></div>
                        </div>
                        <div className="rIcon">
                            <div className="rInfo"></div>
                        </div>
                    </div> */}
            {/* 밑 버튼은 showChampInfo함수를 자동으로 실행하기위해서 해놓음 수정요망 */}
            <button
                style={{ display: "none" }}
                onClick={showChampInfo()}
            ></button>
        </div>
    );
}

export default ChampionInfo;
