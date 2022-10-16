import { Summoner, MatchHistory } from "../model/schema.js";

// 사용자 이름으로 찾기
export async function findBySummonerName(summonerName) {
    return Summoner.findOne({ summonerName });
}

// 아이디로 찾기
export async function findById(id) {
    return Summoner.findById(id);
}

// 새롭게 검색한 소환사 정보 추가
export async function createSummoner(summoner) {
    return new Summoner(summoner)//
        .save()
        .then((data) => data.id)
        .catch((err) => console.log(err));
}