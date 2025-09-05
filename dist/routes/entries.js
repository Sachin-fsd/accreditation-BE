"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const permissions_1 = require("../middleware/permissions");
const entryController_1 = require("../controllers/entryController");
const router = (0, express_1.Router)();
router.post('/school/:school/criterion/:criterion', auth_1.default, 
// entryValidator,
permissions_1.canEdit, entryController_1.saveCriterion);
router.get('/school/:school/criterion/:criterion', auth_1.default, permissions_1.canView, entryController_1.getCriterion);
exports.default = router;
