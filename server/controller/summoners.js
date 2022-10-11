import axios from "axios";
import { config } from "../config.js";

export async function getRiotApi(req, res, next) {
    const result = await getApi(req.headers.link);
    // console.log(result.data);
    
    res.status(200).json(result.data);
}

export async function pageLoadingWithParams(req, res, next) {
    console.log("come here 2");
    console.log("id: " + req.params.id);
    console.dir("req.data: " + req);
    console.dir("req.headers: " + req.headers);

    const result = await getApi(req.headers.link);
    
    res.status(200).json(result.data);
}

async function getApi(data) {
    const response = await axios.get(data);

    return response;
}
