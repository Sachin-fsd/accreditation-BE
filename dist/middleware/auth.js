"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ error: 'no token' });
    const parts = authHeader.split(' ');
    if (parts.length !== 2)
        return res.status(401).json({ error: 'bad token' });
    const token = parts[1];
    console.log(parts);
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
        req.user = payload;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'invalid token' });
    }
}
