import express from "express";
import { User } from "../model/schema.js";

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

export default router;
