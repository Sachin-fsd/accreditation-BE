import { Schema, model, Document } from "mongoose";

export interface IEntry extends Document {
  school_id: string;
  criterion: string;
  payload: Record<string, any>; // flexible JSON
  user: Schema.Types.ObjectId;
}

const EntrySchema: Schema = new Schema(
  {
    school_id: { type: String, required: true },
    criterion: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, default: {} },
    user: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default model<IEntry>("Entry", EntrySchema);
