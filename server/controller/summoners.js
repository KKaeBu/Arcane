import axios from "axios";
import * as userRepository from "../data/auth.js";


export async function getRiotApi(req, res, next) {
    const result = await getApi(req.headers.link);
    // console.log(result.data);
    
    res.status(200).json(result.data);
}

export async function isSummoner(req, res, next) {

}

export async function saveSummonerInfo(req, res, next) {

}


async function getApi(data) {
    const response = await axios.get(data);

    return response;
}
