"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authValidator_1 = require("../validators/authValidator");
const router = (0, express_1.Router)();
router.post('/register', authValidator_1.registerValidator, authController_1.register);
router.post('/login', authValidator_1.loginValidator, authController_1.login);
exports.default = router;
