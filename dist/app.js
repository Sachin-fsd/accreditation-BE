"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const entries_1 = __importDefault(require("./routes/entries"));
const upload_1 = __importDefault(require("./routes/upload"));
const admin_1 = __importDefault(require("./routes/admin"));
const app = (0, express_1.default)();
// Middleware to log incoming requests
app.use((req, res, next) => {
    const start = Date.now();
    console.log(`➡️  ${req.method} ${req.originalUrl}`);
    // console.log(`Headers:`, req.headers);
    // if (Object.keys(req.body).length) {
    console.log(`Body:`, req.body);
    console.log(`Params:`, req.params);
    // }
    // Hook into response to log when it's finished
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`⬅️  ${req.method} ${req.originalUrl} [${res.statusCode}] - ${duration}ms`);
    });
    next();
});
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // your Next.js app
    credentials: true, // allow cookies if you use them
}));
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api', upload_1.default);
app.use('/api', entries_1.default);
app.use('/api/admin', admin_1.default);
app.get('/', (req, res) => res.json({ ok: true, msg: 'Accreditation backend (TS)' }));
exports.default = app;
