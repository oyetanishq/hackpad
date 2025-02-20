import { Router } from "express";
import * as controller from "../controller/index";
import authRoutes from "./auth";
import projectRoutes from "./projects";
import authenticated from "../middleware/authenticated";

const router = Router();

/**
 * @route /health-check
 * @method GET
 */
router.get("/health-check", controller.healthCheck);

/**
 * @route /auth/*
 */
router.use("/auth", authRoutes);

/**
 * @route /project/*
 */
router.use("/project", authenticated, projectRoutes);

/* ROUTES EXPORT MODULE */
export default router;
