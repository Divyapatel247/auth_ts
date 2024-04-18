"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinBody = exports.signupBody = void 0;
const zod_1 = __importDefault(require("zod"));
const signupBody = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string(),
    email: zod_1.default.string().email(),
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string()
});
exports.signupBody = signupBody;
const signinBody = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
exports.signinBody = signinBody;
