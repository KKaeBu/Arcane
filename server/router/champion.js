import express from "express";
import "express-async-errors";

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.send({ hi: "hello i'm champion router" });
});

export default router;
