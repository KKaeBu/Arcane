import style from "./champion_info_about.module.css";
import Riot from "../../network/riotAPI.js";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";

function ChampionInfoAbout() {
    const riot = new Riot(); // riotAPI 클래스 객체 riot을 생성
    const { id } = useParams();

    const about = useRef(null);
    const Title = useRef(null);

    const button = useRef(null);
    const arrow = useRef(null);

    const translate = (info) => {
        if (info === "Tank") return "탱커";
        else if (info === "Mage") return "메이지";
        else if (info === "Support") return "서포터";
        else if (info === "Assassin") return "암살자";
        else if (info === "Marksman") return "원거리";
        else if (info === "Fighter") return "전사";
    };

    const showChampAbout = async () => {
        const json = await riot.getChampion(id);
        // 해당 페이지 챔피언의 id를 통해 챔피언 객체 저장
        const info = await riot.getInfo(json, id);
        // 챔피언 정보 객체와 id를 getSkill 함수에 인자로 넘겨 해당 챔피언의 정보를 가져옴

        const about_div = document.querySelector("." + style["about"]);

        Title.current.innerHTML = `스토리`;

        const titleAddendum = document.createElement("p");
        titleAddendum.setAttribute("class", style.titleAddendum);
        titleAddendum.innerHTML = `${info.name}의 이야기가 궁금하다면.`;
        about_div.firstChild.after(titleAddendum);

        const illustration = document.createElement("img");
        illustration.setAttribute("class", style.illustration);
        illustration.setAttribute(
            "src",
            await riot.getChampionIllustration(id)
        );
        titleAddendum.after(illustration);

        const lore = document.createElement("p");
        lore.setAttribute("class", style.lore);
        lore.innerText = info.lore;
        illustration.after(lore);

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
        thead_td3.innerText = "??";
        thead_td4.innerText = "??";

        const class_img1 = document.createElement("img");
        const class_name1 = document.createElement("p");
        class_img1.setAttribute("class", style.classImg);
        if (info.tags[0] !== undefined) {
            class_img1.src = `/img/${info.tags[0]}.jpg`;
            class_name1.setAttribute("class", style.className);
            class_name1.innerText = translate(info.tags[0]);
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
        if (info.tags[1] !== undefined) {
            class_img2.src = `/img/${info.tags[1]}.jpg`;
            class_name2.setAttribute("class", style.className);
            class_name2.innerText = translate(info.tags[1]);
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

        button.current.addEventListener("mouseover", () => {
            button.current.style.transform = "scale(1.2)";
            arrow.current.src = "/img/arrow-hover.png";
        });

        button.current.addEventListener("mouseout", () => {
            button.current.style.transform = "scale(1)";
            arrow.current.src = "/img/arrow.png";
            handleScroll();
        });
    };

    const goToAbout = () => {
        about.current.scrollIntoView({ behavior: "smooth" });
        return false;
    };

    const handleScroll = () => {
        if (
            window.scrollY + 1 >=
                window.scrollY +
                    about.current.getBoundingClientRect().top -
                    400 &&
            window.scrollY + 1 <
                window.scrollY +
                    about.current.getBoundingClientRect().bottom -
                    400
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
        showChampAbout();
    });

    return (
        <>
            <div className={style.about} ref={about}>
                <p className={style.aboutTitle} ref={Title}></p>
            </div>
            <button
                onClick={goToAbout}
                className={style.aboutButton}
                ref={button}
            >
                <img
                    src="/img/arrow.png"
                    alt=""
                    className={style.arrow}
                    ref={arrow}
                />
                story
            </button>
        </>
    );
}

export default ChampionInfoAbout;
