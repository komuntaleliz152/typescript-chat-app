import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  username: string;
  content: string;
  roomId: string;
  timestamp: Date;
}

const MessageSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
    default: 'general',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IMessage>('Message', MessageSchema);
