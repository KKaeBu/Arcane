import style from "./champion_info_tip.module.css";
import Riot from "../../network/riotAPI.js";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";

function ChampionInfoTip() {
    const riot = new Riot(); // riotAPI 클래스 객체 riot을 생성
    const { id } = useParams();

    const tip = useRef(null);
    const allytip_div = useRef(null);
    const enemytip_div = useRef(null);
    const allytip = useRef(null);
    const enemytip = useRef(null);

    const button1 = useRef(null);
    const arrow1 = useRef(null);
    const button2 = useRef(null);
    const arrow2 = useRef(null);

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.setAttribute("id", style.active);
            } else {
                entry.target.removeAttribute("id", style.active);
            }
        });
    }, options);

    const showTips = async () => {
        observer.observe(allytip.current);
        observer.observe(enemytip.current);

        const json = await riot.getChampion(id);
        // 해당 페이지 챔피언의 id를 통해 챔피언 객체 저장
        const info = await riot.getInfo(json, id);
        // 챔피언 정보 객체와 id를 getSkill 함수에 인자로 넘겨 해당 챔피언의 정보를 가져옴
        const allytips = info.allytips;
        const enemytips = info.enemytips;

        if (info.skins.length < 3) {
            allytip_div.current.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${await riot.getChampionSkinIllustration(
                id,
                info.skins[info.skins.length - 2].num
            )})`;
            enemytip_div.current.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${await riot.getChampionSkinIllustration(
                id,
                info.skins[info.skins.length - 1].num
            )})`;

            const first_skin_name = info.skins[info.skins.length - 2].name;
            const second_skin_name = info.skins[info.skins.length - 1].name;

            const first_skin_name_div = document.createElement("div");
            const second_skin_name_div = document.createElement("div");

            first_skin_name_div.setAttribute("class", style.skinName);
            second_skin_name_div.setAttribute("class", style.skinName);

            first_skin_name_div.innerHTML = `-${first_skin_name}-`;
            second_skin_name_div.innerHTML = `-${second_skin_name}-`;

            allytip_div.current.appendChild(first_skin_name_div);
            enemytip_div.current.appendChild(second_skin_name_div);
        } else {
            allytip_div.current.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${await riot.getChampionSkinIllustration(
                id,
                info.skins[info.skins.length - 2].num
            )})`;
            enemytip_div.current.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${await riot.getChampionSkinIllustration(
                id,
                info.skins[info.skins.length - 3].num
            )})`;

            const first_skin_name = info.skins[info.skins.length - 2].name;
            const second_skin_name = info.skins[info.skins.length - 3].name;

            const first_skin_name_div = document.createElement("div");
            const second_skin_name_div = document.createElement("div");

            first_skin_name_div.setAttribute("class", style.skinName);
            second_skin_name_div.setAttribute("class", style.skinName);

            first_skin_name_div.innerHTML = `-${first_skin_name}-`;
            second_skin_name_div.innerHTML = `-${second_skin_name}-`;

            allytip_div.current.appendChild(first_skin_name_div);
            enemytip_div.current.appendChild(second_skin_name_div);
        }

        // ******* allytips *******
        const title = document.createElement("div");
        title.setAttribute("class", style.tipTitle);
        title.innerHTML = `${info.name} 플레이 팁`;
        allytip_div.current.insertBefore(title, allytip.current);

        const tip_addendum = document.createElement("p");
        tip_addendum.setAttribute("class", style.tipAddendum);
        tip_addendum.innerHTML = `${info.name}. 더 잘하고 싶다면.`;
        allytip_div.current.insertBefore(tip_addendum, allytip.current);

        if (allytips.length === 0) {
            const new_tip = document.createElement("p");
            new_tip.innerHTML = `현재 RIOT API에 ${info.name}의 정보가 업데이트 되어있지 않습니다.`;
            const new_tip_div = document.createElement("div");
            new_tip_div.setAttribute("class", style.allyTip);
            new_tip_div.appendChild(new_tip);
            allytip.current.appendChild(new_tip_div);
        } else {
            for (let i = 0; i < allytips.length; i++) {
                const new_tip = document.createElement("p");
                new_tip.innerHTML = allytips[i];
                const new_tip_div = document.createElement("div");
                new_tip_div.setAttribute("class", style.allyTip);

                new_tip_div.appendChild(new_tip);
                allytip.current.appendChild(new_tip_div);
            }
        }

        // ******* allytips *******
        // ******* enemytips *******
        const enemy_title = document.createElement("div");
        enemy_title.setAttribute("class", style.tipTitle);
        enemy_title.innerHTML = `${info.name} 상대 팁`;
        enemytip_div.current.insertBefore(enemy_title, enemytip.current);

        const enemy_tip_addendum = document.createElement("p");
        enemy_tip_addendum.setAttribute("class", style.tipAddendum);
        enemy_tip_addendum.innerHTML = `${info.name}. 적으로 만난다면.`;
        enemytip_div.current.insertBefore(enemy_tip_addendum, enemytip.current);

        if (enemytips.length === 0) {
            const new_tip = document.createElement("p");
            new_tip.innerHTML = `현재 RIOT API에 ${info.name}의 정보가 업데이트 되어있지 않습니다.`;
            const new_tip_div = document.createElement("div");
            new_tip_div.setAttribute("class", style.enemyTip);
            new_tip_div.appendChild(new_tip);
            enemytip.current.appendChild(new_tip_div);
        } else {
            for (let i = 0; i < enemytips.length; i++) {
                const new_tip = document.createElement("p");
                new_tip.innerHTML = enemytips[i];
                const new_tip_div = document.createElement("div");
                new_tip_div.setAttribute("class", style.enemyTip);

                new_tip_div.appendChild(new_tip);
                enemytip.current.appendChild(new_tip_div);
            }
        }
        // ******* enemytips *******

        button1.current.addEventListener("mouseover", () => {
            button1.current.style.transform = "scale(1.2)";
            arrow1.current.src = "/img/arrow-hover.png";
        });

        button1.current.addEventListener("mouseout", () => {
            button1.current.style.transform = "scale(1)";
            arrow1.current.src = "/img/arrow.png";
            handleScroll();
        });

        button2.current.addEventListener("mouseover", () => {
            button2.current.style.transform = "scale(1.2)";
            arrow2.current.src = "/img/arrow-hover.png";
        });

        button2.current.addEventListener("mouseout", () => {
            button2.current.style.transform = "scale(1)";
            arrow2.current.src = "/img/arrow.png";
            handleScroll();
        });
    };

    const handleScroll = () => {
        if (
            window.scrollY + 1 >=
                window.scrollY +
                    allytip_div.current.getBoundingClientRect().top -
                    400 &&
            window.scrollY + 1 <
                window.scrollY +
                    allytip_div.current.getBoundingClientRect().bottom -
                    400
        ) {
            button1.current.style.transform = "scale(1.2)";
            arrow1.current.src = "/img/arrow-hover.png";
            button2.current.style.transform = "scale(1)";
            arrow2.current.src = "/img/arrow.png";
        } else if (
            window.scrollY + 1 >=
            window.scrollY +
                allytip_div.current.getBoundingClientRect().bottom -
                400
        ) {
            button1.current.style.transform = "scale(1)";
            arrow1.current.src = "/img/arrow.png";
            button2.current.style.transform = "scale(1.2)";
            arrow2.current.src = "/img/arrow-hover.png";
        } else {
            button1.current.style.transform = "scale(1)";
            arrow1.current.src = "/img/arrow.png";
            button2.current.style.transform = "scale(1)";
            arrow2.current.src = "/img/arrow.png";
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const goToAllyTip = () => {
        allytip_div.current.scrollIntoView({ behavior: "smooth" });
        button1.current.style.transform = "scale(1.2)";
        arrow1.current.src = "/img/arrow-hover.png";
        return false;
    };

    const goToEnemyTip = () => {
        enemytip_div.current.scrollIntoView({ behavior: "smooth" });
        button2.current.style.transform = "scale(1.2)";
        arrow2.current.src = "/img/arrow-hover.png";
        return false;
    };

    useEffect(() => {
        showTips();
    });

    return (
        <>
            <div className={style.tip} ref={tip}>
                <div className={style.ally} ref={allytip_div}>
                    <div className={style.allyTips} ref={allytip}></div>
                </div>

                <div className={style.enemy} ref={enemytip_div}>
                    <div className={style.enemyTips} ref={enemytip}></div>
                </div>
            </div>
            <button
                onClick={goToAllyTip}
                className={style.allytipButton}
                ref={button1}
            >
                <img
                    src="/img/arrow.png"
                    alt=""
                    className={style.arrow}
                    ref={arrow1}
                />
                ally tip
            </button>
            <button
                onClick={goToEnemyTip}
                className={style.enemytipButton}
                ref={button2}
            >
                <img
                    src="/img/arrow.png"
                    alt=""
                    className={style.arrow}
                    ref={arrow2}
                />
                enemy tip
            </button>
        </>
    );
}

export default ChampionInfoTip;
