"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.getProject = exports.getAllProjects = exports.updateProject = exports.createProject = void 0;
const Project_1 = __importDefault(require("../../model/Project"));
/**
 * @route /project
 * @method POST
 * @description create new project
 */
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const name = req.body.name;
        const description = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : "";
        const accessTo = ((_d = (_c = req.body) === null || _c === void 0 ? void 0 : _c.accessTo) !== null && _d !== void 0 ? _d : []);
        accessTo.push(req.userId);
        const project = new Project_1.default({ name, description, accessTo, uid: req.userId });
        yield project.save();
        res.status(201).json(project);
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});
exports.createProject = createProject;
/**
 * @route /project/:id
 * @method PUT
 * @description update any particular project
 */
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(201).json(yield Project_1.default.findOneAndUpdate({ _id: req.params.id, uid: req.userId }, { $set: req.body }, { new: true }));
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});
exports.updateProject = updateProject;
/**
 * @route /project
 * @method GET
 * @description read all the projects associated with a account without content
 */
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(201).json(yield Project_1.default.find({ accessTo: req.userId }, { content: 0 }));
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});
exports.getAllProjects = getAllProjects;
/**
 * @route /project/:id
 * @method GET
 * @description read a particular project with content
 */
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(201).json(yield Project_1.default.find({ uid: req.userId }));
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});
exports.getProject = getProject;
/**
 * @route /project/:id
 * @method DELETE
 * @description delete a particular project
 */
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(201).json(yield Project_1.default.findOneAndDelete({ uid: req.userId, _id: req.params.id }));
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});
exports.deleteProject = deleteProject;
