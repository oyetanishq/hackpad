"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
/**
 * @description checks for the authorization and append userId with request
 */
const authenticated = (req, res, next) => {
    const token = req.header("Authorization");
    try {
        if (!token)
            throw new Error();
        const user = (0, jsonwebtoken_1.verify)(token.split(" ")[1], process.env.JWT_SECRET);
        req.userId = user._id;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Please authenticate using a valid token" });
    }
};
exports.default = authenticated;
