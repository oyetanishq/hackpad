import { Router } from "express";
import * as controller from "../../controller/auth/index";

const router = Router();

/**
 * @route /auth/
 * @method GET
 * @description just for checking auth route
 */
router.get("/", controller.healthCheck);

/**
 * @route /auth/register
 * @method POST
 * @description register a new user, and return jwt token
 */
router.post("/register", controller.register);

/**
 * @route /auth/login
 * @method POST
 * @description validate a user, and return jwt token
 */
router.post("/login", controller.login);

/* ROUTES EXPORT MODULE */
export default router;
