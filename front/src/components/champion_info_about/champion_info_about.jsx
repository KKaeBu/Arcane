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

    if (champion_class[0] === "Fighter") {
        console.log(champion_class[0]);
    }

    return (
        <>
            <div className={style.about}>
                <span>{}</span>
                <p>여기에 클래스랑 클래스 이미지 넣기</p>
                <img
                    src="/img/supporter.jpg"
                    alt=""
                    className={style.classImg}
                />
            </div>
        </>
    );
}

export default ChampionInfoAbout;
