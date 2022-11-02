import express from "express";
import "express-async-errors";
import * as summonersController from "../controller/summoners.js";

const router = express.Router();

router.get("/", summonersController.getRiotApi);

router.get("/isin", summonersController.isSummoner);

router.get("/getinfo", summonersController.getSummonerInfo);

router.get("/checkhistory", summonersController.checkMatchHistory);

router.get("/lastmatch", summonersController.getLastMatch);

router.post("/saveinfo", summonersController.saveSummonerInfo);

router.post("/addhistory", summonersController.addMatchHistory);

router.post("/addnewhistory", summonersController.addNewMatchHistory);

router.patch("/updaterank", summonersController.updateRankData);

export default router;
