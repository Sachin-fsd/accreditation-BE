"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.canView = canView;
exports.canEdit = canEdit;
exports.isAdmin = isAdmin;
const User_1 = __importDefault(require("../models/User"));
/**
 * canView middleware
 */
async function canView(req, res, next) {
    try {
        const user = await User_1.default.findById(req.user.userId);
        if (!user)
            return res.status(401).json({ error: 'user not found' });
        const school = req.params.school || req.body.school_id;
        const criterion = req.params.criterion || req.body.criterion;
        if (user.school_view_permission.includes(String(school)) && user.criterion_view_permission.includes(String(criterion))) {
            return next();
        }
        return res.status(403).json({ error: 'no viewing permission' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'permission check failed' });
    }
}
async function canEdit(req, res, next) {
    try {
        const user = await User_1.default.findById(req.user.userId);
        if (!user)
            return res.status(401).json({ error: 'user not found' });
        const school = req.body.school_id || req.params.school;
        const criterion = req.body.criterion || req.params.criterion;
        if (user.school_edit_permission.includes(String(school)) && user.criterion_edit_permission.includes(String(criterion))) {
            return next();
        }
        return res.status(403).json({ error: 'no edit permission' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'permission check failed' });
    }
}
async function isAdmin(req, res, next) {
    try {
        const user = await User_1.default.findById(req.user.userId);
        if (!user)
            return res.status(401).json({ error: 'user not found' });
        if (user.isAdmin)
            return next();
        return res.status(403).json({ error: 'admin only' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'admin check failed' });
    }
}
