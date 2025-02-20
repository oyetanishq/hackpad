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
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../../model/User"));
const tokens_1 = require("../../lib/tokens");
const bcrypt_1 = require("bcrypt");
/**
 * @route /auth/register
 * @method POST
 * @description register a new user, and return jwt token
 */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (yield User_1.default.findOne({ email }))
            throw new Error("user already exists");
        const salt = (0, bcrypt_1.genSaltSync)(10);
        const hashedPassword = (0, bcrypt_1.hashSync)(password, salt);
        const user = new User_1.default({ email, password: hashedPassword });
        yield user.save();
        res.status(201).json({ success: true, user: { id: user._id, email: user.email, token: (0, tokens_1.generateToken)(user._id) } });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});
exports.register = register;
/**
 * @route /auth/login
 * @method POST
 * @description validate a user, and return jwt token
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user)
            throw new Error("invalid credentials");
        if (!(0, bcrypt_1.compareSync)(password, user.password))
            throw new Error("invalid credentials");
        res.status(201).json({ success: true, user: { id: user._id, email: user.email, token: (0, tokens_1.generateToken)(user._id) } });
    }
    catch (error) {
        res.status(401).json({ success: false, error: error.message });
    }
});
exports.login = login;
