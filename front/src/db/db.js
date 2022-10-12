import axios from "axios";

export default class DB {
    async bookMarkingDB(name) {
        await axios//
            .post("/auth/mark", {
                summonerName: name,
            })
            .then((res) => {
            
            })
            .catch((err) => console.log("db bookMark error: " + err));
    }
}