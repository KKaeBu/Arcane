import { useParams } from "react-router-dom";
import style from "./champion_info_home.module.css";
import Riot from "../../network/riotAPI.js";
import { useEffect, useRef } from "react";

function ChampionInfo() {
    const riot = new Riot(); // riotAPI  클래스 객체 riot을 생성
    const { id } = useParams();

    const championNameDiv = useRef(null);
    const home = useRef(null);
    const button = useRef(null);
    const arrow = useRef(null);

    const showChampInfo = async () => {
        const json = await riot.getChampion(id);
        // 해당 페이지 챔피언의 id를 통해 챔피언 객체 저장
        const info = await riot.getInfo(json, id);
        // 챔피언 정보 객체와 id를 getSkill 함수에 인자로 넘겨 해당 챔피언의 정보를 가져옴

        home.current.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${await riot.getChampionIllustration(
            id
        )})`;

        const nameSpan = document.createElement("span");
        const nameSpanDiv = document.createElement("div");

        nameSpanDiv.setAttribute("class", style.championNameSpan);
        nameSpan.innerHTML = info.name;
        nameSpanDiv.appendChild(nameSpan);
        championNameDiv.current.appendChild(nameSpanDiv);

        const titleSpan = document.createElement("span");
        const titleSpanDiv = document.createElement("div");
        titleSpanDiv.setAttribute("class", style.titleSpan);
        titleSpan.innerHTML = '"' + info.title + '"';
        titleSpanDiv.appendChild(titleSpan);
        championNameDiv.current.appendChild(titleSpanDiv);

        // ********** champion, skill의 img 설정 부분
        button.current.addEventListener("mouseover", () => {
            button.current.style.transform = "scale(1.2)";
            arrow.current.src = "/img/arrow-hover.png";
        });

        button.current.addEventListener("mouseout", () => {
            button.current.style.transform = "scale(1)";
            arrow.current.src = "/img/arrow.png";
            handleScroll();
        });
        handleScroll();
    };

    const goToHome = () => {
        home.current.scrollIntoView({ behavior: "smooth" });
        return false;
    };

    const handleScroll = () => {
        if (
            window.scrollY + 1 <
            window.scrollY + home.current.getBoundingClientRect().bottom - 400
        ) {
            button.current.style.transform = "scale(1.2)";
            arrow.current.src = "/img/arrow-hover.png";
        } else {
            button.current.style.transform = "scale(1)";
            arrow.current.src = "/img/arrow.png";
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        showChampInfo();
    });

    return (
        <>
            <div className={style.home} ref={home}>
                <div className={style.championName} ref={championNameDiv}></div>
            </div>
            <button
                onClick={goToHome}
                className={style.homeButton}
                ref={button}
            >
                <img
                    src="/img/arrow.png"
                    alt=""
                    className={style.arrow}
                    ref={arrow}
                />
                home
            </button>
        </>
    );
}

export default ChampionInfo;
