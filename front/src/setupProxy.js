const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/main",
        createProxyMiddleware({
            //도메인 api로 호출
            target: "http://localhost:5000", //통신할 서버의 도메인주소
            changeOrigin: true,
        })
    );
    app.use(
        "/champion",
        createProxyMiddleware({
            //도메인 api로 호출
            target: "http://localhost:5000", //통신할 서버의 도메인주소
            changeOrigin: true,
        })
    );
    console.log("프록시 생성 성공");
};

// ** 아래는 httt-proxy-middleware 구 버전 문법
// import proxy from 'http-proxy-middleware';

// function useProxy (app)  {
//     app.use(
//         proxy('/main', {  //도메인 api로 호출
//             target: 'http://localhost:5000/', //통신할 서버의 도메인주소
//             changeOrigin: true,
//         })
//     )
// }

// export default useProxy;
