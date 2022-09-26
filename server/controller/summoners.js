import axios from "axios";
import { config } from "../config.js";

export async function temp(req, res, next) {
    const result = await getApi(req.headers.link);
    // console.log(result.data);

    res.status(200).json(result.data);
}

async function getApi(data) {
    const response = await axios.get(data);

    return response;
}
