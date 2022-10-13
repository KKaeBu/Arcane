import Mongoose from "mongoose";

const commentSchema = new Mongoose.Schema({
    username: { type: String, required: true },
    content: { type: String, required: true },
    postid: { type: String, required: true },
});

const postSchema = new Mongoose.Schema({
    title: { type: String, trim: true, required: true }, // 제목
    username: { type: String, required: true }, // 작성자
    content: { type: String, required: true }, // 글 내용
    Like: { type: Number, default: 0 }, // 추천 수
    date: { type: Date, default: Date.now }, // 글 작성 일시
    view: { type: Number, required: true }, // 조회수
    comment: [commentSchema],
    // likeuser: [{ username: { type: String } }],
});

const userSchema = new Mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
    postlike: [postSchema],
    bookMark: [],
});

const matchHistorySchema = new Mongoose.Schema({
    queueType: { type: String, required: true },
    result: { type: String, required: true },
    queueDate: { type: String, required: true },
    championIconId: { type: Number, required: true },
    championLevel: { type: Number, required: true },
    spell1: { type: String, required: true },
    spell2: { type: String, required: true },
    mainRune: { type: String, required: true },
    subRune: { type: String, required: true },
    item0: { type: String, reqired: true },
    item1: { type: String, reqired: true },
    item2: { type: String, reqired: true },
    item3: { type: String, reqired: true },
    item4: { type: String, reqired: true },
    item5: { type: String, reqired: true },
    item6: { type: String, reqired: true },
    kills: { type: Number, reqired: true },
    deaths: { type: Number, reqired: true },
    assists: { type: Number, reqired: true },
    cs: { type: Number, reqired: true },
    time: { type: String, reqired: true },
    participants: [{
        summonerName: String,
        championIconId: String
    }],
});

const summonerSchema = new Mongoose.Schema({
    summonerName: { type: String, required: true },
    profileIconId: { type: Number, required: true },
    level: { type: Number, required: true },
    
    soloRankQueueType: { type: String, required: true },
    soloRankTier: { type: String, required: true },
    soloRankLP: { type: Number, required: true },
    soloRankWinNum: { type: Number, required: true },
    soloRankLoseNum: { type: Number, required: true },
    soloRankTotalNum: { type: Number, required: true },

    flexRankQueueType: { type: String, required: true },
    flexRankTier: { type: String, required: true },
    flexRankLP: { type: Number, required: true },
    flexRankWinNum: { type: Number, required: true },
    flexRankLoseNum: { type: Number, required: true },
    flexRankTotalNum: { type: Number, required: true },

    matchList: [matchHistorySchema],
});


export const User = Mongoose.model("User", userSchema);
export const Post = Mongoose.model("Post", postSchema);
export const Comment = Mongoose.model("Comment", commentSchema);
export const MatchHistory = Mongoose.model("MatchHistory", matchHistorySchema);
export const Summoner = Mongoose.model("Summoner", summonerSchema);
