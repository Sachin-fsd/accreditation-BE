"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function register(req, res) {
    try {
        const { name, email, password, school_edit_permission = [], criterion_edit_permission = [], school_view_permission = [], criterion_view_permission = [], isAdmin = false } = req.body;
        console.log(req.body);
        const exists = await User_1.default.findOne({ email });
        if (exists)
            return res.status(400).json({ error: 'Email already registered' });
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.default.create({
            name, email, password: hashed,
            school_edit_permission, criterion_edit_permission,
            school_view_permission, criterion_view_permission,
            isAdmin
        });
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || '', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, school_edit_permission: user.school_edit_permission, school_view_permission: user.school_view_permission, criterion_edit_permission: user.criterion_edit_permission, criterion_view_permission: user.criterion_view_permission, isAdmin: user.isAdmin } });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'registration failed' });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ error: 'Invalid credentials' });
        const ok = await bcryptjs_1.default.compare(password, user.password);
        if (!ok)
            return res.status(400).json({ error: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || '', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, school_edit_permission: user.school_edit_permission, school_view_permission: user.school_view_permission, criterion_edit_permission: user.criterion_edit_permission, criterion_view_permission: user.criterion_view_permission, isAdmin: user.isAdmin } });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'login failed' });
    }
}
