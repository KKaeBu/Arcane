import ChampionTopBar from "../../components/champion_topbar/champion_topbar.jsx";
import ChampionInfoHome from "../../components/champion_info_home/champion_info_home.jsx";
import ChampionInfoAbout from "../../components/champion_info_about/champion_info_about.jsx";
import ChampionSkills from "../../components/champion_info_skills/champion_info_skills.jsx";
import ChampionInfoTip from "../../components/champion_info_tip/champion_info_tip.jsx";

function ChampionInfoPage() {
    return (
        <>
            <ChampionTopBar />
            <ChampionInfoHome />
            <ChampionInfoAbout />
            <ChampionSkills />
            <ChampionInfoTip />
        </>
    );
}

export default ChampionInfoPage;
