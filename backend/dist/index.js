"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./src/router/index"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./src/database/connection"));
/* CONFIGURATION */
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, connection_1.default)();
/* CORS (Allow Anyone) */
app.use((0, cors_1.default)({ origin: "*" }));
/* URL PARSER */
app.use(express_1.default.json());
/* DIRECTING ALL ROUTES TO ROUTES */
app.use("/", index_1.default);
/* SERVER LISTENING PORT */
app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));
