// import { Request, Response } from 'express';
// import Entry from '../models/Entry';
// import { criterionSchema } from "../lib/criterionSchema";

// export async function saveEntry(req: Request, res: Response) {
//   try {
//     const { school_id, criterion, links = [], files = [], description = '' } = req.body;
//     const userId = req.user.userId;

//     const created = await Entry.create({
//       school_id, criterion, links, files, description, user: userId
//     });

//     res.status(201).json({ ok: true, entry: created });
//   } catch(err:any) {
//     console.error(err);
//     res.status(500).json({ error: 'save failed', details: err.message });
//   }
// }

// // GET /schools/:school/criterion/:criterion
// export async function getEntriesBySchoolcriterion(req: Request, res: Response) {
//   const { school, criterion } = req.params;
//   try {
//     const entry = await Entry.findOne({ school_id: school, criterion });

//     if (entry) {
//       return res.json({ ok: true, data: entry });
//     }

//     // no entry? return blank skeleton from schema
//     const schema = criterionSchema[criterion] || { title: criterion, fields: [] };
//     const blank: Record<string, any> = {};
//     schema.fields.forEach((f: any) => { blank[f.name] = ""; });

//     return res.json({ ok: true, data: { school, criterion, ...blank } });
//   } catch (err: any) {
//     res.status(500).json({ error: "failed to load criterion" });
//   }
// }

import { Request, Response } from "express";
import Entry from "../models/Entry";
import { criterionSchema } from "../lib/criteriaSchema";

export async function getCriterion(req: Request, res: Response) {
  const { school, criterion } = req.params;

  try {
    const entry = await Entry.findOne({ school_id: school, criterion });

    const schema = criterionSchema[criterion];
    // console.log(school, criterion, schema);
    if (!schema) {
      return res.status(404).json({ ok: false, error: "Criterion not found in schema" });
    }

    // blank defaults
    const blank: Record<string, any> = {};
    schema.fields.forEach((f: any) => {
      if (f.type === "file" || f.type === "url") {
        blank[f.name] = [];
      } else {
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
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ ok: false, error: "failed to load criterion" });
  }
}

export async function saveCriterion(req: Request, res: Response) {
  const { school, criterion } = req.params;
  const { payload } = req.body;
  const userId = (req as any).user.userId;
  console.log("payload",req.body);
  try {
    let entry = await Entry.findOne({ school_id: school, criterion });

    if (entry) {
      entry.payload = payload;
      entry.user = userId;
      await entry.save();
    } else {
      entry = await Entry.create({ school_id: school, criterion, payload, user: userId });
    }

    return res.json({ ok: true, entry });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ ok: false, error: "save failed", details: err.message });
  }
}
