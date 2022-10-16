import axios from "axios";
import * as userRepository from "../data/summoners.js";


export async function getRiotApi(req, res, next) {
    const result = await getApi(req.headers.link);
    // console.log(result.data);
    
    res.status(200).json(result.data);
}

export async function isSummoner(req, res, next) {
    const summonerName = decodeURIComponent(req.headers.summonername);
    
    const summoner = await userRepository.findBySummonerName(summonerName);

    console.log("isSummoner?: " + summoner);
    if (summoner)
        return res.status(200).json(true);
    
    return res.status(200).json(false)
}

export async function saveSummonerInfo(req, res, next) {
    const { summoner, rankData } = req.body;
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
        if (rankData[r].queueType === "RANKED_SOLO_5x5")
            soloRank = rankData[r];
        else
            flexRank = rankData[r];
    }

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
    });

    const result = await userRepository.findById(summId);  

    return res.status(201).json(result);
}

export async function getSummonerInfo(req, res, next) {
    const summonerName = decodeURIComponent(req.headers.summonername);
    
    const summoner = await userRepository.findBySummonerName(summonerName);

    return res.status(200).json(summoner);
}


async function getApi(data) {
    const response = await axios.get(data);

    return response;
}
