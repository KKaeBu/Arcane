import axios from "axios";

export default class DB {
    async bookMarkingDB(markingUser, userName) {
        let result = false;
        await axios//
            .post("/auth/marking", {
                markingUser: markingUser,
                userName: userName,
            })
            .then((res) => {
                result = res.data;
            })
            .catch((err) => console.log("db bookMark error: " + err));
        
        return result;
    }

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
                console.log("marking되어있음: " + res.data);
                return res.data;
            })
            .catch((err) => console.log("db checkMark error: " + err));
        
        // return result;
    }
}