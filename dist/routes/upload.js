"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const s3_1 = require("../utils/s3");
const auth_1 = __importDefault(require("../middleware/auth"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get('/upload', auth_1.default, async (req, res) => {
    const { fileName, fileType } = req.query;
    if (!fileName || !fileType) {
        return res.status(400).json({ error: "Missing fileName or fileType" });
    }
    const key = `${Date.now()}_${fileName}`;
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: key,
        ContentType: fileType,
    };
    const uploadUrl = s3_1.s3.getSignedUrl("putObject", params);
    const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    res.json({ uploadUrl, fileUrl });
});
exports.default = router;
