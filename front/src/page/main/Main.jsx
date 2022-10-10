import { useState, useEffect, useRef } from "react";
import Riot from "../../network/riotAPI.js";
import Topbar from "../../components/main_topbar/Topbar";
import Menu from "../../components/main_menu/Menu";
import style from "./main.module.css";

function MainDisplay() {
    // const userName = "승수몬";
    const riot = new Riot();

    const wrapper = useRef(null);

    const [illust, setIllust] = useState();
    const getChampion = async () => {
        const json = await riot.getAllChampions(); // 모든 챔피언 정보 불러오기
        // random 한 챔피언을 선택하도록 해야함
        const allChampCount = Object.keys(json.data).length; // 총 챔피언 개수
        const chooseRandomChampNumber = Math.floor(
            Math.random() * allChampCount
        ); // 랜덤한 챔피언 번호 선택
        const chooseRandomChamp = Object.keys(json.data)[
            chooseRandomChampNumber
        ]; // 뽑힌 챔피언 이름 가져오기

        // const chooseRandomChamp = json.data.Ahri.id; // 임시로 일러 아리로 고정

        // const img = await riot.getChampionIllustration(chooseRandomChamp); // 특정 챔피언의 id 값을 사용해 챔피언 일러스트 불러오기
        // setIllust(img); // 챔피언 일러스트 링크 저장

        wrapper.current.style.backgroundImage = `linear-gradient(
            to right,
            rgba(0, 0, 0, 1) 10%,
            rgba(0, 0, 0, 0.5) 25%,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0.5) 75%,
            rgba(0, 0, 0, 1) 90%
        ), url(${await riot.getChampionIllustration(chooseRandomChamp)})`;

        // wrapper.current.style.backgroundImage = `radial-gradient(
        //     rgba(0, 0, 0, 0) 10%,
        //     rgba(0, 0, 0, 1) 70%
        // ), url(${await riot.getChampionIllustration(chooseRandomChamp)})`;
    };

    useEffect(() => {
        getChampion();
    }, []);

    return (
        <div className={style.mainDisplay}>
            <Topbar />
            <div className={style.mainDisplayWrapper} ref={wrapper}>
                {/* <img
                    src={illust}
                    alt="Champion Illustration"
                    className={style.championIllustration}
                /> */}
                <Menu />
            </div>
        </div>
    );
}

export default MainDisplay;
