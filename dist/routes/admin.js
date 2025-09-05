"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const permissions_1 = require("../middleware/permissions");
const adminController_1 = require("../controllers/adminController");
const router = (0, express_1.Router)();
router.get('/entries', auth_1.default, permissions_1.isAdmin, adminController_1.getAllEntries);
exports.default = router;
