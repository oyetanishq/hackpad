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
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* MONGOOSE CONNECT */
        mongoose_1.default.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CONNECTION_URL}`, {
            dbName: process.env.MONGO_DB_LOCAL_DATABASE_NAME,
        });
        /* ON ERROR AND OPEN CONNECTION */
        mongoose_1.default.connection.on("error", () => console.log("error database"));
        mongoose_1.default.connection.once("open", () => console.log("connected to database"));
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.default = connectToDB;
