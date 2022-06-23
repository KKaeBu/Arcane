import { useState, useEffect } from "react";

function App() {
    const Riot_API_Key = "RGAPI-b02089a7-38b1-4cd3-8bb2-6ad7f37aefe9";
    const sohwansa = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
    const userName = "승수몬";
    const link = sohwansa + userName + '?api_key=' + Riot_API_Key;
    const newLink = 'http://ddragon.leagueoflegends.com/cdn/12.11.1/data/ko_KR/champion.json';



    const [me, setMe] = useState([]);

    const getUser = async () => {
        const json = await (
            await fetch(newLink)
        ).json();
        console.log(json);
        setMe(JSON.stringify(json.data.Aatrox, null, "\t"));
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div className="mainDisplay">
            <h1>Riot API Practice</h1>
            <div>{me}</div>
        </div>
    );
}

export default App;
