import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";
import mainRouter from "./router/main.js";
import championRouter from "./router/champion.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { connectDB } from "./db/db.js";
import { User } from "./model/schema.js";
import { initSocket } from "./connection/socket.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

// 회원가입 & 로그인
app.use("/auth", authRouter);

app.post("/search", (req, res, next) => {
    // ***** 클라이언트에서 post요청했으니까 여기서도 post로 수신
    console.log(`클라이언트에서 보낸 데이터 : ${req.body.name}`);
    console.log("서버 응답 성공");
    const text = req.body.name;
    res.send(text);
});

// 위의 라우터 모두 충족하지 않을경우
app.use((req, res, next) => {
    res.sendStatus(404);
});

// 에러 발생시
app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

connectDB() //
    .then(() => {
        console.log("db 연결 완료");
        const server = app.listen(config.host.port);
        initSocket(server);
    })
    .catch((err) => {
        console.log(err);
    });
