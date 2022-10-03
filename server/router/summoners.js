import express from "express";
import "express-async-errors";
import * as summonersController from "../controller/summoners.js";

const router = express.Router();

router.get("/", summonersController.temp);


export default router;
