import express from "express";
// import { User } from "../model/schema.js";
import * as authController from "../controller/auth.js";

const router = express.Router();

router.get("/", authController.me);

router.get("/info", authController.IsExistFromClient);

router.get("/login", authController.login);

router.get("/check", authController.checkMarking);

router.get("/exist", authController.IsExistFromClient);

router.post("/signup", authController.signup);

router.post("/marking", authController.bookMarking);

export default router;
