import socket from 'socket.io-client';

export default class Socket{
    constructor(baseURL, getAccessToken) {
        this.io = socket(baseURL, {
            // 소켓을 전달할때 방법중 하나로
            // auth라는 필드를 이용해서 전달
            auth: (cb) => cb({ token: getAccessToken() }),
        });

        // 소켓 생성시 에러발생 처리
        this.io.on('connect_error', (err) => {
            console.log('socket error', err.message);
        });
    }

    // event: 소케을 사용하는 사람의 목적(주제)
    // callback: event발생시 취할 행동
    onSync(event, callback) {
        // io가 연결되지 않았다면 연결시킨다.
        if (!this.io.connected) {
            this.io.connect();
        }

        // event발생시 전달받은 callback함수를 호출
        this.io.on(event, (message) => callback(message));

        // io에 대해서 해당 이벤트를 더이상 듣지 않도록(끌 수 있도록) 전달
        // 그래서 사용하려는 사람이 이 리턴된 콜백함수를 가지고 있다가
        // 더이상 듣고 싶지 않을때 이 리턴된 콜백함수를 호출하면 된다.
        return () => this.io.off(event);
    }
}