import * as mypageRepository from "../data/mypage.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config.js";

export async function Deleting(req, res) {
    await mypageRepository.deleteByUserName(req.body.username);
    return res.status(201).json(req.body);
}

export async function Auth(req, res) {
    const result = await mypageRepository.authByPassword(
        req.headers.username,
        req.headers.pw
    );
    return res.status(201).json(result);
}

export async function Change(req, res) {
    const { username, pw, new_pw } = req.body;
    console.log(new_pw);
    if (pw === new_pw) {
        const hashed = await bcrypt.hash(pw, config.bcrypt.saltRounds);
        await mypageRepository.Change(hashed, username);
    } else {
        console.log("비밀번호가 다릅니다.");
        return res.status(201).json();
    }
}
