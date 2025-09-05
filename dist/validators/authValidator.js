"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const zod_1 = require("zod");
const registerShape = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    school_edit_permission: zod_1.z.array(zod_1.z.string()).optional(),
    criterion_edit_permission: zod_1.z.array(zod_1.z.string()).optional(),
    school_view_permission: zod_1.z.array(zod_1.z.string()).optional(),
    criterion_view_permission: zod_1.z.array(zod_1.z.string()).optional(),
    isAdmin: zod_1.z.boolean().optional()
});
const loginShape = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
function handleValidation(shape) {
    return (req, res, next) => {
        try {
            req.body = shape.parse(req.body);
            next();
        }
        catch (err) {
            return res.status(400).json({ error: 'validation failed', details: err.errors || err.message });
        }
    };
}
exports.registerValidator = handleValidation(registerShape);
exports.loginValidator = handleValidation(loginShape);
