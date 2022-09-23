import axios from "axios";
import { config } from "../config.js";

export async function temp(req, res, next) {
    console.log("body:" + req.body);
    // const result = await getApi(req.body.links);

    // res.status(200).send(result);
}

async function getApi(data) {
    const response = await axios.get(data);

    return response;
}
