import express from "express";
import fs from "fs";
import redisRateLimiter from "../../../utils/rateLimit.js";

const router = express.Router();
router.use(redisRateLimiter);

router.get("/", function (req, res) {
  res.status(200).send("Hello World!");
});

router.get("/data", function (req, res) {
  const filePath = "./files/generateText.md";
  const src = fs.createReadStream(filePath);
  src.on("open", function () {
    src.pipe(res);
  });
  src.on("error", function (err) {
    logger.log("error", err);
    res.end(err);
  });
});

export default router;
