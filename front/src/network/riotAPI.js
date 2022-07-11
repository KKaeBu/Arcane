class Riot_API {
    #Riot_API_Key = "RGAPI-baeb6eb0-1db6-43dd-a667-d5760da01209";
    #Language = "ko_KR";
    #Version = "12.11.1";

    // 특정 소환사의 pid, ppuid 등의 정보 가져오기
    // 소환사명 필요
    async getSummoner(username) {
        const sunmmoners_api = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
        const link = sunmmoners_api + username + "?api_key=" + this.#Riot_API_Key;
        const json = getFetch(link);
        return json;
    }

    // 모든 챔피언 정보 불러오기
    async getAllChampions() {
        const link = `http://ddragon.leagueoflegends.com/cdn/${this.#Version}/data/${this.#Language}/champion.json`;
        const json = getFetch(link);
        return json;
    }

    // 특정 챔피언 일러스트 불러오기
    // 매개변수 
    async getChampionIllustration(champion) {
        return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`;
    }

    
}

async function getFetch(link) {
    return (await fetch(link)).json();
}

export default Riot_API;