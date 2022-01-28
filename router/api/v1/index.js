import express from "express";
import fs from "fs";
import redisRateLimiter from "../../../middlewares/rateLimit.js";
import {
  login,
  logoutUser,
  register,
  refreshTokens,
} from "../../../controllers/authController.js";
import { updateUser, deleteUser } from "../../../controllers/userController.js";
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

// router.post("/register", register);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
// router.post("/login", login);
// router.post("/logout", logoutUser);
// router.post("/refresh", refreshTokens);

router.get("/hidden", (req, res) => {
  if (!req.user) {
    res.status(403).send({ message: "Unauthorized" });
  } else {
    res.status(200).send("This isn't hidden for you");
  }
});

export default router;
