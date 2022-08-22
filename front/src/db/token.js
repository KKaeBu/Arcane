const TOKEN = 'token';

export default class TokenStorage {
    saveToken(token) {
        // localStorage는 부라우저에서 이용할 수 있는 임시 저장소 api
        // 이를 이용해서 토큰을 저장해둠
        // 하지만 이 방법은 안전하지가 않다!
        // but, 현재 과정상 이 방법은 아주 기본적인 방법이기에 알아두자
        localStorage.setItem(TOKEN, token);
    }

    getToken() {
        return localStorage.getItem(TOKEN);
    }

    clearToken() {
        localStorage.clear(TOKEN);
    }
}