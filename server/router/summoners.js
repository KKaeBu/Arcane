import express from "express";
import "express-async-errors";
import * as summonersController from "../controller/summoners.js";

const router = express.Router();

router.get("/", summonersController.getRiotApi);

router.get("/isin", summonersController.isSummoner);

router.get("/getinfo", summonersController.getSummonerInfo);

router.post("/saveinfo", summonersController.saveSummonerInfo);

export default router;
