class Riot_API {
    #Riot_API_Key = "RGAPI-7d1291b3-b690-4b73-863c-87ba0408d9be";
    #Language = "ko_KR";
    #Version = "12.11.1";

    // 특정 소환사의 pid, ppuid 등의 정보 가져오기
    // 소환사명 필요
    async getSummoner(username) {
        const sunmmoners_api =
            "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
        const link =
            sunmmoners_api + username + "?api_key=" + this.#Riot_API_Key;
        const json = getFetch(link);
        return json;
    }

    // 모든 챔피언 정보 불러오기
    async getAllChampions() {
        const link = `http://ddragon.leagueoflegends.com/cdn/${
            this.#Version
        }/data/${this.#Language}/champion.json`;
        const json = getFetch(link);
        return json;
    }

    // 특정 챔피언 정보 불러오기
    async getChampion(champion_id) {
        const link = `http://ddragon.leagueoflegends.com/cdn/${
            this.#Version
        }/data/${this.#Language}/champion/${champion_id}.json`;
        const json = getFetch(link);
        return json;
    }

    getChampionIcon(champion_id) {
        const link = `https://ddragon.leagueoflegends.com/cdn/${
            this.#Version
        }/img/champion/${champion_id}.png`;
        return link;
    }

    getSkillIcon(skill_id) {
        const link = `https://ddragon.leagueoflegends.com/cdn/${
            this.#Version
        }/img/spell/${skill_id}.png`;
        return link;
    }
}

async function getFetch(link) {
    return (await fetch(link)).json();
}

export default Riot_API;
