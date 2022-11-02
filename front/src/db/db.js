import axios from "axios";

export default class DB {
    /**토큰의 유효성 검사를 해줌 */
    async isValidToken(token) {
        let username = await axios
            .get("/auth", {
                headers: {
                    token: token,
                },
            })
            .then((res) => {
                return res.data.username;
            })
            .catch((err) => console.log(err));
        
        return await username;
    }

    /**서버를 통해 북마크를 on/off 해줌 (return boolean)*/
    async bookMarkingDB(markingUser, userName) {
        let result = await axios//
            .post("/auth/marking", {
                markingUser: markingUser,
                userName: userName,
            })
            .then((res) => {
                return res.data;
            })
            .catch((err) => console.log("db bookMark error: " + err));
        
        return await result;
    }

    /**서버를 통해 해당 유저가 검색한 소환사를 북마크 했는지 여부를 반환 (return boolean) */
    async checkMarking(markingUser, userName) {
        const mUser = encodeURIComponent(markingUser);
        let result = await axios//
            .get("/auth/check", {
                headers: {
                    muser: mUser,
                    username: userName,
                }
            })
            .then((res) => {
                // console.log("bookMarking되어있음: " + res.data);
                return res.data;
            })
            .catch((err) => {
                console.log("db checkMark error: " + err);
                return false;
            });
        
        return await result;
    }

    /**데이터베이스에 해당 소환사의 정보가 있는지 여부를 반환 (return boolean) */
    async isSummoner(name) {
        // 이름이 한글일 경우 type error가 발생해 이름을 인코딩 후 전달
        // 이후 서버에서 디코딩 해서 사용
        const summonerName = encodeURIComponent(name);
        let result = await axios//
            .get("/api/summoners/isin", {
                headers: {
                    summonername: summonerName,
                }
            })
            .then((res) => {
                console.log("이미 디비에 있는 소환사임: " + res.data);
                return res.data;
            })
            .catch(err => console.log("isSummoner error: " + err));

        return await result;
    }

    /**검색한 소환사의 정보가 데이터베이스에 없을경우
     * 해당 소환사의 정보를 데이터베이스에 추가
     * (return void)
     */
    async saveSummonerInfo(summoner, rankData, matchHistoryList) {
        let data = await axios//
            .post("/api/summoners/saveinfo", {
                summoner: summoner,
                rankData: rankData,
                matchHistoryList: matchHistoryList,
            })
            .then((res) => {
                console.log("검색한 소환사의 정보를 저장함: " + res.data);
                return res.data;
            })
            .catch(err => console.log("saveSummonerInfo error: " + err));
        
        return await data;
    }

    /** 검색한 소환사의 데이터를 디비 상에서 가져옴*/
    async getSummonerInfo(name) {
        const summonerName = encodeURIComponent(name);

        let result = await axios//
            .get("/api/summoners/getinfo", {
                headers: {
                    summonername: summonerName,
                }
            })
            .then((res) => {
                console.log("소환사 정보 가져옴: " + res.data);
                return res.data
            })
            .catch(err => console.log("getSummonerInfo func error"));
        
        return await result;
    }

    /**시작 인덱스부터 count개수만큼의 전적리스트가 디비에 있는지 확인하고 있다면 해당 데이터 리스트를 반환해줌 */
    async checkDBHistory(name, startIndex, count) {
        const summonerName = encodeURIComponent(name);

        let data = await axios//
            .get("/api/summoners/checkhistory", {
                headers: {
                    name: summonerName,
                    start: startIndex,
                    count: count,   
                }
            })
            .then((res) => {
                console.log("받아온 전적 데이터: " + res.data);
                return res.data;
            })
            .catch(err => console.log("checkDBHistory error: " + err));
        
        return await data;
    }

    /**새롭게 불러온 전적 리스트 (최근 전적이 아닌 옛날 전적들)를 디비에 추가 */
    async addMatchHistory(name, matchHistoryList) {
        let data = await axios//
            .post("/api/summoners/addhistory", {
                summonerName: name,
                matchHistoryList: matchHistoryList,
            })
            .then((res) => {
                console.log("새롭게 불러온 기존 전적들을 추가함: " + res.data);
                return res.data;
            })
            .catch(err => console.log("addMatchHistory error: " + err));
        
        return await data;
    }

    /**새롭게 불러온 전적 리스트 (가장 최근 전적들)를 디비에 추가 */
    async addNewMatchHistory(name, matchHistoryList) {
        let data = await axios//
            .post("/api/summoners/addnewhistory", {
                summonerName: name,
                matchHistoryList: matchHistoryList,
            })
            .then((res) => {
                console.log("새롭게 불러온 뉴 전적들을 추가함: " + res.data);
                return res.data;
            })
            .catch(err => console.log("addMatchHistory error: " + err));
        
        return await data;
    }

    /**전적 갱신시 변경될 랭크 데이터를 업데이트 */
    async updateRankData(summonerName, rankData) {
        let result = await axios
            .patch("/api/summoners/updaterank", {
                summonerName: summonerName,
                rankData: rankData,
            })
            .then((res) => {
                console.log("랭크 데이터 업데이트: ", res.data);
                return res.data;
            })
            .catch((err) => console.log("updateRankData error: " + err));

        return await result;
    }

    async getLastMatch(summonerName) {
        const name = encodeURIComponent(summonerName);

        let data = await axios//
            .get("/api/summoners/lastmatch", {
                headers: {
                    name: name, 
                }
            })
            .then((res) => {
                console.log("가장 최근 전적 id: " + res.data);
                return res.data;
            })
            .catch(err => console.log("getLastMatch error: " + err));
        
        return await data;
    }

}