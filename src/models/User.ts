import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  school_edit_permission: string[];
  criterion_edit_permission: string[];
  school_view_permission: string[];
  criterion_view_permission: string[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  school_edit_permission: { type: [String], default: [] },
  criterion_edit_permission: { type: [String], default: [] },
  school_view_permission: { type: [String], default: [] },
  criterion_view_permission: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
