"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = __importStar(require("../../controller/project/index"));
const router = (0, express_1.Router)();
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
exports.default = router;
