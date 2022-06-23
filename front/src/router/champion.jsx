import Parser from "html-react-parser";

//const api_key = "RGAPI-9721701b-198e-49bf-8f62-64392614a92d";
//const base_url = "https://kr.api.riotgames.com"
var champion_info = {};
const getchamp = async () => {
    const response = await fetch(
        "http://ddragon.leagueoflegends.com/cdn/12.11.1/data/ko_KR/champion.json"
    );
    const data = await response.json();
    //console.log(Object.keys(champion_info));
    Object.keys(data.data).forEach((element) => {
        champion_info.name = element;
        //console.log(champion_info);
    });
    console.log(champion_info);
    //return JSON.stringify(champion_info);
};

function Champ() {
    return (
        <div>
            {(async () => {
                await getchamp();
                // return champion_info;
            })()}
        </div>
    );
}

export default Champ;
