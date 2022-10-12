class Riot_API {
    #Riot_API_Key = "RGAPI-316a648a-9022-45b6-a2c2-b1259f169fcf";
    #Language = "ko_KR";
    #Version = "12.19.1";
    // ========= 임시로 버전 변경함
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

    // 특정 챔피언 일러스트 불러오기
    // 매개변수
    async getChampionIllustration(champion) {
        return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`;
    }

    // 챔피언 스킨 일러스트 불러오기
    async getChampionSkinIllustration(champion, number) {
        return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_${number}.jpg`;
    }

    // 특정 챔피언 정보 불러오기
    async getChampion(champion_id) {
        const link = `http://ddragon.leagueoflegends.com/cdn/${
            this.#Version
        }/data/${this.#Language}/champion/${champion_id}.json`;
        const json = getFetch(link);
        return json;
    }

    //로테이션 챔피언 목록 불러오기
    async getRotationChampion() {
        const link = `https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${
            this.#Riot_API_Key
        }`;
        const json = getFetch(link);
        return json;
    }

    async getInfo(json, id) {
        return json.data[id];
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

    getPassiveIcon(passive_id) {
        const link = `http://ddragon.leagueoflegends.com/cdn/${
            this.#Version
        }/img/passive/${passive_id}`;
        return link;
    }

    // getRecommendedItem(champion_id) {
    //     /* 라이엇에서 제공받는 api가 11.8.1 버전 이후로 추천 아이템 정보를 제공하지않음..  */
    //     const link = `http://ddragon.leagueoflegends.com/cdn/11.8.1/data/${
    //         this.#Language
    //     }/champion/${champion_id}.json`;
    //     const json = getFetch(link);
    //     return json.data[champion_id];
    // }

    getVersion() {
        return this.#Version;
    }
}

async function getFetch(link) {
    return (await fetch(link)).json();
}

export default Riot_API;
