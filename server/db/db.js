import Mongoose from "mongoose";
import { config } from "../config.js";

export async function connectDB() {
    // mongoose 사용
    // Mongoose 6.X 이상 버전을 사용하실때는 connect 두번째 인자로 따로 options을 명시해 주지 않아도댐
    return Mongoose.connect(config.db.host);
}
