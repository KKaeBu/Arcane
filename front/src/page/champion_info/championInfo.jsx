import { useParams } from "react-router-dom";
import "./championInfo.css";
import ChampionTopBar from "./../../components/champion_topbar/champion_topbar";
import Riot from "../../network/riotAPI.js";
import { useEffect } from "react";
import { useState } from "react";

function ChampionInfo() {
    const riot = new Riot(); // riotAPI 클래스 객체 riot을 생성
    const { id } = useParams();

    // const mainDiv = document.getElementsByClassName("main");
    // const skillIconDiv = document.getElementsByClassName("skillsIcon");
    const champIconDiv = document.getElementsByClassName("championIcon");
    const passiveIconDiv = document.getElementsByClassName("passiveIcon");
    const qIconDiv = document.getElementsByClassName("qIcon");
    const wIconDiv = document.getElementsByClassName("wIcon");
    const eIconDiv = document.getElementsByClassName("eIcon");
    const rIconDiv = document.getElementsByClassName("rIcon");

    const qInfoDiv = document.getElementsByClassName("qInfo");
    const wInfoDiv = document.getElementsByClassName("wInfo");
    const eInfoDiv = document.getElementsByClassName("eInfo");
    const rInfoDiv = document.getElementsByClassName("rInfo");
    const passiveInfoDiv = document.getElementsByClassName("passiveInfo");

    const [skill_passive, setPassive] = useState({});
    const [skill_q, setQ] = useState({});
    const [skill_w, setW] = useState({});
    const [skill_e, setE] = useState({});
    const [skill_r, setR] = useState({});
    const [champion_img, setImg] = useState({});

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

        // 각 스킬의 정보를 저장
        setImg(riot.getChampionIcon(id)); // img도 display와 마찬가지로 해당key값의 이미지로
    }; // 챔피언 API를 받아옴 비동기 처리함

    useEffect(() => {
        getChamp();
    }, []); // 컴포넌트가 마운트 되거나 렌더링,리렌더링 될때 getChamp함수 1회 실행함

    const showChampInfo = async () => {
        // ********** champion, skill의 img 설정 부분
        const img_tag = document.createElement("img");
        img_tag.setAttribute("src", champion_img);
        img_tag.setAttribute("id", "championIcon");

        const passive_img = document.createElement("img");
        passive_img.setAttribute(
            "src",
            riot.getPassiveIcon(skill_passive.image.full)
        );
        passive_img.setAttribute("id", "skillIcon");

        const q_img = document.createElement("img");
        q_img.setAttribute("src", riot.getSkillIcon(skill_q.id));
        q_img.setAttribute("id", "skillIcon");

        const w_img = document.createElement("img");
        w_img.setAttribute("src", riot.getSkillIcon(skill_w.id));
        w_img.setAttribute("id", "skillIcon");

        const e_img = document.createElement("img");
        e_img.setAttribute("src", riot.getSkillIcon(skill_e.id));
        e_img.setAttribute("id", "skillIcon");

        const r_img = document.createElement("img");
        r_img.setAttribute("src", riot.getSkillIcon(skill_r.id));
        r_img.setAttribute("id", "skillIcon");

        champIconDiv[0].appendChild(img_tag);
        passiveIconDiv[0].appendChild(passive_img);
        qIconDiv[0].appendChild(q_img);
        wIconDiv[0].appendChild(w_img);
        eIconDiv[0].appendChild(e_img);
        rIconDiv[0].appendChild(r_img);
        // ********** 까지 img 설정

        // ********** 부터 skill text 설정
        const passive_name = document.createElement("p");
        passive_name.innerHTML = skill_passive.name;
        const passive_description = document.createElement("p");
        passive_description.innerHTML = skill_passive.description;
        const q_name = document.createElement("p");
        q_name.innerHTML = skill_q.name;
        const q_description = document.createElement("p");
        q_description.innerHTML = skill_q.description;
        const w_name = document.createElement("p");
        w_name.innerHTML = skill_w.name;
        const w_description = document.createElement("p");
        w_description.innerHTML = skill_w.description;
        const e_name = document.createElement("p");
        e_name.innerHTML = skill_e.name;
        const e_description = document.createElement("p");
        e_description.innerHTML = skill_e.description;
        const r_name = document.createElement("p");
        r_name.innerHTML = skill_r.name;
        const r_description = document.createElement("p");
        r_description.innerHTML = skill_r.description;

        passiveInfoDiv[0].setAttribute("id", "invisible");
        qInfoDiv[0].setAttribute("id", "invisible");
        wInfoDiv[0].setAttribute("id", "invisible");
        eInfoDiv[0].setAttribute("id", "invisible");
        rInfoDiv[0].setAttribute("id", "invisible");

        passiveIconDiv[0].addEventListener("mouseover", function () {
            passiveInfoDiv[0].removeAttribute("id", "invisible");
        });
        passiveIconDiv[0].addEventListener("mouseout", function () {
            passiveInfoDiv[0].setAttribute("id", "invisible");
        });
        qIconDiv[0].addEventListener("mouseover", function () {
            qInfoDiv[0].removeAttribute("id", "invisible");
        });
        qIconDiv[0].addEventListener("mouseout", function () {
            qInfoDiv[0].setAttribute("id", "invisible");
        });
        wIconDiv[0].addEventListener("mouseover", function () {
            wInfoDiv[0].removeAttribute("id", "invisible");
        });
        wIconDiv[0].addEventListener("mouseout", function () {
            wInfoDiv[0].setAttribute("id", "invisible");
        });
        eIconDiv[0].addEventListener("mouseover", function () {
            eInfoDiv[0].removeAttribute("id", "invisible");
        });
        eIconDiv[0].addEventListener("mouseout", function () {
            eInfoDiv[0].setAttribute("id", "invisible");
        });
        rIconDiv[0].addEventListener("mouseover", function () {
            rInfoDiv[0].removeAttribute("id", "invisible");
        });
        rIconDiv[0].addEventListener("mouseout", function () {
            rInfoDiv[0].setAttribute("id", "invisible");
        });

        passiveInfoDiv[0].appendChild(passive_name);
        passiveInfoDiv[0].appendChild(passive_description);
        qInfoDiv[0].appendChild(q_name);
        qInfoDiv[0].appendChild(q_description);
        wInfoDiv[0].appendChild(w_name);
        wInfoDiv[0].appendChild(w_description);
        eInfoDiv[0].appendChild(e_name);
        eInfoDiv[0].appendChild(e_description);
        rInfoDiv[0].appendChild(r_name);
        rInfoDiv[0].appendChild(r_description);
    };

    return (
        <div className="main">
            <ChampionTopBar />
            <div className="infoBar">
                <div className="championIcon"></div>
                <div className="skillsIcon">
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
                </div>
            </div>

            {/* 밑 버튼은 showChampInfo함수를 자동으로 실행하기위해서 해놓음 수정요망 */}
            <button
                style={{ display: "none" }}
                onClick={showChampInfo()}
            ></button>
        </div>
    );
}

export default ChampionInfo;
