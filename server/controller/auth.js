import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config.js";
import * as userRepository from '../data/auth.js'


export async function signup(req, res) {
    // req.body의 사용할 데이터를 가져오기
    const { username, password, email } = req.body;

    // 이미 가입한 사용자인지 판단
    const exist = await userRepository.findByUsername(username);
    if (exist) {
        // 이미 존재하면 409를 보냄
        // 409 : conflict / 클라이언트가 만들고자하는 리소스가 이미 존재하거나 충돌했을때
        return res.status(409).json({ message: `${username} already exists` });
    }

    // 새로운 사용자라면 비밀번호르 해슁
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);

    // 사용자를 만듬
    // userRepository에서는 고유한 사용자 id를 전달해줌
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        email,
    });

    // userRepository에서 받아온 사용자 고유 id로 토큰을 만듬
    const token = createJwtToken(userId);
    res.status(201).json({ token, username });
}

// jwt 토큰 생성
function createJwtToken(id) {
    return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
}