"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEntries = getAllEntries;
const Entry_1 = __importDefault(require("../models/Entry"));
async function getAllEntries(req, res) {
    try {
        const entries = await Entry_1.default.find().sort({ createdAt: -1 }).populate('user', 'name email');
        res.json({ ok: true, entries });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed to fetch entries' });
    }
}
