import express from "express";
import "express-async-errors";
import * as championData from "../data/championData.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    res.send({ hi: "hello i'm champion router" });
});

export default router;
