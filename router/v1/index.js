import express from "express";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.get("/status", (req, res) => res.send("UP"));

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;
