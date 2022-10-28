import style from "./champion_info_skills.module.css";
import { useParams } from "react-router-dom";
import Riot from "../../network/riotAPI.js";
import { useEffect, useRef } from "react";

function ChampionSkills() {
    const riot = new Riot(); // riotAPI 클래스 객체 riot을 생성
    const { id } = useParams();

    const skill = useRef(null);
    const title = useRef(null);

    const passiveDiv = useRef(null);
    const passiveName = useRef(null);
    const passiveDescription = useRef(null);

    const QDiv = useRef(null);
    const QName = useRef(null);
    const QDescription = useRef(null);

    const WDiv = useRef(null);
    const WName = useRef(null);
    const WDescription = useRef(null);

    const EDiv = useRef(null);
    const EName = useRef(null);
    const EDescription = useRef(null);

    const RDiv = useRef(null);
    const RName = useRef(null);
    const RDescription = useRef(null);

    const button = useRef(null);
    const arrow = useRef(null);

    const showSkills = async () => {
        const json = await riot.getChampion(id);
        // 해당 페이지 챔피언의 id를 통해 챔피언 객체 저장
        const info = await riot.getInfo(json, id);
        // 챔피언 정보 객체와 id를 getSkill 함수에 인자로 넘겨 해당 챔피언의 정보를 가져옴

        skill.current.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${await riot.getChampionSkinIllustration(
            id,
            info.skins[info.skins.length - 1].num
        )})`;

        var champion_key;
        if (info.key < 10) {
            champion_key = "000" + info.key;
        } else if (info.key < 100) {
            champion_key = "00" + info.key;
        } else if (info.key < 1000) {
            champion_key = "0" + info.key;
        }

        const skill_addendum = document.createElement("p");
        skill_addendum.setAttribute("class", style.skillAddendum);
        skill_addendum.innerHTML = `${info.name} 하고싶으면 스킬은 알아야.`;
        title.current.appendChild(skill_addendum);

        /* 패시브 */
        passiveName.current.innerText = `패시브 - ${info.passive.name}`;
        const passive_img = document.createElement("img");
        passive_img.setAttribute(
            "src",
            riot.getPassiveIcon(info.passive.image.full)
        );
        passive_img.setAttribute("class", style.skillImg);
        const passive_description = document.createElement("p");
        passive_description.setAttribute("class", style.skillDescription);
        passive_description.innerHTML = info.passive.description;

        passiveDescription.current.appendChild(passive_img);
        passiveDescription.current.appendChild(passive_description);

        const p_video_div = document.createElement("div");
        p_video_div.setAttribute("class", style.videoDiv);

        const p_video = document.createElement("video");
        p_video.setAttribute("class", style.skillVideo);
        p_video.setAttribute("controls", "");
        p_video.setAttribute("width", "300");
        const p_source = document.createElement("source");
        p_source.setAttribute(
            "src",
            `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion_key}/ability_${champion_key}_P1.webm`
        );
        p_source.setAttribute("type", "video/webm");
        p_video.appendChild(p_source);
        p_video_div.appendChild(p_video);
        passiveDiv.current.appendChild(p_video_div);

        /* Q */
        QName.current.innerText = `Q - ${info.spells[0].name}`;
        const q_img = document.createElement("img");
        q_img.setAttribute("src", riot.getSkillIcon(info.spells[0].id));
        q_img.setAttribute("class", style.skillImg);
        const q_description = document.createElement("p");
        q_description.setAttribute("class", style.skillDescription);
        q_description.innerHTML = info.spells[0].description;

        QDescription.current.appendChild(q_img);
        QDescription.current.appendChild(q_description);

        const q_video_div = document.createElement("div");
        q_video_div.setAttribute("class", style.videoDiv);

        const q_video = document.createElement("video");
        q_video.setAttribute("class", style.skillVideo);
        q_video.setAttribute("controls", "");
        q_video.setAttribute("width", "300");
        const q_source = document.createElement("source");
        q_source.setAttribute(
            "src",
            `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion_key}/ability_${champion_key}_Q1.webm`
        );
        q_source.setAttribute("type", "video/webm");
        q_video.appendChild(q_source);
        q_video_div.appendChild(q_video);
        QDiv.current.appendChild(q_video_div);

        /* W */
        WName.current.innerText = `W - ${info.spells[1].name}`;
        const w_img = document.createElement("img");
        w_img.setAttribute("src", riot.getSkillIcon(info.spells[1].id));
        w_img.setAttribute("class", style.skillImg);
        const w_description = document.createElement("p");
        w_description.setAttribute("class", style.skillDescription);
        w_description.innerHTML = info.spells[1].description;

        WDescription.current.appendChild(w_img);
        WDescription.current.appendChild(w_description);

        const w_video_div = document.createElement("div");
        w_video_div.setAttribute("class", style.videoDiv);

        const w_video = document.createElement("video");
        w_video.setAttribute("class", style.skillVideo);
        w_video.setAttribute("controls", "");
        w_video.setAttribute("width", "300");
        const w_source = document.createElement("source");
        w_source.setAttribute(
            "src",
            `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion_key}/ability_${champion_key}_W1.webm`
        );
        w_source.setAttribute("type", "video/webm");
        w_video.appendChild(w_source);
        w_video_div.appendChild(w_video);
        WDiv.current.appendChild(w_video_div);

        /* E */
        EName.current.innerText = `E - ${info.spells[2].name}`;
        const e_img = document.createElement("img");
        e_img.setAttribute("src", riot.getSkillIcon(info.spells[2].id));
        e_img.setAttribute("class", style.skillImg);
        const e_description = document.createElement("p");
        e_description.setAttribute("class", style.skillDescription);
        e_description.innerHTML = info.spells[2].description;

        EDescription.current.appendChild(e_img);
        EDescription.current.appendChild(e_description);

        const e_video_div = document.createElement("div");
        e_video_div.setAttribute("class", style.videoDiv);

        const e_video = document.createElement("video");
        e_video.setAttribute("class", style.skillVideo);
        e_video.setAttribute("controls", "");
        e_video.setAttribute("width", "300");
        const e_source = document.createElement("source");
        e_source.setAttribute(
            "src",
            `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion_key}/ability_${champion_key}_E1.webm`
        );
        e_source.setAttribute("type", "video/webm");
        e_video.appendChild(e_source);
        e_video_div.appendChild(e_video);
        EDiv.current.appendChild(e_video_div);

        /* R */
        RName.current.innerText = `R - ${info.spells[3].name}`;
        const r_img = document.createElement("img");
        r_img.setAttribute("src", riot.getSkillIcon(info.spells[3].id));
        r_img.setAttribute("class", style.skillImg);
        const r_description = document.createElement("p");
        r_description.setAttribute("class", style.skillDescription);
        r_description.innerHTML = info.spells[3].description;

        //r_description.on = () => {
        //    r_video.removeAttribute("id", style.invisible);
        //};

        RDescription.current.appendChild(r_img);
        RDescription.current.appendChild(r_description);

        const r_video_div = document.createElement("div");
        r_video_div.setAttribute("class", style.videoDiv);

        const r_video = document.createElement("video");
        r_video.setAttribute("class", style.skillVideo);
        r_video.setAttribute("controls", "");
        //r_video.setAttribute("id", style.invisible);
        const r_source = document.createElement("source");
        r_source.setAttribute(
            "src",
            `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champion_key}/ability_${champion_key}_R1.webm`
        );
        r_source.setAttribute("type", "video/webm");
        r_video.appendChild(r_source);
        r_video_div.appendChild(r_video);
        RDiv.current.appendChild(r_video_div);

        const first_skin_name = info.skins[info.skins.length - 1].name;
        const first_skin_name_div = document.createElement("div");

        first_skin_name_div.setAttribute("class", style.skinName);
        first_skin_name_div.innerHTML = `-${first_skin_name}-`;
        skill.current.appendChild(first_skin_name_div);

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

    const goToSkill = () => {
        skill.current.scrollIntoView({ behavior: "smooth" });
        button.current.style.transform = "scale(1.2)";
        arrow.current.src = "/img/arrow-hover.png";
        return false;
    };

    const handleScroll = () => {
        if (
            window.scrollY + 1 >=
                window.scrollY +
                    skill.current.getBoundingClientRect().top -
                    400 &&
            window.scrollY + 1 <
                window.scrollY +
                    skill.current.getBoundingClientRect().bottom -
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
        showSkills();
    });

    return (
        <>
            <div className={style.skills} ref={skill}>
                <p className={style.skillsTitle} ref={title}>
                    스킬
                </p>
                <div className={style.skillswrapper}>
                    <div className={style.passiveSkill} ref={passiveDiv}>
                        <p className={style.skillName} ref={passiveName}></p>
                        <div
                            className={style.skillDescriptionDiv}
                            ref={passiveDescription}
                        ></div>
                    </div>

                    <div className={style.QSkill} ref={QDiv}>
                        <p className={style.skillName} ref={QName}></p>
                        <div
                            className={style.skillDescriptionDiv}
                            ref={QDescription}
                        ></div>
                    </div>

                    <div className={style.WSkill} ref={WDiv}>
                        <p className={style.skillName} ref={WName}></p>
                        <div
                            className={style.skillDescriptionDiv}
                            ref={WDescription}
                        ></div>
                    </div>

                    <div className={style.ESkill} ref={EDiv}>
                        <p className={style.skillName} ref={EName}></p>
                        <div
                            className={style.skillDescriptionDiv}
                            ref={EDescription}
                        ></div>
                    </div>

                    <div className={style.RSkill} ref={RDiv}>
                        <p className={style.skillName} ref={RName}></p>
                        <div
                            className={style.skillDescriptionDiv}
                            ref={RDescription}
                        ></div>
                    </div>
                </div>
            </div>
            <button
                onClick={goToSkill}
                className={style.skillButton}
                ref={button}
            >
                <img
                    src="/img/arrow.png"
                    alt=""
                    className={style.arrow}
                    ref={arrow}
                />
                skill
            </button>
        </>
    );
}

export default ChampionSkills;
