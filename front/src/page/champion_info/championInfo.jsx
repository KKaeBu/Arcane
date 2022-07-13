import { useParams } from "react-router-dom";
import "./championInfo.css";
import ChampionTopBar from "./../../components/champion_topbar/champion_topbar";
import Riot from "../../network/riotAPI.js";
import { useEffect } from "react";
import { useState } from "react";

function ChampionInfo() {
    const riot = new Riot(); // riotAPI 클래스 객체 riot을 생성
    const { id } = useParams();
    const mainDiv = document.getElementsByClassName("main");

    const [champ_data, setData] = useState({});
    const [skill_q, setQ] = useState({});
    const [skill_w, setW] = useState({});
    const [skill_e, setE] = useState({});
    const [skill_r, setR] = useState({});
    const [champion_img, setImg] = useState({});

    // *************************************************************
    const getChamp = async () => {
        const json = await riot.getChampion(id);
        setData(json.data, null, "\t");
        setQ(json.data[id].spells[0]);
        setW(json.data[id].spells[1]);
        setE(json.data[id].spells[2]);
        setR(json.data[id].spells[3]);
        setImg(riot.getChampionIcon(id)); // img도 display와 마찬가지로 해당key값의 이미지로
    }; // 챔피언 API를 받아옴 비동기 처리함

    useEffect(() => {
        getChamp();
    }, []); // 컴포넌트가 마운트 되거나 렌더링,리렌더링 될때 getChamp함수 1회 실행함

    const showChampInfo = async () => {
        const img_tag = document.createElement("img");
        img_tag.setAttribute("src", champion_img);

        const Q_img = document.createElement("img");
        Q_img.setAttribute("src", riot.getSkillIcon(skill_q.id));

        mainDiv[0].appendChild(img_tag);
        mainDiv[0].appendChild(Q_img);
    };
    // *************************************************************
    return (
        <div className="main">
            <ChampionTopBar />
            <div className=""></div>

            {/* 밑 버튼은 showChampInfo함수를 자동으로 실행하기위해서 해놓음 수정요망 */}
            <button
                style={{ display: "none" }}
                onClick={showChampInfo()}
            ></button>
        </div>
    );
}

export default ChampionInfo;
