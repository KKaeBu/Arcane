import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

// 소켓이라는 클래스를 새롭게 정의
class Socket {
    // 어딘가에서 해당 클래스의 객체 생성시 constructor 실행
    // 새롭게 소켓을 만듬
    constructor(server) {
        let username;

        this.io = new Server(server, {
            cors: {
                origin: "*",
                credentials: true,
            },
        });

        // io의 토큰을 검증한다.
        // this.io.use((socket, next) => {
        //     const token = socket.handshake.auth.token;
        //     if (!token) {
        //         //토큰이 없다면 (로그인한 사용자만 걸르기 위해)
        //         return next(new Error("Authentication error"));
        //     }
        //     // jwt를 사용했을때 해독을 할 수 없다면 즉, 검증된 토큰이 아니라면
        //     jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        //         if (error) {
        //             return next(new Error("Authentication error"));
        //         }
        //         next();
        //     });
        // });

        this.io.on("connection", (socket) => {
            socket.on("welcome", (data) => {
                if (data !== "") {
                    console.log(`${data} is login`);
                    username = data;
                    socket.broadcast.emit("alert", username);
                    //this.io.sockets.emit("alert", username);
                    //socket.emit("alert", username);
                }
            });
            socket.on("posting", (data) => {
                if (data !== "") {
                    console.log(`${data} is posting`);
                    socket.broadcast.emit("newPost", data);
                }
            });
            socket.on("reading", (user, views) => {
                views++;
            });
        });
    }

    listen(server) {
        this.io.listen(server);
        console.log(`app listening on port ${config.host.port}!`);
    }
}

// 위 클래스는 외부적으로는 사용안하고 내부적으로만 사용한다.
// 외부 사용을 위한 함수를 아래에 따로 정의해준다.
let socket;
export function initSocket(server) {
    if (!socket) {
        return socket = new Socket(server);
    }
}

export function getSocketIO() {
    if (!socket) {
        throw new Error("Please call init first");
    }
    return socket.io;
}
