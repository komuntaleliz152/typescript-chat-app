import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  name: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
}

const RoomSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IRoom>('Room', RoomSchema);
