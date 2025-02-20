"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 *
 * @param _id string
 * @returns string
 * @description generate a token with 30 days validity
 */
const generateToken = (_id) => jsonwebtoken_1.default.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
});
exports.generateToken = generateToken;
