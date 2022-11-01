import express from "express";
import http from "http";
import https from "https";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import history from "connect-history-api-fallback";
import "express-async-errors";
import summonersRouter from "./router/summoners.js";
import championRouter from "./router/champion.js";
import mypageRouter from "./router/mypage.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { connectDB } from "./db/db.js";
import { User } from "./model/schema.js";
import { initSocket } from "./connection/socket.js";
import postRouter from "./router/post.js";

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

// 회원가입 & 로그인 & 유저관련 디비 설정
app.use("/auth", authRouter);

// 글 작성
app.use("/post", postRouter);

// 유저 전적 검색
app.use("/api/summoners", summonersRouter);

// 내 정보
app.use("/api/mypage", mypageRouter);

// 위의 라우터 모두 충족하지 않을경우
app.use((req, res, next) => {
    res.sendStatus(404);
});

// 에러 발생시
app.use((error, req, res, next) => {
    console.error("error: " + error);
    res.sendStatus(500);
});

connectDB() //
    .then(() => {
        console.log("db 연결 완료");
        // const httpServer = http.createServer(app).listen(config.host.port, () => {
        //     console.log("listening on *: " + config.host.port);
        // });
        // initSocket(httpServer);

        var options = {
            key: fs.readFileSync('./Arcane_key.pem'),
            cert: fs.readFileSync('./Arcane_key.pem')
        };
        const httpsServer = https.createServer(options, app).listen(config.host.port, () => {
            console.log("listening on *: " + config.host.port);
        })
        initSocket(httpsServer);

        // const server = app.listen(config.host.port);
        // const socket = initSocket(server);

        // const httpSocket = initSocket(httpServer);
        // socket.listen(server);
        // httpSocket.listen(config.host.port, () => console.log(`app listening on port ${config.host.port}!`))
    })
    .catch((err) => {
        console.log(err);
    });
