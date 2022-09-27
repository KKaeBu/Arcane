class Riot_API {
    // API_Key는 만료될때마다 바꿔 적어줘야함 (발급 후 24시간 후 만료)
    // Version 업데이트마다 변경해줘야함
    #Riot_API_Key = "RGAPI-e7bea1f3-07c5-4a2b-81b7-49caf3a0af8c";
    #Language = "ko_KR";
    #Version = "12.17.1";
    #headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Request-Headers": "content-type",
        'Access-Control-Allow-Origin': true,
        "Origin": "http://localhost:5000/",
        "X-Riot-Token": this.#Riot_API_Key
    }


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

    async getSummonerProfileIcon(iconNum) {
        return `http://ddragon.leagueoflegends.com/cdn/${this.#Version}/img/profileicon/${iconNum}.png`;
    }

    async getSummonerLeague(id) {
        const link = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${this.#Riot_API_Key}`;
        return link;
    }

    /**puuid값을 가진 소환사의 start(가장 최근에서 몇번째 게임, default = 0)부터 count(알고싶은 게임 전적의 수, 최대 100, default = 20)개까지의 전적 id 리스트 */
    async getMatchIdList(puuid, start, count) {
        const link = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&api_key=${this.#Riot_API_Key}`;
        return link;
    }

    /**해당 matchId를 가진 경기의 결과 정보들을 불러와줌 */
    async getMatchInfo(matchId) {
        const link = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${this.#Riot_API_Key}`;
        return link;
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
    // 특정 챔피언 정보 불러오기
    async getChampion(champion_id) {
        const link = `http://ddragon.leagueoflegends.com/cdn/${
            this.#Version
        }/data/${this.#Language}/champion/${champion_id}.json`;
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

    getApiKey() {
        return this.#Riot_API_Key;
    }

    getRequestHeaders() {
        return this.#headers;
    }
}

async function getFetch(link) {
    return (await fetch(link)).json();
}

export default Riot_API;
