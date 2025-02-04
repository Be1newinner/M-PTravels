import { Router } from "express";
import {
  changeCurrentPassword,
  forgotPassword,
  getUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  resetPassword,
} from "../controllers/user.controller.ts";
import { verifyJWT } from "../middlewares/auth.middleware.ts";

const router: Router = Router();

router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes
router.get("/me", verifyJWT, getUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/change-password", verifyJWT, changeCurrentPassword);

export default router;
