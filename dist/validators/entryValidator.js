"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryValidator = void 0;
const zod_1 = require("zod");
const entryShape = zod_1.z.object({
    school_id: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]),
    criterion: zod_1.z.string(),
    links: zod_1.z.array(zod_1.z.string()).optional(),
    files: zod_1.z.array(zod_1.z.string()).optional(),
    description: zod_1.z.string().optional()
});
function handleValidation(shape) {
    return (req, res, next) => {
        try {
            // Merge body + params so Zod sees both
            const data = {
                ...req.body,
                ...req.params,
            };
            const parsed = shape.parse(data);
            req.body = parsed; // overwrite so routes always see validated data
            console.log("parsed", parsed);
            next();
        }
        catch (err) {
            return res.status(400).json({
                error: 'validation failed',
                details: err.errors || err.message,
            });
        }
    };
}
exports.entryValidator = handleValidation(entryShape);
