import express from "express";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";
import dataRoutes from "./dataRoutes.js";

import { APIError } from "../../utils/apiError.js";

const router = express.Router();

router.get("/status", (req, res) => res.send("UP"));

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/data", dataRoutes);
// Return not found for other routes
router.use((req, res, next) => {
  next(new APIError("Not found", 404));
});

export default router;
