import axios from "axios";

export default class DB {
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
                console.log("bookMarking되어있음: " + res.data);
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
        const summonerName = encodeURIComponent(name);
        let result = await axios//
            .get("/api/summoners/isin", {
                headers: {
                    summonername: summonerName,
                }
            })
            .then(res => res.data)
            .catch(err => console.log("isSummoner error: " + err));

        return await result;
    }

    /**검색한 소환사의 정보가 데이터베이스에 없을경우
     * 해당 소환사의 정보를 데이터베이스에 추가
     * (return void)
     */
    async saveSummonerInfo(summonerName, profileIconId, level) {
        await axios//
            .post("/api/summoners/saveinfo", {
                summonerName: summonerName,
                profileIconId: profileIconId,
                level: level,
            })
            .then(res => console.log("ok?: " + res.data))
            .catch(err => console.log("saveSummonerInfo error: " + err));
    }

    /** */
}