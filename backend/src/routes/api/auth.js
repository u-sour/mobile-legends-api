import express from "express";
import apicache from 'apicache'
export const router = express.Router();
import authController from "../../controllers/authController";
import authMiddleware from "../../middleware/auth";

// Init cache
let cache = apicache.middleware

// router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);
router.post("/auth/refresh", authController.refresh);
router.get("/auth/user", authMiddleware, cache('2 minutes'), authController.user);

export default router;
