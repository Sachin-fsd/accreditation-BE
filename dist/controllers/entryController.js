"use strict";
// import { Request, Response } from 'express';
// import Entry from '../models/Entry';
// import { criterionSchema } from "../lib/criterionSchema";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCriterion = getCriterion;
exports.saveCriterion = saveCriterion;
const Entry_1 = __importDefault(require("../models/Entry"));
const criteriaSchema_1 = require("../lib/criteriaSchema");
async function getCriterion(req, res) {
    const { school, criterion } = req.params;
    try {
        const entry = await Entry_1.default.findOne({ school_id: school, criterion });
        const schema = criteriaSchema_1.criterionSchema[criterion];
        // console.log(school, criterion, schema);
        if (!schema) {
            return res.status(404).json({ ok: false, error: "Criterion not found in schema" });
        }
        // blank defaults
        const blank = {};
        schema.fields.forEach((f) => {
            if (f.type === "file" || f.type === "url") {
                blank[f.name] = [];
            }
            else {
                blank[f.name] = "";
            }
        });
        const values = entry ? entry.payload : schema;
        return res.json({
            ok: true,
            data: {
                school,
                criterion,
                schema,
                values
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: "failed to load criterion" });
    }
}
async function saveCriterion(req, res) {
    const { school, criterion } = req.params;
    const { payload } = req.body;
    const userId = req.user.userId;
    console.log("payload", req.body);
    try {
        let entry = await Entry_1.default.findOne({ school_id: school, criterion });
        if (entry) {
            entry.payload = payload;
            entry.user = userId;
            await entry.save();
        }
        else {
            entry = await Entry_1.default.create({ school_id: school, criterion, payload, user: userId });
        }
        return res.json({ ok: true, entry });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: "save failed", details: err.message });
    }
}
