import { useState, useEffect } from "react";
import Riot from "../network/riotAPI.js";
import Topbar from "../components/main_topbar/Topbar";
import "./main.css";

function MainDisplay() {
  // const userName = "승수몬";
  const riot = new Riot();

  const [champ, setChamp] = useState([]);
  const [illust, setIllust] = useState();

  const getChampion = async () => {
    const json = await riot.getAllChampions(); // 모든 챔피언 정보 불러오기
    // random 한 챔피언을 선택하도록 해야함
    const img = riot.getChampionIllustration(json.data.Gnar.id); // 특정 챔피언의 id 값을 사용해 챔피언 일러스트 불러오기
    console.log(json);
    setChamp(json.data.Aatrox); // 챔피언 정보 객체 저장
    setIllust(img); // 챔피언 일러스트 링크 저장
  };

  useEffect(() => {
    getChampion();
  }, [])


  return (
    <div className="mainDisplay">
      <div className="mainDisplayWrapper">
        <Topbar />
        <img
          src={illust}
          alt="Champion Illustration"
          className="championIllustration"
        />
      </div>
    </div>
  );
}

export default MainDisplay;
