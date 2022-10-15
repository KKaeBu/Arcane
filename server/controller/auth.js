import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config.js";
import * as userRepository from "../data/auth.js";

export async function IsExist(username) {
    // 이미 가입한 사용자인지 판단 > 서버에서 사용하는 함수
    const exist = await userRepository.findByUsername(username);
    return exist;
}

export async function IsExistFromClient(req, res) {
    // 이미 가입한 사용자인지 판단 > client에서 사용하는 함수
    const { username } = req.headers;
    const exist = await userRepository.findByUsername(username);
    if (exist) {
        return res.status(201).json({ data: true });
    } else {
        return res.status(201).json({ data: false });
    }
}

export async function signup(req, res) {
    // req.body의 사용할 데이터를 가져오기
    const { username, password, email } = req.body;

    const exist = await IsExist(username);
    if (exist) {
        // 이미 존재하면 409를 보냄
        // 409 : conflict / 클라이언트가 만들고자하는 리소스가 이미 존재하거나 충돌했을때
        return res
            .status(409)
            .json({ message: `${username}가 이미 존재합니다.` });
    }

    // 새로운 사용자라면 비밀번호르 해슁 (암호화)
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

export async function login(req, res) {
    // req.body의 사용할 데이터를 가져오기
    const { username, password } = req.query;

    // 데이터베이스의 사용자 정보들과 조회 하여 일치하는거 찾기
    const user = await userRepository.findByUsername(username);
    console.log(user);

    // 존재하는 유저라면 해당 유저의 비밀번호가 맞는지 체크
    if (!user) {
        console.log("아이디가 존재하지 않습니다.");
        return res.status(401).json({ message: "Invalid user or password" });
    }

    // 유저 존재시 비번 체크
    // bcrypt의 compare을 사용하여 우리 데이터베이스에 저장된 hash버전의
    // password와 사용자가 입력한 password가 동일한지를 검사
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        //비번 틀릴시
        return res.status(401).json({ message: "Invalid user or password" });
    }

    // userRepository에서 받아온 사용자 고유 id로 토큰을 만듬
    const token = createJwtToken(user.id);
    res.status(201).json({ token, username });
}

export async function bookMarking(req, res, next) {}

export async function me(req, res, next) {
    const { token } = req.headers;
    const decoded = jwt.verify(token, config.jwt.secretKey);
    if (!decoded) {
        return res.status(401).json({ message: "unauthorized" });
    }

    const user = await userRepository.findById(decoded.id);
    res.status(201).json({ username: user.username, postlike: user.postlike });
}

// jwt 토큰 생성
function createJwtToken(id) {
    return jwt.sign({ id }, config.jwt.secretKey, {
        expiresIn: config.jwt.expiresInSec,
    });
}
