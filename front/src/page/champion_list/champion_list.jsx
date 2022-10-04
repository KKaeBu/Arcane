import ChampionTopBar from "../../components/champion_topbar/champion_topbar.jsx";
import ChampionComponent from "../../components/champions/champions.jsx";
import style from "./champion_list.module.css";

function ChampionPage() {
    return (
        <>
            <ChampionTopBar />
            <ChampionComponent />
        </>
    );
}

export default ChampionPage;
