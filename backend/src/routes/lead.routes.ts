import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
import {
  createLead,
  deleteLead,
  getAllLeads,
  getLead,
  searchLead,
  updateLead,
} from "../controllers/lead.controller.ts";

const router: Router = Router();

router.post("/", verifyJWT, createLead);
router.post("/all", verifyJWT, getAllLeads);
router.get("/search", verifyJWT, searchLead);

router
  .route("/:id")
  .get(verifyJWT, getLead)
  .patch(verifyJWT, updateLead)
  .delete(verifyJWT, deleteLead);

export default router;
