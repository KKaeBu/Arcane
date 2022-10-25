import axios from "axios";

class Riot_API {
    // API_Key는 만료될때마다 바꿔 적어줘야함 (발급 후 24시간 후 만료)
    // Version 업데이트마다 변경해줘야함
    #Riot_API_Key = "RGAPI-af030fec-8d17-4306-a49c-aad21ae09eb4";
    #Language = "ko_KR";
    #Version = "12.19.1";
    #headers = {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Request-Headers": "content-type",
        "Access-Control-Allow-Origin": true,
        Origin: "http://localhost:5000/",
        "X-Riot-Token": this.#Riot_API_Key,
    };

    // 롤 api를 사용하는 함수들
    // 특정 소환사의 pid, ppuid 등의 정보 가져오기
    /**소환사명을 통해서 라이엇으로부터 해당 소환사 정보 불러오기 (id, puuid, account id, username, ....) */
    async getSummoner(username) {
        const link = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${
            this.#Riot_API_Key
        }`;
        const json = await getAPI(link);
        return json;
    }

    /**소환사 고유 id값을 통해 해당 소환사가 속한 리그의 정보를 불러오기 (솔로랭크, 자유랭크) */
    async getSummonerLeague(id) {
        const link = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${
            this.#Riot_API_Key
        }`;
        const data = await getAPIwithServer(link);
        return data;
    }

    /**puuid값을 가진 소환사의 start(가장 최근에서 몇번째 게임, default = 0)부터 count(알고싶은 게임 전적의 수, 최대 100, default = 20)개까지의 전적 id 리스트 */
    async getMatchIdList(puuid, start, count) {
        const link = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&api_key=${
            this.#Riot_API_Key
        }`;
        const data = await getAPIwithServer(link);
        return data;
    }

    /**해당 matchId를 가진 경기의 결과 정보들을 불러와줌 */
    async getMatchInfo(matchId) {
        const link = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${
            this.#Riot_API_Key
        }`;
        const data = await getAPIwithServer(link);
        return data;
    }

    /**모든 매치에서 참가한 유저들의 리스트를 배열로 하여 반환해줌 */
    async getMatchInfoParticipantsList(matchIdLsit) {
        let participatnsArr = new Array();
        await matchIdLsit.forEach(async (m) => {
            const link = `https://asia.api.riotgames.com/lol/match/v5/matches/${m}?api_key=${
                this.#Riot_API_Key
            }`;
            const data = await getAPIwithServer(link);
            participatnsArr.push(data.info.participants);
        });
    }

    async getChallengerLeagueSolo() {
        const link = `https://kr.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${
            this.#Riot_API_Key
        }`;
        const json = await getFetch(link);
        return json;
    }

    // ===================================================================================================================================================================

    // Ddragon을 사용하여 데이터를 가져오는 함수들

    async getSummonerProfileIcon(iconNum) {
        return `http://ddragon.leagueoflegends.com/cdn/${
            this.#Version
        }/img/profileicon/${iconNum}.png`;
    }

    // 모든 챔피언 정보 불러오기
    async getAllChampions() {
        const link = `http://ddragon.leagueoflegends.com/cdn/${
            this.#Version
        }/data/${this.#Language}/champion.json`;
        const data = getFetch(link);
        return data;
    }

    // 특정 챔피언 일러스트 불러오기
    // 매개변수
    async getChampionIllustration(champion) {
        return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`;
    }

    async getChampionSquareAssetsLink(champion) {
        if (champion === "FiddleSticks") champion = "Fiddlesticks";
        return `http://ddragon.leagueoflegends.com/cdn/${
            this.#Version
        }/img/champion/${champion}.png`;
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
        if (champion_id === "FiddleSticks") champion_id = "Fiddlesticks";
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

    async getQueueType() {
        const link =
            "https://static.developer.riotgames.com/docs/lol/queues.json";
        const json = await getFetch(link);
        return json;
    }

    async getAllSpell() {
        const link = `https://ddragon.leagueoflegends.com/cdn/${
            this.#Version
        }/data/${this.#Language}/summoner.json`;
        const json = await getFetch(link);
        return json;
    }

    async getSpellImgLink(img) {
        const link = `http://ddragon.leagueoflegends.com/cdn/${
            this.#Version
        }/img/spell/${img}`;
        return link;
    }

    async getAllRunes() {
        const link = `https://ddragon.leagueoflegends.com/cdn/${
            this.#Version
        }/data/${this.#Language}/runesReforged.json`;
        const json = await getFetch(link);
        return json;
    }

    /**룬 이름을 통해 메인 룬 이미지를 가져옴 (파라미터 순서는 큰 틀의 룬명, 세부적인 룬명) */
    async getMainRuneImgLink(rune, detailRune) {
        // 치명적인 속도룬의 이미지 파일명은 이렇게 되어있음;;
        let detailRunePng = detailRune;
        if (detailRune === "LethalTempo") {
            detailRunePng = "LethalTempoTemp";
        } else if (detailRune === "Aftershock") {
            detailRune = "VeteranAftershock";
            detailRunePng = "VeteranAftershock";
        }
        const link = `https://ddragon.canisback.com/img/perk-images/Styles/${rune}/${detailRune}/${detailRunePng}.png`;
        return link;
    }

    /**룬 이름을 통해 서브 룬 이미지를 가져옴 (룬 마다의 번호 값이 다르기에 룬 이름에 따라 번호값을 설정해둠) */
    async getSubRuneImgLink(rune) {
        let number;
        switch (rune) {
            case "Domination":
                number = "7200";
                break;
            case "Precision":
                number = "7201";
                break;
            case "Sorcery":
                number = "7202";
                break;
            case "Whimsy":
                number = "7203";
                break;
            case "Resolve":
                number = "7204";
                break;
            default:
                number = 0;
                break;
        }

        if (number === 0)
            return `https://ddragon.canisback.com/img/perk-images/Styles/RunesIcon.png`;

        const link = `https://ddragon.canisback.com/img/perk-images/Styles/${number}_${rune}.png`;
        return link;
    }

    // ddragon에서 모든 아이템 정보에 관한 json 파일을 반환
    async getAllItem() {
        const link = `https://ddragon.leagueoflegends.com/cdn/${
            this.#Version
        }/data/${this.#Language}/item.json`;
        const json = getFetch(link);
        return json;
    }

    // ddragon에서 해당 아이템에 대한 img 링크 반환
    async getItemImgLink(item) {
        let link = "";
        if (item !== 0)
            link = `http://ddragon.leagueoflegends.com/cdn/${
                this.#Version
            }/img/item/${item}.png`;

        return link;
    }

    // =================================================================================================================

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

// ===========================================================================================

async function getFetch(link) {
    return (await fetch(link)).json();
}

/**axios를 사용하여 해당 link의 api를 불러옴 */
async function getAPI(link) {
    let data;
    await axios
        .get(link)
        .then((res) => (data = res.data))
        .catch((err) => {
            throw err;
        });

    return data;
}

async function getAPIwithServer(link) {
    // let data;
    // await axios
    //     .get("/summoners", {
    //         headers: {link: link},
    //     })
    //     .then((res) => data=res.data)
    //     .catch(err => console.log("getAPIwithServer error: " + err));

    let data = await axios.get("/api/summoners", { headers: { link: link } });
    if (!data) throw new Error("getAPIwithServer error");

    return await data.data;
}

export default Riot_API;
