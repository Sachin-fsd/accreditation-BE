"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EntrySchema = new mongoose_1.Schema({
    school_id: { type: String, required: true },
    criterion: { type: String, required: true },
    payload: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Entry", EntrySchema);
