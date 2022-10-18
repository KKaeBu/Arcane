import axios from "axios";
import * as userRepository from "../data/summoners.js";

export async function getRiotApi(req, res, next) {
    const result = await getApi(req.headers.link);

    res.status(200).json(result.data);
}

/**검색한 소환사가 디비에 이미 있는지 여부를 반환 (return boolean) */
export async function isSummoner(req, res, next) {
    const summonerName = decodeURIComponent(req.headers.summonername);

    const summoner = await userRepository.findBySummonerName(summonerName);

    if (summoner) return res.status(200).json(true);

    return res.status(200).json(false);
}

/**처음 검색한 소환사의 정보를 디비에 저장해줌 (return json) */
export async function saveSummonerInfo(req, res, next) {
    const { matchHistoryList, summoner, rankData } = req.body;
    for (const m in matchHistoryList) {
        matchHistoryList[m].then(async (data) => {});
    }

    let soloRank = {
        queueType: "Unranked",
        tier: "Unranked",
        rank: "",
        leaguePoints: 0,
        wins: 0,
        losses: 0,
    };
    let flexRank = {
        queueType: "Unranked",
        tier: "Unranked",
        rank: "",
        leaguePoints: 0,
        wins: 0,
        losses: 0,
    };

    for (const r in rankData) {
        if (rankData[r].queueType === "RANKED_SOLO_5x5") soloRank = rankData[r];
        else flexRank = rankData[r];
    }

    const mList = await saveMatchHistroy(matchHistoryList);

    const summId = await userRepository.createSummoner({
        summonerName: summoner.name,
        profileIconId: summoner.profileIconId,
        level: summoner.summonerLevel,

        soloRankQueueType: soloRank.queueType,
        soloRankTier: soloRank.tier,
        soloRankRank: soloRank.rank,
        soloRankLP: soloRank.leaguePoints,
        soloRankWinNum: soloRank.wins,
        soloRankLoseNum: soloRank.losses,

        flexRankQueueType: flexRank.queueType,
        flexRankTier: flexRank.tier,
        flexRankRank: flexRank.rank,
        flexRankLP: flexRank.leaguePoints,
        flexRankWinNum: flexRank.wins,
        flexRankLoseNum: flexRank.losses,

        matchList: mList,
    });

    const summ = await userRepository.findById(summId);

    return res.status(201).json(summ);
}

/**검색한 소환사의 데이터를 디비에서 가져와서 반환해줌 (return json) */
export async function getSummonerInfo(req, res, next) {
    const summonerName = decodeURIComponent(req.headers.summonername);

    const summoner = await userRepository.findBySummonerName(summonerName);

    return res.status(200).json(summoner);
}

async function saveMatchHistroy(summoner, matchHistoryList) {
    let matchList = [];
    for (const m in matchHistoryList) {
        const matchId = await userRepository.createMatchHistory(
            matchHistoryList[m]
        );
        const match = await userRepository.findByMatchId(matchId);
        matchList.push(match);
    }

    return matchList;
}

async function getApi(data) {
    const response = await axios.get(data);

    return response;
}
