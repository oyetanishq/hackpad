"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProjectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    content: {
        type: (Array),
        default: [],
    },
    uid: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    accessTo: {
        type: (Array),
        default: [],
    },
});
const Project = (0, mongoose_1.model)("Project", ProjectSchema);
exports.default = Project;
