import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import request from "request";
import { config } from "../config.js";
import * as userRepository from "../data/auth.js";

export async function temp(req, res, next) {
    const { sid, api_key } = req.headers;
    let result;
    const options = {
        uri: `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${sid}?api_key=${api_key}`,
    };

    result = await a(options);

    console.log("result: " + result);
}

function a(options) {
    return request(options, (err, res, body) => {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        console.log('body: ' + body);
    }).json(body);
}
