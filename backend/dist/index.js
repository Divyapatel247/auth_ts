"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
// import userRoutes from "./routes/users.js";
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
//middlewares
app.use((0, cors_1.default)({ credentials: true, origin: ["http://localhost:3000"] }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", auth_1.default);
// app.use("/api/users", userRoutes);
app.listen(8800, () => {
    console.log("Connected to Server");
});
