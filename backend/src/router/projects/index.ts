import { Router } from "express";
import * as controller from "../../controller/project/index";

const router = Router();

/**
 * @route /project
 * @method POST
 * @description create new project
 */
router.post("/", controller.createProject);

/**
 * @route /project/:id
 * @method PUT
 * @description update any particular project
 */
router.put("/:id", controller.updateProject);

/**
 * @route /project
 * @method GET
 * @description read all the projects associated with a account without content
 */
router.get("/", controller.getAllProjects);

/**
 * @route /project/:id
 * @method GET
 * @description read a particular project with content
 */
router.get("/:id", controller.getProject);

/**
 * @route /project/:id
 * @method DELETE
 * @description delete a particular project
 */
router.delete("/:id", controller.deleteProject);

/* ROUTES EXPORT MODULE */
export default router;
